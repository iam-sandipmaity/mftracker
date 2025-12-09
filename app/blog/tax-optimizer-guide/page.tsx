import { Metadata } from 'next';
import Link from 'next/link';
import {
    TrendingDown, Shield, Calculator, PieChart, AlertTriangle,
    Calendar, IndianRupee, ArrowLeft, BookOpen, CheckCircle2,
    LineChart, Target, FileText, TrendingUp, Percent
} from 'lucide-react';

import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Tax Optimizer Guide - Capital Gains Tax & Tax-Loss Harvesting | MFTracker',
    description: 'Complete guide to optimizing mutual fund taxes. Learn LTCG, STCG calculation, tax-loss harvesting strategies, and minimize capital gains tax liability legally.',
    keywords: ['tax optimizer guide', 'capital gains tax', 'LTCG calculator', 'STCG tax', 'tax loss harvesting', 'mutual fund tax planning', 'tax saving strategies'],
    openGraph: {
        title: 'Tax Optimizer Guide - Minimize Capital Gains Tax | MFTracker',
        description: 'Master tax-efficient investing with capital gains optimization and harvesting strategies.',
        url: getAbsoluteUrl('/blog/tax-optimizer-guide'),
    },
};

export default function TaxOptimizerGuide() {
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
                    <div className="flex items-center gap-2 text-amber-400 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-semibold">Tax Guide • 9 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                        Tax Optimizer Masterclass
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Master the art of tax-efficient investing. Learn capital gains taxation, 
                        tax-loss harvesting, and strategies to minimize your mutual fund tax liability legally.
                    </p>
                </div>

                {/* Important Notice */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-12">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-amber-400 mb-2">Tax Advisory Disclaimer</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Tax laws change frequently. This guide provides general strategies based on current Indian tax laws. 
                                For personalized advice and complex tax situations, consult a qualified Chartered Accountant.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-amber-400" />
                        Table of Contents
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#capital-gains" className="hover:text-amber-400 transition-colors">1. Understanding Capital Gains</a></li>
                        <li><a href="#tax-rates" className="hover:text-amber-400 transition-colors">2. Tax Rates (LTCG vs STCG)</a></li>
                        <li><a href="#calculation" className="hover:text-amber-400 transition-colors">3. How to Calculate Capital Gains Tax</a></li>
                        <li><a href="#harvesting" className="hover:text-amber-400 transition-colors">4. Tax-Loss Harvesting Strategy</a></li>
                        <li><a href="#when-to-sell" className="hover:text-amber-400 transition-colors">5. When to Sell Your Mutual Funds</a></li>
                        <li><a href="#optimizer" className="hover:text-amber-400 transition-colors">6. Using the Tax Optimizer Tool</a></li>
                        <li><a href="#strategies" className="hover:text-amber-400 transition-colors">7. Advanced Tax Optimization Strategies</a></li>
                        <li><a href="#mistakes" className="hover:text-amber-400 transition-colors">8. Common Mistakes to Avoid</a></li>
                    </ul>
                </div>

                {/* Section 1: Capital Gains */}
                <section id="capital-gains" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-green-400" />
                        1. Understanding Capital Gains
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Capital Gains = Sale Price - Purchase Price. When you sell mutual fund units at a profit, 
                        you earn capital gains, which are taxable. The tax rate depends on holding period and fund type.
                    </p>

                    <div className="space-y-6">
                        {/* STCG */}
                        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-red-400">Short-Term Capital Gains (STCG)</h3>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 text-sm">Equity Funds</h4>
                                    <p className="text-slate-300 text-sm">Holding period: <strong>Less than 12 months</strong></p>
                                    <p className="text-xs text-slate-400 mt-1">Includes equity-oriented funds (65%+ equity)</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 text-sm">Debt Funds</h4>
                                    <p className="text-slate-300 text-sm">Holding period: <strong>Less than 36 months</strong></p>
                                    <p className="text-xs text-slate-400 mt-1">Includes debt-oriented funds (65%+ debt)</p>
                                </div>
                            </div>

                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                                <p className="text-sm"><strong>Key Point:</strong> STCG is added to your income and taxed at your income tax slab rate</p>
                            </div>
                        </div>

                        {/* LTCG */}
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-green-400">Long-Term Capital Gains (LTCG)</h3>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 text-sm">Equity Funds</h4>
                                    <p className="text-slate-300 text-sm">Holding period: <strong>More than 12 months</strong></p>
                                    <p className="text-xs text-slate-400 mt-1">Equity-oriented funds, ELSS</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 text-sm">Debt Funds</h4>
                                    <p className="text-slate-300 text-sm">Holding period: <strong>More than 36 months</strong></p>
                                    <p className="text-xs text-slate-400 mt-1">Debt funds, liquid funds, FMPs</p>
                                </div>
                            </div>

                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                <p className="text-sm"><strong>Benefit:</strong> LTCG has preferential tax rates (lower than income tax slab)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Tax Rates */}
                <section id="tax-rates" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Percent className="w-8 h-8 text-purple-400" />
                        2. Tax Rates (Current FY 2025-26)
                    </h2>

                    <div className="space-y-6">
                        {/* Equity Funds */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">Equity Mutual Funds</h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-5">
                                    <h4 className="font-bold mb-3 text-red-400">STCG (&lt;12 months)</h4>
                                    <div className="text-3xl font-bold mb-2">15%</div>
                                    <p className="text-sm text-slate-300">Flat rate on short-term gains</p>
                                    <div className="mt-4 text-xs text-slate-400">
                                        <p><strong>Example:</strong></p>
                                        <p>Gain: ₹1,00,000</p>
                                        <p>Tax: ₹15,000</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-5">
                                    <h4 className="font-bold mb-3 text-green-400">LTCG (&gt;12 months)</h4>
                                    <div className="text-3xl font-bold mb-2">10%</div>
                                    <p className="text-sm text-slate-300">On gains above ₹1 lakh</p>
                                    <div className="mt-4 text-xs text-slate-400">
                                        <p><strong>Example:</strong></p>
                                        <p>Gain: ₹3,00,000</p>
                                        <p>Exempt: ₹1,00,000</p>
                                        <p>Taxable: ₹2,00,000</p>
                                        <p>Tax: ₹20,000 (10% of ₹2L)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <strong className="text-blue-400">₹1 Lakh Exemption:</strong> First ₹1 lakh of LTCG per financial year is tax-free. 
                                    This is per person, so a couple can claim ₹2 lakh exemption combined!
                                </p>
                            </div>
                        </div>

                        {/* Debt Funds */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Debt Mutual Funds</h3>
                            
                            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5">
                                <h4 className="font-bold mb-3 text-amber-400">Both STCG & LTCG</h4>
                                <div className="text-2xl font-bold mb-2">Your Income Tax Slab Rate</div>
                                <p className="text-sm text-slate-300 mb-4">
                                    Post April 2023, both short-term and long-term gains from debt funds are taxed at your applicable income tax slab rate.
                                </p>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="text-xs text-slate-300 mb-2"><strong>Example (30% tax slab):</strong></p>
                                    <p className="text-xs text-slate-400">Gain: ₹1,00,000</p>
                                    <p className="text-xs text-slate-400">Tax: ₹30,000 (30% slab) + 4% cess = ₹31,200</p>
                                </div>
                            </div>

                            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                <p className="text-sm text-slate-300">
                                    <strong className="text-red-400">Important:</strong> Indexation benefit has been removed for debt funds purchased after April 1, 2023.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Calculation */}
                <section id="calculation" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calculator className="w-8 h-8 text-indigo-400" />
                        3. How to Calculate Capital Gains Tax
                    </h2>

                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Step-by-Step Calculation Example</h3>
                        
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2 text-sm">Purchase Details</h4>
                                <ul className="text-sm text-slate-300 space-y-1">
                                    <li>Date: Jan 1, 2024</li>
                                    <li>Fund: Flexi Cap Fund (equity-oriented)</li>
                                    <li>Units: 1,000</li>
                                    <li>Purchase NAV: ₹50</li>
                                    <li>Investment: ₹50,000</li>
                                </ul>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2 text-sm">Sale Details</h4>
                                <ul className="text-sm text-slate-300 space-y-1">
                                    <li>Date: Dec 1, 2025 (23 months later)</li>
                                    <li>Units Sold: 1,000</li>
                                    <li>Sale NAV: ₹70</li>
                                    <li>Sale Value: ₹70,000</li>
                                </ul>
                            </div>

                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                <h4 className="font-semibold mb-2 text-green-400">Tax Calculation</h4>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <p><strong>Capital Gain:</strong> ₹70,000 - ₹50,000 = ₹20,000</p>
                                    <p><strong>Holding Period:</strong> 23 months → LTCG (more than 12 months)</p>
                                    <p><strong>LTCG Exemption:</strong> ₹1,00,000 (annual limit)</p>
                                    <p><strong>Taxable Gain:</strong> ₹20,000 - ₹1,00,000 = Nil (fully exempt)</p>
                                    <p className="text-lg font-bold text-green-400 mt-3">Tax Payable: ₹0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4">FIFO Method (First In First Out)</h3>
                        <p className="text-sm text-slate-300 mb-3">
                            When you buy units at different times and sell partially, tax is calculated using FIFO method - 
                            units purchased first are considered sold first.
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                            <p className="text-xs text-slate-400">
                                <strong>Example:</strong> Bought 100 units in Jan (₹50), 100 units in Jun (₹60). 
                                When you sell 100 units in Dec, the Jan purchase is considered sold (FIFO).
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Tax-Loss Harvesting */}
                <section id="harvesting" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <TrendingDown className="w-8 h-8 text-amber-400" />
                        4. Tax-Loss Harvesting Strategy
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Tax-loss harvesting is a legal strategy to reduce tax liability by offsetting capital gains with capital losses.
                    </p>

                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">How It Works</h3>
                        
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Step 1: Identify Losses</h4>
                                <p className="text-sm text-slate-300">Find underperforming funds in your portfolio that are currently in loss</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Step 2: Sell Loss-Making Funds</h4>
                                <p className="text-sm text-slate-300">Before financial year end (March 31), sell funds that are in loss to book the loss</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Step 3: Offset Gains</h4>
                                <p className="text-sm text-slate-300">Use the loss to offset capital gains from profitable funds, reducing tax liability</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Step 4: Reinvest (Optional)</h4>
                                <p className="text-sm text-slate-300">Immediately reinvest in similar (but not identical) fund to maintain market exposure</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4 text-green-400">Real Example</h3>
                        
                        <div className="space-y-3">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300 mb-2"><strong>Your Portfolio (March 2026):</strong></p>
                                <ul className="text-sm text-slate-300 space-y-1">
                                    <li>• Fund A: ₹2,00,000 gain (held &gt;12 months → LTCG)</li>
                                    <li>• Fund B: ₹50,000 loss (held &gt;12 months → LTCG loss)</li>
                                </ul>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-sm font-semibold mb-2">Without Tax-Loss Harvesting:</p>
                                <ul className="text-sm text-slate-300 space-y-1">
                                    <li>LTCG: ₹2,00,000</li>
                                    <li>Exempt: ₹1,00,000</li>
                                    <li>Taxable: ₹1,00,000</li>
                                    <li className="text-red-400 font-semibold">Tax: ₹10,000 (10% of ₹1L)</li>
                                </ul>
                            </div>

                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                <p className="text-sm font-semibold mb-2 text-green-400">With Tax-Loss Harvesting:</p>
                                <ul className="text-sm text-slate-300 space-y-1">
                                    <li>Sell Fund B to book ₹50,000 loss</li>
                                    <li>Net LTCG: ₹2,00,000 - ₹50,000 = ₹1,50,000</li>
                                    <li>Exempt: ₹1,00,000</li>
                                    <li>Taxable: ₹50,000</li>
                                    <li className="text-green-400 font-semibold">Tax: ₹5,000 (10% of ₹50K)</li>
                                </ul>
                                <p className="text-xl font-bold text-green-400 mt-3">Tax Saved: ₹5,000! 💰</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                        <h3 className="font-bold mb-3 text-blue-400">Important Rules</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>✓ Losses can be carried forward for 8 years</li>
                            <li>✓ STCG loss can offset both STCG and LTCG</li>
                            <li>✓ LTCG loss can only offset LTCG (not STCG)</li>
                            <li>✓ You can reinvest immediately (no waiting period like in USA)</li>
                            <li>✓ Must file ITR to carry forward losses</li>
                        </ul>
                    </div>
                </section>

                {/* Section 5: When to Sell */}
                <section id="when-to-sell" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-purple-400" />
                        5. When to Sell Your Mutual Funds
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                            <h3 className="font-bold mb-4 text-green-400">✓ Good Reasons to Sell</h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Goal Achievement:</strong> Selling to fund a planned financial goal</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Rebalancing:</strong> Portfolio has deviated from target allocation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Fund Quality:</strong> Consistent underperformance vs benchmark for 3+ years</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Strategy Change:</strong> Fund manager change or investment strategy drift</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Tax Harvesting:</strong> Booking losses before year-end to offset gains</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>₹1L LTCG:</strong> Utilizing annual ₹1 lakh exemption limit</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                            <h3 className="font-bold mb-4 text-red-400">✗ Bad Reasons to Sell</h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Market crash or correction (temporary volatility)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Short-term underperformance (1-2 quarters)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Panic selling based on news/rumors</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Following social media/friend advice blindly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Chasing hot new NFO/fund without research</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Emergency expenses (that's why you need emergency fund!)</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
                        <h3 className="font-bold mb-3 text-indigo-400">Tax-Efficient Selling Timeline</h3>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p>📅 <strong>Before 12 months:</strong> Avoid if possible (15% STCG tax)</p>
                            <p>📅 <strong>After 12 months:</strong> Preferred timing (10% LTCG only on gains &gt; ₹1L)</p>
                            <p>📅 <strong>March (Year-end):</strong> Best time for tax-loss harvesting</p>
                            <p>📅 <strong>January-February:</strong> Plan your tax strategy, identify loss-making funds</p>
                        </div>
                    </div>
                </section>

                {/* Section 6: Tool Usage */}
                <section id="optimizer" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-green-400" />
                        6. Using the Tax Optimizer Tool
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Our Tax Optimizer helps you make data-driven decisions about fund redemptions and tax planning.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 1: Upload Portfolio</h3>
                            <p className="text-sm text-slate-300">Import your current mutual fund holdings with purchase dates and values</p>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 2: Analyze Tax Impact</h3>
                            <p className="text-sm text-slate-300 mb-3">The tool automatically calculates:</p>
                            <ul className="text-sm text-slate-300 space-y-1 ml-4">
                                <li>• Current unrealized gains/losses</li>
                                <li>• STCG vs LTCG classification</li>
                                <li>• Potential tax liability if sold today</li>
                                <li>• Days remaining to achieve LTCG status</li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 3: Identify Opportunities</h3>
                            <p className="text-sm text-slate-300 mb-3">Tool highlights:</p>
                            <ul className="text-sm text-slate-300 space-y-1 ml-4">
                                <li>• Funds eligible for ₹1L LTCG exemption</li>
                                <li>• Loss-making funds for tax harvesting</li>
                                <li>• Funds close to 12-month holding period</li>
                                <li>• Optimal redemption strategy</li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 4: Simulate Scenarios</h3>
                            <p className="text-sm text-slate-300">Test different redemption strategies and see tax impact before executing</p>
                        </div>
                    </div>
                </section>

                {/* Section 7: Strategies */}
                <section id="strategies" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-400" />
                        7. Advanced Tax Optimization Strategies
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 text-blue-400">Strategy 1: Annual ₹1L LTCG Harvesting</h3>
                            <p className="text-sm text-slate-300 mb-3">
                                Systematically book ₹1 lakh LTCG every year (tax-free) and reinvest. This resets your cost base higher, 
                                reducing future tax liability.
                            </p>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-xs text-slate-400">
                                    <strong>Example:</strong> Portfolio value ₹10L, cost ₹8L, gain ₹2L. Sell units worth ₹1L gain before March 31. 
                                    Reinvest immediately. Next year, repeat with remaining ₹1L gain.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 text-purple-400">Strategy 2: Family Member Distribution</h3>
                            <p className="text-sm text-slate-300 mb-3">
                                Distribute investments across family members. Each person gets ₹1L LTCG exemption annually.
                            </p>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-xs text-slate-400">
                                    Family of 3 (you, spouse, adult child) = ₹3 lakh tax-free LTCG annually. 
                                    Over 10 years = ₹30 lakhs tax-free gains!
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 text-green-400">Strategy 3: SWP (Systematic Withdrawal Plan)</h3>
                            <p className="text-sm text-slate-300 mb-3">
                                Instead of lumpsum redemption, use SWP to spread withdrawals over financial years, 
                                utilizing ₹1L exemption multiple times.
                            </p>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-xs text-slate-400">
                                    Need ₹4L? Instead of redeeming ₹4L in one year (₹3L taxable), 
                                    withdraw ₹1.5L over 3 years using SWP (₹1.5L tax-free).
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 text-amber-400">Strategy 4: Dividend vs Growth</h3>
                            <p className="text-sm text-slate-300 mb-3">
                                For equity funds, choose growth option. Dividends are added to income and taxed at slab rate. 
                                Capital gains have lower LTCG rate.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 8: Mistakes */}
                <section id="mistakes" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        8. Common Mistakes to Avoid
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
                            <h4 className="font-bold mb-3 text-red-400">Tax Mistakes</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✗ Selling before 12 months (paying 15% STCG unnecessarily)</li>
                                <li>✗ Not utilizing ₹1L LTCG exemption annually</li>
                                <li>✗ Ignoring tax-loss harvesting opportunities</li>
                                <li>✗ Not filing ITR to carry forward losses</li>
                                <li>✗ Selling in wrong financial year</li>
                            </ul>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
                            <h4 className="font-bold mb-3 text-red-400">Investment Mistakes</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✗ Letting tax tail wag investment dog (tax shouldn't be only consideration)</li>
                                <li>✗ Holding poor performing funds just to avoid tax</li>
                                <li>✗ Panic selling during market corrections</li>
                                <li>✗ Not maintaining purchase records</li>
                                <li>✗ Choosing dividend option for equity funds</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                        <h3 className="font-bold mb-3 text-blue-400">Golden Rule</h3>
                        <p className="text-slate-300">
                            <strong>Tax optimization is important, but investment quality matters more.</strong> 
                            Don't hold a poorly performing fund just to avoid tax. A 30% gain with 10% tax (net 27%) 
                            is better than a 5% gain with no tax.
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Optimize Your Mutual Fund Taxes</h2>
                    <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                        Use our Tax Optimizer to identify tax-saving opportunities, 
                        calculate capital gains, and plan your redemptions efficiently.
                    </p>
                    <Link
                        href="/analyzer/tax-optimizer"
                        className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-colors"
                    >
                        <Calculator className="w-5 h-5" />
                        Start Optimizing Taxes
                    </Link>
                </div>

                {/* Related Guides */}
                <div className="mt-12 pt-12 border-t border-slate-700">
                    <h3 className="text-xl font-bold mb-6">Related Guides</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/blog/income-tax-calculator-guide"
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors group"
                        >
                            <h4 className="font-bold mb-2 group-hover:text-amber-400 transition-colors">Income Tax Calculator Guide</h4>
                            <p className="text-sm text-slate-400">Complete income tax calculation with all deductions</p>
                        </Link>
                        <Link
                            href="/blog/portfolio-tracker-guide"
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-colors group"
                        >
                            <h4 className="font-bold mb-2 group-hover:text-amber-400 transition-colors">Portfolio Tracker Guide</h4>
                            <p className="text-sm text-slate-400">Monitor your portfolio and track capital gains</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
