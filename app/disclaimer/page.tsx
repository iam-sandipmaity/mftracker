import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft, TrendingDown, Shield, XCircle, Info, Scale, DollarSign } from 'lucide-react';
import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Investment Disclaimer | MFTracker',
    description: 'Important investment disclaimer and risk warnings for MFTracker users. Understand the risks before using our mutual fund analysis tools.',
    openGraph: {
        title: 'Investment Disclaimer | MFTracker',
        description: 'Critical risk warnings and disclaimers for mutual fund investors.',
        url: getAbsoluteUrl('/disclaimer'),
    },
};

export default function Disclaimer() {
    const lastUpdated = "November 29, 2025";

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            Investment Disclaimer
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm mb-6">
                        Last Updated: {lastUpdated}
                    </p>

                    {/* Critical Warning Banner */}
                    <div className="bg-red-900/30 border-2 border-red-700/50 rounded-xl p-6 mb-6">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-bold text-red-400 mb-3">⚠️ CRITICAL: READ BEFORE USING</h2>
                                <p className="text-red-200 text-sm leading-relaxed mb-3">
                                    MFTracker is an <strong>analysis tool ONLY</strong>, not an investment advisor. We do NOT provide 
                                    investment advice, recommendations, or guarantees. All investments carry risk, including potential 
                                    loss of principal.
                                </p>
                                <p className="text-red-200 text-sm font-bold">
                                    YOU are solely responsible for your investment decisions. Please consult qualified financial 
                                    professionals before investing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-400" />
                            <h2 className="text-2xl font-bold text-white">1. No Investment Advice</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
                                <p className="text-red-300 font-semibold mb-2">We Are NOT:</p>
                                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1 ml-4">
                                    <li>SEBI registered investment advisors</li>
                                    <li>Financial planners or wealth managers</li>
                                    <li>Stock brokers or mutual fund distributors</li>
                                    <li>Tax consultants or legal advisors</li>
                                    <li>Providing personalized financial advice</li>
                                </ul>
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed">
                                <strong>MFTracker provides tools and information for analysis purposes only.</strong> Nothing on this 
                                platform should be construed as a recommendation to buy, sell, or hold any security or investment. 
                                All content is for educational and informational purposes.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingDown className="w-6 h-6 text-orange-400" />
                            <h2 className="text-2xl font-bold text-white">2. Investment Risks</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-orange-950/30 border border-orange-800/30 rounded-lg p-5">
                                <p className="text-orange-300 font-semibold mb-3">All Investments Involve Risk:</p>
                                <ul className="space-y-2 text-slate-300 text-sm">
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Market Risk:</strong> Mutual fund values fluctuate based on market conditions. You may lose money.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Volatility:</strong> Small-cap and sector funds can experience extreme volatility (40-60% drops).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Liquidity Risk:</strong> Some funds may have restrictions on redemptions or exit loads.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Credit Risk:</strong> Debt funds carry risk of default or downgrades.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <span><strong>Concentration Risk:</strong> Sector/thematic funds are highly concentrated and risky.</span>
                                    </li>
                                </ul>
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed">
                                <strong>Past performance is NOT indicative of future results.</strong> Historical returns shown in our 
                                tools do not guarantee future performance. Market conditions change, and returns can be negative.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white">3. Information Accuracy</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                            <p>
                                While we strive for accuracy, <strong>we make no guarantees</strong> about the accuracy, completeness, 
                                or timeliness of information provided:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Fund data may be outdated or incorrect</li>
                                <li>Calculations may contain errors or use simplified assumptions</li>
                                <li>NAV values may not be real-time or current</li>
                                <li>Categories and classifications may be inaccurate</li>
                                <li>Red flags and risk scores are algorithmic, not human expert analysis</li>
                            </ul>
                            <p className="mt-3 font-semibold text-yellow-300">
                                Always verify information independently before making investment decisions.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <DollarSign className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">4. No Guaranteed Returns</h2>
                        </div>
                        
                        <div className="bg-yellow-950/30 border border-yellow-800/30 rounded-lg p-5">
                            <p className="text-yellow-300 font-semibold mb-3">⚠️ Critical Understanding:</p>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li>• Mutual funds do NOT guarantee returns</li>
                                <li>• SIP calculators show <strong>projections</strong>, not promises</li>
                                <li>• Assumed returns (10%, 12%, 15%) are hypothetical</li>
                                <li>• Actual returns may be significantly lower or even negative</li>
                                <li>• Inflation-adjusted returns can differ from nominal returns</li>
                                <li>• Bull markets do not last forever; corrections happen</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">5. SEBI Regulations</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-purple-950/30 border border-purple-800/30 rounded-lg p-5">
                                <p className="text-purple-300 font-semibold mb-2">Regulatory Status:</p>
                                <p className="text-slate-300 text-sm mb-3">
                                    MFTracker is <strong>NOT registered with SEBI</strong> (Securities and Exchange Board of India) 
                                    as an investment advisor, portfolio manager, or research analyst.
                                </p>
                                <p className="text-slate-300 text-sm">
                                    We do not charge fees for investment advice because <strong>we do not provide investment advice</strong>. 
                                    Our tools are free and informational.
                                </p>
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed">
                                For personalized investment advice, please consult a <strong>SEBI-registered Investment Advisor (RIA)</strong> 
                                who is qualified and authorized to provide such services.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-2xl font-bold text-white">6. Your Responsibility</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                            <p className="font-semibold text-white">As a user, YOU are responsible for:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Conducting your own due diligence and research</li>
                                <li>Verifying all data and calculations independently</li>
                                <li>Understanding the risks of your investments</li>
                                <li>Making informed investment decisions</li>
                                <li>Consulting qualified professionals (financial advisors, tax consultants, lawyers)</li>
                                <li>Reading fund prospectuses and scheme documents</li>
                                <li>Understanding your risk tolerance and investment goals</li>
                                <li>Complying with tax laws and regulations</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-400" />
                            <h2 className="text-2xl font-bold text-white">7. Limitation of Liability</h2>
                        </div>
                        
                        <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-5">
                            <p className="text-red-300 font-semibold mb-3">We Are NOT Liable For:</p>
                            <ul className="list-disc list-inside text-slate-300 text-sm space-y-2 ml-4">
                                <li>Investment losses or missed opportunities</li>
                                <li>Errors or inaccuracies in data, calculations, or analysis</li>
                                <li>Decisions made based on our tools or content</li>
                                <li>Third-party fund performance or fund house issues</li>
                                <li>Market crashes, volatility, or economic downturns</li>
                                <li>Tax implications of your investments</li>
                                <li>Regulatory changes affecting your portfolio</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white">8. Third-Party Links</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Our platform may contain links to third-party websites or resources. We do not endorse, control, 
                            or take responsibility for their content, accuracy, or practices. Use third-party resources at your own risk.
                        </p>
                    </section>

                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-2xl font-bold text-white">9. Tax Implications & Tax Tools</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                            <p>
                                We provide <strong>Tax Optimizer</strong> and <strong>Income Tax Calculator</strong> tools for informational 
                                and educational purposes only. These tools:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Are NOT professional tax advice or tax planning services</li>
                                <li>Use simplified assumptions and may not reflect your actual tax situation</li>
                                <li>May not account for all deductions, exemptions, or recent tax law changes</li>
                                <li>Cannot replace consultation with a qualified Chartered Accountant or tax professional</li>
                                <li>Do not guarantee accuracy of tax calculations or optimization strategies</li>
                            </ul>
                            <p className="mt-3 font-semibold text-yellow-300">
                                Tax laws are complex and change frequently. We do NOT provide tax advice. <strong>Consult a qualified tax 
                                professional</strong> to understand your specific tax situation, obligations, and optimization opportunities.
                            </p>
                            <p className="mt-2">
                                Mutual fund investments have tax implications including capital gains tax (LTCG/STCG), dividend taxation, 
                                and more. We are not responsible for any tax liabilities, penalties, or missed deductions resulting from 
                                use of our tax tools.
                            </p>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">10. Goal Planning & Projections</h2>
                        </div>
                        
                        <div className="text-slate-300 text-sm leading-relaxed space-y-3">
                            <p>
                                Our <strong>Goal Planner</strong> tool provides projections and SIP recommendations based on assumptions:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Expected returns are hypothetical and not guaranteed</li>
                                <li>Inflation assumptions may differ from actual inflation rates</li>
                                <li>Market volatility is not fully reflected in projections</li>
                                <li>Goal achievement is not guaranteed and depends on market performance</li>
                            </ul>
                            <p className="mt-3">
                                <strong>Life goals are important.</strong> Our tool helps you plan, but cannot guarantee outcomes. 
                                Consult financial advisors for comprehensive goal-based financial planning.
                            </p>
                        </div>
                    </section>

                    {/* Section 11 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">11. Educational Purpose</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            MFTracker is designed to help you <strong>learn about</strong> portfolio analysis, understand mutual fund 
                            metrics, and make more informed decisions. It is an <strong>educational tool</strong>, not a substitute for 
                            professional financial advice.
                        </p>
                    </section>

                    {/* Final Warning */}
                    <section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-12 h-12 text-red-200 flex-shrink-0" />
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-white">Final Important Reminder</h2>
                                <div className="space-y-3 text-red-50 text-sm">
                                    <p className="font-semibold">
                                        Mutual fund investments are subject to market risks. Read all scheme-related documents carefully 
                                        before investing.
                                    </p>
                                    <p>
                                        <strong>YOU ALONE</strong> are responsible for your investment decisions and their outcomes. 
                                        MFTracker provides tools, not advice. Use professional advisors for personalized guidance.
                                    </p>
                                    <p className="font-bold text-base">
                                        By using MFTracker, you acknowledge that you have read, understood, and accept this disclaimer 
                                        in its entirety.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center">
                        <p className="text-slate-300 text-sm mb-3">
                            Questions about this disclaimer?
                        </p>
                        <a
                            href="mailto:legal@mftracker.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all"
                        >
                            Contact Us
                        </a>
                    </section>
                </div>
            </main>
        </div>
    );
}
