import { Metadata } from 'next';
import Link from 'next/link';
import {
    Target, PieChart, TrendingUp, RefreshCw, AlertTriangle,
    Calendar, CheckCircle2, XCircle, ArrowLeft, BookOpen, Percent, Shield
} from 'lucide-react';

import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Smart Rebalancer Strategy Guide | MFTracker',
    description: 'Master portfolio rebalancing: learn when to rebalance, set target allocations, execute changes, and maintain optimal asset distribution for better returns.',
    openGraph: {
        title: 'Smart Rebalancer Strategy Guide | MFTracker',
        description: 'Learn portfolio rebalancing strategies and optimize your mutual fund allocation.',
        url: getAbsoluteUrl('/blog/rebalancer-guide'),
    },
};

export default function RebalancerGuide() {
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
                    <div className="flex items-center gap-2 text-pink-400 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-semibold">Tool Guide • 7 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                        Smart Rebalancer Strategy Guide
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Learn the art of portfolio rebalancing: when to do it, how to set targets, and strategies 
                        to maintain optimal allocation for consistent long-term returns.
                    </p>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-pink-400" />
                        Table of Contents
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#what" className="hover:text-pink-400 transition-colors">1. What is Portfolio Rebalancing?</a></li>
                        <li><a href="#why" className="hover:text-pink-400 transition-colors">2. Why Rebalance Your Portfolio?</a></li>
                        <li><a href="#when" className="hover:text-pink-400 transition-colors">3. When to Rebalance</a></li>
                        <li><a href="#targets" className="hover:text-pink-400 transition-colors">4. Setting Target Allocations</a></li>
                        <li><a href="#execute" className="hover:text-pink-400 transition-colors">5. How to Execute Rebalancing</a></li>
                    </ul>
                </div>

                {/* Section 1: What is Rebalancing */}
                <section id="what" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-pink-400" />
                        1. What is Portfolio Rebalancing?
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Rebalancing is the process of adjusting your portfolio back to your desired asset allocation. 
                        Over time, some funds grow faster than others, skewing your original allocation.
                    </p>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Example: Allocation Drift</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 rounded-lg p-5">
                                <p className="text-sm text-indigo-400 mb-3 font-semibold">Original Allocation (Jan 2024)</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Large Cap</span>
                                        <span className="text-white font-bold">40%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Mid Cap</span>
                                        <span className="text-white font-bold">30%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Small Cap</span>
                                        <span className="text-white font-bold">20%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Debt</span>
                                        <span className="text-white font-bold">10%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-950/50 border border-orange-700/50 rounded-lg p-5">
                                <p className="text-sm text-orange-400 mb-3 font-semibold">After 2 Years (Jan 2026)</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Large Cap</span>
                                        <span className="text-white font-bold">32% <span className="text-red-400 text-xs">↓</span></span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Mid Cap</span>
                                        <span className="text-white font-bold">28% <span className="text-red-400 text-xs">↓</span></span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Small Cap</span>
                                        <span className="text-white font-bold">33% <span className="text-emerald-400 text-xs">↑</span></span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300">Debt</span>
                                        <span className="text-white font-bold">7% <span className="text-red-400 text-xs">↓</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-orange-500/10 rounded-lg">
                            <p className="text-sm text-orange-400">
                                <AlertTriangle className="w-4 h-4 inline mr-2" />
                                <strong>Problem:</strong> Small Cap grew from 20% to 33% - increasing portfolio risk beyond your comfort level.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Why Rebalance */}
                <section id="why" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-emerald-400" />
                        2. Why Rebalance Your Portfolio?
                    </h2>

                    <div className="space-y-6">
                        {/* Benefit 1 */}
                        <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Shield className="w-6 h-6 text-emerald-400" />
                                1. Maintain Risk Level
                            </h3>
                            <p className="text-slate-300 mb-3">
                                Your target allocation reflects your risk tolerance. As high-risk funds grow, your portfolio 
                                becomes riskier than intended.
                            </p>
                            <div className="bg-emerald-950/50 rounded-lg p-4">
                                <p className="text-sm text-emerald-300">
                                    <strong>Example:</strong> If you're a moderate investor (risk score 6), but Small Caps balloon 
                                    from 15% to 35%, your risk score jumps to 8 - misaligned with your tolerance.
                                </p>
                            </div>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                                2. Capture Profits & Buy Low
                            </h3>
                            <p className="text-slate-300 mb-3">
                                Rebalancing forces you to sell high (trim winners) and buy low (add to laggards) - a disciplined 
                                profit-taking mechanism.
                            </p>
                            <div className="bg-indigo-950/50 rounded-lg p-4">
                                <p className="text-sm text-indigo-300">
                                    <strong>Research:</strong> Studies show rebalanced portfolios outperform buy-and-hold by 0.5-1.5% 
                                    annually over long periods.
                                </p>
                            </div>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <PieChart className="w-6 h-6 text-purple-400" />
                                3. Prevent Concentration Risk
                            </h3>
                            <p className="text-slate-300 mb-3">
                                Without rebalancing, a few outperformers can dominate your portfolio, creating dangerous concentration.
                            </p>
                            <div className="bg-purple-950/50 rounded-lg p-4">
                                <p className="text-sm text-purple-300">
                                    <strong>Warning:</strong> If one fund grows to 50% of portfolio and then crashes 40%, you lose 20% 
                                    of total portfolio value in one blow!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: When to Rebalance */}
                <section id="when" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-orange-400" />
                        3. When to Rebalance
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        There are two main strategies for deciding when to rebalance. Choose based on your preference:
                    </p>

                    <div className="space-y-6">
                        {/* Strategy 1: Calendar-Based */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-blue-400" />
                                Strategy 1: Calendar-Based Rebalancing
                            </h3>
                            <p className="text-slate-300 mb-4">
                                Rebalance at fixed intervals regardless of allocation drift.
                            </p>
                            
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <p className="font-bold text-blue-400 mb-1">Quarterly</p>
                                    <p className="text-xs text-slate-300">Every 3 months</p>
                                    <p className="text-xs text-slate-400 mt-2">Good for: Active investors</p>
                                </div>
                                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                                    <p className="font-bold text-emerald-400 mb-1">Semi-Annual</p>
                                    <p className="text-xs text-slate-300">Every 6 months</p>
                                    <p className="text-xs text-slate-400 mt-2">Good for: Most investors ✨</p>
                                </div>
                                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                    <p className="font-bold text-purple-400 mb-1">Annual</p>
                                    <p className="text-xs text-slate-300">Once a year</p>
                                    <p className="text-xs text-slate-400 mt-2">Good for: Passive investors</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                                <span className="text-slate-300">Simple, disciplined approach</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                                <span className="text-slate-300">Easy to remember and execute</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm mb-3">
                                <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                                <span className="text-slate-300">May rebalance unnecessarily if drift is minimal</span>
                            </div>
                        </div>

                        {/* Strategy 2: Threshold-Based */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Percent className="w-6 h-6 text-purple-400" />
                                Strategy 2: Threshold-Based Rebalancing
                            </h3>
                            <p className="text-slate-300 mb-4">
                                Rebalance only when allocation drifts beyond a threshold (e.g., ±5% from target).
                            </p>
                            
                            <div className="bg-purple-950/50 rounded-lg p-4 mb-4">
                                <p className="text-sm text-purple-300 mb-3"><strong>Example:</strong></p>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <p>• Target: Large Cap = 40%</p>
                                    <p>• Threshold: ±5%</p>
                                    <p>• Rebalance if: Large Cap &lt; 35% OR &gt; 45%</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                                <span className="text-slate-300">More tax-efficient (fewer transactions)</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                                <span className="text-slate-300">Only act when necessary</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm mb-3">
                                <XCircle className="w-4 h-4 text-red-400 mt-0.5" />
                                <span className="text-slate-300">Requires regular monitoring</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <p className="text-sm text-emerald-300">
                            <strong>💡 Recommended:</strong> Combine both! Check quarterly, rebalance only if drift exceeds 5%.
                        </p>
                    </div>
                </section>

                {/* Section 4: Setting Targets */}
                <section id="targets" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-indigo-400" />
                        4. Setting Target Allocations
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Your target allocation should match your age, goals, risk tolerance, and time horizon.
                    </p>

                    <div className="space-y-6">
                        {/* Conservative */}
                        <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3 text-green-400">Conservative (Age 50+, Low Risk)</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-slate-400 mb-2">Equity Allocation:</p>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Large Cap / Index</span>
                                            <span className="text-green-400 font-bold">35-40%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Flexi/Multi Cap</span>
                                            <span className="text-green-400 font-bold">10-15%</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-2">Stability:</p>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Debt Funds</span>
                                            <span className="text-green-400 font-bold">40-45%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Gold/Hybrid</span>
                                            <span className="text-green-400 font-bold">10-15%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-green-400">Target Risk Score: 3-5 | Expected Return: 8-10%</p>
                        </div>

                        {/* Moderate */}
                        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3 text-yellow-400">Moderate (Age 35-50, Medium Risk)</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-slate-400 mb-2">Equity Allocation:</p>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Large Cap / Index</span>
                                            <span className="text-yellow-400 font-bold">30-35%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Flexi/Multi Cap</span>
                                            <span className="text-yellow-400 font-bold">25-30%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Mid/Small Cap</span>
                                            <span className="text-yellow-400 font-bold">15-20%</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-2">Stability:</p>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Debt/Hybrid</span>
                                            <span className="text-yellow-400 font-bold">15-20%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Gold/International</span>
                                            <span className="text-yellow-400 font-bold">5-10%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-yellow-400">Target Risk Score: 5-7 | Expected Return: 10-12%</p>
                        </div>

                        {/* Aggressive */}
                        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-3 text-red-400">Aggressive (Age &lt; 35, High Risk)</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-slate-400 mb-2">Equity Allocation:</p>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Large Cap / Index</span>
                                            <span className="text-red-400 font-bold">25-30%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Flexi/Multi Cap</span>
                                            <span className="text-red-400 font-bold">30-35%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Mid/Small Cap</span>
                                            <span className="text-red-400 font-bold">25-30%</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-2">Diversifiers:</p>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">International</span>
                                            <span className="text-red-400 font-bold">5-10%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-300">Thematic (Optional)</span>
                                            <span className="text-red-400 font-bold">5-10%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-red-400">Target Risk Score: 7-9 | Expected Return: 12-14%</p>
                        </div>
                    </div>
                </section>

                {/* Section 5: Execute */}
                <section id="execute" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        5. How to Execute Rebalancing
                    </h2>

                    <div className="space-y-6">
                        {/* Method 1 */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Method 1: SIP Route (Tax-Efficient) ⭐</h3>
                            <p className="text-slate-300 mb-4">
                                Instead of selling, increase SIPs in underweight categories while pausing overweight ones.
                            </p>
                            <div className="bg-emerald-950/50 rounded-lg p-4 mb-3">
                                <p className="text-sm text-emerald-300 mb-2"><strong>Example:</strong></p>
                                <div className="space-y-1 text-sm text-slate-300">
                                    <p>• Large Cap at 25% (Target: 40%) → Start/increase Large Cap SIP</p>
                                    <p>• Small Cap at 35% (Target: 20%) → Pause Small Cap SIP</p>
                                    <p>• Over 6-12 months, allocation normalizes without tax events</p>
                                </div>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p className="text-green-400"><CheckCircle2 className="w-3 h-3 inline mr-1" />No capital gains tax</p>
                                <p className="text-green-400"><CheckCircle2 className="w-3 h-3 inline mr-1" />Rupee-cost averaging continues</p>
                                <p className="text-yellow-400"><AlertTriangle className="w-3 h-3 inline mr-1" />Takes longer (6-12 months)</p>
                            </div>
                        </div>

                        {/* Method 2 */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Method 2: Sell & Switch (Immediate)</h3>
                            <p className="text-slate-300 mb-4">
                                Redeem from overweight funds and invest in underweight ones immediately.
                            </p>
                            <div className="bg-orange-950/50 rounded-lg p-4 mb-3">
                                <p className="text-sm text-orange-300 mb-2"><strong>Example:</strong></p>
                                <div className="space-y-1 text-sm text-slate-300">
                                    <p>• Small Cap excess: ₹2 Lakh → Redeem ₹2L from Small Cap</p>
                                    <p>• Large Cap shortfall: ₹2 Lakh → Invest ₹2L in Large Cap</p>
                                    <p>• Allocation rebalanced instantly</p>
                                </div>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p className="text-green-400"><CheckCircle2 className="w-3 h-3 inline mr-1" />Immediate rebalancing</p>
                                <p className="text-green-400"><CheckCircle2 className="w-3 h-3 inline mr-1" />Locks in profits from winners</p>
                                <p className="text-red-400"><XCircle className="w-3 h-3 inline mr-1" />Capital gains tax implications</p>
                                <p className="text-red-400"><XCircle className="w-3 h-3 inline mr-1" />Exit loads if within 1 year</p>
                            </div>
                        </div>

                        {/* Best Practice */}
                        <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-700/50 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Best Practice: Hybrid Approach</h3>
                            <ol className="space-y-3 text-sm text-slate-300 list-decimal list-inside">
                                <li>Check allocations quarterly or when market moves significantly</li>
                                <li>If drift &lt; 5%, do nothing. If 5-10%, use SIP route. If &gt; 10%, consider sell & switch</li>
                                <li>For tax efficiency, sell only funds held &gt; 1 year (LTCG benefit)</li>
                                <li>Use our Smart Rebalancer tool to get exact recommendations</li>
                                <li>Execute gradually over 1-2 months to avoid market timing risk</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="bg-gradient-to-r from-pink-600 to-orange-600 rounded-3xl p-10 text-center">
                    <Target className="w-16 h-16 mx-auto mb-6 text-pink-200" />
                    <h3 className="text-3xl font-bold mb-4">Ready to Rebalance Your Portfolio?</h3>
                    <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
                        Upload your portfolio and get smart rebalancing recommendations tailored to your target allocation.
                    </p>
                    <Link
                        href="/analyzer/rebalancer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-pink-900 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Open Smart Rebalancer
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
