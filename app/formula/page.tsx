import FormulaContent from '@/components/FormulaContent';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Portfolio Analysis Methodology - How Our Risk Scoring & Analysis Works",
    description: "Learn the science behind our mutual fund portfolio analysis. Understand weighted risk scoring, red-flag detection algorithms, and diversification metrics used by MFTracker.",
    keywords: ["portfolio analysis methodology", "risk scoring formula", "mutual fund analysis", "investment risk calculation"],
    alternates: {
        canonical: '/formula'
    }
};

export default function FormulaPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Methodology", url: "/formula" }
    ]);

    const faqSchema = generateFAQSchema([
        {
            question: "How is the portfolio risk score calculated?",
            answer: "The risk score is a weighted average based on your investment amounts and each fund category's inherent risk. Small Cap funds have higher risk scores (9/10), while Large Cap and Debt funds have lower scores (3/10 and 2/10 respectively)."
        },
        {
            question: "What red flags does the analyzer detect?",
            answer: "We detect over-concentration in single funds (>30%), excessive high-risk exposure (>40% in risky categories), lack of diversification (<5 funds), sector concentration, and missing debt allocation for balanced portfolios."
        },
        {
            question: "How is the diversification score computed?",
            answer: "Diversification is measured by category spread and investment distribution. A well-diversified portfolio has 5+ funds across multiple categories with balanced allocation percentages."
        }
    ]);

    return (
        <>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <FormulaContent />
        </>
    );
}
