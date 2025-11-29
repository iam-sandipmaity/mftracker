// Tax Optimizer Utilities for Mutual Funds
// Handles LTCG, STCG, tax-loss harvesting, and optimization strategies

export interface Holding {
    id: string;
    fundName: string;
    fundCategory: 'Equity' | 'Debt' | 'Hybrid' | 'ELSS';
    purchaseDate: string;
    units: number;
    purchaseNAV: number;
    currentNAV: number;
    investedAmount: number;
    currentValue: number;
    isELSS?: boolean;
}

export interface RedemptionPlan {
    holdingId: string;
    unitsToRedeem: number;
    redemptionDate: string;
}

export interface TaxImplication {
    holdingId: string;
    fundName: string;
    fundCategory: string;
    holdingPeriodDays: number;
    isLongTerm: boolean;
    capitalGain: number;
    capitalLoss: number;
    taxableGain: number;
    taxAmount: number;
    taxRate: number;
    exemptionUsed: number;
}

export interface TaxLossHarvestingOpportunity {
    holdingId: string;
    fundName: string;
    currentLoss: number;
    recommendation: string;
    potentialTaxSaving: number;
    riskLevel: 'Low' | 'Medium' | 'High';
}

export interface TaxOptimizationSummary {
    totalInvestedAmount: number;
    totalCurrentValue: number;
    totalUnrealizedGain: number;
    totalUnrealizedLoss: number;
    ltcgTaxLiability: number;
    stcgTaxLiability: number;
    totalTaxLiability: number;
    taxLossHarvestingOpportunities: TaxLossHarvestingOpportunity[];
    redemptionAnalysis: TaxImplication[];
    recommendations: string[];
}

// Tax rates for FY 2025-26 (India)
const TAX_RATES = {
    EQUITY_LTCG: 12.5, // >12 months, above 1.25L exemption
    EQUITY_STCG: 20, // <=12 months
    ELSS_LTCG: 12.5, // >36 months (3 year lock-in), above 1.25L exemption
    ELSS_STCG: 20, // <=36 months (during lock-in, redemption not allowed)
    DEBT_LTCG: 12.5, // >36 months, with indexation benefit
    DEBT_STCG: 'slab', // As per income tax slab
    HYBRID_EQUITY_ORIENTED_LTCG: 12.5, // >12 months
    HYBRID_EQUITY_ORIENTED_STCG: 20, // <=12 months
    HYBRID_DEBT_ORIENTED_LTCG: 12.5, // >36 months
    HYBRID_DEBT_ORIENTED_STCG: 'slab',
};

const EQUITY_LTCG_EXEMPTION = 125000; // Rs 1.25 lakh per financial year
const ELSS_LOCK_IN_DAYS = 1095; // 3 years (36 months)

export function calculateHoldingPeriod(purchaseDate: string, redemptionDate: string): number {
    const purchase = new Date(purchaseDate);
    const redemption = new Date(redemptionDate);
    const diffTime = Math.abs(redemption.getTime() - purchase.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function isLongTermCapitalGain(fundCategory: string, holdingPeriodDays: number): boolean {
    if (fundCategory === 'Equity') {
        return holdingPeriodDays > 365; // >12 months
    } else if (fundCategory === 'ELSS') {
        return holdingPeriodDays > 1095; // >36 months (3 years)
    } else if (fundCategory === 'Debt') {
        return holdingPeriodDays > 1095; // >36 months
    } else if (fundCategory === 'Hybrid') {
        // Assuming equity-oriented hybrid for now
        return holdingPeriodDays > 365;
    }
    return false;
}

export function canRedeemELSS(purchaseDate: string, redemptionDate: string): boolean {
    const holdingDays = calculateHoldingPeriod(purchaseDate, redemptionDate);
    return holdingDays >= ELSS_LOCK_IN_DAYS;
}

export function calculateCapitalGain(holding: Holding, unitsToRedeem: number): number {
    const investedPerUnit = holding.purchaseNAV;
    const currentPerUnit = holding.currentNAV;
    const investedAmount = unitsToRedeem * investedPerUnit;
    const currentValue = unitsToRedeem * currentPerUnit;
    return currentValue - investedAmount;
}

export function calculateTaxOnCapitalGain(
    capitalGain: number,
    fundCategory: string,
    isLongTerm: boolean,
    usedExemption: number = 0
): { taxableGain: number; taxAmount: number; taxRate: number; exemptionUsed: number } {
    if (capitalGain <= 0) {
        return { taxableGain: 0, taxAmount: 0, taxRate: 0, exemptionUsed: 0 };
    }

    let taxRate = 0;
    let taxableGain = capitalGain;
    let exemptionUsed = 0;

    if (fundCategory === 'Equity') {
        if (isLongTerm) {
            // LTCG - 12.5% above Rs 1.25L exemption
            const remainingExemption = EQUITY_LTCG_EXEMPTION - usedExemption;
            exemptionUsed = Math.min(capitalGain, remainingExemption);
            taxableGain = Math.max(0, capitalGain - exemptionUsed);
            taxRate = 12.5;
        } else {
            // STCG - 20%
            taxRate = 20;
        }
    } else if (fundCategory === 'ELSS') {
        if (isLongTerm) {
            // ELSS LTCG (>36 months) - 12.5% above Rs 1.25L exemption
            const remainingExemption = EQUITY_LTCG_EXEMPTION - usedExemption;
            exemptionUsed = Math.min(capitalGain, remainingExemption);
            taxableGain = Math.max(0, capitalGain - exemptionUsed);
            taxRate = 12.5;
        } else {
            // ELSS STCG (<=36 months, but within lock-in) - 20%
            // Note: ELSS has 3-year lock-in, so technically can't redeem during STCG period
            taxRate = 20;
        }
    } else if (fundCategory === 'Debt') {
        if (isLongTerm) {
            // LTCG - 12.5% with indexation (simplified)
            taxRate = 12.5;
        } else {
            // STCG - As per slab (assuming 30% for high earners)
            taxRate = 30;
        }
    } else if (fundCategory === 'Hybrid') {
        // Assuming equity-oriented
        if (isLongTerm) {
            const remainingExemption = EQUITY_LTCG_EXEMPTION - usedExemption;
            exemptionUsed = Math.min(capitalGain, remainingExemption);
            taxableGain = Math.max(0, capitalGain - exemptionUsed);
            taxRate = 12.5;
        } else {
            taxRate = 20;
        }
    }

    const taxAmount = (taxableGain * taxRate) / 100;
    return { taxableGain, taxAmount, taxRate, exemptionUsed };
}

export function analyzeTaxImplications(
    holdings: Holding[],
    redemptionPlans: RedemptionPlan[]
): TaxImplication[] {
    let usedExemption = 0;
    const implications: TaxImplication[] = [];

    // Sort by LTCG first to maximize exemption usage
    const sortedPlans = [...redemptionPlans].sort((a, b) => {
        const holdingA = holdings.find(h => h.id === a.holdingId);
        const holdingB = holdings.find(h => h.id === b.holdingId);
        if (!holdingA || !holdingB) return 0;

        const daysA = calculateHoldingPeriod(holdingA.purchaseDate, a.redemptionDate);
        const daysB = calculateHoldingPeriod(holdingB.purchaseDate, b.redemptionDate);
        const isLTA = isLongTermCapitalGain(holdingA.fundCategory, daysA);
        const isLTB = isLongTermCapitalGain(holdingB.fundCategory, daysB);

        // Prioritize LTCG to use exemption
        if (isLTA && !isLTB) return -1;
        if (!isLTA && isLTB) return 1;
        return 0;
    });

    for (const plan of sortedPlans) {
        const holding = holdings.find(h => h.id === plan.holdingId);
        if (!holding) continue;

        const holdingPeriodDays = calculateHoldingPeriod(holding.purchaseDate, plan.redemptionDate);
        const isLT = isLongTermCapitalGain(holding.fundCategory, holdingPeriodDays);
        const capitalGain = calculateCapitalGain(holding, plan.unitsToRedeem);

        const { taxableGain, taxAmount, taxRate, exemptionUsed } = calculateTaxOnCapitalGain(
            capitalGain,
            holding.fundCategory,
            isLT,
            usedExemption
        );

        usedExemption += exemptionUsed;

        implications.push({
            holdingId: holding.id,
            fundName: holding.fundName,
            fundCategory: holding.fundCategory,
            holdingPeriodDays,
            isLongTerm: isLT,
            capitalGain: capitalGain > 0 ? capitalGain : 0,
            capitalLoss: capitalGain < 0 ? Math.abs(capitalGain) : 0,
            taxableGain,
            taxAmount,
            taxRate,
            exemptionUsed,
        });
    }

    return implications;
}

export function identifyTaxLossHarvesting(holdings: Holding[]): TaxLossHarvestingOpportunity[] {
    const opportunities: TaxLossHarvestingOpportunity[] = [];
    const today = new Date().toISOString().split('T')[0];

    for (const holding of holdings) {
        const unrealizedGainLoss = holding.currentValue - holding.investedAmount;

        if (unrealizedGainLoss < 0) {
            // Loss-making investment
            const holdingPeriodDays = calculateHoldingPeriod(holding.purchaseDate, today);
            const isLT = isLongTermCapitalGain(holding.fundCategory, holdingPeriodDays);

            // Calculate potential tax saving
            let potentialTaxSaving = 0;
            const lossAmount = Math.abs(unrealizedGainLoss);

            if (holding.fundCategory === 'Equity') {
                if (isLT) {
                    // LTCG loss can offset LTCG gains
                    potentialTaxSaving = (lossAmount * 12.5) / 100;
                } else {
                    // STCG loss can offset STCG/LTCG gains
                    potentialTaxSaving = (lossAmount * 20) / 100;
                }
            } else if (holding.fundCategory === 'Debt') {
                potentialTaxSaving = (lossAmount * 30) / 100; // Assuming slab rate
            }

            let recommendation = '';
            let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

            if (lossAmount > 50000) {
                recommendation = 'Consider redeeming to harvest loss and offset against gains. Significant tax saving opportunity.';
                riskLevel = 'Low';
            } else if (lossAmount > 20000) {
                recommendation = 'Moderate loss. Evaluate fund fundamentals before harvesting. Can offset gains.';
                riskLevel = 'Medium';
            } else {
                recommendation = 'Small loss. Only harvest if fund fundamentals are weak.';
                riskLevel = 'High';
            }

            // Add waiting period advice
            if (!isLT) {
                if (holding.fundCategory === 'Equity' && holdingPeriodDays > 300) {
                    recommendation += ' Consider waiting for LTCG if fund has good prospects.';
                } else if (holding.fundCategory === 'Debt' && holdingPeriodDays > 1000) {
                    recommendation += ' Close to LTCG threshold. Evaluate carefully.';
                }
            }

            opportunities.push({
                holdingId: holding.id,
                fundName: holding.fundName,
                currentLoss: lossAmount,
                recommendation,
                potentialTaxSaving,
                riskLevel,
            });
        }
    }

    // Sort by loss amount (highest first)
    return opportunities.sort((a, b) => b.currentLoss - a.currentLoss);
}

export function generateTaxOptimizationSummary(
    holdings: Holding[],
    redemptionPlans: RedemptionPlan[]
): TaxOptimizationSummary {
    const totalInvestedAmount = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
    const totalCurrentValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
    const totalUnrealizedGain = holdings.reduce((sum, h) => {
        const gain = h.currentValue - h.investedAmount;
        return sum + (gain > 0 ? gain : 0);
    }, 0);
    const totalUnrealizedLoss = holdings.reduce((sum, h) => {
        const gain = h.currentValue - h.investedAmount;
        return sum + (gain < 0 ? Math.abs(gain) : 0);
    }, 0);

    const redemptionAnalysis = analyzeTaxImplications(holdings, redemptionPlans);
    const ltcgTaxLiability = redemptionAnalysis
        .filter(r => r.isLongTerm)
        .reduce((sum, r) => sum + r.taxAmount, 0);
    const stcgTaxLiability = redemptionAnalysis
        .filter(r => !r.isLongTerm)
        .reduce((sum, r) => sum + r.taxAmount, 0);
    const totalTaxLiability = ltcgTaxLiability + stcgTaxLiability;

    const taxLossHarvestingOpportunities = identifyTaxLossHarvesting(holdings);

    const recommendations: string[] = [];

    // Generate smart recommendations
    if (totalUnrealizedLoss > 50000 && totalUnrealizedGain > totalUnrealizedLoss) {
        recommendations.push(
            `You have ₹${totalUnrealizedLoss.toLocaleString('en-IN')} in unrealized losses. Consider tax-loss harvesting to offset ₹${totalUnrealizedGain.toLocaleString('en-IN')} in gains.`
        );
    }

    if (stcgTaxLiability > ltcgTaxLiability * 1.5) {
        recommendations.push(
            'High STCG tax liability detected. Consider deferring redemptions beyond 12 months to qualify for LTCG with lower tax rate.'
        );
    }

    const unrealizedLTCG = holdings.filter(h => {
        const days = calculateHoldingPeriod(h.purchaseDate, new Date().toISOString().split('T')[0]);
        const isLT = isLongTermCapitalGain(h.fundCategory, days);
        return isLT && (h.currentValue - h.investedAmount) > 0;
    }).reduce((sum, h) => sum + (h.currentValue - h.investedAmount), 0);

    if (unrealizedLTCG > EQUITY_LTCG_EXEMPTION * 1.5) {
        recommendations.push(
            `You have ₹${unrealizedLTCG.toLocaleString('en-IN')} in unrealized LTCG. Consider redeeming up to ₹${EQUITY_LTCG_EXEMPTION.toLocaleString('en-IN')} tax-free each financial year.`
        );
    }

    if (taxLossHarvestingOpportunities.length > 0 && redemptionPlans.length === 0) {
        recommendations.push(
            `${taxLossHarvestingOpportunities.length} tax-loss harvesting opportunities identified. Review the recommendations below.`
        );
    }

    if (totalTaxLiability > 100000) {
        recommendations.push(
            'High tax liability on planned redemptions. Explore staggered redemption strategy across financial years to optimize tax outflow.'
        );
    }

    if (recommendations.length === 0) {
        recommendations.push('Your tax position looks optimized. Continue monitoring for rebalancing opportunities.');
    }

    return {
        totalInvestedAmount,
        totalCurrentValue,
        totalUnrealizedGain,
        totalUnrealizedLoss,
        ltcgTaxLiability,
        stcgTaxLiability,
        totalTaxLiability,
        taxLossHarvestingOpportunities,
        redemptionAnalysis,
        recommendations,
    };
}

export function optimizeRedemptionSequence(
    holdings: Holding[],
    totalAmountNeeded: number
): { optimizedPlans: RedemptionPlan[]; taxSaved: number; explanation: string } {
    // Strategy: Prioritize LTCG with exemption, then losses, then LTCG without exemption, then STCG
    const today = new Date().toISOString().split('T')[0];
    
    const scoredHoldings = holdings.map(h => {
        const days = calculateHoldingPeriod(h.purchaseDate, today);
        const isLT = isLongTermCapitalGain(h.fundCategory, days);
        const gain = h.currentValue - h.investedAmount;
        const isLoss = gain < 0;
        
        let score = 0;
        if (isLoss) score = 1000; // Prioritize losses (tax-loss harvesting)
        else if (isLT && h.fundCategory === 'Equity') score = 900; // LTCG with exemption potential
        else if (isLT) score = 500; // Other LTCG
        else score = 100; // STCG (last priority)
        
        return { holding: h, score, isLT, gain };
    });
    
    // Sort by score (descending)
    scoredHoldings.sort((a, b) => b.score - a.score);
    
    const optimizedPlans: RedemptionPlan[] = [];
    let amountCollected = 0;
    
    for (const { holding } of scoredHoldings) {
        if (amountCollected >= totalAmountNeeded) break;
        
        const remainingAmount = totalAmountNeeded - amountCollected;
        const unitsNeeded = Math.min(
            holding.units,
            remainingAmount / holding.currentNAV
        );
        
        if (unitsNeeded > 0) {
            optimizedPlans.push({
                holdingId: holding.id,
                unitsToRedeem: unitsNeeded,
                redemptionDate: today,
            });
            
            amountCollected += unitsNeeded * holding.currentNAV;
        }
    }
    
    // Calculate tax saved vs naive approach
    const explanation = `Optimized redemption sequence prioritizes: 1) Loss harvesting, 2) LTCG with exemption, 3) LTCG without exemption, 4) STCG.`;
    
    return {
        optimizedPlans,
        taxSaved: 0, // Can be calculated by comparing with naive sequence
        explanation,
    };
}
