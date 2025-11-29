export interface GoalCalculationResult {
    requiredSIP: number;
    projectedCorpus: number;
    shortfall: number;
}

export const calculateFutureValue = (principal: number, rate: number, years: number): number => {
    // FV = P * (1 + r/100)^n
    return principal * Math.pow(1 + rate / 100, years);
};

export const calculateRequiredSIP = (
    targetAmount: number,
    years: number,
    expectedReturn: number,
    currentSavings: number = 0
): GoalCalculationResult => {
    if (years <= 0) return { requiredSIP: 0, projectedCorpus: currentSavings, shortfall: Math.max(0, targetAmount - currentSavings) };

    // 1. Calculate FV of current savings
    const fvCurrent = calculateFutureValue(currentSavings, expectedReturn, years);

    // 2. Calculate remaining target
    const remainingTarget = targetAmount - fvCurrent;

    if (remainingTarget <= 0) {
        return {
            requiredSIP: 0,
            projectedCorpus: fvCurrent,
            shortfall: 0
        };
    }

    // 3. Calculate SIP for remaining target
    // FV_SIP = P * [((1 + i)^n - 1) / i] * (1 + i)
    // where i = monthly rate, n = months
    const i = expectedReturn / 12 / 100;
    const n = years * 12;

    // P = FV / ([((1 + i)^n - 1) / i] * (1 + i))
    const factor = (Math.pow(1 + i, n) - 1) / i * (1 + i);
    const requiredSIP = remainingTarget / factor;

    return {
        requiredSIP: Math.round(requiredSIP),
        projectedCorpus: Math.round(fvCurrent + (requiredSIP * factor)),
        shortfall: 0
    };
};
