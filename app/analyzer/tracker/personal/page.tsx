"use client";

import PortfolioAnalyzer from '@/components/PortfolioAnalyzer';
import { SIP } from '@/types/portfolio';

const PERSONAL_DATA: SIP[] = [
    { id: 1, fund_name: "Edelweiss Gold & Silver ETF FoF", amount: 100, category: "Gold", risk: 4 },
    { id: 2, fund_name: "ICICI Prudential Large & Mid Cap", amount: 100, category: "Large & Mid", risk: 6 },
    { id: 3, fund_name: "Mirae Asset Nifty India New Age Consumption ETF FoF", amount: 100, category: "Thematic", risk: 9 },
    { id: 4, fund_name: "Navi Nifty 50 Index Fund", amount: 200, category: "Index", risk: 3 },
    { id: 5, fund_name: "Nippon India Small Cap", amount: 200, category: "Small Cap", risk: 9 },
    { id: 6, fund_name: "JioBlackRock Flexi Cap Fund", amount: 500, category: "Flexi Cap", risk: 7 }
];

export default function PersonalTrackerPage() {
    return (
        <main className="min-h-screen bg-slate-900">
            <PortfolioAnalyzer initialData={PERSONAL_DATA} />
        </main>
    );
}
