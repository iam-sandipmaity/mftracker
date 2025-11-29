import SmartRebalancer from '@/components/SmartRebalancer';
import { Target, Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema, generateHowToSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Smart Portfolio Rebalancer - AI-Powered Asset Allocation for Mutual Funds",
    description: "Get expert-designed portfolio allocations across 4 risk profiles. Conservative, balanced, growth, and aggressive strategies for optimal mutual fund diversification.",
    keywords: ["portfolio rebalancing", "asset allocation", "mutual fund diversification", "risk profile", "portfolio optimization"],
    alternates: {
        canonical: '/analyzer/rebalancer'
    }
};

export default function RebalancerPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Analysis Tools", url: "/analyzer" },
        { name: "Smart Rebalancer", url: "/analyzer/rebalancer" }
    ]);

    const howToSchema = generateHowToSchema(
        "How to Rebalance Your Portfolio",
        "Get AI-powered portfolio allocation recommendations based on your risk profile",
        [
            "Select your risk profile: Conservative, Balanced, Growth, or Aggressive",
            "Review the recommended asset allocation percentages",
            "Compare with your current portfolio distribution",
            "Follow the category-wise breakdown for optimal diversification",
            "Implement the rebalancing plan gradually over time"
        ]
    );

    return (
        <>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="howto-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 pt-20 pb-16">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 mb-8">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-700 text-sm mb-4 border border-emerald-200">
                        <Sparkles className="w-4 h-4" />
                        <span className="font-semibold">AI-Powered Portfolio Rebalancing</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                        Smart Portfolio Rebalancer
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Get expert-designed portfolio allocations tailored to your risk profile. Build a balanced, diversified mutual fund portfolio in minutes.
                    </p>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6">
                <SmartRebalancer />
            </main>
        </div>
        </>
    );
}
