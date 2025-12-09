import { Metadata } from 'next';
import Script from 'next/script';
import GoalPlanner from '@/components/GoalPlanner';
import { generateBreadcrumbSchema, generateHowToSchema, generateFAQSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: 'Financial Goal Planner - SIP Calculator for Retirement, Education & Dream Goals | MFTracker',
    description: 'Plan your financial goals with precision. Calculate required SIP investments for retirement, children education, home purchase, vacation, wedding, and custom goals. Inflation-adjusted planning with goal tracking and progress monitoring.',
    keywords: ['goal planning', 'financial goal calculator', 'retirement planning', 'education fund calculator', 'SIP goal planner', 'future value calculator', 'inflation adjusted planning', 'dream home calculator', 'wedding fund planner'],
    alternates: {
        canonical: '/analyzer/goals'
    },
    openGraph: {
        title: 'Financial Goal Planner - Plan Retirement, Education & Dream Goals',
        description: 'Calculate required SIP investments to achieve your financial goals with inflation adjustment.',
        type: 'website',
    },
};

export default function GoalPlanningPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Analysis Tools", url: "/analyzer" },
        { name: "Goal Planner", url: "/analyzer/goals" }
    ]);

    const howToSchema = generateHowToSchema(
        "How to Plan Financial Goals with SIP Calculator",
        "Step-by-step guide to planning and achieving your financial goals",
        [
            "Select goal type: Retirement, Child Education, Home Purchase, Vacation, Wedding, or Custom Goal",
            "Enter target amount and time horizon (years to achieve the goal)",
            "Set expected return rate (typically 10-12% for equity mutual funds)",
            "Add inflation rate (3-6%) for realistic future value calculation",
            "Review required monthly SIP amount and total investment needed",
            "Track multiple goals simultaneously and monitor progress"
        ]
    );

    const faqSchema = generateFAQSchema([
        {
            question: "How much should I invest monthly for retirement?",
            answer: "Required monthly SIP depends on your retirement corpus goal, current age, retirement age, expected returns, and inflation. Use the goal planner to calculate the exact amount needed based on your specific parameters."
        },
        {
            question: "What return rate should I assume for SIP calculations?",
            answer: "For equity mutual funds, 10-12% is a reasonable long-term assumption. For debt funds, 6-8%. For hybrid funds, 8-10%. Adjust based on your risk profile and investment horizon."
        },
        {
            question: "Why is inflation important in goal planning?",
            answer: "Inflation erodes purchasing power over time. A ₹1 crore goal today might require ₹2 crores in 15 years at 5% inflation. The goal planner adjusts your target amount for inflation to ensure realistic planning."
        },
        {
            question: "Can I plan multiple goals simultaneously?",
            answer: "Yes, the goal planner allows you to create and track multiple goals at once. You can prioritize goals and see total monthly SIP requirement across all goals."
        },
        {
            question: "What is the recommended time horizon for different goals?",
            answer: "Short-term goals (1-3 years): Emergency fund, vacation. Medium-term (3-7 years): Car, wedding. Long-term (7+ years): Retirement, child education, home purchase. Longer horizons allow more aggressive equity allocation."
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
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <GoalPlanner />
                </div>
            </div>
        </>
    );
}
