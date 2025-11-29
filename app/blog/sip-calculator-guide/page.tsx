import { Metadata } from 'next';
import Link from 'next/link';
import {
    Calculator, TrendingUp, Percent, Calendar, DollarSign,
    Target, LineChart, ArrowLeft, BookOpen, AlertCircle, CheckCircle2, Flame
} from 'lucide-react';

import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'SIP Calculator Complete Guide | MFTracker',
    description: 'Master SIP calculations: understand step-up SIPs, inflation-adjusted returns, compound growth, and plan your investment goals with our comprehensive calculator guide.',
    openGraph: {
        title: 'SIP Calculator Complete Guide | MFTracker',
        description: 'Learn how to use the SIP Calculator effectively with step-up strategies and inflation adjustment.',
        url: getAbsoluteUrl('/blog/sip-calculator-guide'),
    },
};

export default function SIPCalculatorGuide() {
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
                    <div className="flex items-center gap-2 text-purple-400 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-semibold">Tool Guide • 6 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                        SIP Calculator Masterclass
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Learn how to use the SIP Calculator to plan your investments, understand the power of compound growth, 
                        step-up strategies, and inflation-adjusted returns.
                    </p>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-purple-400" />
                        Table of Contents
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#basics" className="hover:text-purple-400 transition-colors">1. SIP Calculator Basics</a></li>
                        <li><a href="#step-up" className="hover:text-purple-400 transition-colors">2. Step-Up SIP Strategy</a></li>
                        <li><a href="#inflation" className="hover:text-purple-400 transition-colors">3. Understanding Inflation Adjustment</a></li>
                        <li><a href="#returns" className="hover:text-purple-400 transition-colors">4. Expected Returns Guide</a></li>
                        <li><a href="#interpretation" className="hover:text-purple-400 transition-colors">5. Interpreting Results</a></li>
                    </ul>
                </div>

                {/* Section 1: Basics */}
                <section id="basics" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calculator className="w-8 h-8 text-purple-400" />
                        1. SIP Calculator Basics
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (monthly) in mutual funds. 
                        Our calculator helps you project future value based on your investment parameters.
                    </p>

                    {/* Input Parameters */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Input Parameters Explained</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white mb-1">Monthly SIP Amount</h4>
                                    <p className="text-slate-300 text-sm">The fixed amount you'll invest every month. Start with what you can afford consistently.</p>
                                    <p className="text-xs text-purple-400 mt-1">Example: ₹10,000/month</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <Percent className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white mb-1">Expected Annual Return</h4>
                                    <p className="text-slate-300 text-sm">Projected yearly return based on fund category. Be realistic - see section 4 for guidance.</p>
                                    <p className="text-xs text-indigo-400 mt-1">Example: 12% for Flexi Cap funds</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-pink-500/20 rounded-lg">
                                    <Calendar className="w-5 h-5 text-pink-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white mb-1">Investment Duration</h4>
                                    <p className="text-slate-300 text-sm">How long you'll continue the SIP. Longer duration = more compound growth.</p>
                                    <p className="text-xs text-pink-400 mt-1">Example: 20 years for retirement planning</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compound Growth Example */}
                    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <LineChart className="w-6 h-6 text-purple-400" />
                            The Power of Compound Growth
                        </h3>
                        <p className="text-slate-300 mb-4">
                            SIP leverages rupee-cost averaging and compound interest. Here's a real example:
                        </p>
                        <div className="bg-purple-950/50 rounded-lg p-6">
                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <p className="text-sm text-purple-400 mb-1">Monthly SIP</p>
                                    <p className="text-3xl font-bold text-white">₹10,000</p>
                                </div>
                                <div>
                                    <p className="text-sm text-purple-400 mb-1">Total Invested (20Y)</p>
                                    <p className="text-3xl font-bold text-white">₹24 Lakh</p>
                                </div>
                                <div>
                                    <p className="text-sm text-purple-400 mb-1">Future Value @ 12%</p>
                                    <p className="text-3xl font-bold text-emerald-400">₹99.9 Lakh</p>
                                </div>
                            </div>
                            <p className="text-center text-emerald-400 font-bold text-lg mt-4">
                                Returns: ₹75.9 Lakh (316% gain!)
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Step-Up SIP */}
                <section id="step-up" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-emerald-400" />
                        2. Step-Up SIP Strategy
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        A step-up SIP automatically increases your monthly investment by a fixed percentage every year. 
                        This aligns with salary increments and dramatically boosts long-term wealth.
                    </p>

                    {/* How Step-Up Works */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">How Step-Up Works</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-16 text-emerald-400 font-bold">Year 1:</div>
                                <div className="text-slate-300">₹10,000/month</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-16 text-emerald-400 font-bold">Year 2:</div>
                                <div className="text-slate-300">₹11,000/month (10% step-up)</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-16 text-emerald-400 font-bold">Year 3:</div>
                                <div className="text-slate-300">₹12,100/month (10% step-up)</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-16 text-emerald-400 font-bold">Year 20:</div>
                                <div className="text-slate-300">₹56,044/month</div>
                            </div>
                        </div>
                    </div>

                    {/* Step-Up Impact */}
                    <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-700/50 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Flame className="w-6 h-6 text-orange-400" />
                            Step-Up Impact Example
                        </h3>
                        <p className="text-slate-300 mb-4">Same ₹10,000 starting SIP, 20 years, 12% returns:</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 rounded-lg p-6">
                                <p className="text-sm text-slate-400 mb-2">Without Step-Up (Fixed SIP)</p>
                                <p className="text-2xl font-bold text-white mb-1">₹99.9 Lakh</p>
                                <p className="text-xs text-slate-400">Investment: ₹24L</p>
                            </div>
                            <div className="bg-emerald-950/50 border-2 border-emerald-500/50 rounded-lg p-6">
                                <p className="text-sm text-emerald-400 mb-2">With 10% Step-Up</p>
                                <p className="text-2xl font-bold text-emerald-400 mb-1">₹2.29 Crore</p>
                                <p className="text-xs text-emerald-400">Investment: ₹73L</p>
                            </div>
                        </div>
                        
                        <div className="mt-4 p-4 bg-emerald-500/10 rounded-lg">
                            <p className="text-emerald-300 font-bold">
                                💡 Additional Wealth Created: ₹1.29 Crore (129% more!)
                            </p>
                        </div>
                    </div>

                    {/* Recommended Step-Up */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4">Recommended Step-Up Percentage</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                                <div>
                                    <p className="text-white font-semibold">5% Step-Up: Conservative</p>
                                    <p className="text-slate-300">Matches average salary hikes. Easy to sustain.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                                <div>
                                    <p className="text-white font-semibold">10% Step-Up: Recommended</p>
                                    <p className="text-slate-300">Optimal balance - aligns with career growth and inflation.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5" />
                                <div>
                                    <p className="text-white font-semibold">15% Step-Up: Aggressive</p>
                                    <p className="text-slate-300">For high earners with strong career trajectory.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Inflation */}
                <section id="inflation" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Percent className="w-8 h-8 text-orange-400" />
                        3. Understanding Inflation Adjustment
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Inflation erodes purchasing power. Our calculator shows <strong>real returns</strong> - what your money 
                        will actually be worth in today's terms after accounting for inflation.
                    </p>

                    {/* What is Real Return */}
                    <div className="bg-orange-900/20 border border-orange-700/50 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <AlertCircle className="w-6 h-6 text-orange-400" />
                            What are Inflation-Adjusted Returns?
                        </h3>
                        <p className="text-slate-300 mb-4">
                            <strong>Nominal Returns:</strong> The absolute rupee value you'll have (without considering inflation)
                        </p>
                        <p className="text-slate-300 mb-4">
                            <strong>Real Returns:</strong> The actual purchasing power of your money in today's terms
                        </p>
                        
                        <div className="bg-orange-950/50 rounded-lg p-6 mt-4">
                            <p className="text-sm text-orange-300 mb-3"><strong>Example:</strong></p>
                            <div className="space-y-2 text-sm text-slate-300">
                                <p>• Future value after 20 years: <strong className="text-white">₹1 Crore</strong></p>
                                <p>• Inflation @ 6% for 20 years = 3.21x increase in prices</p>
                                <p>• Real purchasing power: <strong className="text-emerald-400">₹31.2 Lakh in today's money</strong></p>
                            </div>
                            <p className="text-xs text-orange-400 mt-3">
                                This means ₹1 Crore in 20 years buys what ₹31.2 Lakh buys today.
                            </p>
                        </div>
                    </div>

                    {/* How We Calculate */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">How We Calculate Real Returns</h3>
                        <p className="text-slate-300 mb-4 text-sm">
                            Unlike simple calculators that just deflate final value, we use a sophisticated approach:
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                            <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
                                <li>Each monthly contribution is tracked individually</li>
                                <li>Growth is calculated with compound interest month-by-month</li>
                                <li>Each contribution is deflated from its end value back to present value</li>
                                <li>Sum of all deflated contributions = Real purchasing power</li>
                            </ol>
                        </div>
                        <p className="text-xs text-indigo-400">
                            ✨ This gives you the TRUE purchasing power of your returns, accounting for when each rupee was invested.
                        </p>
                    </div>

                    {/* Inflation Rate Guide */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4">What Inflation Rate to Use?</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <div className="w-12 text-orange-400 font-bold">4-5%</div>
                                <div className="text-slate-300">Conservative estimate (historical average in India)</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-12 text-orange-400 font-bold">6%</div>
                                <div className="text-slate-300">Recommended for long-term planning (realistic)</div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-12 text-orange-400 font-bold">7-8%</div>
                                <div className="text-slate-300">Pessimistic scenario (factor in lifestyle inflation)</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Expected Returns */}
                <section id="returns" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <LineChart className="w-8 h-8 text-indigo-400" />
                        4. Expected Returns Guide
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Setting realistic return expectations is crucial. Here are historical category-wise returns to guide you:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-5">
                            <h4 className="font-bold text-green-400 mb-3">High Return Potential</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Small Cap</span>
                                    <span className="text-green-400 font-bold">14-16%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Mid Cap</span>
                                    <span className="text-green-400 font-bold">13-15%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Flexi/Multi Cap</span>
                                    <span className="text-green-400 font-bold">12-14%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-5">
                            <h4 className="font-bold text-blue-400 mb-3">Moderate Returns</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Large Cap</span>
                                    <span className="text-blue-400 font-bold">10-12%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Index Funds</span>
                                    <span className="text-blue-400 font-bold">11-13%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">International</span>
                                    <span className="text-blue-400 font-bold">9-11%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-5">
                            <h4 className="font-bold text-yellow-400 mb-3">Conservative</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Hybrid Funds</span>
                                    <span className="text-yellow-400 font-bold">8-10%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Debt Funds</span>
                                    <span className="text-yellow-400 font-bold">6-8%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Gold Funds</span>
                                    <span className="text-yellow-400 font-bold">7-9%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-900/20 border border-purple-700/50 rounded-xl p-5">
                            <h4 className="font-bold text-purple-400 mb-3">High Risk</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-300">Thematic/Sector</span>
                                    <span className="text-purple-400 font-bold">12-16%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-300 text-xs">(Highly volatile)</span>
                                    <span className="text-purple-400 text-xs">±20-30%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                        <p className="text-sm text-indigo-300">
                            <strong>💡 Pro Tip:</strong> Use 12% for balanced equity portfolios. Be conservative - it's better 
                            to be pleasantly surprised than disappointed!
                        </p>
                    </div>
                </section>

                {/* Section 5: Interpretation */}
                <section id="interpretation" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-pink-400" />
                        5. Interpreting Results
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">Understanding the Output</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-indigo-400 font-semibold mb-1">Total Investment</h4>
                                    <p className="text-sm text-slate-300">Sum of all your monthly contributions over the period.</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-emerald-400 font-semibold mb-1">Future Value (Nominal)</h4>
                                    <p className="text-sm text-slate-300">The absolute rupee value you'll have - what your statement will show.</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-purple-400 font-semibold mb-1">Total Returns</h4>
                                    <p className="text-sm text-slate-300">Future Value - Total Investment = Your profit/gain</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-orange-400 font-semibold mb-1">Real Returns (Inflation-Adjusted)</h4>
                                    <p className="text-sm text-slate-300">
                                        The TRUE purchasing power gain. This is what matters for real wealth creation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 border border-pink-700/50 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">Using Results for Planning</h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400 mt-1">→</span>
                                    <span><strong>For retirement planning:</strong> Focus on inflation-adjusted returns. You need real purchasing power.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400 mt-1">→</span>
                                    <span><strong>For goal-based investing:</strong> If goal is 15+ years away, use 6% inflation minimum.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400 mt-1">→</span>
                                    <span><strong>For short-term goals (&lt; 5 years):</strong> Use conservative return estimates (8-10%).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-400 mt-1">→</span>
                                    <span><strong>Review yearly:</strong> Adjust SIP amounts based on actual returns and life changes.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-10 text-center">
                    <Calculator className="w-16 h-16 mx-auto mb-6 text-purple-200" />
                    <h3 className="text-3xl font-bold mb-4">Ready to Plan Your SIP?</h3>
                    <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                        Use our SIP Calculator with step-up and inflation adjustment to plan your financial goals accurately.
                    </p>
                    <Link
                        href="/analyzer/calculator"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Open SIP Calculator
                        <ArrowLeft className="w-6 h-6 rotate-180" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
