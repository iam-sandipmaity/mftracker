import FundComparison from '@/components/FundComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compare Mutual Funds - Side-by-Side Analysis | MFTracker',
    description: 'Compare multiple mutual funds side-by-side. Analyze returns, risk metrics, expense ratios, and ratings to make better investment decisions.',
};

export default function ComparePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <FundComparison />
            </div>
        </div>
    );
}
