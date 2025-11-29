import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calculator, PieChart, Target, TrendingUp, FileText, Clock } from 'lucide-react';

import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'MFTracker Guides | Learn How to Use Our Tools',
    description: 'Comprehensive guides and tutorials for Portfolio Tracker, SIP Calculator, and Smart Rebalancer. Learn rules, best practices, and expert tips for mutual fund analysis.',
    openGraph: {
        title: 'MFTracker Guides | Learn How to Use Our Tools',
        description: 'Comprehensive guides and tutorials for Portfolio Tracker, SIP Calculator, and Smart Rebalancer.',
        url: getAbsoluteUrl('/blog'),
    },
};

interface BlogPost {
    slug: string;
    title: string;
    description: string;
    icon: any;
    readTime: string;
    category: string;
    color: string;
}

const guides: BlogPost[] = [
    {
        slug: 'optimize-portfolio-mftracker',
        title: 'Master Your Mutual Fund Portfolio: The Complete MFTracker Guide',
        description: 'Comprehensive 12-minute guide covering everything from portfolio analysis to rebalancing strategies. Learn institutional-grade optimization techniques.',
        icon: BookOpen,
        readTime: '12 min read',
        category: 'Complete Guide',
        color: 'purple',
    },
    {
        slug: 'portfolio-tracker-guide',
        title: 'Portfolio Tracker Complete Guide',
        description: 'Learn how to analyze your mutual fund portfolio, understand risk metrics, identify red flags, and optimize your asset allocation.',
        icon: PieChart,
        readTime: '8 min read',
        category: 'Tool Guide',
        color: 'indigo',
    },
    {
        slug: 'sip-calculator-guide',
        title: 'SIP Calculator Masterclass',
        description: 'Master SIP calculations with step-up, understand inflation-adjusted returns, and plan your investment goals effectively.',
        icon: Calculator,
        readTime: '6 min read',
        category: 'Tool Guide',
        color: 'purple',
    },
    {
        slug: 'rebalancer-guide',
        title: 'Smart Rebalancer Strategy Guide',
        description: 'Discover rebalancing strategies, set target allocations, and learn when and how to rebalance your portfolio for optimal returns.',
        icon: Target,
        readTime: '7 min read',
        category: 'Tool Guide',
        color: 'pink',
    },
    {
        slug: 'portfolio-rules',
        title: 'Portfolio Construction Rules',
        description: 'Essential rules for building a balanced mutual fund portfolio: diversification, risk management, and allocation strategies.',
        icon: TrendingUp,
        readTime: '10 min read',
        category: 'Best Practices',
        color: 'emerald',
    },
    {
        slug: 'red-flags-explained',
        title: 'Red Flags: What They Mean',
        description: 'Deep dive into portfolio red flags - concentration risk, expense ratios, overlap, and how to fix each issue.',
        icon: FileText,
        readTime: '5 min read',
        category: 'Analysis',
        color: 'orange',
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm mb-6 border border-indigo-500/30">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-semibold">Learning Center</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        MFTracker Guides
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Everything you need to master our tools and make smarter investment decisions. 
                        Learn the rules, understand the metrics, and optimize your portfolio.
                    </p>
                </div>

                {/* Featured Guide */}
                <div className="mb-16">
                    <Link
                        href="/blog/optimize-portfolio-mftracker"
                        className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-3xl p-10 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 transition-all shadow-2xl hover:shadow-purple-500/50 group"
                    >
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-white/10 rounded-2xl">
                                <BookOpen className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm font-semibold rounded-full border border-yellow-500/30">
                                        Featured Guide
                                    </span>
                                    <span className="text-purple-200 text-sm flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        12 min read
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-purple-100 transition-colors">
                                    Master Your Mutual Fund Portfolio: The Complete MFTracker Guide
                                </h2>
                                <p className="text-purple-100 text-lg leading-relaxed">
                                    The ultimate comprehensive guide covering portfolio analysis, risk scoring, rebalancing strategies, 
                                    case studies, and advanced optimization techniques. Everything you need to transform your investments.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* All Guides Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-8 text-white">All Guides</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {guides.map((guide) => {
                            const Icon = guide.icon;
                            const colorClasses = {
                                indigo: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 border-indigo-500/50',
                                purple: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-purple-500/50',
                                pink: 'from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 border-pink-500/50',
                                emerald: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 border-emerald-500/50',
                                orange: 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 border-orange-500/50',
                            }[guide.color];

                            return (
                                <Link
                                    key={guide.slug}
                                    href={`/blog/${guide.slug}`}
                                    className={`block bg-gradient-to-r ${colorClasses} border rounded-2xl p-6 transition-all hover:shadow-xl group`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white/10 rounded-xl">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs px-2 py-1 bg-white/20 text-white rounded-full font-semibold">
                                                    {guide.category}
                                                </span>
                                                <span className="text-white/80 text-xs flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {guide.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white/90 transition-colors">
                                                {guide.title}
                                            </h3>
                                            <p className="text-white/90 text-sm leading-relaxed">
                                                {guide.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-10 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Analyze Your Portfolio?</h3>
                    <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                        Now that you know how our tools work, start analyzing your mutual fund portfolio and get personalized insights.
                    </p>
                    <Link
                        href="/analyzer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl"
                    >
                        <PieChart className="w-5 h-5" />
                        Go to Analyzer Tools
                    </Link>
                </div>
            </main>
        </div>
    );
}
