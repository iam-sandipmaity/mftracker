import MutualFundSearch from '@/components/MutualFundSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Mutual Fund Search - Find & Analyze Any Mutual Fund | MFTracker",
    description: "Search and explore mutual funds with real-time NAV data, historical performance charts, and comprehensive fund details. Analyze ISIN codes, fund houses, and scheme categories.",
    alternates: {
        canonical: '/mf-search'
    }
};

export default function MFSearchPage() {
    return <MutualFundSearch />;
}
