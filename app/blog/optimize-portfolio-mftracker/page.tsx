import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, Shield, Target, Calculator, BarChart3, AlertTriangle, CheckCircle, ArrowRight, PieChart, DollarSign, Zap, Users, Clock, XCircle, TrendingDown, Info } from 'lucide-react';
import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Master Your Mutual Fund Portfolio: The Complete MFTracker Guide | MFTracker',
    description: 'Discover how MFTracker\'s AI-powered tools help you analyze, optimize, and rebalance your mutual fund portfolio with institutional-grade insights - all for free and 100% secure.',
    keywords: [
        'mutual fund portfolio',
        'SIP calculator',
        'portfolio analysis',
        'rebalancing strategy',
        'risk management',
        'investment optimization',
        'inflation adjusted returns',
        'portfolio health check',
        'diversification strategy',
        'mutual fund red flags'
    ],
    openGraph: {
        title: 'Master Your Mutual Fund Portfolio: The Complete MFTracker Guide',
        description: 'Institutional-grade portfolio analysis tools for retail investors. Learn how to optimize your mutual fund portfolio with MFTracker\'s advanced features.',
        url: getAbsoluteUrl('/blog/optimize-portfolio-mftracker'),
        type: 'article',
        publishedTime: '2025-11-25T00:00:00.000Z',
        authors: ['Sandip Maity'],
    },
};

export default function OptimizePortfolioGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Guides
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-indigo-400 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-semibold">Complete Guide • 12 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Master Your Mutual Fund Portfolio: The Complete MFTracker Guide
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed mb-6">
                        Discover how MFTracker's AI-powered tools help you analyze, optimize, and rebalance your mutual fund 
                        portfolio with institutional-grade insights—all for free and 100% secure.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <span>Published: November 25, 2025</span>
                        <span>•</span>
                        <span>Author: Sandip Maity</span>
                    </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-indigo-400" />
                        Table of Contents
                    </h2>
                    <nav className="grid md:grid-cols-2 gap-3">
                        {[
                            { title: 'The Problem Most SIP Investors Face', id: 'problem' },
                            { title: 'What Makes MFTracker Different', id: 'features' },
                            { title: 'Portfolio Health Analyzer', id: 'analyzer' },
                            { title: 'Advanced SIP Calculator', id: 'calculator' },
                            { title: 'Smart Rebalancer', id: 'rebalancer' },
                            { title: 'How to Use Effectively', id: 'how-to' },
                            { title: 'Real Success Stories', id: 'case-studies' },
                            { title: 'Common Mistakes to Avoid', id: 'mistakes' },
                            { title: 'Limitations & Disclaimers', id: 'limitations' },
                            { title: 'Your Action Plan', id: 'action-plan' },
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={`#${item.id}`}
                                className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all text-slate-300 hover:text-indigo-400"
                            >
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-semibold">
                                    {index + 1}
                                </span>
                                <span className="text-sm">{item.title}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Problem Section */}
                <section id="problem" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-orange-400" />
                        The Problem Most SIP Investors Face
                    </h2>
                    <div className="space-y-4 text-slate-300 leading-relaxed">
                        <p>
                            Most mutual fund investors follow a "set and forget" approach. You start SIPs in 5-10 different funds 
                            (often based on recommendations), contribute regularly, but rarely review what you own or how it performs together.
                        </p>
                        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-red-400 mb-3">The Reality Check:</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span>You might own 8 funds, but 6 could hold the same top 10 stocks</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span>Your "diversified" portfolio might have 60% in small-cap funds (extremely risky)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span>Paying 2.5% expense ratios when index funds charge 0.1%</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <span>Your actual risk profile doesn't match your risk tolerance</span>
                                </li>
                            </ul>
                        </div>
                        <p className="font-semibold text-white">
                            This is where <span className="text-indigo-400">MFTracker</span> becomes your portfolio's personal health diagnostic tool.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-400" />
                        What Makes MFTracker Different?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50 rounded-xl p-6">
                            <Shield className="w-12 h-12 text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">100% Privacy</h3>
                            <p className="text-sm text-slate-300">
                                All processing happens in your browser. Your portfolio data never leaves your device.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700/50 rounded-xl p-6">
                            <Target className="w-12 h-12 text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Analysis</h3>
                            <p className="text-sm text-slate-300">
                                Institutional-grade risk scoring and rebalancing recommendations.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 border border-emerald-700/50 rounded-xl p-6">
                            <CheckCircle className="w-12 h-12 text-emerald-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Signup Required</h3>
                            <p className="text-sm text-slate-300">
                                Start analyzing immediately. Export reports as PDF/CSV anytime.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Portfolio Analyzer Section */}
                <section id="analyzer" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-indigo-400" />
                        Portfolio Health Analyzer: Your Investment X-Ray
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Risk Scoring System (0-100)</h3>
                            <p className="text-slate-300 mb-4">
                                MFTracker uses a sophisticated algorithm that evaluates category risk weights, concentration penalties, 
                                and diversification bonuses.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-4">
                                    <h4 className="font-bold text-emerald-400 mb-2">Portfolio A (Score: 45 - Medium Risk)</h4>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• 3 Large Cap funds: 40%</li>
                                        <li>• 2 Mid Cap funds: 30%</li>
                                        <li>• 2 Small Cap funds: 20%</li>
                                        <li>• 1 Debt fund: 10%</li>
                                    </ul>
                                    <p className="text-xs text-emerald-400 mt-2">✓ Well diversified</p>
                                </div>
                                <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
                                    <h4 className="font-bold text-red-400 mb-2">Portfolio B (Score: 72 - High Risk)</h4>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• 5 Small Cap funds: 60%</li>
                                        <li>• 2 Sectoral funds: 25%</li>
                                        <li>• 1 Large Cap fund: 15%</li>
                                    </ul>
                                    <p className="text-xs text-red-400 mt-2">⚠️ Poor diversification</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">8 Critical Red Flag Detection Rules</h3>
                            <div className="space-y-3">
                                {[
                                    { flag: 'High Concentration Risk', desc: '>40% in single fund', severity: 'HIGH' },
                                    { flag: 'Excessive Small Cap', desc: '>25% allocation', severity: 'HIGH' },
                                    { flag: 'High Expense Ratios', desc: '>2% average', severity: 'MEDIUM' },
                                    { flag: 'Thematic Overload', desc: '>15% in sector funds', severity: 'MEDIUM' },
                                    { flag: 'AMC Concentration', desc: '>40% in one fund house', severity: 'MEDIUM' },
                                    { flag: 'Poor Category Spread', desc: '<4 categories', severity: 'MEDIUM' },
                                    { flag: 'Missing Core Holdings', desc: 'No Large Cap/Index', severity: 'HIGH' },
                                    { flag: 'Overlapping Holdings', desc: 'Same stocks multiple times', severity: 'MEDIUM' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                                            item.severity === 'HIGH' 
                                                ? 'bg-red-500/20 text-red-400' 
                                                : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {item.severity}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-semibold text-sm">{item.flag}</div>
                                            <div className="text-slate-400 text-xs">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SIP Calculator Section */}
                <section id="calculator" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calculator className="w-8 h-8 text-emerald-400" />
                        Advanced SIP Calculator: Beyond Basic Projections
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Step-Up SIP Feature</h3>
                            <p className="text-slate-300 mb-4">
                                Increase your SIP annually to match salary growth and beat inflation.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-5">
                                <h4 className="font-bold text-emerald-400 mb-3">Example Calculation:</h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-slate-400 mb-2">Without Step-up:</p>
                                        <ul className="text-slate-300 space-y-1">
                                            <li>• Initial: ₹10,000/month</li>
                                            <li>• Duration: 20 years</li>
                                            <li>• Investment: ₹24,00,000</li>
                                            <li className="text-emerald-400 font-bold">• Future Value: ₹99.9L</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 mb-2">With 10% Step-up:</p>
                                        <ul className="text-slate-300 space-y-1">
                                            <li>• Initial: ₹10,000/month</li>
                                            <li>• Step-up: 10% annually</li>
                                            <li>• Investment: ₹76,40,909</li>
                                            <li className="text-emerald-400 font-bold">• Future Value: ₹2.29 Crores</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-emerald-800/30">
                                    <p className="text-emerald-300 font-bold">Result: 2.3X more wealth with step-up! 🚀</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Inflation-Adjusted Returns</h3>
                            <p className="text-slate-300 mb-4">
                                MFTracker shows you the <strong>real purchasing power</strong> of your corpus.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-5">
                                <div className="space-y-3 text-sm text-slate-300">
                                    <div className="flex justify-between items-center">
                                        <span>Future Value (20 years):</span>
                                        <span className="font-bold text-white">₹1,00,00,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Inflation Rate:</span>
                                        <span className="font-bold text-white">6% p.a.</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Inflation Factor:</span>
                                        <span className="font-bold text-white">(1.06)²⁰ = 3.207</span>
                                    </div>
                                    <div className="border-t border-blue-800/30 pt-3 mt-3 flex justify-between items-center">
                                        <span className="text-blue-400 font-bold">Real Value (Today's Money):</span>
                                        <span className="font-bold text-xl text-blue-400">₹31,18,047</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 mt-4 italic">
                                    💡 Your ₹1 crore will have the buying power of just ₹31 lakhs in today's money!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Smart Rebalancer Section */}
                <section id="rebalancer" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-purple-400" />
                        Smart Rebalancer: AI-Powered Portfolio Optimization
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {[
                            {
                                profile: 'Conservative',
                                score: '20-35',
                                allocation: '70% Large Cap/Debt, 20% Mid Cap, 10% Small Cap',
                                returns: '9-11% p.a.',
                                color: 'blue',
                            },
                            {
                                profile: 'Moderate',
                                score: '35-50',
                                allocation: '50% Large Cap, 30% Mid Cap, 15% Small Cap, 5% Thematic',
                                returns: '11-13% p.a.',
                                color: 'emerald',
                            },
                            {
                                profile: 'Balanced',
                                score: '50-65',
                                allocation: '40% Large Cap, 30% Mid Cap, 25% Small Cap, 5% International',
                                returns: '13-15% p.a.',
                                color: 'purple',
                            },
                            {
                                profile: 'Aggressive',
                                score: '65-80',
                                allocation: '25% Large Cap, 30% Mid Cap, 35% Small Cap, 10% Sectoral',
                                returns: '15-18% p.a.',
                                color: 'orange',
                            },
                        ].map((profile, index) => (
                            <div key={index} className={`bg-gradient-to-br from-${profile.color}-900/20 to-${profile.color}-800/20 border border-${profile.color}-700/50 rounded-xl p-5`}>
                                <h3 className={`text-lg font-bold text-${profile.color}-400 mb-2`}>{profile.profile}</h3>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <p><strong>Score:</strong> {profile.score}</p>
                                    <p><strong>Target:</strong> {profile.allocation}</p>
                                    <p><strong>Returns:</strong> {profile.returns}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Real Rebalancing Example</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-red-400 mb-3">❌ Current Portfolio (Age 35)</h4>
                                <div className="space-y-2 text-sm bg-red-950/20 border border-red-800/30 rounded-lg p-4">
                                    <p className="text-slate-300">• Large Cap: ₹10,000 (20%) - Too Low</p>
                                    <p className="text-slate-300">• Mid Cap: ₹15,000 (30%) - Good</p>
                                    <p className="text-slate-300">• Small Cap: ₹20,000 (40%) - Too High</p>
                                    <p className="text-slate-300">• Sectoral: ₹5,000 (10%) - Too High</p>
                                    <p className="text-red-400 font-bold mt-2">Risk Score: 68 (Aggressive)</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-emerald-400 mb-3">✓ Recommended (Moderate)</h4>
                                <div className="space-y-2 text-sm bg-emerald-950/20 border border-emerald-800/30 rounded-lg p-4">
                                    <p className="text-slate-300">• Large Cap: ₹25,000 (50%) ↑</p>
                                    <p className="text-slate-300">• Mid Cap: ₹15,000 (30%) =</p>
                                    <p className="text-slate-300">• Small Cap: ₹7,500 (15%) ↓</p>
                                    <p className="text-slate-300">• Hybrid: ₹2,500 (5%) New</p>
                                    <p className="text-emerald-400 font-bold mt-2">Risk Score: 48 (Moderate)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section id="how-to" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Users className="w-8 h-8 text-cyan-400" />
                        How to Use MFTracker Effectively
                    </h2>
                    
                    <div className="space-y-4">
                        {[
                            {
                                step: 1,
                                title: 'Gather Your Portfolio Data',
                                desc: 'Export from MFCentral, Coin, Kuvera, or manually enter fund details',
                                icon: <BookOpen className="w-5 h-5" />,
                            },
                            {
                                step: 2,
                                title: 'Analyze Portfolio Health',
                                desc: 'Upload your data and get instant risk scores and red flag detection',
                                icon: <BarChart3 className="w-5 h-5" />,
                            },
                            {
                                step: 3,
                                title: 'Run Future Projections',
                                desc: 'Use SIP calculator with step-up and inflation adjustment',
                                icon: <Calculator className="w-5 h-5" />,
                            },
                            {
                                step: 4,
                                title: 'Rebalance Quarterly',
                                desc: 'Follow AI recommendations to optimize your allocation',
                                icon: <Target className="w-5 h-5" />,
                            },
                            {
                                step: 5,
                                title: 'Export and Track',
                                desc: 'Download PDF/CSV reports and review every 6 months',
                                icon: <CheckCircle className="w-5 h-5" />,
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex items-start gap-4 p-5 bg-slate-800/30 border border-slate-700 rounded-xl hover:bg-slate-800/50 transition-all">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                        {item.icon}
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Case Studies Section */}
                <section id="case-studies" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-emerald-400" />
                        Real Success Stories: Before & After MFTracker
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Case Study: The Over-Diversified Engineer</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-red-400 mb-3">Before MFTracker</h4>
                                    <ul className="text-sm text-slate-300 space-y-2">
                                        <li>• 15 different funds</li>
                                        <li>• 8 Large Cap (70% overlap)</li>
                                        <li>• Expense ratio: 1.8% avg</li>
                                        <li>• 5 red flags detected</li>
                                        <li className="text-red-400">• False diversification</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-emerald-400 mb-3">After Optimization</h4>
                                    <ul className="text-sm text-slate-300 space-y-2">
                                        <li>• Streamlined to 6 funds</li>
                                        <li>• True diversification</li>
                                        <li>• Expense ratio: 0.8% avg</li>
                                        <li>• Saves ₹15L over 30 years</li>
                                        <li className="text-emerald-400">• Better sleep quality 😊</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Case Study: The Thrill-Seeking Investor</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-orange-400 mb-3">Problem Identified</h4>
                                    <ul className="text-sm text-slate-300 space-y-2">
                                        <li>• 80% in Small Cap funds</li>
                                        <li>• 20% in Sectoral funds</li>
                                        <li>• Risk Score: 78 (Extreme)</li>
                                        <li>• 2020 crash: -52%</li>
                                        <li className="text-orange-400">• Couldn't sleep during volatility</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-emerald-400 mb-3">After Rebalancing</h4>
                                    <ul className="text-sm text-slate-300 space-y-2">
                                        <li>• Balanced allocation</li>
                                        <li>• Risk Score: 54 (Moderate)</li>
                                        <li>• Next crash: Only -28%</li>
                                        <li>• Recovered in 6 months</li>
                                        <li className="text-emerald-400">• Much better emotional stability</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Mistakes Section */}
                <section id="mistakes" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-yellow-400" />
                        Common Mistakes MFTracker Helps You Avoid
                    </h2>
                    
                    <div className="space-y-4">
                        {[
                            {
                                mistake: 'Recency Bias',
                                example: '"Small caps gave 50% last year, let me put everything there!"',
                                alert: 'Small Cap Overload Detected - Max 25% recommended',
                                color: 'red',
                            },
                            {
                                mistake: 'Home Country Bias',
                                example: '100% invested in Indian funds only',
                                alert: 'Add 10-15% international exposure for diversification',
                                color: 'blue',
                            },
                            {
                                mistake: 'Ignoring Expense Ratios',
                                example: '"0.5% difference doesn\'t matter"',
                                alert: '₹1.19 Crores difference over 25 years!',
                                color: 'yellow',
                            },
                            {
                                mistake: 'Panic Selling',
                                example: 'Selling everything during market crashes',
                                alert: 'Markets always recover - stay invested',
                                color: 'orange',
                            },
                        ].map((item, index) => (
                            <div key={index} className={`bg-${item.color}-900/20 border border-${item.color}-700/50 rounded-xl p-5`}>
                                <h3 className={`font-bold text-${item.color}-400 mb-2`}>{item.mistake}</h3>
                                <p className="text-sm text-slate-300 mb-2 italic">"{item.example}"</p>
                                <div className={`bg-${item.color}-950/30 rounded-lg p-3 text-sm text-${item.color}-300`}>
                                    <strong>MFTracker's Alert:</strong> {item.alert}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Limitations Section */}
                <section id="limitations" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Info className="w-8 h-8 text-blue-400" />
                        Limitations & What MFTracker Isn't
                    </h2>
                    
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-yellow-400 mb-4">It's Not a Performance Tracker</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div>
                                <p className="font-semibold text-white mb-2">What it DOES:</p>
                                <ul className="text-slate-300 space-y-1">
                                    <li>✓ Analyze portfolio allocation</li>
                                    <li>✓ Calculate risk scores</li>
                                    <li>✓ Suggest rebalancing</li>
                                    <li>✓ Project future scenarios</li>
                                    <li>✓ Detect structural issues</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-2">What it DOESN'T:</p>
                                <ul className="text-slate-300 space-y-1">
                                    <li>✗ Show actual NAV movements</li>
                                    <li>✗ Track XIRR/absolute returns</li>
                                    <li>✗ Compare fund performance</li>
                                    <li>✗ Provide live market data</li>
                                    <li>✗ Give buy/sell recommendations</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 mt-6">
                        <h3 className="text-lg font-bold text-red-400 mb-3">⚠️ Important Disclaimer</h3>
                        <div className="text-sm text-slate-300 space-y-2">
                            <p><strong>MFTracker provides:</strong> Analytical tools, educational insights, portfolio structuring help</p>
                            <p><strong>It does NOT provide:</strong> Personalized financial advice, tax planning, legal recommendations, guaranteed returns</p>
                            <p className="text-red-300 font-semibold mt-3">
                                Always consult SEBI-registered advisors for complex needs and do your own research before investing.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Action Plan Section */}
                <section id="action-plan" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-emerald-400" />
                        Your Action Plan: Getting Started
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                week: 'Week 1: Discovery',
                                tasks: [
                                    'Visit mftracker-ten.vercel.app',
                                    'Export portfolio from current platform',
                                    'Upload to MFTracker',
                                    'Review risk score & red flags',
                                ],
                            },
                            {
                                week: 'Week 2: Analysis',
                                tasks: [
                                    'Read red flag explanations',
                                    'Use SIP calculator for projections',
                                    'Check rebalancing recommendations',
                                    'Export PDF report',
                                ],
                            },
                            {
                                week: 'Week 3: Planning',
                                tasks: [
                                    'Decide target allocation',
                                    'Calculate tax implications',
                                    'Plan rebalancing strategy',
                                    'Set calendar reminders',
                                ],
                            },
                            {
                                week: 'Week 4: Execution',
                                tasks: [
                                    'Start new SIPs in underweight areas',
                                    'Stop/reduce overweight SIPs',
                                    'Execute switches if needed',
                                    'Schedule next review (6 months)',
                                ],
                            },
                        ].map((plan, index) => (
                            <div key={index} className="bg-slate-800/30 border border-slate-700 rounded-xl p-5">
                                <h3 className="font-bold text-white mb-3">{plan.week}</h3>
                                <ul className="space-y-2">
                                    {plan.tasks.map((task, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom Line Section */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-700/50 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-6 text-white">The Bottom Line</h2>
                        <div className="space-y-4 text-slate-300">
                            <p className="text-lg">
                                <strong className="text-white">MFTracker is not magic.</strong> It won't pick winning funds or guarantee returns. 
                                What it <em>will</em> do is:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                                {[
                                    'Show structural health of your portfolio',
                                    'Alert you to hidden risks',
                                    'Help maintain discipline through rebalancing',
                                    'Project realistic future scenarios',
                                    'Save you from expensive mistakes',
                                    'Give confidence in portfolio structure',
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-lg font-semibold text-white pt-4">
                                Think of it as your portfolio's annual health checkup. Just like you wouldn't skip a medical checkup, 
                                don't skip your financial health checkup.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
                    <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Portfolio?</h3>
                    <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                        Stop investing blindly. Start investing intelligently with MFTracker's comprehensive analysis tools.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/analyzer/tracker"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <BarChart3 className="w-6 h-6" />
                            Analyze Portfolio Now
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                        >
                            <BookOpen className="w-6 h-6" />
                            Read More Guides
                        </Link>
                    </div>
                </div>

                {/* Author & Meta */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-slate-400">
                        <div>
                            <p className="mb-2">
                                <strong className="text-white">About the Author:</strong> Sandip Maity is a developer and personal finance enthusiast 
                                who created MFTracker to democratize portfolio analysis tools.
                            </p>
                            <a href="https://sandipmaity.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">
                                sandipmaity.vercel.app →
                            </a>
                        </div>
                        <div className="text-right">
                            <p>Published: November 25, 2025</p>
                            <p>Reading Time: 12 minutes</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
