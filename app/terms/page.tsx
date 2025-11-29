import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, AlertTriangle, Shield, Scale, XCircle, CheckCircle } from 'lucide-react';
import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Terms of Service | MFTracker',
    description: 'Terms and conditions for using MFTracker - a free mutual fund portfolio analysis platform.',
    openGraph: {
        title: 'Terms of Service | MFTracker',
        description: 'Terms and conditions for using MFTracker services.',
        url: getAbsoluteUrl('/terms'),
    },
};

export default function TermsOfService() {
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
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <FileText className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                            Terms of Service
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">
                        Last Updated: {lastUpdated}
                    </p>
                    <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-6">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Welcome to MFTracker. By accessing or using our platform, you agree to be bound by these Terms of Service. 
                            Please read them carefully before using our services.
                        </p>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                            <p>
                                By accessing MFTracker ("the Service", "we", "us", or "our"), you accept and agree to be bound by 
                                these Terms of Service and our Privacy Policy.
                            </p>
                            <p>
                                If you do not agree to these terms, please do not use the Service.
                            </p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-2xl font-bold text-white">2. Description of Service</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>MFTracker provides:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Portfolio analysis tools for mutual fund investments</li>
                                <li>SIP (Systematic Investment Plan) calculators</li>
                                <li>Goal planning and tracking tools</li>
                                <li>Tax optimization and income tax calculation tools</li>
                                <li>Portfolio rebalancing recommendations</li>
                                <li>Mutual fund search and comparison features</li>
                                <li>Risk assessment and red-flag detection</li>
                                <li>Educational guides and resources</li>
                            </ul>
                            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 mt-4">
                                <p className="text-yellow-300 font-semibold mb-2">Important:</p>
                                <p className="text-slate-300 text-sm">
                                    All services are provided <strong>for informational and educational purposes only</strong> and do not constitute 
                                    financial, investment, tax, or legal advice. Tax calculations and optimization suggestions are based on 
                                    simplified assumptions and may not reflect your actual situation.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white">3. User Responsibilities</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>You agree to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Use the Service only for lawful purposes</li>
                                <li>Provide accurate information when using our tools</li>
                                <li>Not attempt to harm, disrupt, or compromise the Service</li>
                                <li>Not use automated systems to access the Service without permission</li>
                                <li>Not reverse engineer, decompile, or extract source code</li>
                                <li>Not use the Service for commercial purposes without authorization</li>
                                <li>Make your own investment decisions and consult qualified professionals</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-400" />
                            <h2 className="text-2xl font-bold text-white">4. Prohibited Uses</h2>
                        </div>
                        
                        <div className="space-y-2 text-slate-300 text-sm">
                            <p>You may NOT:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Copy, reproduce, or redistribute our content without permission</li>
                                <li>Use the Service to provide financial advice to others commercially</li>
                                <li>Upload malicious code or attempt to breach security</li>
                                <li>Impersonate MFTracker or claim affiliation</li>
                                <li>Scrape data or use bots to access the Service</li>
                                <li>Violate any applicable laws or regulations</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-2xl font-bold text-white">5. Disclaimer of Warranties</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                                <p className="font-semibold text-yellow-300 mb-2">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE"</p>
                                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                                    <li>We make no warranties about accuracy, reliability, or availability</li>
                                    <li>We do not guarantee error-free or uninterrupted service</li>
                                    <li>Calculations are based on assumptions and may contain errors</li>
                                    <li>We are not responsible for investment decisions made using our tools</li>
                                    <li>Past performance data does not guarantee future results</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-red-400" />
                            <h2 className="text-2xl font-bold text-white">6. Limitation of Liability</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                                <p className="font-semibold text-red-300 mb-3">
                                    TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>
                                        We are NOT liable for any investment losses, financial damages, or opportunity costs 
                                        resulting from use of the Service
                                    </li>
                                    <li>
                                        We are NOT liable for errors, omissions, or inaccuracies in calculations or data
                                    </li>
                                    <li>
                                        We are NOT liable for service interruptions, data loss, or technical failures
                                    </li>
                                    <li>
                                        Our total liability shall not exceed ₹100 (one hundred rupees) or the amount you paid 
                                        to use the Service (which is zero for free users)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">7. Intellectual Property</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>
                                All content, features, and functionality of MFTracker (including but not limited to text, graphics, 
                                logos, code, and algorithms) are owned by MFTracker or its licensors and are protected by copyright, 
                                trademark, and other intellectual property laws.
                            </p>
                            <p>
                                You may not reproduce, distribute, modify, or create derivative works without explicit permission.
                            </p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-orange-400" />
                            <h2 className="text-2xl font-bold text-white">8. SEBI Compliance</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                            <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4">
                                <p className="font-semibold text-orange-300 mb-2">Important Regulatory Notice:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>
                                        MFTracker is <strong>NOT a SEBI registered investment advisor</strong>
                                    </li>
                                    <li>
                                        We do NOT provide personalized investment advice or recommendations
                                    </li>
                                    <li>
                                        We do NOT manage portfolios or execute trades on your behalf
                                    </li>
                                    <li>
                                        All tools are for informational and educational purposes only
                                    </li>
                                    <li>
                                        You should consult SEBI-registered advisors for investment decisions
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">9. Indemnification</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            You agree to indemnify, defend, and hold harmless MFTracker, its creators, employees, and affiliates 
                            from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your 
                            use of the Service or violation of these Terms.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white">10. Changes to Terms</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            We reserve the right to modify these Terms at any time. Changes will be posted on this page with an 
                            updated "Last Updated" date. Continued use of the Service after changes constitutes acceptance of the 
                            modified Terms.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-400" />
                            <h2 className="text-2xl font-bold text-white">11. Termination</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>We may terminate or suspend access to the Service:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Immediately, without notice, for violation of these Terms</li>
                                <li>At our discretion, for any reason or no reason</li>
                                <li>Due to technical, legal, or security concerns</li>
                            </ul>
                            <p className="mt-3">
                                You may stop using the Service at any time. Since we don't store your portfolio data, 
                                simply closing your browser ends your session completely.
                            </p>
                        </div>
                    </section>

                    {/* Section 12 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-2xl font-bold text-white">12. Governing Law</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of India. 
                            Any disputes arising from these Terms or use of the Service shall be subject to the exclusive 
                            jurisdiction of the courts in [Your City], India.
                        </p>
                    </section>

                    {/* Section 13 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">13. Severability</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions 
                            shall remain in full force and effect.
                        </p>
                    </section>

                    {/* Section 14 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">14. Contact Information</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            For questions about these Terms of Service, please contact us at:
                        </p>
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                            <p className="text-white">Email: <a href="mailto:legal@mftracker.com" className="text-indigo-400 hover:text-indigo-300">legal@mftracker.com</a></p>
                            <p className="text-white mt-2">Website: <a href="https://mftracker-ten.vercel.app" className="text-indigo-400 hover:text-indigo-300">mftracker-ten.vercel.app</a></p>
                        </div>
                    </section>

                    {/* Acknowledgment */}
                    <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
                        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-purple-200" />
                        <h2 className="text-2xl font-bold mb-3">By Using MFTracker, You Acknowledge:</h2>
                        <ul className="text-left text-purple-100 text-sm space-y-2 max-w-2xl mx-auto">
                            <li>✓ You have read and understood these Terms</li>
                            <li>✓ You agree to be bound by these Terms</li>
                            <li>✓ You understand this is NOT investment advice</li>
                            <li>✓ You will make your own informed decisions</li>
                            <li>✓ You accept all risks associated with your investments</li>
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}
