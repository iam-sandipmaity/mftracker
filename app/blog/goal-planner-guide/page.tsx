import { Metadata } from 'next';
import Link from 'next/link';
import {
    Target, TrendingUp, IndianRupee, Calendar, Heart,
    GraduationCap, Home, Plane, Users, ArrowLeft, BookOpen, 
    AlertCircle, CheckCircle2, Calculator, LineChart, PiggyBank
} from 'lucide-react';

import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Financial Goal Planning Guide - Retirement, Education & Life Goals | MFTracker',
    description: 'Complete guide to financial goal planning with SIP calculator. Learn how to plan retirement, children education, home purchase, and achieve life goals with systematic investing.',
    keywords: ['goal planning guide', 'financial goals', 'retirement planning', 'education fund', 'SIP goal calculator', 'inflation adjusted planning', 'wealth creation'],
    openGraph: {
        title: 'Financial Goal Planning Guide | MFTracker',
        description: 'Master goal-based investing and achieve your financial dreams with systematic planning.',
        url: getAbsoluteUrl('/blog/goal-planner-guide'),
    },
};

export default function GoalPlannerGuide() {
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
                    <div className="flex items-center gap-2 text-green-400 mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-semibold">Planning Guide • 8 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Financial Goal Planning Masterclass
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Turn your dreams into achievable financial goals. Learn systematic investment planning 
                        for retirement, education, home purchase, and all life milestones.
                    </p>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-400" />
                        Table of Contents
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#why-goals" className="hover:text-green-400 transition-colors">1. Why Goal-Based Investing?</a></li>
                        <li><a href="#goal-types" className="hover:text-green-400 transition-colors">2. Types of Financial Goals</a></li>
                        <li><a href="#retirement" className="hover:text-green-400 transition-colors">3. Retirement Planning</a></li>
                        <li><a href="#education" className="hover:text-green-400 transition-colors">4. Children's Education Fund</a></li>
                        <li><a href="#home" className="hover:text-green-400 transition-colors">5. Home Purchase Planning</a></li>
                        <li><a href="#inflation" className="hover:text-green-400 transition-colors">6. Inflation & Time Value of Money</a></li>
                        <li><a href="#calculator" className="hover:text-green-400 transition-colors">7. Using the Goal Calculator</a></li>
                        <li><a href="#tips" className="hover:text-green-400 transition-colors">8. Goal Planning Best Practices</a></li>
                    </ul>
                </div>

                {/* Section 1: Why Goals */}
                <section id="why-goals" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-green-400" />
                        1. Why Goal-Based Investing?
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Goal-based investing transforms vague financial aspirations into concrete, achievable targets. 
                        Instead of randomly investing, you invest with purpose, clarity, and a clear timeline.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                            <h3 className="font-bold mb-4 text-green-400">✓ Benefits of Goal Planning</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Clarity:</strong> Know exactly what you're saving for</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Discipline:</strong> Regular SIPs ensure consistent progress</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Right Asset Allocation:</strong> Match investments to time horizon</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>Motivation:</strong> Track progress towards your dreams</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                    <span><strong>No Emotional Decisions:</strong> Stay invested despite market volatility</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                            <h3 className="font-bold mb-4 text-red-400">✗ Without Goal Planning</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Random investing without purpose</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Tendency to withdraw prematurely</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Wrong asset allocation (too risky or too conservative)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>Panic during market corrections</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                                    <span>May fall short when you actually need money</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                        <p className="text-slate-300">
                            <strong className="text-blue-400">Key Principle:</strong> Every rupee you invest should have a specific goal and timeline. 
                            This mental mapping helps you stay invested and avoid premature withdrawals.
                        </p>
                    </div>
                </section>

                {/* Section 2: Goal Types */}
                <section id="goal-types" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-purple-400" />
                        2. Types of Financial Goals
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Financial goals are classified by time horizon. This determines your investment strategy and asset allocation.
                    </p>

                    <div className="space-y-4">
                        {/* Short Term */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-amber-400">Short-Term Goals (1-3 years)</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2 text-sm">Examples:</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Emergency fund (3-6 months expenses)</li>
                                        <li>• Vacation or travel</li>
                                        <li>• Gadget purchase</li>
                                        <li>• Festival expenses</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2 text-sm">Investment Strategy:</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Liquid funds, short-term debt funds</li>
                                        <li>• Focus on capital preservation</li>
                                        <li>• Expected return: 5-7% p.a.</li>
                                        <li>• High liquidity needed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Medium Term */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-indigo-400">Medium-Term Goals (3-7 years)</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2 text-sm">Examples:</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Car purchase</li>
                                        <li>• Wedding expenses</li>
                                        <li>• Down payment for home</li>
                                        <li>• Business capital</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2 text-sm">Investment Strategy:</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Hybrid funds (60% equity, 40% debt)</li>
                                        <li>• Balanced allocation</li>
                                        <li>• Expected return: 8-10% p.a.</li>
                                        <li>• Moderate risk acceptable</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Long Term */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-green-400">Long-Term Goals (7+ years)</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2 text-sm">Examples:</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Retirement corpus</li>
                                        <li>• Children's higher education</li>
                                        <li>• Children's wedding</li>
                                        <li>• Financial independence</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2 text-sm">Investment Strategy:</p>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Equity mutual funds (flexi cap, large cap)</li>
                                        <li>• Maximum growth potential</li>
                                        <li>• Expected return: 10-12% p.a.</li>
                                        <li>• Volatility acceptable (time to recover)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Retirement */}
                <section id="retirement" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <PiggyBank className="w-8 h-8 text-blue-400" />
                        3. Retirement Planning
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Retirement is your longest and most important financial goal. Start early to harness the power of compounding.
                    </p>

                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Retirement Corpus Calculation</h3>
                        
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2 text-sm">Step 1: Current Monthly Expenses</h4>
                                <p className="text-sm text-slate-300">Example: ₹50,000/month = ₹6,00,000/year</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2 text-sm">Step 2: Adjust for Inflation (25 years to retirement, 6% inflation)</h4>
                                <p className="text-sm text-slate-300">Future expenses = ₹6,00,000 × (1.06)^25 = ₹25,73,000/year</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2 text-sm">Step 3: Calculate Retirement Corpus (30 years retirement life)</h4>
                                <p className="text-sm text-slate-300">Assuming 7% post-retirement return, you need: ₹3.5 - 4 Crores</p>
                            </div>

                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                <h4 className="font-semibold mb-2 text-green-400">Step 4: Required Monthly SIP</h4>
                                <p className="text-sm text-slate-300">To accumulate ₹4 Cr in 25 years @ 12% return:</p>
                                <p className="text-xl font-bold text-green-400 mt-2">₹21,000/month SIP</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                        <h3 className="font-bold mb-3 text-amber-400">Retirement Planning Tips</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>✓ Start as early as possible (even ₹5,000/month at age 25 beats ₹25,000/month at 40)</li>
                            <li>✓ Use step-up SIP (increase by 10% annually with salary hikes)</li>
                            <li>✓ Don't dip into retirement funds for other goals</li>
                            <li>✓ Consider NPS for extra tax benefits (Section 80CCD)</li>
                            <li>✓ Review and rebalance every 5 years</li>
                        </ul>
                    </div>
                </section>

                {/* Section 4: Education */}
                <section id="education" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-purple-400" />
                        4. Children's Education Fund
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Education costs are rising faster than general inflation (10-12% annually). Plan early for stress-free education funding.
                    </p>

                    <div className="space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">Education Cost Estimates (Current)</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">India (Premium Institutions)</h4>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Engineering (IIT/NIT): ₹15-20 lakhs</li>
                                        <li>• Medical (MBBS): ₹50-80 lakhs (private)</li>
                                        <li>• MBA (IIM/ISB): ₹20-35 lakhs</li>
                                        <li>• Undergrad (private): ₹10-15 lakhs</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Abroad</h4>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• USA (Undergrad): ₹1-2 Crores</li>
                                        <li>• UK (Undergrad): ₹60-80 lakhs</li>
                                        <li>• USA (MBA): ₹1.5-2.5 Crores</li>
                                        <li>• Canada (Undergrad): ₹50-70 lakhs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Example: Engineering Education in 15 Years</h3>
                            <div className="space-y-3">
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="text-sm text-slate-300">Current cost: ₹20 lakhs</p>
                                    <p className="text-sm text-slate-300">Inflation: 10% p.a. (education-specific)</p>
                                    <p className="text-sm text-slate-300">Time: 15 years (child is 3 years old)</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="text-sm font-semibold mb-1">Future cost calculation:</p>
                                    <p className="text-sm text-slate-300">₹20L × (1.10)^15 = ₹83,50,000</p>
                                </div>
                                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                                    <p className="text-sm font-semibold mb-1 text-purple-400">Required monthly SIP @ 12% return:</p>
                                    <p className="text-2xl font-bold text-purple-400">₹15,500/month</p>
                                    <p className="text-xs text-slate-400 mt-2">Total investment: ₹27.9L | Future value: ₹83.5L</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h3 className="font-bold mb-3 text-blue-400">Education Planning Checklist</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✓ Start when child is born (or even before!)</li>
                                <li>✓ Use higher inflation rate (10-12% for education)</li>
                                <li>✓ Consider studying abroad costs if aspiring for foreign education</li>
                                <li>✓ Don't forget additional expenses (hostel, books, travel)</li>
                                <li>✓ Invest in equity mutual funds (long time horizon)</li>
                                <li>✓ Start debt allocation 3 years before need (reduce volatility)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 5: Home */}
                <section id="home" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Home className="w-8 h-8 text-amber-400" />
                        5. Home Purchase Planning
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Buying a home is a major financial milestone. Systematic planning ensures you have adequate down payment without loan burden.
                    </p>

                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Home Down Payment Goal</h3>
                        
                        <div className="space-y-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-sm text-slate-300 mb-2"><strong>Target home value:</strong> ₹1 Crore (in 7 years)</p>
                                <p className="text-sm text-slate-300"><strong>Required down payment:</strong> 20% = ₹20 lakhs</p>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-sm font-semibold mb-2">Investment Strategy:</p>
                                <ul className="text-sm text-slate-300 space-y-1">
                                    <li>• Years 1-4: 80% equity, 20% debt (aggressive)</li>
                                    <li>• Years 5-6: 60% equity, 40% debt (balanced)</li>
                                    <li>• Year 7: 40% equity, 60% debt (conservative)</li>
                                </ul>
                            </div>

                            <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4">
                                <p className="text-sm font-semibold mb-1 text-amber-400">Required Monthly SIP @ 10% return:</p>
                                <p className="text-2xl font-bold text-amber-400">₹18,500/month</p>
                                <p className="text-xs text-slate-400 mt-2">You'll have your ₹20L down payment ready!</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                            <h4 className="font-bold mb-3 text-green-400">✓ Smart Approach</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Save 20-30% down payment</li>
                                <li>• Reduces EMI burden</li>
                                <li>• Better loan terms & interest rates</li>
                                <li>• Financial cushion for interiors</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                            <h4 className="font-bold mb-3 text-red-400">✗ Common Mistake</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Taking 90% home loan</li>
                                <li>• High EMI (50%+ of income)</li>
                                <li>• Financial stress for 20-25 years</li>
                                <li>• No savings for other goals</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 6: Inflation */}
                <section id="inflation" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-red-400" />
                        6. Inflation & Time Value of Money
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Inflation is the silent wealth killer. Understanding it is crucial for realistic goal planning.
                    </p>

                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4 text-red-400">Inflation Impact Example</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-slate-700">
                                    <tr>
                                        <th className="text-left py-2">Today</th>
                                        <th className="text-left py-2">10 Years (6%)</th>
                                        <th className="text-left py-2">20 Years (6%)</th>
                                        <th className="text-left py-2">30 Years (6%)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-2">₹10,000</td>
                                        <td className="py-2">₹17,900</td>
                                        <td className="py-2">₹32,100</td>
                                        <td className="py-2">₹57,400</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-2">₹1,00,000</td>
                                        <td className="py-2">₹1,79,000</td>
                                        <td className="py-2">₹3,21,000</td>
                                        <td className="py-2">₹5,74,000</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">₹1 Crore</td>
                                        <td className="py-2">₹1.79 Cr</td>
                                        <td className="py-2">₹3.21 Cr</td>
                                        <td className="py-2">₹5.74 Cr</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">
                            <strong>Lesson:</strong> A ₹1 Crore retirement goal today will need ₹5.74 Crores in 30 years!
                        </p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-4">Recommended Inflation Rates</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li><strong>General expenses:</strong> 5-6%</li>
                                    <li><strong>Education:</strong> 10-12%</li>
                                    <li><strong>Healthcare:</strong> 10-15%</li>
                                </ul>
                            </div>
                            <div>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li><strong>Real estate:</strong> 6-8%</li>
                                    <li><strong>Lifestyle/travel:</strong> 7-8%</li>
                                    <li><strong>Luxury goods:</strong> 8-10%</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 7: Calculator */}
                <section id="calculator" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calculator className="w-8 h-8 text-indigo-400" />
                        7. Using the Goal Calculator
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Our Goal Planner makes complex calculations simple. Here's how to use it effectively:
                    </p>

                    <div className="space-y-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 1: Select Goal Type</h3>
                            <p className="text-sm text-slate-300 mb-3">Choose from pre-defined templates or create custom goal</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                                    <Heart className="w-5 h-5 mx-auto mb-1 text-pink-400" />
                                    <p className="text-xs">Retirement</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                                    <GraduationCap className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                                    <p className="text-xs">Education</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                                    <Home className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                                    <p className="text-xs">Home</p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                                    <Plane className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                                    <p className="text-xs">Vacation</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 2: Enter Goal Details</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• <strong>Target Amount:</strong> How much you need (today's value)</li>
                                <li>• <strong>Time Horizon:</strong> Years until you need the money</li>
                                <li>• <strong>Expected Return:</strong> Annual return rate (10-12% for equity)</li>
                                <li>• <strong>Inflation Rate:</strong> Adjust for rising costs</li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 3: Review Results</h3>
                            <p className="text-sm text-slate-300 mb-3">Calculator shows:</p>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>✓ Future value of your goal (inflation-adjusted)</li>
                                <li>✓ Required monthly SIP amount</li>
                                <li>✓ Total investment needed</li>
                                <li>✓ Wealth gain (returns - investment)</li>
                                <li>✓ Visual projection chart</li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="font-bold mb-3">Step 4: Track Multiple Goals</h3>
                            <p className="text-sm text-slate-300">
                                Add multiple goals to see total monthly SIP requirement. Prioritize goals and adjust allocations as needed.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 8: Tips */}
                <section id="tips" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-green-400" />
                        8. Goal Planning Best Practices
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                                <h3 className="font-bold mb-3 text-green-400">✓ Do's</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>✓ Start as early as possible</li>
                                    <li>✓ Be realistic with return expectations</li>
                                    <li>✓ Account for inflation generously</li>
                                    <li>✓ Review goals annually</li>
                                    <li>✓ Increase SIP with salary hikes (step-up)</li>
                                    <li>✓ Keep emergency fund separate</li>
                                    <li>✓ Diversify across multiple funds</li>
                                    <li>✓ Stay invested despite market volatility</li>
                                    <li>✓ Rebalance as goal approaches</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                                <h3 className="font-bold mb-3 text-red-400">✗ Don'ts</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    <li>✗ Don't underestimate inflation</li>
                                    <li>✗ Don't assume unrealistic returns (18%+)</li>
                                    <li>✗ Don't withdraw early for non-emergencies</li>
                                    <li>✗ Don't stop SIP during market crashes</li>
                                    <li>✗ Don't mix different goal funds</li>
                                    <li>✗ Don't ignore tax implications</li>
                                    <li>✗ Don't plan only one goal at a time</li>
                                    <li>✗ Don't forget to rebalance</li>
                                    <li>✗ Don't panic during volatility</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
                        <h3 className="font-bold mb-3 text-indigo-400">The 50-30-20 Rule for Goal Allocation</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="font-semibold mb-1">50% - Long Term</p>
                                <p className="text-slate-300 text-xs">Retirement, education (7+ years)</p>
                            </div>
                            <div>
                                <p className="font-semibold mb-1">30% - Medium Term</p>
                                <p className="text-slate-300 text-xs">Home, car, wedding (3-7 years)</p>
                            </div>
                            <div>
                                <p className="font-semibold mb-1">20% - Short Term</p>
                                <p className="text-slate-300 text-xs">Emergency fund, vacation (1-3 years)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Start Planning Your Financial Goals Today</h2>
                    <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                        Turn your dreams into reality with systematic goal-based investing. 
                        Calculate exactly how much you need to invest every month.
                    </p>
                    <Link
                        href="/analyzer/goals"
                        className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-colors"
                    >
                        <Target className="w-5 h-5" />
                        Plan Your Goals Now
                    </Link>
                </div>

                {/* Related Guides */}
                <div className="mt-12 pt-12 border-t border-slate-700">
                    <h3 className="text-xl font-bold mb-6">Related Guides</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/blog/sip-calculator-guide"
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-colors group"
                        >
                            <h4 className="font-bold mb-2 group-hover:text-green-400 transition-colors">SIP Calculator Guide</h4>
                            <p className="text-sm text-slate-400">Learn about SIP calculations and step-up strategies</p>
                        </Link>
                        <Link
                            href="/blog/portfolio-tracker-guide"
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-colors group"
                        >
                            <h4 className="font-bold mb-2 group-hover:text-green-400 transition-colors">Portfolio Tracker Guide</h4>
                            <p className="text-sm text-slate-400">Monitor your investments and track goal progress</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
