import { SIP, Allocation, RedFlag, AnalysisResult } from '@/types/portfolio';

export function calculateAllocations(sips: SIP[], totalSIP: number): Allocation[] {
    return sips.map(sip => ({
        fund_name: sip.fund_name,
        amount: sip.amount,
        pct: totalSIP > 0 ? (sip.amount / totalSIP) * 100 : 0,
        category: sip.category,
    }));
}

export function calculateRiskScore(sips: SIP[], totalSIP: number): number {
    if (totalSIP === 0) return 0;

    let riskScoreSum = 0;
    sips.forEach(sip => {
        const weight = sip.amount / totalSIP;
        riskScoreSum += sip.risk * weight;
    });

    return Math.round(riskScoreSum * 10) / 10;
}

export function calculateDiversificationScore(sips: SIP[], totalSIP: number): number {
    if (sips.length === 0) return 0;

    // Factor 1: Number of distinct categories (max 40 points)
    const categories = new Set(sips.map(s => s.category));
    const categoryScore = Math.min((categories.size / 6) * 40, 40);

    // Factor 2: Allocation balance - penalize concentration (max 40 points)
    const allocations = sips.map(s => s.amount / totalSIP);
    const maxAllocation = Math.max(...allocations);
    const balanceScore = maxAllocation < 0.25 ? 40 : maxAllocation < 0.4 ? 25 : 10;

    // Factor 3: Number of funds (max 20 points)
    const fundCountScore = Math.min((sips.length / 8) * 20, 20);

    return Math.round(categoryScore + balanceScore + fundCountScore);
}

export function detectRedFlags(sips: SIP[], totalSIP: number): RedFlag[] {
    const flags: RedFlag[] = [];

    if (totalSIP === 0 || sips.length === 0) return flags;

    // Rule 1: Single fund > 40% concentration
    sips.forEach(sip => {
        const allocation = (sip.amount / totalSIP) * 100;
        if (allocation > 40) {
            flags.push({
                code: 'CONCENTRATION_HIGH',
                message: `${sip.fund_name} accounts for ${allocation.toFixed(1)}% of your portfolio. Recommendation: Keep individual funds below 25%.`,
                severity: 'high',
            });
        }
    });

    // Rule 2: Small Cap allocation > 25%
    const smallCapTotal = sips
        .filter(s => s.category === 'Small Cap')
        .reduce((sum, s) => sum + s.amount, 0);
    const smallCapPct = (smallCapTotal / totalSIP) * 100;

    if (smallCapPct > 25) {
        flags.push({
            code: 'SMALL_CAP_HIGH',
            message: `Small Cap funds make up ${smallCapPct.toFixed(1)}% of portfolio. High volatility risk. Recommendation: < 20% for balanced investors.`,
            severity: 'high',
        });
    }

    // Rule 3: Thematic/Sector funds > 15-20%
    const thematicTotal = sips
        .filter(s => s.category === 'Thematic' || s.category === 'Sector')
        .reduce((sum, s) => sum + s.amount, 0);
    const thematicPct = (thematicTotal / totalSIP) * 100;

    if (thematicPct > 15) {
        flags.push({
            code: 'THEMATIC_HIGH',
            message: `Thematic/Sector funds account for ${thematicPct.toFixed(1)}% of portfolio. These are high-risk, concentrated bets. Recommendation: < 15%.`,
            severity: thematicPct > 25 ? 'high' : 'medium',
        });
    }

    // Rule 4: High expense ratios > 2%
    const highExpenseFunds = sips.filter(s => s.expense_ratio && s.expense_ratio > 2);
    if (highExpenseFunds.length > 0) {
        flags.push({
            code: 'EXPENSE_RATIO_HIGH',
            message: `${highExpenseFunds.length} fund(s) have expense ratios > 2%: ${highExpenseFunds.map(f => f.fund_name).join(', ')}. Consider lower-cost alternatives.`,
            severity: 'medium',
        });
    }

    // Rule 5: No core holdings (Index or Large Cap) and > 50% high-risk
    const coreHoldings = sips.filter(s => s.category === 'Index' || s.category === 'Large Cap');
    const highRiskTotal = sips
        .filter(s => s.risk >= 8)
        .reduce((sum, s) => sum + s.amount, 0);
    const highRiskPct = (highRiskTotal / totalSIP) * 100;

    if (coreHoldings.length === 0 && highRiskPct > 50) {
        flags.push({
            code: 'NO_CORE_HOLDINGS',
            message: `Portfolio lacks core holdings (Index/Large Cap funds) and ${highRiskPct.toFixed(1)}% is in high-risk funds. Add stable core holdings.`,
            severity: 'high',
        });
    }

    // Rule 6: No debt/hedge and risk score >= 8
    const debtHoldings = sips.filter(s => s.category === 'Debt' || s.category === 'Gold');
    const riskScore = calculateRiskScore(sips, totalSIP);

    if (debtHoldings.length === 0 && riskScore >= 8) {
        flags.push({
            code: 'NO_HEDGE',
            message: `Portfolio risk score is ${riskScore}/10 (Aggressive) with no debt or gold allocation. Consider adding 10-15% in debt/gold for stability.`,
            severity: 'medium',
        });
    }

    // Rule 7: AMC concentration (if AMC data available)
    const amcGroups: Record<string, number> = {};
    sips.forEach(sip => {
        if (sip.amc) {
            amcGroups[sip.amc] = (amcGroups[sip.amc] || 0) + sip.amount;
        }
    });

    Object.entries(amcGroups).forEach(([amc, amount]) => {
        const amcPct = (amount / totalSIP) * 100;
        if (amcPct > 40) {
            flags.push({
                code: 'AMC_CONCENTRATION',
                message: `${amc} funds account for ${amcPct.toFixed(1)}% of portfolio. Diversify across AMCs to reduce fund house risk.`,
                severity: 'medium',
            });
        }
    });

    // Rule 8: Duplicate folio IDs
    const folioIds = sips.filter(s => s.folio_id).map(s => s.folio_id);
    const duplicateFolios = folioIds.filter((id, index) => folioIds.indexOf(id) !== index);

    if (duplicateFolios.length > 0) {
        flags.push({
            code: 'DUPLICATE_FOLIO',
            message: `Duplicate folio IDs detected: ${[...new Set(duplicateFolios)].join(', ')}. Possible data entry error.`,
            severity: 'low',
        });
    }

    return flags;
}

export function detectOverlap(sips: SIP[]): number {
    // Simple overlap detection based on index funds
    const indexFunds = sips.filter(s =>
        s.category === 'Index' ||
        s.fund_name.toLowerCase().includes('nifty') ||
        s.fund_name.toLowerCase().includes('sensex')
    );

    if (indexFunds.length <= 1) return 0;

    // If multiple index funds exist, assume high overlap
    const totalIndexAmount = indexFunds.reduce((sum, f) => sum + f.amount, 0);
    const totalAmount = sips.reduce((sum, f) => sum + f.amount, 0);

    return totalAmount > 0 ? (totalIndexAmount / totalAmount) * 100 : 0;
}
