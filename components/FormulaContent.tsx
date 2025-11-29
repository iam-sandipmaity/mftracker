"use client";

import React, { useState } from 'react';
import { Shield, PieChart, AlertTriangle, CheckCircle, Activity, ArrowRight, Calculator, TrendingUp, Target, Zap, Award } from 'lucide-react';
import Link from 'next/link';

export default function FormulaContent() {
    const [activeExample, setActiveExample] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');

    const examplePortfolios = {
        conservative: {
            funds: [
                { name: 'Large Cap Fund', amount: 5000, risk: 3 },
                { name: 'Index Fund', amount: 3000, risk: 2 },
                { name: 'Gold ETF', amount: 2000, risk: 4 }
            ],
            riskScore: 2.9,
            color: 'emerald'
        },
        balanced: {
            funds: [
                { name: 'Large Cap Fund', amount: 3000, risk: 3 },
                { name: 'Mid Cap Fund', amount: 2000, risk: 6 },
                { name: 'Flexi Cap Fund', amount: 3000, risk: 5 },
                { name: 'Gold ETF', amount: 2000, risk: 4 }
            ],
            riskScore: 4.4,
            color: 'blue'
        },
        aggressive: {
            funds: [
                { name: 'Small Cap Fund', amount: 4000, risk: 9 },
                { name: 'Thematic Fund', amount: 3000, risk: 8 },
                { name: 'Mid Cap Fund', amount: 3000, risk: 6 }
            ],
            riskScore: 7.7,
            color: 'red'
        }
    };

    const currentExample = examplePortfolios[activeExample];
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            <main className="max-w-5xl mx-auto px-6 py-16">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500/20 rounded-full text-indigo-300 text-sm mb-8 border border-indigo-500/30 shadow-lg">
                        <Activity className="w-4 h-4" />
                        <span className="font-semibold">Methodology & Logic</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                        The Science Behind<br />Portfolio Health Analysis
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Discover the mathematical formulas, intelligent algorithms, and expert-designed rules that power our portfolio analysis engine.
                    </p>
                </div>

                {/* 1. Risk Scoring Logic */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-slate-800/50 to-indigo-900/30 border border-slate-700 rounded-3xl p-10 md:p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>

                        <div className="flex items-start gap-6 relative z-10 mb-8">
                            <div className="p-5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex-shrink-0 shadow-lg">
                                <Activity className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <div className="text-indigo-400 font-bold text-sm uppercase tracking-wider mb-2">Step 1</div>
                                <h2 className="text-3xl font-bold mb-4">Risk Score Calculation</h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    We don't just guess. Your portfolio's risk score is a <strong className="text-white">weighted average</strong> of the individual risk levels of your funds, proportional to their investment amount.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 rounded-2xl p-8 border border-indigo-700/50 mb-8 relative z-10 shadow-xl">
                            <div className="text-indigo-400 font-bold text-sm uppercase tracking-wider mb-3">Formula</div>
                            <div className="font-mono text-lg text-indigo-200 mb-2">
                                Risk Score = Î£ (Fund Amount Ã— Fund Risk) / Total Investment
                            </div>
                            <p className="text-slate-400 text-sm">Where each fund's contribution is weighted by its allocation percentage</p>
                        </div>

                        {/* Interactive Example */}
                        <div className="relative z-10 mb-8">
                            <div className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Calculator className="w-4 h-4" /> Live Example
                            </div>
                            <div className="flex gap-3 mb-6">
                                {(['conservative', 'balanced', 'aggressive'] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setActiveExample(type)}
                                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                                            activeExample === type
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                        }`}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700">
                                <div className="space-y-3 mb-4">
                                    {currentExample.funds.map((fund, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <span className="text-slate-300">{fund.name}</span>
                                            <div className="flex items-center gap-4">
                                                <span className="text-slate-400">â‚¹{fund.amount}</span>
                                                <span className="px-2 py-1 bg-slate-900 rounded text-xs font-mono text-indigo-300">
                                                    Risk: {fund.risk}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
                                    <span className="font-bold text-white">Portfolio Risk Score:</span>
                                    <span className={`text-2xl font-bold ${
                                        currentExample.color === 'emerald' ? 'text-emerald-400' :
                                        currentExample.color === 'blue' ? 'text-blue-400' : 'text-red-400'
                                    }`}>
                                        {currentExample.riskScore}/10
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                            <div className="p-4 bg-slate-800/80 rounded-xl border border-emerald-700/50 hover:border-emerald-500 transition-colors">
                                <div className="text-emerald-400 font-bold text-xl mb-1">1-3</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Conservative</div>
                                <div className="text-xs text-slate-500 mt-1">Low volatility</div>
                            </div>
                            <div className="p-4 bg-slate-800/80 rounded-xl border border-blue-700/50 hover:border-blue-500 transition-colors">
                                <div className="text-blue-400 font-bold text-xl mb-1">4-6</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Balanced</div>
                                <div className="text-xs text-slate-500 mt-1">Moderate growth</div>
                            </div>
                            <div className="p-4 bg-slate-800/80 rounded-xl border border-yellow-700/50 hover:border-yellow-500 transition-colors">
                                <div className="text-yellow-400 font-bold text-xl mb-1">7-8</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Growth</div>
                                <div className="text-xs text-slate-500 mt-1">High returns</div>
                            </div>
                            <div className="p-4 bg-slate-800/80 rounded-xl border border-red-700/50 hover:border-red-500 transition-colors">
                                <div className="text-red-400 font-bold text-xl mb-1">9-10</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide">Aggressive</div>
                                <div className="text-xs text-slate-500 mt-1">Maximum risk</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Diversification Logic */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-slate-800/50 to-emerald-900/30 border border-slate-700 rounded-3xl p-10 md:p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -ml-48 -mt-48"></div>

                        <div className="flex items-start gap-6 relative z-10 mb-8">
                            <div className="p-5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex-shrink-0 shadow-lg">
                                <PieChart className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-2">Step 2</div>
                                <h2 className="text-3xl font-bold mb-4">Diversification Analysis</h2>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    True diversification isn't just about owning many funds. It's about spreading across <strong className="text-white">uncorrelated categories</strong>. We analyze your allocation spread to ensure you aren't overexposed.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8 relative z-10">
                            <div className="bg-slate-900/60 rounded-xl p-6 border border-emerald-700/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                                    <h3 className="font-bold text-white">Concentration Check</h3>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Detects over-concentration in a single category (e.g., {'>'}40% in Small Cap). Ensures balanced exposure across market caps and themes.
                                </p>
                            </div>
                            <div className="bg-slate-900/60 rounded-xl p-6 border border-emerald-700/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-6 h-6 text-emerald-500" />
                                    <h3 className="font-bold text-white">Stability Anchors</h3>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Rewards presence of stabilizing assets like Large Cap funds or Gold ETFs that reduce volatility during market downturns.
                                </p>
                            </div>
                            <div className="bg-slate-900/60 rounded-xl p-6 border border-emerald-700/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    <h3 className="font-bold text-white">Style Overlap</h3>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Penalizes overlapping investment styles that create false diversification. Similar funds don't multiply protection.
                                </p>
                            </div>
                            <div className="bg-slate-900/60 rounded-xl p-6 border border-emerald-700/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <Award className="w-6 h-6 text-emerald-500" />
                                    <h3 className="font-bold text-white">Category Balance</h3>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Optimal mix across equity, debt, gold, and thematic funds based on your risk profile for maximum risk-adjusted returns.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900/80 rounded-2xl p-6 border border-emerald-700/50 relative z-10">
                            <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">Scoring System</div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center text-slate-300">
                                    <span>Well-diversified (4-7 categories)</span>
                                    <span className="text-emerald-400 font-bold">+20 points</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-300">
                                    <span>No single category {'>'}35%</span>
                                    <span className="text-emerald-400 font-bold">+15 points</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-300">
                                    <span>Includes stabilizers (Large Cap/Gold)</span>
                                    <span className="text-emerald-400 font-bold">+10 points</span>
                                </div>
                                <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between items-center text-white font-bold">
                                    <span>Maximum Diversification Score</span>
                                    <span className="text-emerald-400">100/100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Red Flag Detection */}
                <section className="mb-16">
                    <div className="bg-gradient-to-br from-slate-800/50 to-red-900/30 border border-slate-700 rounded-3xl p-10 md:p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -mr-48 -mb-48"></div>

                        <div className="flex items-start gap-6 relative z-10 mb-8">
                            <div className="p-5 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex-shrink-0 shadow-lg">
                                <AlertTriangle className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <div className="text-red-400 font-bold text-sm uppercase tracking-wider mb-2">Step 3</div>
                                <h2 className="text-3xl font-bold mb-4">Red Flag Detection Engine</h2>
                                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                    We run your portfolio against <strong className="text-white">8+ critical rules</strong> designed by financial experts to identify potential pitfalls before they hurt your returns.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-8 relative z-10">
                            {[
                                { rule: "Too many funds (>10)", severity: "High", reason: "Over-diversification reduces returns" },
                                { rule: "Sectoral fund exposure > 20%", severity: "High", reason: "Single sector concentration risk" },
                                { rule: "Small Cap exposure > 30%", severity: "Medium", reason: "Excessive volatility exposure" },
                                { rule: "Missing Large Cap stability", severity: "Medium", reason: "No downside protection" },
                                { rule: "Thematic funds > 25%", severity: "High", reason: "Speculative bets too high" },
                                { rule: "Overlapping fund categories", severity: "Low", reason: "False diversification" },
                                { rule: "No Gold/Debt allocation", severity: "Medium", reason: "Missing safe havens" },
                                { rule: "Aggressive fund overlap", severity: "High", reason: "Compounded risk exposure" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-slate-900/60 rounded-xl border border-red-700/30 hover:border-red-500/50 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-white font-semibold text-sm">{item.rule}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                                item.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                                                item.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>
                                                {item.severity}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-xs">{item.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 relative z-10">
                            <div className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="text-amber-300 font-bold mb-2">Smart Detection</h3>
                                    <p className="text-amber-100/80 text-sm leading-relaxed">
                                        Our engine doesn't just flag issuesâ€”it explains <strong>why</strong> each red flag matters and how it impacts your portfolio's risk-return profile. Each warning comes with actionable insights for improvement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Features Summary */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4">Why Our Analysis Works</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Built on proven financial principles and real-world investment strategies
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
                            <div className="p-3 bg-indigo-500/20 rounded-xl w-fit mb-4">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Data-Driven</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Every metric is calculated using mathematical formulas, not subjective opinions. Your risk score is precise and reproducible.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all">
                            <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mb-4">
                                <Shield className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Expert Rules</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Red flags are based on industry best practices and decades of investment research. We identify what professionals look for.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
                            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
                                <Zap className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Instant Insights</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Analysis happens in real-time, right in your browser. No waiting, no data sharingâ€”just immediate, actionable feedback.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
                    <h3 className="text-3xl font-bold mb-4">Ready to Analyze Your Portfolio?</h3>
                    <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                        Put these formulas to work on your actual mutual fund investments. Get instant risk scores, diversification insights, and red flag detection.
                    </p>
                    <Link
                        href="/analyzer/tracker"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Start Portfolio Analysis
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
