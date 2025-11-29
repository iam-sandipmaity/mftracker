import HomePage from '@/components/HomePage';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateSoftwareApplicationSchema, generateFinancialServiceSchema, generateFAQSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Free Mutual Fund Portfolio Analyzer - Track, Analyze & Optimize Your SIPs",
    description: "Analyze your mutual fund SIP portfolio for free. Get instant risk scores, red-flag alerts, diversification metrics, and expert rebalancing recommendations. No registration required.",
    alternates: {
        canonical: '/'
    }
};

export default function Home() {
    const faqSchema = generateFAQSchema([
        {
            question: "What is MFTracker?",
            answer: "MFTracker is a free mutual fund portfolio analyzer that helps you track SIP investments, analyze portfolio risk, calculate returns, and get AI-powered rebalancing recommendations."
        },
        {
            question: "How does the risk scoring work?",
            answer: "Our risk scoring uses weighted analysis based on fund categories. Each fund type (Small Cap, Large Cap, Debt, etc.) has an assigned risk score, and we calculate your portfolio's weighted average risk based on investment amounts."
        },
        {
            question: "Is MFTracker really free?",
            answer: "Yes, MFTracker is completely free with no hidden charges, no registration required, and no data sharing. All calculations happen in your browser."
        },
        {
            question: "Can I calculate SIP returns with step-up?",
            answer: "Yes, our SIP calculator supports annual step-up increases, inflation adjustment, and can calculate returns for both single funds and entire portfolios."
        },
        {
            question: "Does MFTracker store my portfolio data?",
            answer: "No, we don't store any data. All analysis happens locally in your browser, ensuring complete privacy and security of your investment information."
        }
    ]);

    return (
        <>
            <Script
                id="software-app-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSoftwareApplicationSchema()) }}
            />
            <Script
                id="financial-service-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFinancialServiceSchema()) }}
            />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <HomePage />
        </>
    );
}
