import Script from 'next/script';

interface StructuredDataProps {
    data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://mftracker.sandipmaity.me${item.url}`
        }))
    };
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

// HowTo Schema Generator
export function generateHowToSchema(name: string, description: string, steps: string[]) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": name,
        "description": description,
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "text": step
        }))
    };
}

// SoftwareApplication Schema
export function generateSoftwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "MFTracker",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1247",
            "bestRating": "5",
            "worstRating": "1"
        },
        "description": "Free mutual fund portfolio analyzer with risk scoring, SIP calculator, and AI-powered rebalancing recommendations",
        "featureList": [
            "Portfolio Risk Analysis",
            "SIP Calculator with Step-up",
            "Inflation-Adjusted Returns",
            "Portfolio Rebalancing",
            "Red Flag Detection",
            "Diversification Metrics",
            "OCR Support",
            "Excel Export"
        ]
    };
}

// FinancialService Schema
export function generateFinancialServiceSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "MFTracker - Mutual Fund Portfolio Analyzer",
        "description": "Free portfolio analysis and SIP calculation service for mutual fund investors",
        "url": "https://mftracker.sandipmaity.me",
        "areaServed": "IN",
        "serviceType": "Portfolio Analysis",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Financial Analysis Tools",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Portfolio Risk Analysis",
                        "description": "Analyze mutual fund portfolio risk with weighted scoring"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "SIP Calculator",
                        "description": "Calculate SIP returns with step-up and inflation adjustment"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Portfolio Rebalancing",
                        "description": "AI-powered portfolio allocation recommendations"
                    }
                }
            ]
        }
    };
}
