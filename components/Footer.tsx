import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart, TrendingUp, Calculator, Target, BarChart3, BookOpen, FileText } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const tools = [
        { name: 'Portfolio Tracker', href: '/analyzer/tracker', icon: BarChart3 },
        { name: 'SIP Calculator', href: '/analyzer/calculator', icon: Calculator },
        { name: 'Smart Rebalancer', href: '/analyzer/rebalancer', icon: Target },
    ];

    const resources = [
        { name: 'All Guides', href: '/blog' },
        { name: 'Portfolio Tracker Guide', href: '/blog/portfolio-tracker-guide' },
        { name: 'SIP Calculator Guide', href: '/blog/sip-calculator-guide' },
        { name: 'Rebalancer Guide', href: '/blog/rebalancer-guide' },
        { name: 'Portfolio Rules', href: '/blog/portfolio-rules' },
        { name: 'Red Flags Explained', href: '/blog/red-flags-explained' },
    ];

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Analyzer Tools', href: '/analyzer' },
        { name: 'Formulas & Methodology', href: '/formula' },
    ];

    return (
        <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-black border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-6 h-6 text-indigo-400" />
                            <h3 className="text-xl font-bold text-white">MFTracker</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Professional mutual fund portfolio analysis tools. Track investments, calculate returns, and optimize your portfolio—100% free and private.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://twitter.com/mftracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5 text-slate-400 hover:text-indigo-400" />
                            </a>
                            <a
                                href="https://github.com/yourusername/mftracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5 text-slate-400 hover:text-indigo-400" />
                            </a>
                            <a
                                href="https://linkedin.com/company/mftracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5 text-slate-400 hover:text-indigo-400" />
                            </a>
                            <a
                                href="mailto:contact@mftracker.com"
                                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5 text-slate-400 hover:text-indigo-400" />
                            </a>
                        </div>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-indigo-400" />
                            Tools
                        </h3>
                        <ul className="space-y-2">
                            {tools.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <li key={tool.href}>
                                        <Link
                                            href={tool.href}
                                            className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-2 group"
                                        >
                                            <Icon className="w-4 h-4 group-hover:text-indigo-400" />
                                            {tool.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Learning Resources */}
                    <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-400" />
                            Learn
                        </h3>
                        <ul className="space-y-2">
                            {resources.map((resource) => (
                                <li key={resource.href}>
                                    <Link
                                        href={resource.href}
                                        className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                                    >
                                        {resource.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-400" />
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 pt-6 border-t border-slate-800">
                            <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/privacy" className="text-slate-400 hover:text-indigo-400 transition-colors text-xs">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-slate-400 hover:text-indigo-400 transition-colors text-xs">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/disclaimer" className="text-slate-400 hover:text-indigo-400 transition-colors text-xs">
                                        Disclaimer
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="border-t border-slate-800 pt-8 pb-6">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                        <p className="text-amber-200 text-xs leading-relaxed">
                            <strong>Investment Disclaimer:</strong> MFTracker is an analysis tool and does not provide investment advice. 
                            Past performance does not guarantee future results. All investments carry risk. Please consult a qualified 
                            financial advisor before making investment decisions. We are not SEBI registered advisors.
                        </p>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>© {currentYear} MFTracker. All rights reserved.</span>
                        </div>

                        {/* Creator Credit */}
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400">Created with</span>
                            <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
                            <span className="text-slate-400">by</span>
                            <a
                                href="https://sandipmaity.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors hover:underline"
                            >
                                Sandip Maity
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
