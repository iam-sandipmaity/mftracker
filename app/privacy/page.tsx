import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowLeft, Lock, Eye, Database, Globe, Mail, AlertTriangle } from 'lucide-react';
import { getAbsoluteUrl } from '@/lib/config';

export const metadata: Metadata = {
    title: 'Privacy Policy | MFTracker',
    description: 'Learn how MFTracker protects your privacy. All portfolio analysis happens in your browser - your data never leaves your device.',
    openGraph: {
        title: 'Privacy Policy | MFTracker',
        description: 'Your privacy is our priority. All analysis happens locally in your browser.',
        url: getAbsoluteUrl('/privacy'),
    },
};

export default function PrivacyPolicy() {
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
                        <div className="p-3 bg-indigo-500/20 rounded-xl">
                            <Shield className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">
                        Last Updated: {lastUpdated}
                    </p>
                    <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <Lock className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-lg font-bold text-emerald-400 mb-2">Your Privacy is Our Priority</h2>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    MFTracker is designed with privacy at its core. All portfolio analysis, calculations, and data 
                                    processing happen <strong>entirely in your browser</strong>. Your financial data never leaves your device, 
                                    is never sent to our servers, and is never stored by us.
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
                            <Database className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-2xl font-bold text-white">1. Data Collection & Storage</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">1.1 Portfolio & Financial Data</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    When you upload or enter data (portfolio holdings, SIP amounts, tax information, income details, goals):
                                </p>
                                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1 mt-2 ml-4">
                                    <li>Data is processed <strong>entirely in your browser</strong> using JavaScript</li>
                                    <li>No portfolio, tax, income, or financial data is transmitted to any server</li>
                                    <li>No financial data is stored in any database or cloud storage</li>
                                    <li>Data exists only in your browser's memory or local storage (if you choose to save it)</li>
                                    <li>Local storage data can be cleared anytime via browser settings or our "Clear Data" buttons</li>
                                    <li>Closing the browser tab without saving removes all session data permanently</li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                <h3 className="text-lg font-semibold text-white mb-2">1.2 Anonymous Usage Analytics</h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-2">
                                    We may collect anonymous analytics to improve the platform:
                                </p>
                                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1 ml-4">
                                    <li>Page views and navigation patterns</li>
                                    <li>Browser type and device information</li>
                                    <li>General location (country/region only)</li>
                                    <li>Feature usage statistics (which tools are used)</li>
                                </ul>
                                <p className="text-slate-400 text-xs mt-3 italic">
                                    Note: These analytics never include your portfolio data, fund names, amounts, or any personally identifiable financial information.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">1.3 Local Storage</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    We use browser local storage to enhance your experience:
                                </p>
                                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1 mt-2 ml-4">
                                    <li>Saving your preferences (theme, settings)</li>
                                    <li>Storing goal planning data (if you choose to save goals)</li>
                                    <li>Caching tax calculation inputs (if you choose to save tax data)</li>
                                    <li>Remembering portfolio holdings (if you choose to save your portfolio)</li>
                                    <li>All local storage data remains on your device and is never transmitted to servers</li>
                                    <li>You can clear this data anytime via browser settings or using "Clear All Data" buttons in our tools</li>
                                </ul>
                                <p className="text-yellow-300 text-sm mt-3 font-semibold">
                                    Note: Local storage is device-specific. Data saved on one device won't appear on another device.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-white">2. How We Use Information</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p><strong>Portfolio & Financial Data:</strong> Used exclusively for analysis in your browser. Never transmitted or stored on our servers.</p>
                            <p><strong>Tax & Income Data:</strong> Processed locally for tax calculations. Never sent to servers. Only stored in your browser's local storage if you choose to save it.</p>
                            <p><strong>Goal Planning Data:</strong> Stored locally in your browser if you choose to save goals. Can be exported as CSV/JSON for backup.</p>
                            <p><strong>Analytics Data:</strong> Used to understand how users interact with the platform, identify popular features, and improve user experience.</p>
                            <p><strong>Preference Data:</strong> Used to enhance your experience by remembering your settings locally.</p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">3. Third-Party Services</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-white font-semibold mb-2">We may use the following third-party services:</h3>
                                <ul className="space-y-3">
                                    <li className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                                        <p className="text-white font-semibold mb-1">Google Analytics (if enabled)</p>
                                        <p className="text-slate-300 text-sm">
                                            For anonymous usage tracking. No portfolio data is sent. You can opt-out using browser extensions or privacy settings.
                                        </p>
                                    </li>
                                    <li className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                                        <p className="text-white font-semibold mb-1">Vercel (Hosting)</p>
                                        <p className="text-slate-300 text-sm">
                                            Our website is hosted on Vercel. They may collect server logs (IP addresses, access times) as part of standard hosting practices.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-blue-400" />
                            <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
                        </div>
                        
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>
                                Since your portfolio data never leaves your browser, it's protected by your device's security. 
                                We recommend:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Using updated browsers with security patches</li>
                                <li>Avoiding public computers for financial analysis</li>
                                <li>Clearing browser data if using shared devices</li>
                                <li>Using HTTPS (our site is served over secure connections)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-pink-400" />
                            <h2 className="text-2xl font-bold text-white">5. Your Rights</h2>
                        </div>
                        
                        <div className="space-y-2 text-slate-300 text-sm">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Clear all local data by closing your browser or clearing browser storage</li>
                                <li>Opt-out of analytics using browser settings or extensions</li>
                                <li>Request information about what analytics we collect</li>
                                <li>Request deletion of any analytics data associated with your IP</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-2xl font-bold text-white">6. Cookies</h2>
                        </div>
                        
                        <div className="text-slate-300 text-sm space-y-2">
                            <p>We may use cookies for:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li><strong>Essential cookies:</strong> Required for the site to function</li>
                                <li><strong>Analytics cookies:</strong> To understand usage patterns (anonymous)</li>
                                <li><strong>Preference cookies:</strong> To remember your settings</li>
                            </ul>
                            <p className="mt-3">You can disable cookies in your browser settings, though this may affect functionality.</p>
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-indigo-400" />
                            <h2 className="text-2xl font-bold text-white">7. Children's Privacy</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            MFTracker is not intended for users under 18 years of age. We do not knowingly collect data from children. 
                            If you believe a child has provided us with information, please contact us immediately.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-emerald-400" />
                            <h2 className="text-2xl font-bold text-white">8. Changes to Privacy Policy</h2>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed">
                            We may update this privacy policy from time to time. Changes will be posted on this page with an updated 
                            "Last Updated" date. Continued use of the platform after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Contact Section */}
                    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center">
                        <Mail className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                        <h2 className="text-2xl font-bold mb-3">Questions About Privacy?</h2>
                        <p className="text-indigo-100 mb-6">
                            If you have any questions or concerns about how we handle privacy, please contact us.
                        </p>
                        <a
                            href="mailto:privacy@mftracker.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 rounded-xl font-semibold hover:bg-indigo-50 transition-all"
                        >
                            <Mail className="w-5 h-5" />
                            privacy@mftracker.com
                        </a>
                    </section>
                </div>
            </main>
        </div>
    );
}
