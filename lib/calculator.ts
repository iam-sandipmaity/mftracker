import {
    SIPCalculation,
    LumpSumCalculation,
    YearlyBreakdown,
    PortfolioProjection,
    FundProjection,
    ComparisonResult
} from '@/types/calculator';
import { SIP } from '@/types/portfolio';

/**
 * Calculate SIP future value with optional step-up and inflation adjustment
 */
export function calculateSIP(
    monthlyAmount: number,
    annualReturnPct: number,
    years: number,
    stepUpPct: number = 0,
    inflationPct: number = 0
): SIPCalculation {
    const monthlyRate = annualReturnPct / 12 / 100;
    const yearlyBreakdown: YearlyBreakdown[] = [];

    let totalInvestment = 0;
    let currentValue = 0;
    let currentMonthlyAmount = monthlyAmount;

    for (let year = 1; year <= years; year++) {
        let investmentThisYear = 0;
        let valueAtYearStart = currentValue;

        // Calculate for each month in the year
        for (let month = 1; month <= 12; month++) {
            investmentThisYear += currentMonthlyAmount;
            totalInvestment += currentMonthlyAmount;

            // Add new investment and apply monthly return to entire corpus
            currentValue = (currentValue + currentMonthlyAmount) * (1 + monthlyRate);
        }

        const returnsThisYear = currentValue - valueAtYearStart - investmentThisYear;

        yearlyBreakdown.push({
            year,
            investmentThisYear,
            cumulativeInvestment: totalInvestment,
            valueAtYearEnd: currentValue,
            returnsThisYear,
            cumulativeReturns: currentValue - totalInvestment,
        });

        // Apply step-up for next year
        if (stepUpPct > 0 && year < years) {
            currentMonthlyAmount = currentMonthlyAmount * (1 + stepUpPct / 100);
        }
    }

    const futureValue = currentValue;
    const totalReturns = futureValue - totalInvestment;

    // Calculate inflation-adjusted returns using real-world approach
    // Each contribution is adjusted for inflation from the time it was made
    // This gives the true purchasing power of returns in today's money
    let realReturns: number | undefined;
    let realFutureValue: number | undefined;
    if (inflationPct > 0) {
        const monthlyInflationRate = inflationPct / 12 / 100;
        let realValue = 0;
        let currentMonthlyAmountCalc = monthlyAmount;
        let totalMonths = years * 12;
        
        // Calculate real value by adjusting each contribution for inflation
        for (let month = 1; month <= totalMonths; month++) {
            // Adjust contribution amount if step-up applies
            if (stepUpPct > 0 && month > 1 && (month - 1) % 12 === 0) {
                currentMonthlyAmountCalc = currentMonthlyAmountCalc * (1 + stepUpPct / 100);
            }
            
            // Calculate months remaining from this contribution to end
            const monthsToEnd = totalMonths - month + 1;
            
            // Apply investment growth
            const contributionGrowth = currentMonthlyAmountCalc * Math.pow(1 + monthlyRate, monthsToEnd);
            
            // Deflate to present value
            const inflationFactor = Math.pow(1 + monthlyInflationRate, monthsToEnd);
            realValue += contributionGrowth / inflationFactor;
        }
        
        realFutureValue = realValue;
        realReturns = realValue - totalInvestment;
    }

    return {
        monthlyInvestment: monthlyAmount,
        expectedReturn: annualReturnPct,
        durationYears: years,
        stepUpPercentage: stepUpPct,
        inflationRate: inflationPct,
        totalInvestment,
        futureValue,
        totalReturns,
        realReturns,
        yearlyBreakdown,
    };
}

/**
 * Calculate lump sum investment future value
 */
export function calculateLumpSum(
    principal: number,
    annualReturnPct: number,
    years: number,
    inflationPct: number = 0
): LumpSumCalculation {
    const futureValue = principal * Math.pow(1 + annualReturnPct / 100, years);
    const totalReturns = futureValue - principal;

    // Calculate inflation-adjusted returns using real-world approach
    // Deflate future value to present value terms
    let realReturns: number | undefined;
    let realFutureValue: number | undefined;
    if (inflationPct > 0) {
        const inflationFactor = Math.pow(1 + inflationPct / 100, years);
        realFutureValue = futureValue / inflationFactor;
        realReturns = realFutureValue - principal;
    }

    return {
        principal,
        expectedReturn: annualReturnPct,
        durationYears: years,
        inflationRate: inflationPct,
        futureValue,
        totalReturns,
        realReturns,
        realFutureValue,
    };
}

/**
 * Calculate portfolio projections for all funds
 */
export function calculatePortfolioProjection(
    sips: SIP[],
    years: number,
    stepUpPct: number = 0,
    inflationPct: number = 0,
    categoryReturns?: Record<string, number>
): PortfolioProjection {
    // Default expected returns by category
    const defaultReturns: Record<string, number> = {
        'Small Cap': 15,
        'Thematic': 14,
        'Sector': 13,
        'Flexi Cap': 13,
        'Multi Cap': 13,
        'Large & Mid': 12,
        'Large Cap': 11,
        'Index': 12,
        'ELSS': 12,
        'International': 10,
        'Hybrid': 9,
        'Debt': 7,
        'Gold': 8,
        'Commodity': 8,
    };

    const fundProjections: FundProjection[] = [];
    const aggregateBreakdown: Map<number, YearlyBreakdown> = new Map();

    let totalCurrentSIP = 0;
    let totalFutureValue = 0;
    let totalInvestment = 0;

    sips.forEach(sip => {
        const expectedReturn = categoryReturns?.[sip.category] || defaultReturns[sip.category] || 12;
        const calculation = calculateSIP(sip.amount, expectedReturn, years, stepUpPct, inflationPct);

        fundProjections.push({
            fundName: sip.fund_name,
            category: sip.category,
            monthlySIP: sip.amount,
            expectedReturn,
            futureValue: calculation.futureValue,
            totalInvestment: calculation.totalInvestment,
            returns: calculation.totalReturns,
        });

        totalCurrentSIP += sip.amount;
        totalFutureValue += calculation.futureValue;
        totalInvestment += calculation.totalInvestment;

        // Aggregate yearly breakdown
        calculation.yearlyBreakdown.forEach(yearData => {
            const existing = aggregateBreakdown.get(yearData.year);
            if (existing) {
                existing.investmentThisYear += yearData.investmentThisYear;
                existing.cumulativeInvestment += yearData.investmentThisYear;
                existing.valueAtYearEnd += yearData.valueAtYearEnd;
                existing.returnsThisYear += yearData.returnsThisYear;
                existing.cumulativeReturns += yearData.returnsThisYear;
            } else {
                aggregateBreakdown.set(yearData.year, { ...yearData });
            }
        });
    });

    // Convert map to sorted array
    const aggregateYearlyBreakdown = Array.from(aggregateBreakdown.values())
        .sort((a, b) => a.year - b.year);

    return {
        totalCurrentSIP,
        totalFutureValue,
        totalInvestment,
        totalReturns: totalFutureValue - totalInvestment,
        fundProjections,
        aggregateYearlyBreakdown,
    };
}

/**
 * Compare SIP with and without step-up
 */
export function compareStepUp(
    monthlyAmount: number,
    annualReturnPct: number,
    years: number,
    stepUpPct: number,
    inflationPct: number = 0
): ComparisonResult {
    const withoutStepUp = calculateSIP(monthlyAmount, annualReturnPct, years, 0, inflationPct);
    const withStepUp = calculateSIP(monthlyAmount, annualReturnPct, years, stepUpPct, inflationPct);

    const difference = withStepUp.futureValue - withoutStepUp.futureValue;
    const percentageGain = (difference / withoutStepUp.futureValue) * 100;

    return {
        withStepUp,
        withoutStepUp,
        difference,
        percentageGain,
    };
}

/**
 * Calculate required SIP to reach a target amount
 */
export function calculateRequiredSIP(
    targetAmount: number,
    annualReturnPct: number,
    years: number,
    stepUpPct: number = 0
): number {
    // Use iterative approach to find required SIP
    let low = 100;
    let high = targetAmount / 12 / years;
    let requiredSIP = 0;

    while (high - low > 1) {
        const mid = (low + high) / 2;
        const result = calculateSIP(mid, annualReturnPct, years, stepUpPct);

        if (result.futureValue < targetAmount) {
            low = mid;
        } else {
            high = mid;
            requiredSIP = mid;
        }
    }

    return Math.ceil(requiredSIP / 100) * 100; // Round up to nearest 100
}

/**
 * Calculate XIRR (Extended Internal Rate of Return) for irregular cash flows
 */
export function calculateXIRR(
    cashFlows: { date: Date; amount: number }[],
    guess: number = 0.1
): number {
    const maxIterations = 100;
    const tolerance = 0.0001;

    let rate = guess;

    for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let dnpv = 0;
        const firstDate = cashFlows[0].date;

        cashFlows.forEach(cf => {
            const days = (cf.date.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
            const years = days / 365;
            const factor = Math.pow(1 + rate, years);

            npv += cf.amount / factor;
            dnpv -= cf.amount * years / (factor * (1 + rate));
        });

        const newRate = rate - npv / dnpv;

        if (Math.abs(newRate - rate) < tolerance) {
            return newRate * 100; // Return as percentage
        }

        rate = newRate;
    }

    return rate * 100;
}
