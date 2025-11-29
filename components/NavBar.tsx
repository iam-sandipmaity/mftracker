'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
    Home, BarChart3, Calculator, TrendingUp, BookOpen, Search, 
    Target, Receipt, DollarSign, ChevronDown, Menu, X, Sparkles 
} from 'lucide-react';

export default function NavBar() {
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const tools = [
        { href: '/analyzer/tracker', label: 'Portfolio Tracker', icon: BarChart3, description: 'Analyze & track your portfolio' },
        { href: '/analyzer/calculator', label: 'SIP Calculator', icon: Calculator, description: 'Calculate SIP returns' },
        { href: '/analyzer/goals', label: 'Goal Planner', icon: Target, description: 'Plan & track financial goals' },
        { href: '/analyzer/tax-optimizer', label: 'Tax Optimizer', icon: Receipt, description: 'Optimize LTCG/STCG taxes' },
        { href: '/analyzer/tax-calculator', label: 'Income Tax Calculator', icon: DollarSign, description: 'Calculate income tax' },
        { href: '/analyzer/rebalancer', label: 'Smart Rebalancer', icon: TrendingUp, description: 'AI-powered rebalancing' },
    ];

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 backdrop-blur-sm border-b border-indigo-500/20 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-white font-bold text-lg leading-tight">MFTracker</div>
                                <div className="text-indigo-300 text-xs font-medium">Portfolio Health Analyzer</div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        <Link 
                            href="/" 
                            className="px-4 py-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Link>

                        {/* Tools Dropdown */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setIsToolsOpen(true)}
                                onMouseLeave={() => setIsToolsOpen(false)}
                                className="px-4 py-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                Tools
                                <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isToolsOpen && (
                                <div
                                    onMouseEnter={() => setIsToolsOpen(true)}
                                    onMouseLeave={() => setIsToolsOpen(false)}
                                    className="absolute top-full left-0 mt-1 w-80 bg-slate-900 border border-indigo-500/30 rounded-xl shadow-2xl overflow-hidden"
                                >
                                    <div className="p-2">
                                        {tools.map((tool) => {
                                            const Icon = tool.icon;
                                            return (
                                                <Link
                                                    key={tool.href}
                                                    href={tool.href}
                                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-600/20 transition-colors group"
                                                >
                                                    <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                                                        <Icon className="w-5 h-5 text-indigo-400" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-white font-semibold text-sm">{tool.label}</div>
                                                        <div className="text-indigo-300 text-xs mt-0.5">{tool.description}</div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                    <div className="border-t border-indigo-500/20 p-3 bg-indigo-950/30">
                                        <Link
                                            href="/analyzer"
                                            className="text-center block text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors"
                                        >
                                            View All Tools →
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link 
                            href="/mf-search" 
                            className="px-4 py-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            MF Search
                        </Link>

                        <Link 
                            href="/compare" 
                            className="px-4 py-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                        >
                            <BarChart3 className="w-4 h-4" />
                            Compare
                        </Link>

                        <Link 
                            href="/blog" 
                            className="px-4 py-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                        >
                            <BookOpen className="w-4 h-4" />
                            Guides
                        </Link>

                        <Link 
                            href="/analyzer" 
                            className="ml-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden pb-4 border-t border-indigo-500/20 mt-2">
                        <div className="space-y-1 mt-2">
                            <Link 
                                href="/" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                <Home className="w-5 h-5" />
                                Home
                            </Link>

                            <div className="px-4 py-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                                Analysis Tools
                            </div>

                            {tools.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <Link
                                        key={tool.href}
                                        href={tool.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                    >
                                        <Icon className="w-5 h-5" />
                                        <div>
                                            <div className="font-medium">{tool.label}</div>
                                            <div className="text-xs text-indigo-400">{tool.description}</div>
                                        </div>
                                    </Link>
                                );
                            })}

                            <div className="px-4 py-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mt-4">
                                Other Features
                            </div>

                            <Link 
                                href="/mf-search" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                <Search className="w-5 h-5" />
                                MF Search
                            </Link>

                            <Link 
                                href="/compare" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                <BarChart3 className="w-5 h-5" />
                                Compare Funds
                            </Link>

                            <Link 
                                href="/blog" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                            >
                                <BookOpen className="w-5 h-5" />
                                Guides
                            </Link>

                            <Link 
                                href="/analyzer" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mx-4 mt-4 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

