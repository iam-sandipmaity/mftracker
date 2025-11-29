import Link from 'next/link';
import { BarChart3, Calculator, Target, ArrowRight, Sparkles, Shield, TrendingUp, Zap, PieChart, BookOpen, Receipt, DollarSign, Bot } from 'lucide-react';
import { Metadata } from 'next';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Mutual Fund Analysis Tools - Portfolio Tracker, SIP Calculator & Rebalancer",
    description: "Complete suite of mutual fund analysis tools: portfolio tracker with risk scoring, advanced SIP calculator with step-up, and AI-powered rebalancing recommendations. 100% free.",
    alternates: {
        canonical: '/analyzer'
    }
};

export default function AnalyzerHome() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Analysis Tools", url: "/analyzer" }
    ]);
    const tools = [
        {
            icon: <BarChart3 className="w-16 h-16" />,
            title: "Portfolio Tracker",
            description: "Comprehensive analysis with risk scoring, red-flag detection, and diversification metrics for your SIP portfolio.",
            features: ["Risk Score Analysis", "Red Flag Detection", "Diversification Metrics", "Export Reports"],
            color: "from-blue-500 to-indigo-600",
            href: "/analyzer/tracker",
            badge: "Most Popular"
        },
        {
            icon: <Calculator className="w-16 h-16" />,
            title: "SIP Calculator",
            description: "Advanced calculator with step-up SIPs, inflation adjustment, and portfolio-wide projections for planning.",
            features: ["Step-up SIP", "Inflation Adjusted", "Future Value", "Multiple Funds"],
            color: "from-purple-500 to-pink-600",
            href: "/analyzer/calculator",
            badge: null
        },
        {
            icon: <Target className="w-16 h-16" />,
            title: "Smart Rebalancer",
            description: "AI-powered rebalancing recommendations across 4 risk profiles with actionable portfolio optimization.",
            features: ["4 Risk Profiles", "Smart Allocation", "Rebalance Plan", "Goal-Based"],
            color: "from-emerald-500 to-teal-600",
            href: "/analyzer/rebalancer",
            badge: "New"
        },
        {
            icon: <Target className="w-16 h-16" />,
            title: "Goal Planning",
            description: "Set financial goals and get personalized SIP recommendations to achieve them on time.",
            features: ["Goal Tracking", "SIP Calculator", "Progress Monitoring", "Retirement Planning"],
            color: "from-cyan-500 to-blue-600",
            href: "/analyzer/goals",
            badge: "New"
        },
        {
            icon: <Receipt className="w-16 h-16" />,
            title: "Tax Optimizer",
            description: "Analyze tax implications of mutual fund redemptions and identify tax-loss harvesting opportunities.",
            features: ["LTCG/STCG Analysis", "Tax-Loss Harvesting", "Redemption Planning", "ELSS Support"],
            color: "from-amber-500 to-orange-600",
            href: "/analyzer/tax-optimizer",
            badge: "New"
        },
        {
            icon: <DollarSign className="w-16 h-16" />,
            title: "Income Tax Calculator",
            description: "Complete tax planning with all income sources, deductions (80C, 80D, 80E), and family/HUF support.",
            features: ["Old vs New Regime", "All Deductions", "Family Support", "HUF Calculation"],
            color: "from-indigo-500 to-purple-600",
            href: "/analyzer/tax-calculator",
            badge: "New"
        },
        {
            icon: <Bot className="w-16 h-16" />,
            title: "AI Portfolio Assistant",
            description: "Chat with an AI assistant to get personalized recommendations, answer queries, and receive actionable insights.",
            features: ["Smart Recommendations", "Portfolio Insights", "24/7 Assistance", "Personalized Advice"],
            color: "from-violet-500 to-fuchsia-600",
            href: "/analyzer/ai-assistant",
            badge: "AI-Powered"
        }
    ];

    return (
        <>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
                <main className="max-w-7xl mx-auto px-6 py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500/20 rounded-full text-indigo-300 text-sm mb-8 border border-indigo-500/30 shadow-lg">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-semibold">Complete Analysis Suite</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                            MFTracker Analyzer Suite
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Professional-grade tools to track, analyze, calculate, and optimize your mutual fund investments—all in one place.
                        </p>

                        {/* Quick Stats */}
                        <div className="flex justify-center gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-indigo-400">7</div>
                                <div className="text-sm text-slate-400">Powerful Tools</div>
                            </div>
                            <div className="w-px bg-slate-700"></div>
                            <div>
                                <div className="text-3xl font-bold text-purple-400">100%</div>
                                <div className="text-sm text-slate-400">Free to Use</div>
                            </div>
                            <div className="w-px bg-slate-700"></div>
                            <div>
                                <div className="text-3xl font-bold text-pink-400">0</div>
                                <div className="text-sm text-slate-400">Data Shared</div>
                            </div>
                        </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {tools.map((tool, idx) => (
                            <Link
                                key={idx}
                                href={tool.href}
                                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 hover:bg-slate-800/70 transition-all hover:border-slate-600 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1"
                            >
                                {tool.badge && (
                                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                        {tool.badge}
                                    </div>
                                )}

                                <div className={`inline-flex p-4 bg-gradient-to-br ${tool.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                    {tool.icon}
                                </div>

                                <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
                                    {tool.title}
                                </h2>

                                <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                                    {tool.description}
                                </p>

                                <ul className="space-y-2 mb-6">
                                    {tool.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center text-indigo-400 font-semibold group-hover:text-indigo-300 group-hover:gap-3 gap-2 transition-all">
                                    Launch Tool
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Features Highlight */}
                    <div className="bg-gradient-to-r from-slate-800/50 to-indigo-900/30 border border-slate-700 rounded-3xl p-10 mb-16">
                        <h2 className="text-3xl font-bold text-center mb-10 text-white">
                            Why Choose Our Analyzer Suite?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="inline-flex p-4 bg-indigo-500/20 rounded-2xl mb-4">
                                    <Shield className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">100% Private</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    All calculations happen in your browser. Your portfolio data never leaves your device.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex p-4 bg-purple-500/20 rounded-2xl mb-4">
                                    <Zap className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Lightning Fast</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Instant analysis with real-time calculations. No waiting, no loading delays.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex p-4 bg-emerald-500/20 rounded-2xl mb-4">
                                    <PieChart className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Expert-Grade</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Professional analysis tools based on proven financial methodologies and best practices.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Learning Resources */}
                    <div className="mb-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white mb-3">New to Mutual Fund Analysis?</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Check out our comprehensive guides to learn how to use each tool effectively.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <Link
                                href="/blog/portfolio-tracker-guide"
                                className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group"
                            >
                                <div className="p-3 bg-indigo-500/20 rounded-xl w-fit mb-4">
                                    <PieChart className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                    Portfolio Tracker Guide
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Learn how to analyze your portfolio, understand metrics, and identify red flags.
                                </p>
                                <span className="text-indigo-400 text-sm font-semibold flex items-center gap-1">
                                    Read Guide
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>

                            <Link
                                href="/blog/sip-calculator-guide"
                                className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
                            >
                                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                                    <Calculator className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    SIP Calculator Masterclass
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Master SIP calculations with step-up strategies and inflation adjustment.
                                </p>
                                <span className="text-purple-400 text-sm font-semibold flex items-center gap-1">
                                    Read Guide
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>

                            <Link
                                href="/blog/rebalancer-guide"
                                className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-pink-500/50 transition-all group"
                            >
                                <div className="p-3 bg-pink-500/20 rounded-xl w-fit mb-4">
                                    <Target className="w-8 h-8 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                                    Smart Rebalancer Guide
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Discover when and how to rebalance your portfolio for optimal returns.
                                </p>
                                <span className="text-pink-400 text-sm font-semibold flex items-center gap-1">
                                    Read Guide
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                            >
                                <BookOpen className="w-5 h-5" />
                                View All Guides
                            </Link>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl mb-16">
                        <TrendingUp className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
                        <h3 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h3>
                        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                            Start with the Portfolio Tracker to get a complete health check of your current investments, including risk analysis and red flag detection.
                        </p>
                        <Link
                            href="/analyzer/tracker"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            Start with Portfolio Tracker
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>

                    {/* Upcoming Features Section */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-10">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full text-amber-300 text-sm mb-4 border border-amber-500/30">
                                <Sparkles className="w-4 h-4" />
                                <span className="font-semibold">Coming Soon</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">Upcoming Features</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                We're constantly improving MFTracker. Here's what's coming next to make your mutual fund analysis even more powerful.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Feature 1 */}
                            <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-colors">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <Zap className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">Auto-Sync Portfolio</h3>
                                        <span className="text-xs text-blue-400 font-semibold">Q2 2026</span>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                                    Connect with CAMS/Karvy to automatically import your portfolio holdings and get real-time NAV updates.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">CAMS Integration</span>
                                    <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">Live NAV</span>
                                </div>
                            </div>
                        </div>

                        {/* Vote for Features */}
                        <div className="mt-10 text-center p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20">
                            <h3 className="text-lg font-bold text-white mb-2">Have a Feature Request?</h3>
                            <p className="text-slate-300 text-sm mb-4">
                                We'd love to hear what features would make MFTracker more valuable for you.
                            </p>
                            <a
                                href="mailto:feedback@mftracker.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all text-sm"
                            >
                                <Sparkles className="w-4 h-4" />
                                Submit Your Ideas
                            </a>
                        </div>
                    </div>

                    {/* Learning Resources */}
                    <div className="mb-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white mb-3">New to Mutual Fund Analysis?</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Check out our comprehensive guides to learn how to use each tool effectively.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <Link
                                href="/blog/portfolio-tracker-guide"
                                className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group"
                            >
                                <div className="p-3 bg-indigo-500/20 rounded-xl w-fit mb-4">
                                    <BarChart3 className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                                    Portfolio Tracker Guide
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Learn how to analyze your portfolio, understand metrics, and identify red flags.
                                </p>
                                <span className="text-indigo-400 text-sm font-semibold flex items-center gap-1">
                                    Read Guide
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>

                            <Link
                                href="/blog/sip-calculator-guide"
                                className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
                            >
                                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                                    <Calculator className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    SIP Calculator Masterclass
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Master SIP calculations with step-up strategies and inflation adjustment.
                                </p>
                                <span className="text-purple-400 text-sm font-semibold flex items-center gap-1">
                                    Read Guide
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>

                            <Link
                                href="/blog/rebalancer-guide"
                                className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-pink-500/50 transition-all group"
                            >
                                <div className="p-3 bg-pink-500/20 rounded-xl w-fit mb-4">
                                    <Target className="w-8 h-8 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                                    Smart Rebalancer Guide
                                </h3>
                                <p className="text-slate-300 text-sm mb-3">
                                    Discover when and how to rebalance your portfolio for optimal returns.
                                </p>
                                <span className="text-pink-400 text-sm font-semibold flex items-center gap-1">
                                    Read Guide
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                            >
                                <BookOpen className="w-5 h-5" />
                                View All Guides
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
