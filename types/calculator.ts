export interface SIPCalculation {
    monthlyInvestment: number;
    expectedReturn: number; // Annual return in percentage
    durationYears: number;
    stepUpPercentage?: number; // Annual step-up in percentage
    inflationRate?: number; // Annual inflation in percentage
    totalInvestment: number;
    futureValue: number;
    totalReturns: number;
    realReturns?: number; // Inflation-adjusted returns
    realFutureValue?: number; // Future value in today's purchasing power
    yearlyBreakdown: YearlyBreakdown[];
}

export interface YearlyBreakdown {
    year: number;
    investmentThisYear: number;
    cumulativeInvestment: number;
    valueAtYearEnd: number;
    returnsThisYear: number;
    cumulativeReturns: number;
}

export interface LumpSumCalculation {
    principal: number;
    expectedReturn: number;
    durationYears: number;
    inflationRate?: number;
    futureValue: number;
    totalReturns: number;
    realReturns?: number;
    realFutureValue?: number; // Future value in today's purchasing power
}

export interface PortfolioProjection {
    totalCurrentSIP: number;
    totalFutureValue: number;
    totalInvestment: number;
    totalReturns: number;
    fundProjections: FundProjection[];
    aggregateYearlyBreakdown: YearlyBreakdown[];
}

export interface FundProjection {
    fundName: string;
    category: string;
    monthlySIP: number;
    expectedReturn: number;
    futureValue: number;
    totalInvestment: number;
    returns: number;
}

export interface CalculatorInputs {
    calculationType: 'sip' | 'lumpsum' | 'both';
    sipAmount?: number;
    lumpSumAmount?: number;
    expectedReturn: number;
    durationYears: number;
    stepUpPercentage?: number;
    inflationRate?: number;
}

export interface ComparisonResult {
    withStepUp: SIPCalculation;
    withoutStepUp: SIPCalculation;
    difference: number;
    percentageGain: number;
}
