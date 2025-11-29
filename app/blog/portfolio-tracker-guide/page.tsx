import { Metadata } from 'next';
import Link from 'next/link';
import {
    PieChart, Upload, FileSpreadsheet, Camera, AlertTriangle,
    Shield, TrendingUp, BarChart3, Target, CheckCircle2, XCircle,
    ArrowLeft, BookOpen, Percent, Building2
} from 'lucide-react';

import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Portfolio Tracker Complete Guide | MFTracker',
    description: 'Learn how to use Portfolio Tracker: upload methods, understand risk metrics, identify red flags, and optimize your mutual fund portfolio with expert analysis.',
    openGraph: {
        title: 'Portfolio Tracker Complete Guide | MFTracker',
        description: 'Master portfolio analysis with our comprehensive guide covering upload methods, metrics, red flags, and optimization strategies.',
        url: getAbsoluteUrl('/blog/portfolio-tracker-guide'),
    },
};

export default function PortfolioTrackerGuide() {
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
                        <span className="text-sm font-semibold">Tool Guide • 8 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Portfolio Tracker Complete Guide
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Learn how to analyze your mutual fund portfolio, understand risk metrics, identify red flags, 
                        and take action to optimize your investments for better returns.
                    </p>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-indigo-400" />
                        Table of Contents
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#upload" className="hover:text-indigo-400 transition-colors">1. How to Upload Your Portfolio</a></li>
                        <li><a href="#metrics" className="hover:text-indigo-400 transition-colors">2. Understanding Key Metrics</a></li>
                        <li><a href="#red-flags" className="hover:text-indigo-400 transition-colors">3. Portfolio Red Flags Explained</a></li>
                        <li><a href="#rules" className="hover:text-indigo-400 transition-colors">4. Portfolio Construction Rules</a></li>
                        <li><a href="#action" className="hover:text-indigo-400 transition-colors">5. Taking Action on Insights</a></li>
                    </ul>
                </div>

                {/* Section 1: Upload Methods */}
                <section id="upload" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Upload className="w-8 h-8 text-indigo-400" />
                        1. How to Upload Your Portfolio
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        MFTracker offers three convenient ways to input your portfolio data. Choose the method that works best for you:
                    </p>

                    {/* Upload Method 1: CSV */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                            Method 1: CSV Upload (Recommended)
                        </h3>
                        <p className="text-slate-300 mb-4">
                            Download your portfolio statement from CAMS/Karvy as CSV and upload directly.
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-slate-400 mb-2">Required columns:</p>
                            <code className="text-xs text-emerald-400">
                                fund_name, amount, category, folio_id, amc, expense_ratio
                            </code>
                        </div>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-2" />Fast and accurate</p>
                            <p><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-2" />Supports bulk data</p>
                            <p><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-2" />No manual entry needed</p>
                        </div>
                    </div>

                    {/* Upload Method 2: OCR */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Camera className="w-6 h-6 text-purple-400" />
                            Method 2: Image/PDF Upload (OCR)
                        </h3>
                        <p className="text-slate-300 mb-4">
                            Upload a screenshot or PDF of your portfolio statement. Our AI will extract the data.
                        </p>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-2" />No formatting required</p>
                            <p><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-2" />Works with mobile screenshots</p>
                            <p><AlertTriangle className="w-4 h-4 inline text-yellow-400 mr-2" />Verify extracted data for accuracy</p>
                        </div>
                    </div>

                    {/* Upload Method 3: Manual */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-blue-400" />
                            Method 3: Manual Entry
                        </h3>
                        <p className="text-slate-300 mb-4">
                            Add each fund individually using our form. Perfect for small portfolios.
                        </p>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-2" />Full control over data</p>
                            <p><CheckCircle2 className="w-4 h-4 inline text-green-400 mr-2" />Add one fund at a time</p>
                            <p><XCircle className="w-4 h-4 inline text-red-400 mr-2" />Time-consuming for large portfolios</p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Metrics */}
                <section id="metrics" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-purple-400" />
                        2. Understanding Key Metrics
                    </h2>

                    {/* Risk Score */}
                    <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-700/50 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-red-400" />
                            Risk Score (0-10 Scale)
                        </h3>
                        <p className="text-slate-300 mb-4">
                            Weighted average risk based on your fund allocations. Higher scores mean higher volatility.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                <p className="font-bold text-green-400 mb-1">0-4: Conservative</p>
                                <p className="text-slate-300">Stable returns, low volatility. Suitable for risk-averse investors.</p>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                <p className="font-bold text-yellow-400 mb-1">5-7: Moderate</p>
                                <p className="text-slate-300">Balanced approach with moderate swings. Good for long-term goals.</p>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                <p className="font-bold text-red-400 mb-1">8-10: Aggressive</p>
                                <p className="text-slate-300">High growth potential but significant volatility. For risk-tolerant investors.</p>
                            </div>
                        </div>
                    </div>

                    {/* Diversification Score */}
                    <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-700/50 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <PieChart className="w-6 h-6 text-indigo-400" />
                            Diversification Score (0-100)
                        </h3>
                        <p className="text-slate-300 mb-4">
                            Measures how well-spread your investments are across categories and funds.
                        </p>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <div className="w-16 text-indigo-400 font-bold">40 pts</div>
                                <div className="text-slate-300">Category diversity (6+ categories = full points)</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-16 text-indigo-400 font-bold">40 pts</div>
                                <div className="text-slate-300">Balanced allocation (no single fund &gt; 25%)</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-16 text-indigo-400 font-bold">20 pts</div>
                                <div className="text-slate-300">Fund count (8+ funds = full points)</div>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-indigo-500/10 rounded-lg">
                            <p className="text-sm text-indigo-300">
                                <strong>Target:</strong> Aim for 70+ score. Scores below 50 indicate concentration risk.
                            </p>
                        </div>
                    </div>

                    {/* Category Allocation */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                            Category Allocation Breakdown
                        </h3>
                        <p className="text-slate-300 mb-4">
                            Shows how your investment is distributed across fund categories (Equity, Debt, Hybrid, etc.).
                        </p>
                        <p className="text-sm text-slate-400">
                            Use this to understand your exposure to different asset classes and market segments.
                        </p>
                    </div>
                </section>

                {/* Section 3: Red Flags */}
                <section id="red-flags" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-orange-400" />
                        3. Portfolio Red Flags Explained
                    </h2>

                    <p className="text-slate-300 mb-6">
                        Our analyzer automatically detects common portfolio issues. Here's what each red flag means and how to fix it:
                    </p>

                    <div className="space-y-6">
                        {/* Red Flag 1 */}
                        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-red-400 mb-1">High Concentration Risk</h4>
                                    <p className="text-sm text-slate-400">Severity: High</p>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-3">
                                <strong>Issue:</strong> Single fund exceeds 40% of portfolio.
                            </p>
                            <p className="text-slate-300 mb-3">
                                <strong>Why it matters:</strong> Overexposure to one fund means if it underperforms, your entire portfolio suffers.
                            </p>
                            <div className="bg-red-950/50 rounded-lg p-4">
                                <p className="text-sm text-red-300 mb-2"><strong>Fix:</strong></p>
                                <p className="text-sm text-slate-300">• Limit any single fund to 20-25% max</p>
                                <p className="text-sm text-slate-300">• Distribute investments across 6-8 funds</p>
                            </div>
                        </div>

                        {/* Red Flag 2 */}
                        <div className="bg-orange-900/20 border border-orange-700/50 rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 bg-orange-500/20 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-orange-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-orange-400 mb-1">Excessive Small Cap Allocation</h4>
                                    <p className="text-sm text-slate-400">Severity: High</p>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-3">
                                <strong>Issue:</strong> Small Cap funds exceed 25% of portfolio.
                            </p>
                            <p className="text-slate-300 mb-3">
                                <strong>Why it matters:</strong> Small caps are highly volatile and can drop 40-50% during market corrections.
                            </p>
                            <div className="bg-orange-950/50 rounded-lg p-4">
                                <p className="text-sm text-orange-300 mb-2"><strong>Fix:</strong></p>
                                <p className="text-sm text-slate-300">• Keep Small Cap allocation under 20%</p>
                                <p className="text-sm text-slate-300">• Balance with Large Cap or Index funds</p>
                            </div>
                        </div>

                        {/* Red Flag 3 */}
                        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 bg-yellow-500/20 rounded-lg">
                                    <Percent className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-yellow-400 mb-1">High Expense Ratios</h4>
                                    <p className="text-sm text-slate-400">Severity: Medium</p>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-3">
                                <strong>Issue:</strong> Funds with expense ratio &gt; 2% detected.
                            </p>
                            <p className="text-slate-300 mb-3">
                                <strong>Why it matters:</strong> High fees erode returns. A 2.5% expense ratio can cost you ₹2.5L on a ₹1Cr portfolio annually.
                            </p>
                            <div className="bg-yellow-950/50 rounded-lg p-4">
                                <p className="text-sm text-yellow-300 mb-2"><strong>Fix:</strong></p>
                                <p className="text-sm text-slate-300">• Direct plans: Target &lt; 1.5% for active funds</p>
                                <p className="text-sm text-slate-300">• Index funds: Target &lt; 0.5%</p>
                                <p className="text-sm text-slate-300">• Switch to lower-cost alternatives in same category</p>
                            </div>
                        </div>

                        {/* Red Flag 4 */}
                        <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-6">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Building2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-blue-400 mb-1">AMC Concentration</h4>
                                    <p className="text-sm text-slate-400">Severity: Medium</p>
                                </div>
                            </div>
                            <p className="text-slate-300 mb-3">
                                <strong>Issue:</strong> Single AMC (fund house) accounts for &gt; 40% of portfolio.
                            </p>
                            <p className="text-slate-300 mb-3">
                                <strong>Why it matters:</strong> Fund house risk - if the AMC faces issues, multiple funds can be affected.
                            </p>
                            <div className="bg-blue-950/50 rounded-lg p-4">
                                <p className="text-sm text-blue-300 mb-2"><strong>Fix:</strong></p>
                                <p className="text-sm text-slate-300">• Distribute across 3-4 different AMCs</p>
                                <p className="text-sm text-slate-300">• No single AMC should exceed 30-35%</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Rules */}
                <section id="rules" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        4. Portfolio Construction Rules
                    </h2>

                    <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-700/50 rounded-xl p-8">
                        <h3 className="text-xl font-bold mb-6 text-emerald-400">The Golden Rules</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Maintain Core-Satellite Strategy</h4>
                                    <p className="text-slate-300 text-sm">60-70% in core holdings (Index/Large Cap), 30-40% in satellites (Mid/Small Cap)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Limit High-Risk Exposure</h4>
                                    <p className="text-slate-300 text-sm">Small Cap (&lt; 20%) + Thematic/Sector (&lt; 15%) = Max 35% combined</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Add Stability Buffers</h4>
                                    <p className="text-slate-300 text-sm">10-15% in Debt/Gold for portfolio stability, especially if risk score &gt; 7</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                                    4
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Diversify Across Categories</h4>
                                    <p className="text-slate-300 text-sm">Aim for 6+ categories to reduce concentration risk</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                                    5
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Optimize Fund Count</h4>
                                    <p className="text-slate-300 text-sm">6-12 funds is ideal. Too few = concentration risk, too many = overlap & complexity</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 flex-shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                                    6
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Watch Expense Ratios</h4>
                                    <p className="text-slate-300 text-sm">Active funds &lt; 1.5%, Index funds &lt; 0.5%. Use direct plans always.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Taking Action */}
                <section id="action" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-pink-400" />
                        5. Taking Action on Insights
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">If Risk Score is Too High (&gt; 8)</h3>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">→</span>
                                    <span>Add Large Cap or Index funds to reduce volatility</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">→</span>
                                    <span>Include 10-15% debt funds for stability</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">→</span>
                                    <span>Reduce Small Cap allocation to &lt; 20%</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">If Diversification Score is Low (&lt; 50)</h3>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">→</span>
                                    <span>Add funds from different categories (Flexi Cap, Multi Cap, International)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">→</span>
                                    <span>Reduce allocation to over-concentrated funds</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-400 mt-1">→</span>
                                    <span>Aim for 6-8 funds across 6+ categories</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">If Red Flags Detected</h3>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 mt-1">→</span>
                                    <span>Address high-severity flags first (concentration, Small Cap excess)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 mt-1">→</span>
                                    <span>Use Smart Rebalancer to get specific recommendations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 mt-1">→</span>
                                    <span>Implement changes gradually over 3-6 months</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center">
                    <PieChart className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
                    <h3 className="text-3xl font-bold mb-4">Ready to Analyze Your Portfolio?</h3>
                    <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                        Upload your portfolio now and get instant insights on risk, diversification, and optimization opportunities.
                    </p>
                    <Link
                        href="/analyzer/tracker"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Start Portfolio Analysis
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
