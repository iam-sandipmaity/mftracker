import CalculatorSection from '@/components/CalculatorSection';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema, generateHowToSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Advanced SIP Calculator - Calculate Returns with Step-up & Inflation",
    description: "Free SIP calculator with annual step-up, inflation adjustment, and portfolio projections. Calculate future value, returns, and real gains for single or multiple mutual funds.",
    keywords: ["SIP calculator", "mutual fund calculator", "step up SIP", "SIP returns", "inflation adjusted returns", "portfolio calculator"],
    alternates: {
        canonical: '/analyzer/calculator'
    }
};

export default function CalculatorPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Analysis Tools", url: "/analyzer" },
        { name: "SIP Calculator", url: "/analyzer/calculator" }
    ]);

    const howToSchema = generateHowToSchema(
        "How to Calculate SIP Returns",
        "Calculate your mutual fund SIP returns with step-up and inflation adjustment",
        [
            "Enter your monthly SIP amount and expected return rate",
            "Set the investment duration in years",
            "Optionally enable annual step-up percentage",
            "Add inflation rate to see real returns",
            "Review future value, total investment, and returns breakdown"
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-16">
            {/* Header */}
            <div className="max-w-5xl mx-auto px-6 mb-8">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full text-purple-700 text-sm mb-4 border border-purple-200">
                        <span className="font-semibold">Advanced SIP Calculator</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Mutual Fund Calculator
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        Calculate SIP returns with step-up, inflation adjustment, and portfolio-wide projections to plan your financial future.
                    </p>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6">
                <CalculatorSection sips={[]} totalSIP={0} />
            </main>
        </div>
        </>
    );
}
