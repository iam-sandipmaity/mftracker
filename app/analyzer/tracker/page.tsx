import PortfolioAnalyzer from '@/components/PortfolioAnalyzer';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema, generateHowToSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Portfolio Tracker - Analyze Your Mutual Fund SIP Portfolio Risk & Performance",
    description: "Track and analyze your mutual fund portfolio with risk scoring, red-flag detection, diversification metrics, and visual insights. Input manually, upload file, or scan with OCR.",
    keywords: ["portfolio tracker", "mutual fund tracker", "portfolio analysis", "risk score", "red flags", "diversification"],
    alternates: {
        canonical: '/analyzer/tracker'
    }
};

export default function TrackerPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Analysis Tools", url: "/analyzer" },
        { name: "Portfolio Tracker", url: "/analyzer/tracker" }
    ]);

    const howToSchema = generateHowToSchema(
        "How to Analyze Your Mutual Fund Portfolio",
        "Step-by-step guide to analyze your mutual fund SIP portfolio and get risk insights",
        [
            "Enter your fund details manually or upload an Excel/CSV file",
            "Review your portfolio's risk score and diversification metrics",
            "Check for red flags like over-concentration or high-risk exposure",
            "View visual breakdowns by category and risk distribution",
            "Get rebalancing recommendations based on your analysis"
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
            <main className="min-h-screen bg-slate-900">
                <PortfolioAnalyzer />
            </main>
        </>
    );
}
