'use client';

import React, { useState, useMemo } from 'react';
import { RiskProfile, RebalanceChange } from '../types/portfolio';
import { RISK_PROFILES } from '../lib/categories';
import { generateRebalancePlan } from '../lib/rebalancer';
import { TrendingUp, PieChart, DollarSign, CheckCircle2, ArrowRight, Shield, Zap, Award, Target, Info } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];

export default function SmartRebalancer() {
    const [totalSIP, setTotalSIP] = useState<number>(10000);
    const [selectedProfile, setSelectedProfile] = useState<RiskProfile>('Balanced');

    const profiles: RiskProfile[] = ['Conservative', 'Balanced', 'Growth', 'Aggressive'];

    const profileDetails = {
        Conservative: {
            description: 'Low risk, stable returns. Ideal for short-term goals or risk-averse investors.',
            icon: Shield,
            color: 'emerald',
            riskLevel: 'Low',
            horizon: '1-3 years',
            expectedReturn: '8-10%'
        },
        Balanced: {
            description: 'Moderate risk-reward balance. Suitable for medium-term wealth building.',
            icon: Target,
            color: 'blue',
            riskLevel: 'Medium',
            horizon: '3-5 years',
            expectedReturn: '10-12%'
        },
        Growth: {
            description: 'Higher risk for potentially higher returns. For long-term wealth creation.',
            icon: TrendingUp,
            color: 'purple',
            riskLevel: 'High',
            horizon: '5-10 years',
            expectedReturn: '12-15%'
        },
        Aggressive: {
            description: 'Maximum growth potential with high volatility. For experienced investors with long horizons.',
            icon: Zap,
            color: 'red',
            riskLevel: 'Very High',
            horizon: '10+ years',
            expectedReturn: '15%+'
        }
    };

    const plan = useMemo(() => {
        return generateRebalancePlan([], selectedProfile, totalSIP);
    }, [totalSIP, selectedProfile]);

    const chartData = useMemo(() => {
        return plan.map(item => ({
            name: item.category,
            value: item.recommended
        })).filter(item => item.value > 0);
    }, [plan]);

    return (
        <div className="space-y-8">
            {/* Input Section */}
            <div className="bg-gradient-to-br from-white to-emerald-50/30 p-8 rounded-2xl shadow-lg border border-emerald-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <PieChart className="w-6 h-6 text-emerald-600" />
                    </div>
                    Configure Your Portfolio
                </h2>

                <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                        Total Monthly SIP Amount (₹)
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600" />
                        <input
                            type="number"
                            value={totalSIP}
                            onChange={(e) => setTotalSIP(Math.max(0, Number(e.target.value)))}
                            className="w-full pl-14 pr-6 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-2xl font-bold text-black"
                            step="500"
                            min="500"
                        />
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                        Enter the total amount you wish to invest monthly across all funds.
                    </p>
                </div>

                {/* Risk Profile Selection */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-4">
                        Select Your Risk Profile
                    </label>
                    <div className="grid md:grid-cols-4 gap-4">
                        {profiles.map(profile => {
                            const details = profileDetails[profile];
                            const Icon = details.icon;
                            const isSelected = selectedProfile === profile;
                            return (
                                <button
                                    key={profile}
                                    onClick={() => setSelectedProfile(profile)}
                                    className={`p-5 rounded-xl text-left transition-all border-2 ${
                                        isSelected
                                            ? `bg-${details.color}-50 border-${details.color}-500 shadow-lg scale-105`
                                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg w-fit mb-3 ${
                                        isSelected ? `bg-${details.color}-100` : 'bg-slate-100'
                                    }`}>
                                        <Icon className={`w-6 h-6 ${
                                            isSelected ? `text-${details.color}-600` : 'text-slate-600'
                                        }`} />
                                    </div>
                                    <h3 className={`font-bold mb-2 ${
                                        isSelected ? `text-${details.color}-900` : 'text-slate-800'
                                    }`}>
                                        {profile}
                                    </h3>
                                    <div className="space-y-1 text-xs text-slate-600">
                                        <p className="flex items-center gap-1">
                                            <span className="font-semibold">Risk:</span> {details.riskLevel}
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <span className="font-semibold">Horizon:</span> {details.horizon}
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <span className="font-semibold">Returns:</span> {details.expectedReturn}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-900">
                                <strong className="font-bold">{selectedProfile} Profile:</strong> {profileDetails[selectedProfile].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Allocation Chart */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">Recommended Allocation</h3>
                    <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                                    contentStyle={{ 
                                        borderRadius: '12px', 
                                        border: 'none', 
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                    }}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    height={50} 
                                    iconType="circle"
                                    wrapperStyle={{ fontSize: '13px', fontWeight: '500' }}
                                />
                            </RechartsPie>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-700">Total Monthly SIP</span>
                            <span className="text-xl font-bold text-emerald-700">₹{totalSIP.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Fund List */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-slate-800 text-lg">Category Breakdown</h3>
                            <Award className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-sm text-slate-600">Suggested allocation for {selectedProfile.toLowerCase()} profile</p>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                        {plan.filter(item => item.recommended > 0).map((item, idx) => (
                            <div key={idx} className="p-5 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div 
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                        >
                                            {Math.round((item.recommended / totalSIP) * 100)}%
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800">{item.category}</p>
                                            <p className="text-xs text-slate-500">Fund Category</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-slate-800">₹{item.recommended.toLocaleString()}</p>
                                        <p className="text-xs text-emerald-600 font-semibold">Monthly SIP</p>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div 
                                        className="h-2 rounded-full transition-all"
                                        style={{ 
                                            width: `${(item.recommended / totalSIP) * 100}%`,
                                            backgroundColor: COLORS[idx % COLORS.length]
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-5 bg-slate-50 border-t border-slate-200">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-slate-600">
                                Select specific funds within these categories based on performance, expense ratio, and your research.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-indigo-600" />
                    How to Use This Allocation
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-indigo-600 font-bold text-lg">1</span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">Research Funds</h4>
                        <p className="text-sm text-slate-600">
                            Find top-performing funds in each recommended category based on 3-5 year returns.
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-purple-600 font-bold text-lg">2</span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">Check Expense Ratio</h4>
                        <p className="text-sm text-slate-600">
                            Compare expense ratios and choose funds with lower costs for better long-term returns.
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-pink-600 font-bold text-lg">3</span>
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">Start Your SIP</h4>
                        <p className="text-sm text-slate-600">
                            Invest the recommended amounts monthly and review your portfolio quarterly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
