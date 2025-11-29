import { SIP, RebalanceChange, RiskProfile } from '@/types/portfolio';
import { RISK_PROFILES } from './categories';

export function generateRebalancePlan(
    sips: SIP[],
    targetProfile: RiskProfile,
    totalSIP: number
): RebalanceChange[] {
    const profile = RISK_PROFILES[targetProfile];
    const plan: RebalanceChange[] = [];

    if (totalSIP === 0) return plan;

    // Group current SIPs by category
    const currentByCategory: Record<string, SIP[]> = {};
    sips.forEach(sip => {
        if (!currentByCategory[sip.category]) {
            currentByCategory[sip.category] = [];
        }
        currentByCategory[sip.category].push(sip);
    });

    // Calculate target amounts for each category in the profile
    const processedCategories = new Set<string>();

    Object.entries(profile).forEach(([category, targetPct]) => {
        const targetAmount = Math.round((totalSIP * targetPct) / 100 / 10) * 10; // Round to nearest 10
        processedCategories.add(category);

        const existingFunds = currentByCategory[category] || [];

        if (existingFunds.length > 0) {
            // Distribute target amount proportionally among existing funds
            const categoryTotal = existingFunds.reduce((sum, f) => sum + f.amount, 0);

            existingFunds.forEach(fund => {
                const fundWeight = categoryTotal > 0 ? fund.amount / categoryTotal : 1 / existingFunds.length;
                const recommendedAmount = Math.round((targetAmount * fundWeight) / 10) * 10;

                plan.push({
                    fund_name: fund.fund_name,
                    category: fund.category,
                    current: fund.amount,
                    recommended: recommendedAmount,
                    diff: recommendedAmount - fund.amount,
                    reason: recommendedAmount === 0 ? `Not part of ${targetProfile} profile` : undefined,
                });
            });
        } else if (targetAmount > 0) {
            // Suggest new fund for this category
            plan.push({
                fund_name: `Suggested ${category} Fund`,
                category: category,
                current: 0,
                recommended: targetAmount,
                diff: targetAmount,
                isNew: true,
                reason: `Add ${category} fund to match ${targetProfile} profile`,
            });
        }
    });

    // Handle funds in categories not in the target profile
    Object.entries(currentByCategory).forEach(([category, funds]) => {
        if (!processedCategories.has(category)) {
            funds.forEach(fund => {
                plan.push({
                    fund_name: fund.fund_name,
                    category: fund.category,
                    current: fund.amount,
                    recommended: 0,
                    diff: -fund.amount,
                    reason: `${category} not part of ${targetProfile} profile - consider reducing or removing`,
                });
            });
        }
    });

    // Sort by recommended amount (descending)
    return plan.sort((a, b) => b.recommended - a.recommended);
}

export function calculateTargetAllocations(profile: RiskProfile, totalSIP: number) {
    const profileData = RISK_PROFILES[profile];

    return Object.entries(profileData).map(([category, pct]) => ({
        category,
        target_pct: pct,
        target_amount: Math.round((totalSIP * pct) / 100),
    }));
}

export function ensureZeroNetChange(plan: RebalanceChange[]): boolean {
    const totalDiff = plan.reduce((sum, item) => sum + item.diff, 0);
    return Math.abs(totalDiff) < 1; // Allow for rounding errors
}

export function getRebalanceSummary(plan: RebalanceChange[]): string {
    const increases = plan.filter(p => p.diff > 0);
    const decreases = plan.filter(p => p.diff < 0);
    const unchanged = plan.filter(p => p.diff === 0);

    let summary = '';

    if (increases.length > 0) {
        summary += `Increase: ${increases.map(p => `${p.fund_name} (+₹${p.diff})`).join(', ')}. `;
    }

    if (decreases.length > 0) {
        summary += `Decrease: ${decreases.map(p => `${p.fund_name} (₹${p.diff})`).join(', ')}. `;
    }

    if (unchanged.length > 0) {
        summary += `Keep unchanged: ${unchanged.length} fund(s).`;
    }

    return summary;
}
