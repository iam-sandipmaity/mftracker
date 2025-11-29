import { Metadata } from 'next';
import Link from 'next/link';
import {
    Shield, TrendingUp, PieChart, Percent, Target, CheckCircle2,
    ArrowLeft, BookOpen, Layers, DollarSign, BarChart3, Building2, Globe
} from 'lucide-react';
import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Portfolio Construction Rules | MFTracker',
    description: 'Essential rules for building a balanced mutual fund portfolio: diversification strategies, risk management, optimal allocation, and portfolio construction best practices.',
    openGraph: {
        title: 'Portfolio Construction Rules | MFTracker',
        description: 'Learn the golden rules of portfolio construction for mutual fund investing.',
        url: getAbsoluteUrl('/blog/portfolio-rules'),
    },
};

export default function PortfolioRulesGuide() {
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
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-semibold">Best Practices • 10 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                        Portfolio Construction Rules
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Master the essential rules for building a well-balanced mutual fund portfolio. Learn time-tested 
                        strategies for diversification, risk management, and optimal asset allocation.
                    </p>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        Table of Contents
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#core-satellite" className="hover:text-emerald-400 transition-colors">1. Core-Satellite Strategy</a></li>
                        <li><a href="#diversification" className="hover:text-emerald-400 transition-colors">2. Diversification Rules</a></li>
                        <li><a href="#risk-management" className="hover:text-emerald-400 transition-colors">3. Risk Management</a></li>
                        <li><a href="#allocation" className="hover:text-emerald-400 transition-colors">4. Optimal Allocation Guidelines</a></li>
                        <li><a href="#fund-selection" className="hover:text-emerald-400 transition-colors">5. Fund Selection Criteria</a></li>
                        <li><a href="#common-mistakes" className="hover:text-emerald-400 transition-colors">6. Common Mistakes to Avoid</a></li>
                    </ul>
                </div>

                {/* Rule 1: Core-Satellite */}
                <section id="core-satellite" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-emerald-400" />
                        1. Core-Satellite Strategy
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        The core-satellite approach is the foundation of smart portfolio construction. It balances stability 
                        with growth potential by dividing your portfolio into two parts.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Core Holdings */}
                        <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                                <Shield className="w-6 h-6" />
                                Core Holdings (60-70%)
                            </h3>
                            <p className="text-slate-300 mb-4 text-sm">
                                Stable, predictable funds that form the foundation of your portfolio.
                            </p>
                            <div className="space-y-3">
                                <div className="bg-blue-950/50 rounded-lg p-4">
                                    <p className="font-semibold text-white mb-2">Large Cap Funds</p>
                                    <p className="text-xs text-slate-300">30-40% of portfolio</p>
                                    <p className="text-xs text-blue-400 mt-1">Blue-chip companies, lower volatility</p>
                                </div>
                                <div className="bg-blue-950/50 rounded-lg p-4">
                                    <p className="font-semibold text-white mb-2">Index Funds</p>
                                    <p className="text-xs text-slate-300">20-30% of portfolio</p>
                                    <p className="text-xs text-blue-400 mt-1">Market tracking, low cost</p>
                                </div>
                                <div className="bg-blue-950/50 rounded-lg p-4">
                                    <p className="font-semibold text-white mb-2">Flexi/Multi Cap</p>
                                    <p className="text-xs text-slate-300">10-20% of portfolio</p>
                                    <p className="text-xs text-blue-400 mt-1">Flexible allocation, balanced</p>
                                </div>
                            </div>
                        </div>

                        {/* Satellite Holdings */}
                        <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-orange-400 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" />
                                Satellite Holdings (30-40%)
                            </h3>
                            <p className="text-slate-300 mb-4 text-sm">
                                Growth-focused funds for higher returns with calculated risk.
                            </p>
                            <div className="space-y-3">
                                <div className="bg-orange-950/50 rounded-lg p-4">
                                    <p className="font-semibold text-white mb-2">Mid Cap Funds</p>
                                    <p className="text-xs text-slate-300">15-20% of portfolio</p>
                                    <p className="text-xs text-orange-400 mt-1">Growth potential, moderate risk</p>
                                </div>
                                <div className="bg-orange-950/50 rounded-lg p-4">
                                    <p className="font-semibold text-white mb-2">Small Cap Funds</p>
                                    <p className="text-xs text-slate-300">10-15% of portfolio</p>
                                    <p className="text-xs text-orange-400 mt-1">High growth, high volatility</p>
                                </div>
                                <div className="bg-orange-950/50 rounded-lg p-4">
                                    <p className="font-semibold text-white mb-2">Thematic/International</p>
                                    <p className="text-xs text-slate-300">5-10% of portfolio</p>
                                    <p className="text-xs text-orange-400 mt-1">Niche opportunities, tactical bets</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                        <p className="text-sm text-emerald-300">
                            <strong>💡 Why it works:</strong> Core provides stability during market downturns while satellites 
                            capture higher growth during bull markets. This balance optimizes risk-adjusted returns.
                        </p>
                    </div>
                </section>

                {/* Rule 2: Diversification */}
                <section id="diversification" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Layers className="w-8 h-8 text-purple-400" />
                        2. Diversification Rules
                    </h2>

                    <div className="space-y-6">
                        {/* Category Diversification */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <PieChart className="w-6 h-6 text-purple-400" />
                                Category Diversification
                            </h3>
                            <p className="text-slate-300 mb-4">
                                Spread investments across different fund categories to reduce correlation risk.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-white mb-2">✅ Good Portfolio</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Large Cap: 30%</li>
                                        <li>• Flexi Cap: 20%</li>
                                        <li>• Mid Cap: 15%</li>
                                        <li>• Small Cap: 10%</li>
                                        <li>• International: 10%</li>
                                        <li>• Debt/Hybrid: 15%</li>
                                    </ul>
                                    <p className="text-xs text-emerald-400 mt-2">6 categories = well-diversified</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white mb-2">❌ Poor Portfolio</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Small Cap Fund A: 35%</li>
                                        <li>• Small Cap Fund B: 30%</li>
                                        <li>• Small Cap Fund C: 20%</li>
                                        <li>• Mid Cap: 15%</li>
                                    </ul>
                                    <p className="text-xs text-red-400 mt-2">Heavy concentration in one category</p>
                                </div>
                            </div>
                        </div>

                        {/* Fund Count */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <BarChart3 className="w-6 h-6 text-indigo-400" />
                                Optimal Fund Count: 6-12 Funds
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                    <p className="font-bold text-red-400 mb-2">&lt; 5 Funds</p>
                                    <p className="text-slate-300 text-xs">Too Few</p>
                                    <p className="text-slate-400 text-xs mt-2">Concentration risk, lack of diversification</p>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                                    <p className="font-bold text-emerald-400 mb-2">6-12 Funds</p>
                                    <p className="text-slate-300 text-xs">Sweet Spot ✨</p>
                                    <p className="text-slate-400 text-xs mt-2">Balanced diversification, manageable tracking</p>
                                </div>
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                    <p className="font-bold text-yellow-400 mb-2">&gt; 15 Funds</p>
                                    <p className="text-slate-300 text-xs">Too Many</p>
                                    <p className="text-slate-400 text-xs mt-2">Overlap, complexity, over-diversification</p>
                                </div>
                            </div>
                        </div>

                        {/* AMC Diversification */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Building2 className="w-6 h-6 text-blue-400" />
                                AMC (Fund House) Diversification
                            </h3>
                            <p className="text-slate-300 mb-4">
                                Don't put all your eggs in one fund house basket. Spread across 3-4 AMCs.
                            </p>
                            <div className="bg-blue-950/50 rounded-lg p-4">
                                <p className="text-sm text-blue-300 mb-3"><strong>Rule of Thumb:</strong></p>
                                <ul className="text-sm text-slate-300 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                                        <span>No single AMC should exceed 35-40% of portfolio</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                                        <span>Distribute across at least 3 fund houses</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                                        <span>Reduces fund house-specific risks (management changes, regulatory issues)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rule 3: Risk Management */}
                <section id="risk-management" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-orange-400" />
                        3. Risk Management
                    </h2>

                    <div className="space-y-6">
                        {/* Risk Caps */}
                        <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-orange-400">High-Risk Category Caps</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-orange-950/50 rounded-lg p-4">
                                    <div>
                                        <p className="font-bold text-white">Small Cap Funds</p>
                                        <p className="text-xs text-slate-400">High volatility, 40-50% drawdowns possible</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-orange-400">&lt; 20%</p>
                                        <p className="text-xs text-slate-400">of portfolio</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-orange-950/50 rounded-lg p-4">
                                    <div>
                                        <p className="font-bold text-white">Thematic/Sector Funds</p>
                                        <p className="text-xs text-slate-400">Concentrated bets, high risk</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-orange-400">&lt; 15%</p>
                                        <p className="text-xs text-slate-400">of portfolio</p>
                                    </div>
                                </div>

                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-red-300">
                                        <strong>⚠️ Combined Rule:</strong> Total high-risk exposure (Small Cap + Thematic) should not exceed 35% of portfolio
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stability Buffer */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Shield className="w-6 h-6 text-emerald-400" />
                                Add Stability Buffers
                            </h3>
                            <p className="text-slate-300 mb-4">
                                If your portfolio risk score is high (&gt; 7), add stability through:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-emerald-950/50 rounded-lg p-4">
                                    <p className="font-bold text-emerald-400 mb-2">Debt Funds</p>
                                    <p className="text-sm text-slate-300 mb-2">10-15% allocation</p>
                                    <p className="text-xs text-slate-400">Provides stability, reduces volatility, acts as cushion during market crashes</p>
                                </div>
                                <div className="bg-yellow-950/50 rounded-lg p-4">
                                    <p className="font-bold text-yellow-400 mb-2">Gold Funds</p>
                                    <p className="text-sm text-slate-300 mb-2">5-10% allocation</p>
                                    <p className="text-xs text-slate-400">Hedge against market downturns, low correlation with equity</p>
                                </div>
                            </div>
                        </div>

                        {/* Age-Based Risk */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Age-Based Risk Adjustment</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                                    <div className="w-24 font-bold text-emerald-400">Age &lt; 35</div>
                                    <div className="flex-1 text-slate-300">Can take higher risk (80-90% equity)</div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                                    <div className="w-24 font-bold text-yellow-400">Age 35-50</div>
                                    <div className="flex-1 text-slate-300">Moderate risk (60-75% equity, add debt)</div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                                    <div className="w-24 font-bold text-orange-400">Age 50+</div>
                                    <div className="flex-1 text-slate-300">Conservative (40-50% equity, 40-50% debt)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rule 4: Allocation */}
                <section id="allocation" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <PieChart className="w-8 h-8 text-indigo-400" />
                        4. Optimal Allocation Guidelines
                    </h2>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Single Fund Concentration Limits</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-emerald-950/50 rounded-lg">
                                <span className="text-slate-300">Ideal: No single fund</span>
                                <span className="text-emerald-400 font-bold">&lt; 20%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-yellow-950/50 rounded-lg">
                                <span className="text-slate-300">Acceptable: Maximum per fund</span>
                                <span className="text-yellow-400 font-bold">&lt; 25%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-red-950/50 rounded-lg">
                                <span className="text-slate-300">Dangerous: Single fund exceeds</span>
                                <span className="text-red-400 font-bold">&gt; 40%</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-700/50 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 text-indigo-400">Model Portfolio Template</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between p-3 bg-indigo-950/50 rounded-lg">
                                <span className="text-slate-300">Large Cap / Index Funds</span>
                                <span className="text-indigo-400 font-bold">30-35%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-indigo-950/50 rounded-lg">
                                <span className="text-slate-300">Flexi Cap / Multi Cap</span>
                                <span className="text-indigo-400 font-bold">20-25%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-indigo-950/50 rounded-lg">
                                <span className="text-slate-300">Mid Cap Funds</span>
                                <span className="text-indigo-400 font-bold">15-20%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-indigo-950/50 rounded-lg">
                                <span className="text-slate-300">Small Cap Funds</span>
                                <span className="text-indigo-400 font-bold">10-15%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-indigo-950/50 rounded-lg">
                                <span className="text-slate-300">Debt / Hybrid / Gold</span>
                                <span className="text-indigo-400 font-bold">10-15%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-indigo-950/50 rounded-lg">
                                <span className="text-slate-300">International / Thematic</span>
                                <span className="text-indigo-400 font-bold">5-10%</span>
                            </div>
                        </div>
                        <p className="text-xs text-indigo-300 mt-4">
                            ✨ This template balances growth potential with risk management for moderate investors.
                        </p>
                    </div>
                </section>

                {/* Rule 5: Fund Selection */}
                <section id="fund-selection" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-pink-400" />
                        5. Fund Selection Criteria
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Percent className="w-6 h-6 text-yellow-400" />
                                Expense Ratio Limits
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="font-bold text-white mb-2">Active Funds (Direct Plans)</p>
                                    <p className="text-2xl font-bold text-yellow-400 mb-2">&lt; 1.5%</p>
                                    <p className="text-xs text-slate-400">Equity funds should have lower fees in direct plans</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="font-bold text-white mb-2">Index Funds / ETFs</p>
                                    <p className="text-2xl font-bold text-emerald-400 mb-2">&lt; 0.5%</p>
                                    <p className="text-xs text-slate-400">Passive funds should have minimal costs</p>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg">
                                <p className="text-sm text-yellow-300">
                                    <strong>Impact:</strong> A 2% expense ratio costs ₹2L annually on a ₹1Cr portfolio. 
                                    Over 20 years, high fees can reduce returns by 30-40%!
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <DollarSign className="w-6 h-6 text-emerald-400" />
                                AUM (Assets Under Management)
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                                    <div>
                                        <p className="text-white font-semibold">Minimum: ₹500 Crores</p>
                                        <p className="text-slate-400 text-xs">Ensures liquidity and fund stability</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5" />
                                    <div>
                                        <p className="text-white font-semibold">Sweet Spot: ₹2,000-20,000 Crores</p>
                                        <p className="text-slate-400 text-xs">Large enough to be stable, small enough to be nimble</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-orange-400 mt-0.5" />
                                    <div>
                                        <p className="text-white font-semibold">Be Cautious: &gt; ₹50,000 Crores (for Mid/Small Cap)</p>
                                        <p className="text-slate-400 text-xs">Too large for smaller market segments, may underperform</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Performance Consistency</h3>
                            <p className="text-slate-300 mb-4">
                                Don't just chase highest returns. Look for consistency across market cycles.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">→</span>
                                    <span>Check 3-year, 5-year, and 10-year returns (if available)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">→</span>
                                    <span>Verify fund has beaten its benchmark in 3 out of last 5 years</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">→</span>
                                    <span>Check downside protection: How much did it fall in 2020 crash?</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">→</span>
                                    <span>Stable fund manager (same manager for &gt; 3 years preferred)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Rule 6: Common Mistakes */}
                <section id="common-mistakes" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-red-400" />
                        6. Common Mistakes to Avoid
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                mistake: "Chasing Returns",
                                why: "Last year's best performer is often next year's underperformer",
                                fix: "Focus on consistent 5-year performers, not 1-year stars"
                            },
                            {
                                mistake: "Over-Diversification",
                                why: "15+ funds lead to overlap, diluted returns, tracking complexity",
                                fix: "Stick to 6-12 quality funds across different categories"
                            },
                            {
                                mistake: "Ignoring Expense Ratios",
                                why: "High fees compound over time, eating into returns significantly",
                                fix: "Choose direct plans, target &lt; 1.5% for active, &lt; 0.5% for index"
                            },
                            {
                                mistake: "No Regular Plan",
                                why: "Regular plans have 1-2% higher expense ratios vs direct",
                                fix: "Always invest through direct plans (not through distributors)"
                            },
                            {
                                mistake: "Market Timing",
                                why: "Even experts can't consistently time the market",
                                fix: "Use SIPs for rupee-cost averaging, don't try to time entries"
                            },
                            {
                                mistake: "Not Rebalancing",
                                why: "Allocation drifts over time, increasing unintended risk",
                                fix: "Review quarterly, rebalance annually or when drift &gt; 5%"
                            },
                        ].map((item, index) => (
                            <div key={index} className="bg-red-900/10 border border-red-700/30 rounded-xl p-5">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-8 h-8 flex-shrink-0 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-red-400 mb-1">{item.mistake}</h4>
                                        <p className="text-sm text-slate-300 mb-2">
                                            <strong>Why it's bad:</strong> {item.why}
                                        </p>
                                        <p className="text-sm text-emerald-400">
                                            <strong>✓ Fix:</strong> {item.fix}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Summary */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-10 mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-white">Quick Reference: The Golden Rules</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />60-70% core, 30-40% satellite</p>
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />6-12 funds optimal</p>
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />6+ categories for diversification</p>
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />Small Cap &lt; 20%</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />Thematic &lt; 15%</p>
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />Single fund &lt; 25%</p>
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />Expense ratio &lt; 1.5%</p>
                            <p className="text-emerald-100"><CheckCircle2 className="w-4 h-4 inline mr-2" />3-4 different AMCs</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center">
                    <Shield className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
                    <h3 className="text-3xl font-bold mb-4">Check Your Portfolio Health</h3>
                    <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                        Use our Portfolio Tracker to see if your portfolio follows these golden rules and get personalized recommendations.
                    </p>
                    <Link
                        href="/analyzer/tracker"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Analyze My Portfolio
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
