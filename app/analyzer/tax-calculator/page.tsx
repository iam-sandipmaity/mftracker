import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema, generateHowToSchema, generateFAQSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: 'Income Tax Calculator FY 2025-26 - Old vs New Regime Comparison | MFTracker',
    description: 'Free comprehensive income tax calculator for India FY 2025-26. Calculate tax with all income sources (salary, HRA, business, capital gains, rental, interest). Compare old vs new tax regime with 80C, 80D, 80E deductions. Family details, HUF support, interactive charts & CSV export.',
    keywords: ['income tax calculator', 'tax calculator India 2025-26', '80C deductions', '80D medical insurance', 'old vs new regime', 'salary tax calculator', 'capital gains tax', 'HRA exemption calculator', 'HUF tax', 'tax comparison tool', 'tax planning India'],
    alternates: {
        canonical: '/analyzer/tax-calculator'
    },
    openGraph: {
        title: 'Income Tax Calculator FY 2025-26 - Old vs New Regime Comparison',
        description: 'Calculate your income tax with all income sources and deductions. Compare old vs new regime to save tax.',
        type: 'website',
    },
};

export default function TaxCalculatorPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Analysis Tools", url: "/analyzer" },
        { name: "Income Tax Calculator", url: "/analyzer/tax-calculator" }
    ]);

    const howToSchema = generateHowToSchema(
        "How to Calculate Income Tax for FY 2025-26",
        "Complete guide to calculating your income tax with all deductions and comparing tax regimes",
        [
            "Enter all income sources: Salary, HRA, business income, capital gains, rental income, interest income, and agricultural income",
            "Add deductions: 80C (₹1.5L max), 80D (medical insurance), 80E (education loan), 80G (donations), Section 24 (home loan interest), NPS (₹50K)",
            "Provide family details: Age (for senior citizen benefits), dependents, HUF status",
            "Select tax regime: Old regime (with deductions) or New regime (lower rates without deductions)",
            "View tax breakdown with surcharge, cess, effective tax rate, and regime comparison",
            "Export detailed tax report to CSV for record-keeping"
        ]
    );

    const faqSchema = generateFAQSchema([
        {
            question: "What is the difference between old and new tax regime?",
            answer: "Old tax regime allows deductions under sections 80C, 80D, HRA, etc., with higher tax rates. New tax regime offers lower tax rates but no deductions (except standard deduction and NPS)."
        },
        {
            question: "How is HRA exemption calculated?",
            answer: "HRA exemption is the minimum of: (1) Actual HRA received, (2) 50% of salary for metro cities or 40% for non-metro, (3) Rent paid minus 10% of salary."
        },
        {
            question: "What deductions are available under Section 80C?",
            answer: "Section 80C allows deductions up to ₹1.5 lakh for investments in PPF, EPF, ELSS, life insurance premiums, principal repayment of home loan, NSC, tax-saving FD, and children's tuition fees."
        },
        {
            question: "Are senior citizens eligible for higher tax exemption limits?",
            answer: "Yes. Senior citizens (60-80 years) have ₹3 lakh basic exemption under old regime. Super senior citizens (80+ years) have ₹5 lakh basic exemption."
        },
        {
            question: "Can I switch between old and new tax regime every year?",
            answer: "Yes, salaried individuals can switch between regimes every financial year. Business/professional income earners can switch only once in their lifetime."
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
                id="howto-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <IncomeTaxCalculator />
        </>
    );
}
