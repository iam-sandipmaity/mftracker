import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBarWrapper from '@/components/NavBarWrapper';
import Footer from '@/components/Footer';
import { SITE_CONFIG, getAbsoluteUrl } from '@/lib/config';

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
        default: "MFTracker - Free Mutual Fund Portfolio Analyzer & SIP Calculator",
        template: "%s | MFTracker"
    },
    description: "Free mutual fund portfolio analyzer with risk scoring, SIP calculator, rebalancing recommendations, and red-flag detection. Track your investments, calculate returns, and optimize your portfolio.",
    keywords: [
        "mutual fund analyzer",
        "SIP calculator",
        "portfolio tracker",
        "mutual fund portfolio analysis",
        "investment tracker",
        "SIP returns calculator",
        "portfolio rebalancing",
        "mutual fund risk assessment",
        "investment planning tool",
        "financial portfolio analyzer",
        "MF tracker",
        "equity fund analysis",
        "systematic investment plan",
        "wealth management tool",
        "investment risk calculator"
    ],
    authors: [{ name: "MFTracker", url: SITE_CONFIG.url }],
    creator: "MFTracker",
    publisher: "MFTracker",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: '/',
        languages: {
            'en-IN': SITE_CONFIG.url,
            'en': SITE_CONFIG.url,
        }
    },
    category: 'finance',
    classification: 'Finance & Investment Tools',
    openGraph: {
        title: "MFTracker - Free Mutual Fund Portfolio Analyzer",
        description: "Analyze your mutual fund SIP portfolio with AI-powered insights. Calculate returns, track risks, and get rebalancing recommendations - completely free.",
        type: "website",
        locale: "en_IN",
        url: SITE_CONFIG.url,
        siteName: "MFTracker",
        images: [{
            url: '/opengraph-image',
            width: 1200,
            height: 630,
            alt: 'MFTracker - Free Mutual Fund Portfolio Analyzer',
            type: 'image/png'
        }]
    },
    twitter: {
        card: "summary_large_image",
        title: "MFTracker - Free Mutual Fund Portfolio Analyzer",
        description: "Analyze your mutual fund SIP portfolio with risk scoring, SIP calculator, and rebalancing recommendations.",
        images: ['/opengraph-image'],
        creator: "@mftracker"
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', sizes: 'any' }
        ],
        apple: '/icon.svg'
    },
    manifest: '/manifest.json',
    verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        other: {
            'msvalidate.01': 'your-bing-verification-code',
        },
    },
    appleWebApp: {
        capable: true,
        title: "MFTracker",
        statusBarStyle: "default",
    }
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MFTracker",
        "url": SITE_CONFIG.url,
        "logo": getAbsoluteUrl('/icon.svg'),
        "description": "Free mutual fund portfolio analyzer with AI-powered insights",
        "sameAs": [
            "https://twitter.com/mftracker",
            "https://linkedin.com/company/mftracker"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "areaServed": "IN",
            "availableLanguage": ["en"]
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "MFTracker",
        "url": SITE_CONFIG.url,
        "description": "Free mutual fund portfolio analyzer and SIP calculator",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": getAbsoluteUrl('/analyzer/tracker?search={search_term_string}')
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                {/* Google AdSense */}
                <script 
                    async 
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9626496742098312"
                    crossOrigin="anonymous"
                />
                
                {/* Google Analytics */}
                <script 
                    async 
                    src="https://www.googletagmanager.com/gtag/js?id=G-YQ0F8HJWK6"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-YQ0F8HJWK6');
                        `
                    }}
                />
                
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            </head>
            <body className={`${inter.variable} antialiased`}>
                <NavBarWrapper />
                {children}
                <Footer />
            </body>
        </html>
    );
}
