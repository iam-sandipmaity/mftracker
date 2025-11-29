import { NAVData } from "@/types/mutualfund";

export interface FundRiskMetrics {
  standardDeviation: number;
  sharpeRatio: number;
  sortinoRatio: number;
}

export interface FundReturns {
  oneYear: number | null;
  threeYear: number | null;
  fiveYear: number | null;
  max: number | null;
}

export interface FundMockData {
  aum: string;
  expenseRatio: string;
  rating: number;
  riskLevel: string;
  exitLoad: string;
  minInvestment: string;
}

export const calculateCAGR = (startNav: number, endNav: number, years: number): number => {
  if (startNav === 0 || years === 0) return 0;
  return (Math.pow(endNav / startNav, 1 / years) - 1) * 100;
};

// Helper to parse "dd-mm-yyyy" format
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const calculateReturns = (navData: NAVData[]): FundReturns => {
  if (!navData || navData.length === 0) {
    return { oneYear: null, threeYear: null, fiveYear: null, max: null };
  }

  // Sort data by date descending (newest first)
  const sortedData = [...navData].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  const latestNav = parseFloat(sortedData[0].nav);
  const latestDate = parseDate(sortedData[0].date);

  const getNavXYearsAgo = (years: number): number | null => {
    const targetDate = new Date(latestDate);
    targetDate.setFullYear(targetDate.getFullYear() - years);

    // Find the closest NAV date <= targetDate
    // Since data is sorted descending, we look for the first date that is <= targetDate
    const closest = sortedData.find(d => parseDate(d.date) <= targetDate);
    return closest ? parseFloat(closest.nav) : null;
  };

  const nav1Y = getNavXYearsAgo(1);
  const nav3Y = getNavXYearsAgo(3);
  const nav5Y = getNavXYearsAgo(5);
  const navMax = parseFloat(sortedData[sortedData.length - 1].nav);

  // Calculate Max years
  const oldestDate = parseDate(sortedData[sortedData.length - 1].date);
  const maxYears = (latestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  return {
    oneYear: nav1Y ? calculateCAGR(nav1Y, latestNav, 1) : null,
    threeYear: nav3Y ? calculateCAGR(nav3Y, latestNav, 3) : null,
    fiveYear: nav5Y ? calculateCAGR(nav5Y, latestNav, 5) : null,
    max: navMax ? calculateCAGR(navMax, latestNav, maxYears) : null,
  };
};

export const calculateRiskMetrics = (navData: NAVData[]): FundRiskMetrics => {
  if (!navData || navData.length < 30) {
    return { standardDeviation: 0, sharpeRatio: 0, sortinoRatio: 0 };
  }

  // Use last 1 year of data for risk calculations or all if less than 1 year
  const sortedData = [...navData].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  const oneYearAgo = parseDate(sortedData[0].date);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const relevantData = sortedData.filter(d => parseDate(d.date) >= oneYearAgo);
  const dataToUse = relevantData.length > 0 ? relevantData : sortedData;

  // Calculate daily returns
  const dailyReturns: number[] = [];
  for (let i = 0; i < dataToUse.length - 1; i++) {
    const currentNav = parseFloat(dataToUse[i].nav);
    const prevNav = parseFloat(dataToUse[i + 1].nav);
    if (prevNav > 0) {
      dailyReturns.push((currentNav - prevNav) / prevNav);
    }
  }

  if (dailyReturns.length === 0) return { standardDeviation: 0, sharpeRatio: 0, sortinoRatio: 0 };

  // Standard Deviation (Annualized)
  const mean = dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
  const variance = dailyReturns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / dailyReturns.length;
  const stdDevDaily = Math.sqrt(variance);
  const stdDevAnnualized = stdDevDaily * Math.sqrt(252) * 100; // Annualized %

  // Downside Deviation for Sortino Ratio
  // Only consider returns < 0 (or < target return, assuming 0 for simplicity)
  const negativeReturns = dailyReturns.filter(r => r < 0);
  const downsideVariance = negativeReturns.reduce((a, b) => a + Math.pow(b, 2), 0) / dailyReturns.length; // Divide by total N, not N_negative
  const downsideDevDaily = Math.sqrt(downsideVariance);
  const downsideDevAnnualized = downsideDevDaily * Math.sqrt(252) * 100;

  // Sharpe Ratio (Simplified, assuming risk-free rate ~6%)
  // Sharpe = (Return - RiskFree) / StdDev
  // We'll use the 1Y return for this calculation if available, else annualized mean
  const annualizedReturn = (Math.pow(1 + mean, 252) - 1) * 100;
  const riskFreeRate = 6.0;
  const sharpeRatio = stdDevAnnualized !== 0 ? (annualizedReturn - riskFreeRate) / stdDevAnnualized : 0;

  // Sortino Ratio
  const sortinoRatio = downsideDevAnnualized !== 0 ? (annualizedReturn - riskFreeRate) / downsideDevAnnualized : 0;

  return {
    standardDeviation: parseFloat(stdDevAnnualized.toFixed(2)),
    sharpeRatio: parseFloat(sharpeRatio.toFixed(2)),
    sortinoRatio: parseFloat(sortinoRatio.toFixed(2))
  };
};

// Mock data generator since API doesn't provide these
export const getFundMockData = (schemeCode: number): FundMockData => {
  // Deterministic mock data based on scheme code
  const random = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const r = random(schemeCode);

  const aumBase = 500 + Math.floor(r * 45000); // 500cr to 45500cr
  const expBase = 0.3 + (r * 1.5); // 0.3% to 1.8%
  const rating = Math.floor(r * 3) + 3; // 3 to 5 stars

  const risks = ["Low", "Moderately Low", "Moderate", "Moderately High", "High", "Very High"];
  const riskLevel = risks[Math.floor(r * risks.length)];

  const exitLoads = ["Nil", "1% if redeemed within 1 year", "0.5% if redeemed within 30 days", "1% if redeemed within 365 days"];
  const exitLoad = exitLoads[Math.floor(r * exitLoads.length)];

  const minInvestments = ["₹500", "₹1,000", "₹5,000"];
  const minInvestment = minInvestments[Math.floor(r * minInvestments.length)];

  return {
    aum: `₹${aumBase.toLocaleString('en-IN')} Cr`,
    expenseRatio: `${expBase.toFixed(2)}%`,
    rating: rating > 5 ? 5 : rating,
    riskLevel,
    exitLoad,
    minInvestment
  };
};
