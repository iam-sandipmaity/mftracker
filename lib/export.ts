import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AnalysisResult, RebalanceChange } from '@/types/portfolio';
import { Goal } from '@/components/GoalCard';

export function exportToPDF(
    analysis: AnalysisResult,
    rebalancePlan: RebalanceChange[]
): void {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Indigo
    doc.text('Portfolio Health Analysis Report', 14, 20);

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Portfolio Summary', 14, 40);

    doc.setFontSize(10);
    doc.text(`Total Monthly SIP: ₹${analysis.total_monthly_sip.toLocaleString()}`, 14, 48);
    doc.text(`Risk Score: ${analysis.portfolio_risk_score}/10`, 14, 54);
    doc.text(`Diversification Score: ${analysis.diversification_score}/100`, 14, 60);
    doc.text(`Number of Funds: ${analysis.raw_parsed_sips.length}`, 14, 66);

    // Current Holdings Table
    doc.setFontSize(14);
    doc.text('Current Holdings', 14, 78);

    autoTable(doc, {
        startY: 82,
        head: [['Fund Name', 'Category', 'Amount', 'Allocation %']],
        body: analysis.allocations.map(a => [
            a.fund_name,
            a.category,
            `₹${a.amount}`,
            `${a.pct.toFixed(1)}%`
        ]),
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] },
    });

    // Red Flags Section
    if (analysis.red_flags.length > 0) {
        const finalY = (doc as any).lastAutoTable.finalY || 120;

        doc.setFontSize(14);
        doc.setTextColor(239, 68, 68); // Red
        doc.text('⚠ Red Flags Detected', 14, finalY + 10);

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        analysis.red_flags.forEach((flag, index) => {
            const yPos = finalY + 18 + (index * 12);
            doc.text(`${index + 1}. [${flag.severity.toUpperCase()}] ${flag.message}`, 14, yPos, {
                maxWidth: 180
            });
        });
    }

    // Add new page for rebalancing recommendations
    doc.addPage();

    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text('Rebalancing Recommendations', 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Target Profile: ${analysis.recommended_rebalance.target_profile}`, 14, 30);

    // Rebalancing Table
    autoTable(doc, {
        startY: 38,
        head: [['Fund Name', 'Category', 'Current', 'Recommended', 'Change']],
        body: rebalancePlan.map(r => [
            r.fund_name,
            r.category,
            `₹${r.current}`,
            `₹${r.recommended}`,
            r.diff > 0 ? `+₹${r.diff}` : r.diff < 0 ? `-₹${Math.abs(r.diff)}` : 'No change'
        ]),
        theme: 'striped',
        headStyles: { fillColor: [79, 70, 229] },
    });

    // Disclaimer
    const disclaimerY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
        'Disclaimer: This analysis is for educational purposes only and does not constitute investment advice.',
        14,
        disclaimerY,
        { maxWidth: 180 }
    );

    // Save PDF
    doc.save(`portfolio-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
}

export function exportToCSV(rebalancePlan: RebalanceChange[]): void {
    const headers = ['Fund Name', 'Category', 'Current Amount', 'Recommended Amount', 'Change', 'Notes'];

    const rows = rebalancePlan.map(r => [
        r.fund_name,
        r.category,
        r.current.toString(),
        r.recommended.toString(),
        r.diff.toString(),
        r.reason || (r.isNew ? 'New fund suggestion' : '')
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `rebalancing-plan-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function generateSummaryText(analysis: AnalysisResult): string {
    const riskLevel = analysis.portfolio_risk_score >= 8 ? 'Aggressive' :
        analysis.portfolio_risk_score >= 6 ? 'Moderate-High' :
            analysis.portfolio_risk_score >= 4 ? 'Moderate' : 'Conservative';

    const topFlags = analysis.red_flags.slice(0, 3);

    let summary = `📊 **Portfolio Summary**\n\n`;
    summary += `• Total Monthly SIP: ₹${analysis.total_monthly_sip.toLocaleString()}\n`;
    summary += `• Risk Level: ${riskLevel} (${analysis.portfolio_risk_score}/10)\n`;
    summary += `• Diversification Score: ${analysis.diversification_score}/100\n`;
    summary += `• Number of Funds: ${analysis.raw_parsed_sips.length}\n\n`;

    if (topFlags.length > 0) {
        summary += `⚠️ **Top Red Flags:**\n`;
        topFlags.forEach((flag, i) => {
            summary += `${i + 1}. ${flag.message}\n`;
        });
        summary += `\n`;
    }

    summary += `✅ **Strengths:**\n`;
    if (analysis.diversification_score >= 60) {
        summary += `• Good diversification across categories\n`;
    }
    if (analysis.raw_parsed_sips.length >= 5) {
        summary += `• Adequate number of funds for diversification\n`;
    }

    summary += `\n📋 **Next Actions:**\n`;
    summary += `1. Review the rebalancing recommendations for your target profile\n`;
    summary += `2. Address high-severity red flags first\n`;
    summary += `3. Consider gradual rebalancing over 2-3 months\n`;

    return summary;
}

// Goal Export Functions
export function exportGoalToCSV(goal: Goal): void {
    const headers = [
        'Goal Name',
        'Target Amount (₹)',
        'Time Horizon (Years)',
        'Expected Return (%)',
        'Current Savings (₹)',
        'Required Monthly SIP (₹)',
        'Total Investment Needed (₹)',
        'Expected Final Amount (₹)',
        'Progress (%)'
    ];

    const totalInvestment = goal.requiredSIP * 12 * goal.years;
    const expectedFinalAmount = goal.currentSavings + totalInvestment;
    const progress = Math.min(100, (goal.currentSavings / goal.targetAmount) * 100);

    const row = [
        goal.name,
        goal.targetAmount.toString(),
        goal.years.toString(),
        goal.expectedReturn.toString(),
        goal.currentSavings.toString(),
        goal.requiredSIP.toString(),
        totalInvestment.toString(),
        expectedFinalAmount.toString(),
        progress.toFixed(2)
    ];

    const csvContent = [
        headers.join(','),
        row.map(cell => `"${cell}"`).join(','),
        '',
        '--- Goal Breakdown ---',
        `"Monthly SIP Required","₹${goal.requiredSIP.toLocaleString('en-IN')}"`,
        `"Annual Investment","₹${(goal.requiredSIP * 12).toLocaleString('en-IN')}"`,
        `"Total Investment Over ${goal.years} Years","₹${totalInvestment.toLocaleString('en-IN')}"`,
        `"Current Savings","₹${goal.currentSavings.toLocaleString('en-IN')}"`,
        `"Target Amount","₹${goal.targetAmount.toLocaleString('en-IN')}"`,
        `"Gap to Cover","₹${(goal.targetAmount - goal.currentSavings).toLocaleString('en-IN')}"`,
        `"Expected Return Rate","${goal.expectedReturn}% per annum"`,
        `"Time Horizon","${goal.years} years"`,
        '',
        '--- Notes ---',
        `"Generated on","${new Date().toLocaleString()}"`,
        `"Disclaimer","This is a projected calculation based on assumed returns. Actual returns may vary."`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    const fileName = `${goal.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-goal-${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportAllGoalsToCSV(goals: Goal[]): void {
    if (goals.length === 0) {
        alert('No goals to export');
        return;
    }

    const headers = [
        'Goal Name',
        'Target Amount (₹)',
        'Time Horizon (Years)',
        'Expected Return (%)',
        'Current Savings (₹)',
        'Required Monthly SIP (₹)',
        'Total Investment (₹)',
        'Progress (%)'
    ];

    const rows = goals.map(goal => {
        const totalInvestment = goal.requiredSIP * 12 * goal.years;
        const progress = Math.min(100, (goal.currentSavings / goal.targetAmount) * 100);
        
        return [
            goal.name,
            goal.targetAmount.toString(),
            goal.years.toString(),
            goal.expectedReturn.toString(),
            goal.currentSavings.toString(),
            goal.requiredSIP.toString(),
            totalInvestment.toString(),
            progress.toFixed(2)
        ];
    });

    const totalMonthlySize = goals.reduce((sum, g) => sum + g.requiredSIP, 0);
    const totalTargetAmount = goals.reduce((sum, g) => sum + g.targetAmount, 0);
    const totalCurrentSavings = goals.reduce((sum, g) => sum + g.currentSavings, 0);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
        '',
        '--- Summary ---',
        `"Total Goals","${goals.length}"`,
        `"Total Monthly SIP Required","₹${totalMonthlySize.toLocaleString('en-IN')}"`,
        `"Total Annual SIP Required","₹${(totalMonthlySize * 12).toLocaleString('en-IN')}"`,
        `"Total Target Amount","₹${totalTargetAmount.toLocaleString('en-IN')}"`,
        `"Total Current Savings","₹${totalCurrentSavings.toLocaleString('en-IN')}"`,
        `"Total Gap","₹${(totalTargetAmount - totalCurrentSavings).toLocaleString('en-IN')}"`,
        '',
        '--- Notes ---',
        `"Generated on","${new Date().toLocaleString()}"`,
        `"Disclaimer","These are projected calculations based on assumed returns. Actual returns may vary."`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `all-goals-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// JSON Backup/Restore Functions
export function exportGoalsToJSON(goals: Goal[]): void {
    if (goals.length === 0) {
        alert('No goals to backup');
        return;
    }

    const backup = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        totalGoals: goals.length,
        goals: goals
    };

    const jsonString = JSON.stringify(backup, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `mftracker-goals-backup-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function importGoalsFromJSON(file: File): Promise<Goal[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const parsed = JSON.parse(content);

                // Validate the backup structure
                if (!parsed.version || !parsed.goals || !Array.isArray(parsed.goals)) {
                    throw new Error('Invalid backup file format');
                }

                // Validate each goal has required fields
                const validatedGoals = parsed.goals.map((goal: any) => {
                    if (!goal.name || typeof goal.targetAmount !== 'number' || 
                        typeof goal.years !== 'number' || typeof goal.expectedReturn !== 'number') {
                        throw new Error('Invalid goal data in backup file');
                    }
                    
                    return {
                        id: goal.id || crypto.randomUUID(),
                        name: goal.name,
                        targetAmount: goal.targetAmount,
                        years: goal.years,
                        expectedReturn: goal.expectedReturn,
                        currentSavings: goal.currentSavings || 0,
                        requiredSIP: goal.requiredSIP || 0
                    };
                });

                resolve(validatedGoals);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsText(file);
    });
}
