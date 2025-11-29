import TaxOptimizer from '@/components/TaxOptimizer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Tax Optimizer - LTCG/STCG Calculator & Tax-Loss Harvesting | MFTracker",
    description: "Analyze tax implications of mutual fund redemptions, identify tax-loss harvesting opportunities, and optimize LTCG/STCG to minimize tax liability. Free tax planning tool.",
    alternates: {
        canonical: '/analyzer/tax-optimizer'
    }
};

export default function TaxOptimizerPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <TaxOptimizer />
            </div>
        </div>
    );
}
