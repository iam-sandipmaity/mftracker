import { Metadata } from 'next';
import Link from 'next/link';
import {
    Calculator, TrendingUp, IndianRupee, Calendar, Users,
    Target, LineChart, ArrowLeft, BookOpen, AlertCircle, CheckCircle2, 
    FileText, Shield, HelpCircle, Building2, Receipt
} from 'lucide-react';

import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Income Tax Calculator Guide FY 2025-26 - Old vs New Regime | MFTracker',
    description: 'Complete guide to India income tax calculation for FY 2025-26. Learn how to calculate tax with all income sources, deductions (80C, 80D, 80E), HRA exemption, and choose between old vs new tax regime.',
    keywords: ['income tax calculator guide', 'FY 2025-26 tax calculation', '80C deductions explained', 'old vs new regime comparison', 'HRA exemption calculation', 'tax planning guide'],
    openGraph: {
        title: 'Income Tax Calculator Guide FY 2025-26 | MFTracker',
        description: 'Master income tax calculation with our comprehensive guide covering all income sources and deductions.',
        url: getAbsoluteUrl('/blog/income-tax-calculator-guide'),
    },
};

export default function IncomeTaxCalculatorGuide() {
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
                        <span className="text-sm font-semibold">Tax Guide • 10 min read</span>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Complete Income Tax Calculator Guide FY 2025-26
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Master income tax calculation with all income sources, deductions, and regime comparison. 
                        Learn how to minimize your tax liability legally and efficiently.
                    </p>
                </div>

                {/* Important Notice */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-12">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-amber-400 mb-2">Professional Tax Advice Disclaimer</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                This calculator provides estimates based on standard tax rules. For complex tax situations, 
                                personalized advice, or filing assistance, please consult a qualified Chartered Accountant or tax professional.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-12">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-indigo-400" />
                        Table of Contents
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li><a href="#getting-started" className="hover:text-indigo-400 transition-colors">1. Getting Started</a></li>
                        <li><a href="#income-sources" className="hover:text-indigo-400 transition-colors">2. All Income Sources Explained</a></li>
                        <li><a href="#deductions" className="hover:text-indigo-400 transition-colors">3. Understanding Deductions (80C, 80D, 80E, etc.)</a></li>
                        <li><a href="#hra-calculation" className="hover:text-indigo-400 transition-colors">4. HRA Exemption Calculation</a></li>
                        <li><a href="#family-details" className="hover:text-indigo-400 transition-colors">5. Family Details & Senior Citizen Benefits</a></li>
                        <li><a href="#regime-comparison" className="hover:text-indigo-400 transition-colors">6. Old vs New Tax Regime</a></li>
                        <li><a href="#interpretation" className="hover:text-indigo-400 transition-colors">7. Understanding Your Results</a></li>
                        <li><a href="#tips" className="hover:text-indigo-400 transition-colors">8. Tax Saving Tips</a></li>
                    </ul>
                </div>

                {/* Section 1: Getting Started */}
                <section id="getting-started" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-indigo-400" />
                        1. Getting Started
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Our Income Tax Calculator helps you estimate your tax liability for FY 2025-26 (AY 2026-27) 
                        with comprehensive support for all income types, deductions, and both tax regimes.
                    </p>

                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">What You'll Need</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-1" />
                                <div>
                                    <h4 className="font-semibold mb-1">Income Details</h4>
                                    <p className="text-sm text-slate-300">Form 16, salary slips, business income records</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-1" />
                                <div>
                                    <h4 className="font-semibold mb-1">Investment Proofs</h4>
                                    <p className="text-sm text-slate-300">PPF, ELSS, insurance premium receipts</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-1" />
                                <div>
                                    <h4 className="font-semibold mb-1">Deduction Documents</h4>
                                    <p className="text-sm text-slate-300">Medical insurance, education loan statements</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-1" />
                                <div>
                                    <h4 className="font-semibold mb-1">Property Details</h4>
                                    <p className="text-sm text-slate-300">Rent receipts, home loan interest certificates</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Income Sources */}
                <section id="income-sources" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <IndianRupee className="w-8 h-8 text-green-400" />
                        2. All Income Sources Explained
                    </h2>

                    <div className="space-y-6">
                        {/* Salary Income */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <Receipt className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">Salary Income</h3>
                                    <p className="text-slate-300 mb-3">
                                        Your annual gross salary including basic pay, allowances, and bonuses.
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                                        <p className="text-sm text-slate-300 mb-2"><span className="font-semibold">Includes:</span></p>
                                        <ul className="text-sm text-slate-400 space-y-1 ml-4">
                                            <li>• Basic Salary + DA (Dearness Allowance)</li>
                                            <li>• HRA (House Rent Allowance) - before exemption</li>
                                            <li>• Special Allowances (transport, conveyance, etc.)</li>
                                            <li>• Performance bonuses and incentives</li>
                                            <li>• Leave encashment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HRA */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-amber-500/20 rounded-lg">
                                    <Building2 className="w-6 h-6 text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">House Rent Allowance (HRA)</h3>
                                    <p className="text-slate-300 mb-3">
                                        HRA received from employer can be partially or fully exempt from tax.
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                                        <p className="text-sm font-semibold text-amber-400 mb-2">Exemption Formula (Minimum of):</p>
                                        <ul className="text-sm text-slate-300 space-y-1 ml-4">
                                            <li>1. Actual HRA received</li>
                                            <li>2. 50% of salary (metro) or 40% (non-metro)</li>
                                            <li>3. Rent paid minus 10% of salary</li>
                                        </ul>
                                        <p className="text-xs text-slate-400 mt-3">
                                            <strong>Note:</strong> You must be living in rented accommodation and paying rent
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business/Professional Income */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">Business/Professional Income</h3>
                                    <p className="text-slate-300">
                                        Net profit from business, freelancing, or professional practice after deducting business expenses.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Capital Gains */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-500/20 rounded-lg">
                                    <LineChart className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-2">Capital Gains (STCG + LTCG)</h3>
                                    <p className="text-slate-300 mb-3">
                                        Profit from sale of assets like stocks, mutual funds, property, etc.
                                    </p>
                                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                                        <p className="text-sm text-slate-300 mb-2">
                                            <span className="font-semibold text-green-400">Short-term (STCG):</span> Assets held &lt;12 months (equity) or &lt;36 months (debt/property)
                                        </p>
                                        <p className="text-sm text-slate-300">
                                            <span className="font-semibold text-green-400">Long-term (LTCG):</span> Assets held longer than above periods
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Income Sources */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                                <h4 className="font-bold mb-2">Rental Income</h4>
                                <p className="text-sm text-slate-300">Income from house property (rent received minus municipal taxes)</p>
                            </div>
                            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                                <h4 className="font-bold mb-2">Interest Income</h4>
                                <p className="text-sm text-slate-300">Interest from savings account, FD, bonds, etc.</p>
                            </div>
                            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                                <h4 className="font-bold mb-2">Agricultural Income</h4>
                                <p className="text-sm text-slate-300">Income from agricultural land (generally exempt but used for rate calculation)</p>
                            </div>
                            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                                <h4 className="font-bold mb-2">Other Sources</h4>
                                <p className="text-sm text-slate-300">Gifts, lottery, dividends, etc.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Deductions */}
                <section id="deductions" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-purple-400" />
                        3. Understanding Deductions
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Deductions reduce your taxable income, thereby lowering your tax liability. 
                        Here are the major deductions available under the old tax regime:
                    </p>

                    <div className="space-y-6">
                        {/* Section 80C */}
                        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h3 className="text-2xl font-bold mb-4 text-purple-400">Section 80C - ₹1,50,000</h3>
                            <p className="text-slate-300 mb-4">
                                The most popular deduction with maximum limit of ₹1.5 lakh per financial year.
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-slate-800/50 rounded-lg p-3">
                                    <h4 className="font-semibold text-sm mb-2">Investment Options:</h4>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• PPF (Public Provident Fund)</li>
                                        <li>• EPF (Employee Provident Fund)</li>
                                        <li>• ELSS Mutual Funds</li>
                                        <li>• NSC (National Savings Certificate)</li>
                                        <li>• Tax-saving FD (5-year)</li>
                                        <li>• Sukanya Samriddhi Yojana</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-3">
                                    <h4 className="font-semibold text-sm mb-2">Payments:</h4>
                                    <ul className="text-sm text-slate-300 space-y-1">
                                        <li>• Life insurance premium</li>
                                        <li>• Home loan principal repayment</li>
                                        <li>• Tuition fees (children's education)</li>
                                        <li>• Stamp duty & registration (property)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section 80D */}
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">Section 80D - Medical Insurance</h3>
                            <div className="space-y-3">
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="font-semibold mb-2">For Self, Spouse & Children:</p>
                                    <p className="text-slate-300 text-sm">₹25,000 (below 60 years) | ₹50,000 (senior citizen)</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="font-semibold mb-2">For Parents:</p>
                                    <p className="text-slate-300 text-sm">Additional ₹25,000 (below 60) | ₹50,000 (senior citizen)</p>
                                </div>
                                <div className="bg-slate-800/50 rounded-lg p-4">
                                    <p className="font-semibold mb-2">Preventive Health Checkup:</p>
                                    <p className="text-slate-300 text-sm">₹5,000 (included in above limits)</p>
                                </div>
                            </div>
                        </div>

                        {/* Other Deductions */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                                <h4 className="font-bold mb-2 text-green-400">Section 80E</h4>
                                <p className="text-sm text-slate-300 mb-2">Education Loan Interest</p>
                                <p className="text-xs text-slate-400">No upper limit. Interest paid on education loan for self, spouse, or children.</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                                <h4 className="font-bold mb-2 text-amber-400">Section 80G</h4>
                                <p className="text-sm text-slate-300 mb-2">Donations to Charity</p>
                                <p className="text-xs text-slate-400">50% or 100% of donation amount (depends on organization)</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                                <h4 className="font-bold mb-2 text-indigo-400">Section 24</h4>
                                <p className="text-sm text-slate-300 mb-2">Home Loan Interest</p>
                                <p className="text-xs text-slate-400">Up to ₹2,00,000 for self-occupied property</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                                <h4 className="font-bold mb-2 text-purple-400">NPS (80CCD(1B))</h4>
                                <p className="text-sm text-slate-300 mb-2">Additional NPS Deduction</p>
                                <p className="text-xs text-slate-400">Extra ₹50,000 over and above 80C limit</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: HRA Calculation */}
                <section id="hra-calculation" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-amber-400" />
                        4. HRA Exemption Calculation
                    </h2>

                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-xl font-bold mb-4">Step-by-Step Example</h3>
                        <div className="space-y-3">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-sm text-slate-400 mb-1">Given:</p>
                                <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• Basic Salary: ₹50,000/month</li>
                                    <li>• HRA Received: ₹20,000/month</li>
                                    <li>• Rent Paid: ₹18,000/month</li>
                                    <li>• City: Mumbai (Metro)</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="text-sm font-semibold mb-2">Calculation:</p>
                                <ul className="text-slate-300 space-y-2 text-sm">
                                    <li>1. Actual HRA received = ₹2,40,000/year</li>
                                    <li>2. 50% of salary (metro) = ₹3,00,000/year</li>
                                    <li>3. Rent - 10% of salary = ₹2,16,000 - ₹60,000 = ₹1,56,000</li>
                                </ul>
                            </div>
                            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                <p className="font-bold text-green-400">HRA Exemption = ₹1,56,000 (Minimum of above three)</p>
                                <p className="text-sm text-slate-300 mt-2">Taxable HRA = ₹2,40,000 - ₹1,56,000 = ₹84,000</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Family Details */}
                <section id="family-details" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Users className="w-8 h-8 text-pink-400" />
                        5. Family Details & Benefits
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Age-Based Tax Benefits</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <p className="font-bold mb-2">Below 60 years</p>
                                    <p className="text-2xl font-bold text-blue-400">₹2.5L</p>
                                    <p className="text-xs text-slate-400 mt-1">Basic exemption limit</p>
                                </div>
                                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                    <p className="font-bold mb-2">60-80 years</p>
                                    <p className="text-2xl font-bold text-purple-400">₹3L</p>
                                    <p className="text-xs text-slate-400 mt-1">Senior citizen</p>
                                </div>
                                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                                    <p className="font-bold mb-2">Above 80 years</p>
                                    <p className="text-2xl font-bold text-pink-400">₹5L</p>
                                    <p className="text-xs text-slate-400 mt-1">Super senior citizen</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">HUF (Hindu Undivided Family)</h3>
                            <p className="text-slate-300 mb-3">
                                HUF is a separate tax entity. If you have HUF income, it's taxed separately with its own exemption limits.
                            </p>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                                <p className="text-sm text-slate-300">
                                    <strong>Benefits:</strong> Additional tax exemption, separate deduction limits (80C, 80D, etc.), 
                                    can invest in business, property ownership
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 6: Regime Comparison */}
                <section id="regime-comparison" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Calculator className="w-8 h-8 text-indigo-400" />
                        6. Old vs New Tax Regime
                    </h2>

                    <p className="text-slate-300 mb-6 leading-relaxed">
                        Since FY 2020-21, taxpayers can choose between two tax regimes. Each has pros and cons.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Old Regime */}
                        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Old Tax Regime</h3>
                            
                            <div className="mb-4">
                                <p className="font-semibold text-sm mb-2">Tax Slabs:</p>
                                <div className="space-y-1 text-sm text-slate-300">
                                    <p>₹0 - ₹2.5L: <span className="font-semibold">Nil</span></p>
                                    <p>₹2.5L - ₹5L: <span className="font-semibold">5%</span></p>
                                    <p>₹5L - ₹10L: <span className="font-semibold">20%</span></p>
                                    <p>Above ₹10L: <span className="font-semibold">30%</span></p>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="font-semibold text-sm mb-2 text-green-400">✓ Pros:</p>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• All deductions available (80C, 80D, etc.)</li>
                                    <li>• HRA exemption allowed</li>
                                    <li>• Better for those with investments</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4 mt-3">
                                <p className="font-semibold text-sm mb-2 text-red-400">✗ Cons:</p>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• Higher tax rates</li>
                                    <li>• Requires tax planning</li>
                                </ul>
                            </div>
                        </div>

                        {/* New Regime */}
                        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">New Tax Regime</h3>
                            
                            <div className="mb-4">
                                <p className="font-semibold text-sm mb-2">Tax Slabs (FY 2025-26):</p>
                                <div className="space-y-1 text-sm text-slate-300">
                                    <p>₹0 - ₹3L: <span className="font-semibold">Nil</span></p>
                                    <p>₹3L - ₹7L: <span className="font-semibold">5%</span></p>
                                    <p>₹7L - ₹10L: <span className="font-semibold">10%</span></p>
                                    <p>₹10L - ₹12L: <span className="font-semibold">15%</span></p>
                                    <p>₹12L - ₹15L: <span className="font-semibold">20%</span></p>
                                    <p>Above ₹15L: <span className="font-semibold">30%</span></p>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded-lg p-4">
                                <p className="font-semibold text-sm mb-2 text-green-400">✓ Pros:</p>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• Lower tax rates</li>
                                    <li>• Simpler (no deduction tracking)</li>
                                    <li>• Standard deduction ₹50K allowed</li>
                                    <li>• Better for low investors</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/50 rounded-lg p-4 mt-3">
                                <p className="font-semibold text-sm mb-2 text-red-400">✗ Cons:</p>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• Most deductions not allowed</li>
                                    <li>• No HRA exemption</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                        <h3 className="font-bold mb-3 text-amber-400">Which Regime to Choose?</h3>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p>✓ Choose <strong>Old Regime</strong> if you have significant investments (80C), medical insurance (80D), home loan</p>
                            <p>✓ Choose <strong>New Regime</strong> if you don't invest much and want simplicity</p>
                            <p>✓ Use our calculator's <strong>"Compare Regimes"</strong> feature to see which saves you more tax!</p>
                        </div>
                    </div>
                </section>

                {/* Section 7: Interpretation */}
                <section id="interpretation" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <LineChart className="w-8 h-8 text-green-400" />
                        7. Understanding Your Results
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">Key Metrics Explained</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-1">Gross Total Income</h4>
                                    <p className="text-sm text-slate-300">Sum of all your income sources before any deductions</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Total Deductions</h4>
                                    <p className="text-sm text-slate-300">Sum of all Chapter VI-A deductions (80C, 80D, etc.)</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Taxable Income</h4>
                                    <p className="text-sm text-slate-300">Gross Total Income minus Total Deductions</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Tax Before Rebate</h4>
                                    <p className="text-sm text-slate-300">Tax calculated on taxable income as per slab rates</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Surcharge</h4>
                                    <p className="text-sm text-slate-300">Additional tax for high earners (10% if income &gt; ₹50L, 15% if &gt; ₹1Cr)</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Health & Education Cess</h4>
                                    <p className="text-sm text-slate-300">4% of (Tax + Surcharge)</p>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                    <h4 className="font-semibold mb-1 text-green-400">Total Tax Liability</h4>
                                    <p className="text-sm text-slate-300">Final tax payable after adding surcharge and cess</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Effective Tax Rate</h4>
                                    <p className="text-sm text-slate-300">Percentage of your total income that goes to tax (Total Tax ÷ Gross Income × 100)</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3">Visual Charts</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li><strong>Income Sources Pie Chart:</strong> Shows breakdown of all income types</li>
                                <li><strong>Regime Comparison Bar Chart:</strong> Side-by-side tax comparison</li>
                                <li><strong>Tax Slabs Table:</strong> Detailed slab-wise tax calculation</li>
                                <li><strong>Effective Rate Comparison:</strong> See which regime gives lower effective tax rate</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 8: Tips */}
                <section id="tips" className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <Target className="w-8 h-8 text-amber-400" />
                        8. Tax Saving Tips
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                            <h3 className="font-bold mb-3 text-green-400">✓ Smart Strategies</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Maximize 80C (₹1.5L) with ELSS, PPF, EPF</li>
                                <li>• Take medical insurance for 80D deduction</li>
                                <li>• Use NPS for extra ₹50K deduction (80CCD 1B)</li>
                                <li>• Claim HRA if living in rented house</li>
                                <li>• Keep home loan for interest deduction (Section 24)</li>
                                <li>• Plan donations strategically (80G)</li>
                                <li>• Compare both regimes before choosing</li>
                                <li>• Start tax planning early in the financial year</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                            <h3 className="font-bold mb-3 text-red-400">✗ Common Mistakes</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Last-minute investments (rushed decisions)</li>
                                <li>• Not comparing both tax regimes</li>
                                <li>• Forgetting to claim HRA exemption</li>
                                <li>• Not keeping investment proofs</li>
                                <li>• Ignoring small deductions (preventive checkup)</li>
                                <li>• Not declaring all income sources</li>
                                <li>• Choosing regime once and never reviewing</li>
                                <li>• Not consulting CA for complex situations</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
                        <h3 className="font-bold mb-3 text-indigo-400">Pro Tip: Export Your Tax Report</h3>
                        <p className="text-sm text-slate-300">
                            Use the <strong>Export to CSV</strong> button to download your complete tax calculation. 
                            This helps during actual ITR filing and serves as a reference for financial planning.
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Calculate Your Tax?</h2>
                    <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                        Use our comprehensive Income Tax Calculator to estimate your tax liability, 
                        compare regimes, and make informed tax planning decisions.
                    </p>
                    <Link
                        href="/analyzer/tax-calculator"
                        className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
                    >
                        <Calculator className="w-5 h-5" />
                        Calculate Your Tax Now
                    </Link>
                </div>

                {/* Related Guides */}
                <div className="mt-12 pt-12 border-t border-slate-700">
                    <h3 className="text-xl font-bold mb-6">Related Guides</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/blog/tax-optimizer-guide"
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors group"
                        >
                            <h4 className="font-bold mb-2 group-hover:text-indigo-400 transition-colors">Tax Optimizer Guide</h4>
                            <p className="text-sm text-slate-400">Learn about capital gains tax and tax-loss harvesting</p>
                        </Link>
                        <Link
                            href="/blog/goal-planner-guide"
                            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-colors group"
                        >
                            <h4 className="font-bold mb-2 group-hover:text-indigo-400 transition-colors">Goal Planning Guide</h4>
                            <p className="text-sm text-slate-400">Plan your financial goals with SIP calculator</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
