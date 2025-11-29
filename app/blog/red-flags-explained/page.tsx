import { Metadata } from 'next';
import Link from 'next/link';
import {
    AlertTriangle, TrendingUp, Percent, Building2, PieChart, Shield,
    ArrowLeft, BookOpen, Target, XCircle, CheckCircle2, Layers, DollarSign
} from 'lucide-react';
import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Portfolio Red Flags Explained | MFTracker',
    description: 'Complete guide to mutual fund portfolio red flags: concentration risk, expense ratios, overlap, AMC concentration, and how to fix each warning for a healthier portfolio.',
    openGraph: {
        title: 'Portfolio Red Flags Explained | MFTracker',
        description: 'Understand and fix common portfolio red flags for better mutual fund investing.',
        url: getAbsoluteUrl('/blog/red-flags-explained'),
    },
};

export default function RedFlagsExplained() {
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
                    <div className="flex items-center gap-2 text-orange-400 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-semibold">Analysis • 5 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                        Red Flags: What They Mean
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Deep dive into every portfolio red flag detected by MFTracker. Learn what each warning means, 
                        why it matters, and exactly how to fix it for a healthier portfolio.
                    </p>
                </div>

                {/* Severity Legend */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4">Understanding Severity Levels</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                <span className="font-bold text-red-400">High Severity</span>
                            </div>
                            <p className="text-xs text-slate-300">Address immediately. Significant risk to portfolio performance.</p>
                        </div>
                        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                <span className="font-bold text-yellow-400">Medium Severity</span>
                            </div>
                            <p className="text-xs text-slate-300">Plan to fix within 3-6 months. Moderate impact on returns.</p>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-5 h-5 text-blue-400" />
                                <span className="font-bold text-blue-400">Low Severity</span>
                            </div>
                            <p className="text-xs text-slate-300">Minor issue. Fix when convenient, not urgent.</p>
                        </div>
                    </div>
                </div>

                {/* Red Flag 1: High Concentration */}
                <section className="mb-16">
                    <div className="bg-red-900/20 border-2 border-red-700/50 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-red-500/20 rounded-xl">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-red-400">High Concentration Risk</h2>
                                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">HIGH SEVERITY</span>
                                </div>
                                <p className="text-slate-400 text-sm">Single fund exceeds 40% of portfolio value</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* What it means */}
                            <div>
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-red-400" />
                                    What It Means
                                </h3>
                                <p className="text-slate-300 leading-relaxed">
                                    One fund dominates your portfolio, creating excessive dependence on its performance. 
                                    If that fund underperforms or faces issues, your entire portfolio suffers disproportionately.
                                </p>
                            </div>

                            {/* Example */}
                            <div className="bg-red-950/50 rounded-xl p-5">
                                <h4 className="font-bold text-red-300 mb-3">📊 Real Example</h4>
                                <div className="space-y-2 text-sm">
                                    <p className="text-slate-300">Portfolio: ₹10 Lakh total</p>
                                    <p className="text-slate-300">• Small Cap Fund A: <span className="text-red-400 font-bold">₹5 Lakh (50%)</span> ← RED FLAG</p>
                                    <p className="text-slate-300">• Large Cap Fund: ₹3 Lakh (30%)</p>
                                    <p className="text-slate-300">• Mid Cap Fund: ₹2 Lakh (20%)</p>
                                </div>
                                <div className="mt-4 p-3 bg-red-900/30 rounded-lg">
                                    <p className="text-sm text-red-300">
                                        <strong>Risk:</strong> If Small Cap Fund A drops 40% (common in corrections), 
                                        your portfolio loses ₹2 Lakh = 20% total portfolio loss from one fund!
                                    </p>
                                </div>
                            </div>

                            {/* Why it matters */}
                            <div>
                                <h3 className="font-bold text-white mb-3">⚠️ Why It Matters</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Single point of failure:</strong> Fund manager leaves, strategy changes, regulatory issues</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Volatility amplified:</strong> Portfolio swings dramatically with one fund's performance</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Missed diversification:</strong> Not benefiting from spreading risk across multiple funds</span>
                                    </li>
                                </ul>
                            </div>

                            {/* How to fix */}
                            <div className="bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    How to Fix
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">1.</span>
                                        <span className="text-slate-300"><strong>Gradual reduction:</strong> Stop new SIPs to the overweight fund, continue others to naturally reduce allocation</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">2.</span>
                                        <span className="text-slate-300"><strong>Partial redemption:</strong> Redeem 10-15% of the overweight fund (if held &gt;1 year for tax benefits)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">3.</span>
                                        <span className="text-slate-300"><strong>Target allocation:</strong> Aim to bring it down to 20-25% maximum</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">4.</span>
                                        <span className="text-slate-300"><strong>Diversify proceeds:</strong> Reinvest in different categories (Large Cap, Index, or underweight categories)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Red Flag 2: Small Cap Excess */}
                <section className="mb-16">
                    <div className="bg-orange-900/20 border-2 border-orange-700/50 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-orange-500/20 rounded-xl">
                                <TrendingUp className="w-8 h-8 text-orange-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-orange-400">Excessive Small Cap Allocation</h2>
                                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full">HIGH SEVERITY</span>
                                </div>
                                <p className="text-slate-400 text-sm">Small Cap funds exceed 25% of portfolio</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-white mb-3">What It Means</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Too much exposure to small-cap stocks, which are highly volatile and can experience 
                                    severe drawdowns (40-60%) during market corrections.
                                </p>
                            </div>

                            <div className="bg-orange-950/50 rounded-xl p-5">
                                <h4 className="font-bold text-orange-300 mb-3">📉 Historical Impact</h4>
                                <div className="space-y-3">
                                    <div className="bg-orange-900/30 rounded-lg p-4">
                                        <p className="text-sm font-bold text-white mb-2">March 2020 Crash</p>
                                        <p className="text-xs text-slate-300">Small Cap Index: <span className="text-red-400 font-bold">-51%</span></p>
                                        <p className="text-xs text-slate-300">Nifty 50: <span className="text-yellow-400 font-bold">-38%</span></p>
                                        <p className="text-xs text-emerald-400 mt-2">Recovery time: Small Caps took 18 months, Large Caps took 6 months</p>
                                    </div>
                                    <p className="text-sm text-orange-300">
                                        With 40% in Small Caps, a portfolio would have lost 20%+ vs 15% with proper allocation.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-white mb-3">⚠️ Why It Matters</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-orange-400 mt-0.5" />
                                        <span><strong>Extreme volatility:</strong> Can drop 40-50% in bear markets</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-orange-400 mt-0.5" />
                                        <span><strong>Liquidity risk:</strong> Hard to exit in panic situations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-orange-400 mt-0.5" />
                                        <span><strong>Emotional toll:</strong> Watching 50% drops leads to panic selling</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-400 mb-3">How to Fix</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">1.</span>
                                        <span className="text-slate-300"><strong>Target:</strong> Reduce Small Cap allocation to 15-20% maximum</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">2.</span>
                                        <span className="text-slate-300"><strong>Balance with stability:</strong> Add Large Cap or Index funds to dilute risk</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">3.</span>
                                        <span className="text-slate-300"><strong>Pause new investments:</strong> Stop Small Cap SIPs temporarily</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">4.</span>
                                        <span className="text-slate-300"><strong>Consider hedging:</strong> Add 10-15% debt funds for stability</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Red Flag 3: High Expense Ratios */}
                <section className="mb-16">
                    <div className="bg-yellow-900/20 border-2 border-yellow-700/50 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-yellow-500/20 rounded-xl">
                                <Percent className="w-8 h-8 text-yellow-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-yellow-400">High Expense Ratios</h2>
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">MEDIUM SEVERITY</span>
                                </div>
                                <p className="text-slate-400 text-sm">Funds with expense ratio &gt; 2% detected</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-white mb-3">What It Means</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    You're paying excessive annual fees that silently erode your returns year after year. 
                                    High expense ratios compound negatively over time.
                                </p>
                            </div>

                            <div className="bg-yellow-950/50 rounded-xl p-5">
                                <h4 className="font-bold text-yellow-300 mb-3">💰 Cost Impact Calculator</h4>
                                <div className="space-y-4">
                                    <div className="bg-yellow-900/30 rounded-lg p-4">
                                        <p className="text-sm font-bold text-white mb-3">Scenario: ₹10L investment, 12% annual returns, 20 years</p>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-slate-300">With 0.5% expense ratio (Index Fund):</span>
                                                <span className="text-emerald-400 font-bold">₹91.5 Lakh</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-300">With 1.5% expense ratio (Active Fund):</span>
                                                <span className="text-yellow-400 font-bold">₹79.3 Lakh</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-300">With 2.5% expense ratio (High-cost Fund):</span>
                                                <span className="text-red-400 font-bold">₹68.5 Lakh</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-yellow-700/30">
                                            <p className="text-sm text-yellow-300 font-bold">
                                                Cost of 2.5% vs 0.5%: ₹23 Lakh lost to fees! 💸
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-white mb-3">⚠️ Why It Matters</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                                        <span><strong>Compounding loss:</strong> Fees reduce the base that compounds</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                                        <span><strong>Silent killer:</strong> You don't see the cost directly, but it adds up</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                                        <span><strong>Lower net returns:</strong> Fund shows 12%, you get 9.5% after 2.5% fees</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-400 mb-3">How to Fix</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">1.</span>
                                        <span className="text-slate-300"><strong>Switch to Direct Plans:</strong> Same fund, 0.5-1% lower expense ratio instantly</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">2.</span>
                                        <span className="text-slate-300"><strong>Target Levels:</strong> Active funds &lt; 1.5%, Index funds &lt; 0.5%</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">3.</span>
                                        <span className="text-slate-300"><strong>Compare alternatives:</strong> Find similar category funds with lower costs</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">4.</span>
                                        <span className="text-slate-300"><strong>Use index for core:</strong> Replace high-cost Large Cap with low-cost Index</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Red Flag 4: Thematic Overload */}
                <section className="mb-16">
                    <div className="bg-purple-900/20 border-2 border-purple-700/50 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-purple-500/20 rounded-xl">
                                <Target className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-purple-400">Excessive Thematic/Sector Allocation</h2>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">MEDIUM/HIGH SEVERITY</span>
                                </div>
                                <p className="text-slate-400 text-sm">Thematic/Sector funds exceed 15-20% of portfolio</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-white mb-3">What It Means</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Too much invested in sector-specific or thematic funds (Tech, Pharma, Infrastructure, ESG, etc.). 
                                    These are concentrated bets that can underperform severely if the sector falls out of favor.
                                </p>
                            </div>

                            <div className="bg-purple-950/50 rounded-xl p-5">
                                <h4 className="font-bold text-purple-300 mb-3">🎭 Thematic Fund Risks</h4>
                                <div className="space-y-3 text-sm">
                                    <p className="text-slate-300">Examples of thematic funds that had boom-bust cycles:</p>
                                    <ul className="space-y-2 text-slate-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400">•</span>
                                            <span><strong>Infrastructure (2007-2009):</strong> Rose 100%+, then fell 70%</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400">•</span>
                                            <span><strong>Banking/PSU (2010-2013):</strong> Underperformed for 5+ years</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-purple-400">•</span>
                                            <span><strong>Tech (2021-2022):</strong> Fell 40% as rates rose</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-400 mb-3">How to Fix</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">1.</span>
                                        <span className="text-slate-300"><strong>Limit to 10-15%:</strong> Keep thematic funds as tactical satellite bets only</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">2.</span>
                                        <span className="text-slate-300"><strong>Replace with diversified funds:</strong> Use Flexi Cap or Multi Cap instead</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">3.</span>
                                        <span className="text-slate-300"><strong>Be tactical:</strong> Book profits when theme becomes popular, exit when overvalued</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Red Flag 5: AMC Concentration */}
                <section className="mb-16">
                    <div className="bg-blue-900/20 border-2 border-blue-700/50 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <Building2 className="w-8 h-8 text-blue-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-blue-400">AMC Concentration Risk</h2>
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">MEDIUM SEVERITY</span>
                                </div>
                                <p className="text-slate-400 text-sm">Single fund house &gt; 40% of portfolio</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-white mb-3">What It Means</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Too many funds from one Asset Management Company (AMC/Fund House). If that AMC faces issues, 
                                    multiple funds in your portfolio could be affected simultaneously.
                                </p>
                            </div>

                            <div className="bg-blue-950/50 rounded-xl p-5">
                                <h4 className="font-bold text-blue-300 mb-3">🏢 AMC-Level Risks</h4>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                                        <span><strong>Management changes:</strong> Key fund managers leave, affecting multiple funds</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                                        <span><strong>Regulatory issues:</strong> SEBI penalties, compliance problems impact all funds</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                                        <span><strong>Strategy drift:</strong> AMC-wide philosophy changes affect all holdings</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                                        <span><strong>Ownership changes:</strong> Parent company issues, mergers, acquisitions</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-400 mb-3">How to Fix</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">1.</span>
                                        <span className="text-slate-300"><strong>Spread across 3-4 AMCs:</strong> Diversify fund house exposure</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">2.</span>
                                        <span className="text-slate-300"><strong>Cap at 30-35%:</strong> No single AMC should exceed this limit</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">3.</span>
                                        <span className="text-slate-300"><strong>Quality over loyalty:</strong> Don't stick to one AMC just because you like it</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Red Flag 6: No Core Holdings */}
                <section className="mb-16">
                    <div className="bg-indigo-900/20 border-2 border-indigo-700/50 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-indigo-500/20 rounded-xl">
                                <Shield className="w-8 h-8 text-indigo-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-indigo-400">Missing Core Holdings</h2>
                                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full">HIGH SEVERITY</span>
                                </div>
                                <p className="text-slate-400 text-sm">No Large Cap or Index funds + &gt; 50% in high-risk funds</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-white mb-3">What It Means</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Portfolio lacks a stable foundation. All holdings are growth-focused with no defensive anchors, 
                                    making it extremely vulnerable during market downturns.
                                </p>
                            </div>

                            <div className="bg-emerald-950/30 border border-emerald-700/30 rounded-xl p-5">
                                <h3 className="font-bold text-emerald-400 mb-3">How to Fix</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">1.</span>
                                        <span className="text-slate-300"><strong>Add core holdings:</strong> Start SIPs in Nifty 50 Index or Large Cap funds</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">2.</span>
                                        <span className="text-slate-300"><strong>Target 40-50% in core:</strong> Build stable foundation gradually</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 font-bold">3.</span>
                                        <span className="text-slate-300"><strong>Reduce high-risk gradually:</strong> Trim Small Cap/Thematic to &lt; 35% combined</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Action Priority */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">Fix Priority Order</h2>
                    <div className="space-y-3">
                        {[
                            { priority: "1", flag: "High Concentration (>40% in one fund)", color: "red" },
                            { priority: "2", flag: "Missing Core Holdings", color: "red" },
                            { priority: "3", flag: "Excessive Small Cap (>25%)", color: "orange" },
                            { priority: "4", flag: "AMC Concentration (>40%)", color: "blue" },
                            { priority: "5", flag: "High Expense Ratios (>2%)", color: "yellow" },
                            { priority: "6", flag: "Thematic Overload (>15%)", color: "purple" },
                        ].map((item) => (
                            <div key={item.priority} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl">
                                <div className={`w-10 h-10 flex-shrink-0 rounded-full bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400 font-bold`}>
                                    {item.priority}
                                </div>
                                <span className="text-slate-200">{item.flag}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-10 text-center">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-orange-200" />
                    <h3 className="text-3xl font-bold mb-4">Check Your Portfolio for Red Flags</h3>
                    <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                        Our Portfolio Tracker automatically detects all these red flags and provides specific fix recommendations.
                    </p>
                    <Link
                        href="/analyzer/tracker"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-orange-900 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Scan My Portfolio
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
