'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Calculator, BarChart3, Shield, Zap, CheckCircle, ArrowRight, PieChart, Target, Sparkles, Activity, Receipt, DollarSign, Bot, ChevronRight, Star } from 'lucide-react';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            setCount(Math.floor(end * percentage));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <>{count}{suffix}</>;
}

export default function HomePage() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    const features = [
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Portfolio Tracker",
            description: "Comprehensive SIP portfolio analysis with risk scoring, red-flag detection, and diversification metrics.",
            color: "from-blue-500 to-indigo-600",
            link: "/analyzer/tracker",
            badge: "Most Popular"
        },
        {
            icon: <Bot className="w-8 h-8" />,
            title: "AI Portfolio Assistant",
            description: "Chat with an AI assistant to get personalized recommendations, answer queries, and receive actionable insights.",
            color: "from-violet-500 to-fuchsia-600",
            link: "/analyzer/ai-assistant",
            badge: "New"
        },
        {
            icon: <Calculator className="w-8 h-8" />,
            title: "MF Calculator",
            description: "Advanced SIP calculator with step-up, inflation adjustment, and portfolio-wide projections.",
            color: "from-purple-500 to-pink-600",
            link: "/analyzer/calculator"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Goal Planner",
            description: "Set financial goals, calculate required SIP amounts, track progress, and export detailed plans to CSV.",
            color: "from-rose-500 to-orange-600",
            link: "/analyzer/goals"
        },
        {
            icon: <Receipt className="w-8 h-8" />,
            title: "Tax Optimizer",
            description: "Analyze tax implications, identify tax-loss harvesting opportunities, and optimize LTCG/STCG for minimal tax liability.",
            color: "from-amber-500 to-yellow-600",
            link: "/analyzer/tax-optimizer"
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Income Tax Calculator",
            description: "Complete tax planning with all income sources, deductions (80C, 80D, 80E), family & HUF support. Compare old vs new regime.",
            color: "from-indigo-500 to-purple-600",
            link: "/analyzer/tax-calculator"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Smart Rebalancer",
            description: "AI-powered rebalancing recommendations across 4 risk profiles with actionable insights.",
            color: "from-emerald-500 to-teal-600",
            link: "/analyzer/rebalancer"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "MF Search & Analysis",
            description: "Track fund performance with NAV history, growth metrics, CAGR calculations, and comprehensive fund details.",
            color: "from-orange-500 to-red-600",
            link: "/mf-search"
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Fund Comparison",
            description: "Compare up to 5 funds side-by-side. Analyze returns, risk metrics (Sharpe, Sortino), and key details.",
            color: "from-cyan-500 to-blue-600",
            link: "/compare"
        }
    ];

    const benefits = [
        "8+ Red-flag detection rules",
        "Multi-input support (CSV, JSON, OCR)",
        "Real-time risk scoring",
        "Inflation-adjusted returns",
        "Portfolio-wide calculations",
        "Export to PDF & CSV"
    ];

    const testimonials = [
        { stars: 5, text: "Game-changer for portfolio management!", author: "Retail Investor" },
        { stars: 5, text: "Finally, a tool that makes sense of my SIPs", author: "First-time Investor" },
        { stars: 5, text: "The tax optimizer saved me thousands!", author: "Tax-conscious Investor" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Hero Section */}
            <header className="relative">
                <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">MFTracker</h1>
                            <p className="text-xs text-indigo-300">Portfolio Health Analyzer</p>
                        </div>
                    </Link>
                    <Link
                        href="/analyzer"
                        className="group px-6 py-2.5 bg-white text-indigo-900 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                    >
                        Get Started
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </nav>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-sm border border-indigo-400/30 rounded-full text-indigo-200 text-sm mb-6 animate-fade-in-down">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        <span>AI-Powered Portfolio Analysis</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                        Optimize Your<br />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                            Mutual Fund Portfolio
                        </span>
                    </h2>

                    <p className="text-xl text-indigo-200 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in">
                        Comprehensive analysis, intelligent rebalancing, and advanced calculations
                        for your SIP investments. Make data-driven decisions with confidence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-300">
                        <Link
                            href="/analyzer"
                            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-2xl hover:shadow-indigo-500/50 flex items-center gap-2 hover:scale-105"
                        >
                            Start Analyzing
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/formula"
                            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2 hover:scale-105"
                        >
                            <Activity className="w-5 h-5" />
                            Formula of Health Analysis
                        </Link>
                    </div>

                    {/* Animated Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
                        <div className="text-center group cursor-default">
                            <p className="text-5xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                                <AnimatedCounter end={9} />
                            </p>
                            <p className="text-sm text-indigo-300">Active Tools</p>
                        </div>
                        <div className="text-center group cursor-default">
                            <p className="text-5xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                                <AnimatedCounter end={4} />
                            </p>
                            <p className="text-sm text-indigo-300">Risk Profiles</p>
                        </div>
                        <div className="text-center group cursor-default">
                            <p className="text-5xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                                <AnimatedCounter end={100} suffix="%" />
                            </p>
                            <p className="text-sm text-indigo-300">Client-Side</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Everything You Need in One Place
                    </h3>
                    <p className="text-lg text-indigo-300 max-w-2xl mx-auto">
                        Powerful tools to analyze, calculate, and optimize your mutual fund investments
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <Link
                            key={idx}
                            href={feature.link}
                            onMouseEnter={() => setHoveredFeature(idx)}
                            onMouseLeave={() => setHoveredFeature(null)}
                            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2"
                            style={{
                                transform: hoveredFeature === idx ? 'translateY(-8px) scale(1.02)' : '',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {feature.badge && (
                                <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg animate-bounce-slow">
                                    {feature.badge}
                                </div>
                            )}
                            <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{feature.title}</h4>
                            <p className="text-indigo-200 mb-6 leading-relaxed">{feature.description}</p>
                            <div className="flex items-center text-indigo-400 font-semibold group-hover:text-indigo-300 group-hover:gap-3 gap-2 transition-all">
                                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Social Proof / Testimonials */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by Investors
                    </h3>
                    <p className="text-lg text-indigo-300">
                        Join thousands making smarter investment decisions
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-white mb-4 italic">"{testimonial.text}"</p>
                            <p className="text-indigo-300 text-sm">— {testimonial.author}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Why Choose MFTracker?
                            </h3>
                            <p className="text-lg text-indigo-200 mb-8">
                                Built with cutting-edge technology and financial expertise to give you
                                institutional-grade portfolio analysis tools.
                            </p>
                            <div className="space-y-4">
                                {benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-white font-medium group-hover:text-indigo-300 transition-colors">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl hover:scale-105 transition-transform">
                                <div className="flex items-center gap-3 mb-6 group cursor-default">
                                    <Shield className="w-8 h-8 text-indigo-200 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <p className="text-white font-bold text-lg">100% Secure</p>
                                        <p className="text-indigo-200 text-sm">All data stays in your browser</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-6 group cursor-default">
                                    <Zap className="w-8 h-8 text-yellow-300 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <p className="text-white font-bold text-lg">Lightning Fast</p>
                                        <p className="text-indigo-200 text-sm">Instant calculations & analysis</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 group cursor-default">
                                    <PieChart className="w-8 h-8 text-pink-300 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <p className="text-white font-bold text-lg">Comprehensive</p>
                                        <p className="text-indigo-200 text-sm">Track, calculate & rebalance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-10">
                <div className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 hover:bg-amber-500/15 transition-all">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-500/20 rounded-full flex-shrink-0">
                            <Shield className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-amber-200 mb-2">Important Disclaimer</h3>
                            <p className="text-amber-100/80 leading-relaxed">
                                This platform provides a hypothetical analysis based on market capitalization, sectors, and investment themes.
                                It does <strong>not</strong> track actual historical fund returns or performance over time.
                                The insights generated are for educational and planning purposes only, focusing on portfolio structure rather than past financial performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-16 shadow-2xl hover:shadow-indigo-500/50 transition-all">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Optimize Your Portfolio?
                    </h3>
                    <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                        Start analyzing your mutual fund investments today. No signup required.
                    </p>
                    <Link
                        href="/analyzer"
                        className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Launch Analyzer
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 mt-20">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold">MFTracker</p>
                                <p className="text-xs text-indigo-300">Portfolio Health Analyzer</p>
                            </div>
                        </div>
                        <p className="text-sm text-indigo-300 text-center">
                            © 2025 MFTracker. Educational tool only. Not investment advice.
                        </p>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
            `}</style>
        </div>
    );
}
