'use client';

import React, { useState, useMemo } from 'react';
import { SIP } from '@/types/portfolio';
import { SIPCalculation, LumpSumCalculation, PortfolioProjection } from '@/types/calculator';
import { calculateSIP, calculateLumpSum, calculatePortfolioProjection, compareStepUp } from '@/lib/calculator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar, Zap, Info, Plus, Trash2, Edit2 } from 'lucide-react';
import { CATEGORY_RISK_MAP } from '@/lib/categories';

interface CalculatorSectionProps {
    sips: SIP[];
    totalSIP: number;
}

export default function CalculatorSection({ sips, totalSIP }: CalculatorSectionProps) {
    const [calculatorMode, setCalculatorMode] = useState<'single' | 'portfolio'>('single');
    
    // Portfolio SIPs state
    const [portfolioSips, setPortfolioSips] = useState<SIP[]>(sips);
    const [newFund, setNewFund] = useState({
        fund_name: '',
        amount: '',
        category: 'Large Cap',
        expectedReturn: 12
    });

    // Single SIP Calculator inputs
    const [sipAmount, setSipAmount] = useState<number>(10000);
    const [lumpSum, setLumpSum] = useState<number>(100000);
    const [expectedReturn, setExpectedReturn] = useState<number>(12);
    const [duration, setDuration] = useState<number>(10);
    const [stepUp, setStepUp] = useState<number>(10);
    const [inflation, setInflation] = useState<number>(6);
    const [includeStepUp, setIncludeStepUp] = useState<boolean>(true);
    const [includeInflation, setIncludeInflation] = useState<boolean>(true);
    const [calculationType, setCalculationType] = useState<'sip' | 'lumpsum' | 'both'>('sip');

    // Portfolio Calculator inputs
    const [portfolioDuration, setPortfolioDuration] = useState<number>(10);
    const [portfolioStepUp, setPortfolioStepUp] = useState<number>(10);
    const [portfolioInflation, setPortfolioInflation] = useState<number>(6);

    // Handler functions for portfolio SIPs
    const handleAddFund = () => {
        if (!newFund.fund_name || !newFund.amount) return;
        
        const fund: SIP = {
            id: Date.now(),
            fund_name: newFund.fund_name,
            amount: parseFloat(newFund.amount),
            category: newFund.category,
            risk: CATEGORY_RISK_MAP[newFund.category] || 5
        };
        
        setPortfolioSips([...portfolioSips, fund]);
        setNewFund({ fund_name: '', amount: '', category: 'Large Cap', expectedReturn: 12 });
    };

    const handleDeleteFund = (id: number) => {
        setPortfolioSips(portfolioSips.filter(sip => sip.id !== id));
    };

    // Calculations
    const sipCalculation = useMemo(() => {
        return calculateSIP(
            sipAmount,
            expectedReturn,
            duration,
            includeStepUp ? stepUp : 0,
            includeInflation ? inflation : 0
        );
    }, [sipAmount, expectedReturn, duration, stepUp, inflation, includeStepUp, includeInflation]);

    const lumpSumCalculation = useMemo(() => {
        return calculateLumpSum(
            lumpSum,
            expectedReturn,
            duration,
            includeInflation ? inflation : 0
        );
    }, [lumpSum, expectedReturn, duration, inflation, includeInflation]);

    const stepUpComparison = useMemo(() => {
        if (!includeStepUp) return null;
        return compareStepUp(sipAmount, expectedReturn, duration, stepUp, includeInflation ? inflation : 0);
    }, [sipAmount, expectedReturn, duration, stepUp, inflation, includeStepUp, includeInflation]);

    const portfolioProjection = useMemo(() => {
        if (portfolioSips.length === 0) return null;
        return calculatePortfolioProjection(
            portfolioSips,
            portfolioDuration,
            portfolioStepUp,
            includeInflation ? portfolioInflation : 0
        );
    }, [portfolioSips, portfolioDuration, portfolioStepUp, portfolioInflation, includeInflation]);

    // Chart data
    const growthChartData = useMemo(() => {
        if (calculatorMode === 'single') {
            return sipCalculation.yearlyBreakdown.map(year => ({
                year: `Year ${year.year}`,
                Investment: Math.round(year.cumulativeInvestment),
                Value: Math.round(year.valueAtYearEnd),
                Returns: Math.round(year.cumulativeReturns),
            }));
        } else {
            if (!portfolioProjection) return [];
            return portfolioProjection.aggregateYearlyBreakdown.map(year => ({
                year: `Year ${year.year}`,
                Investment: Math.round(year.cumulativeInvestment),
                Value: Math.round(year.valueAtYearEnd),
                Returns: Math.round(year.cumulativeReturns),
            }));
        }
    }, [calculatorMode, sipCalculation, portfolioProjection]);

    const formatCurrency = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
        return `₹${value.toLocaleString('en-IN')}`;
    };

    return (
        <div className="space-y-8">
            {/* Mode Selector */}
            <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-md border border-slate-200">
                <button
                    onClick={() => setCalculatorMode('single')}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${calculatorMode === 'single'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <Calculator className="w-5 h-5" />
                    Single SIP Calculator
                </button>
                <button
                    onClick={() => setCalculatorMode('portfolio')}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${calculatorMode === 'portfolio'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <TrendingUp className="w-5 h-5" />
                    Portfolio Calculator
                </button>
            </div>

            {calculatorMode === 'single' ? (
                <>
                    {/* Single Calculator Inputs */}
                    <div className="bg-gradient-to-br from-white to-indigo-50/30 p-8 rounded-2xl shadow-lg border border-indigo-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Calculator className="w-6 h-6 text-indigo-600" />
                            </div>
                            Investment Parameters
                        </h3>

                        {/* Calculation Type */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-700 mb-3">Calculation Type</label>
                            <div className="flex gap-3">
                                {(['sip', 'lumpsum', 'both'] as const).map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setCalculationType(type)}
                                        className={`flex-1 px-5 py-3 rounded-xl text-sm font-bold transition-all ${calculationType === type
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                            }`}
                                    >
                                        {type === 'sip' ? 'SIP Only' : type === 'lumpsum' ? 'Lump Sum Only' : 'Both'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(calculationType === 'sip' || calculationType === 'both') && (
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-indigo-600" />
                                        Monthly SIP Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={sipAmount}
                                        onChange={(e) => setSipAmount(Number(e.target.value))}
                                        className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-black font-semibold text-lg"
                                        min="500"
                                        step="500"
                                    />
                                </div>
                            )}

                            {(calculationType === 'lumpsum' || calculationType === 'both') && (
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-purple-600" />
                                        Lump Sum Amount (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={lumpSum}
                                        onChange={(e) => setLumpSum(Number(e.target.value))}
                                        className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-black font-semibold text-lg"
                                        min="1000"
                                        step="1000"
                                    />
                                </div>
                            )}

                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <Percent className="w-4 h-4 text-emerald-600" />
                                    Expected Return (% p.a.)
                                </label>
                                <input
                                    type="number"
                                    value={expectedReturn}
                                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-black font-semibold text-lg"
                                    min="1"
                                    max="30"
                                    step="0.5"
                                />
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    Investment Duration (Years)
                                </label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black font-semibold text-lg"
                                    min="1"
                                    max="40"
                                />
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-orange-600" />
                                    Inflation Rate (% p.a.)
                                </label>
                                <input
                                    type="number"
                                    value={inflation}
                                    onChange={(e) => setInflation(Number(e.target.value))}
                                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-black font-semibold text-lg"
                                    min="0"
                                    max="15"
                                    step="0.5"
                                />
                                <p className="text-xs text-slate-500 mt-2">Used for real returns calculation</p>
                            </div>
                        </div>

                        {/* Advanced Options */}
                        <div className="mt-6 pt-6 border-t-2 border-slate-200">
                            <h4 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                Advanced Options
                            </h4>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={includeStepUp}
                                            onChange={(e) => setIncludeStepUp(e.target.checked)}
                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700">
                                            <Zap className="w-4 h-4 inline mr-1 text-yellow-500" />
                                            Include Annual Step-Up
                                        </span>
                                    </label>
                                    {includeStepUp && (
                                        <input
                                            type="number"
                                            value={stepUp}
                                            onChange={(e) => setStepUp(Number(e.target.value))}
                                            className="w-24 p-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-black"
                                            min="0"
                                            max="50"
                                            step="5"
                                        />
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={includeInflation}
                                            onChange={(e) => setIncludeInflation(e.target.checked)}
                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700">
                                            Show Inflation-Adjusted Returns
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(calculationType === 'sip' || calculationType === 'both') && (
                            <>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                                    <p className="text-xs text-blue-700 font-semibold uppercase mb-1">Total Investment</p>
                                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(sipCalculation.totalInvestment)}</p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        {sipCalculation.stepUpPercentage && sipCalculation.stepUpPercentage > 0
                                            ? `With ${sipCalculation.stepUpPercentage}% annual step-up`
                                            : 'Fixed monthly SIP'}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200">
                                    <p className="text-xs text-emerald-700 font-semibold uppercase mb-1">Future Value</p>
                                    <p className="text-2xl font-bold text-emerald-900">{formatCurrency(sipCalculation.futureValue)}</p>
                                    <p className="text-xs text-emerald-600 mt-1">
                                        At {sipCalculation.expectedReturn}% p.a. for {sipCalculation.durationYears} years
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                                    <p className="text-xs text-purple-700 font-semibold uppercase mb-1">Total Returns</p>
                                    <p className="text-2xl font-bold text-purple-900">{formatCurrency(sipCalculation.totalReturns)}</p>
                                    <p className="text-xs text-purple-600 mt-1">
                                        {((sipCalculation.totalReturns / sipCalculation.totalInvestment) * 100).toFixed(1)}% gain
                                    </p>
                                </div>
                            </>
                        )}

                        {calculationType === 'lumpsum' && (
                            <>
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                                    <p className="text-xs text-blue-700 font-semibold uppercase mb-1">Principal Amount</p>
                                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(lumpSumCalculation.principal)}</p>
                                </div>

                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200">
                                    <p className="text-xs text-emerald-700 font-semibold uppercase mb-1">Future Value</p>
                                    <p className="text-2xl font-bold text-emerald-900">{formatCurrency(lumpSumCalculation.futureValue)}</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                                    <p className="text-xs text-purple-700 font-semibold uppercase mb-1">Total Returns</p>
                                    <p className="text-2xl font-bold text-purple-900">{formatCurrency(lumpSumCalculation.totalReturns)}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Inflation Adjusted Returns */}
                    {includeInflation && sipCalculation.realReturns !== undefined && (
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-orange-900">Inflation-Adjusted Returns (Real Returns)</p>
                                    <p className="text-xs text-orange-700 mt-1">
                                        After adjusting for {inflation}% annual inflation, your real gains (in today's purchasing power) would be approximately{' '}
                                        <span className="font-bold">{formatCurrency(sipCalculation.realReturns)}</span>.
                                        <br />
                                        Your future value of {formatCurrency(sipCalculation.futureValue)} will have the purchasing power of{' '}
                                        <span className="font-bold">{formatCurrency(sipCalculation.futureValue / Math.pow(1 + inflation / 100, duration))}</span> in today's terms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step-Up Comparison */}
                    {includeStepUp && stepUpComparison && (
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-base font-bold text-slate-800 mb-3">Step-Up Impact Analysis</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-xs text-slate-600 uppercase mb-1">Without Step-Up</p>
                                    <p className="text-xl font-bold text-slate-800">{formatCurrency(stepUpComparison.withoutStepUp.futureValue)}</p>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <p className="text-xs text-indigo-600 uppercase mb-1">With {stepUp}% Step-Up</p>
                                    <p className="text-xl font-bold text-indigo-800">{formatCurrency(stepUpComparison.withStepUp.futureValue)}</p>
                                </div>
                            </div>
                            <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                                <p className="text-sm text-emerald-900">
                                    <span className="font-bold">Additional Gain: {formatCurrency(stepUpComparison.difference)}</span>
                                    {' '}({stepUpComparison.percentageGain.toFixed(1)}% more)
                                </p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {/* Portfolio Calculator */}
                    <div className="bg-gradient-to-br from-white to-purple-50/30 p-8 rounded-2xl shadow-lg border border-purple-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                            Add Funds to Portfolio
                        </h3>

                        {/* Add Fund Form */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-4">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Fund Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. SBI Bluechip Fund"
                                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-black"
                                        value={newFund.fund_name}
                                        onChange={(e) => setNewFund({ ...newFund, fund_name: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                    <select
                                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white text-black"
                                        value={newFund.category}
                                        onChange={(e) => setNewFund({ ...newFund, category: e.target.value })}
                                    >
                                        {Object.keys(CATEGORY_RISK_MAP).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Monthly SIP (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="5000"
                                        min="500"
                                        step="500"
                                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-black"
                                        value={newFund.amount}
                                        onChange={(e) => setNewFund({ ...newFund, amount: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Return (%)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        step="0.5"
                                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-black"
                                        value={newFund.expectedReturn}
                                        onChange={(e) => setNewFund({ ...newFund, expectedReturn: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="md:col-span-1 flex items-end">
                                    <button
                                        onClick={handleAddFund}
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-xl transition-all font-bold flex justify-center items-center gap-2 shadow-md hover:shadow-lg"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Funds List */}
                        {portfolioSips.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gradient-to-r from-purple-50 to-pink-50 text-slate-700 font-semibold uppercase text-xs">
                                            <tr>
                                                <th className="p-3 text-left">Fund Name</th>
                                                <th className="p-3 text-left">Category</th>
                                                <th className="p-3 text-right">Monthly SIP</th>
                                                <th className="p-3 text-center">Risk</th>
                                                <th className="p-3 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {portfolioSips.map((sip) => (
                                                <tr key={sip.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-3 font-medium text-slate-800">{sip.fund_name}</td>
                                                    <td className="p-3">
                                                        <span className="inline-block px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                            {sip.category}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-right font-mono font-semibold text-slate-700">₹{sip.amount.toLocaleString()}</td>
                                                    <td className="p-3 text-center">
                                                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${sip.risk >= 8 ? 'bg-red-500' : sip.risk >= 5 ? 'bg-yellow-500' : 'bg-green-500'
                                                            }`}>
                                                            {sip.risk}/10
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <button
                                                            onClick={() => handleDeleteFund(sip.id as number)}
                                                            className="text-slate-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded"
                                                            title="Remove Fund"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gradient-to-r from-purple-50 to-pink-50 font-bold text-slate-800">
                                            <tr>
                                                <td colSpan={2} className="p-3 text-right">Total Monthly SIP:</td>
                                                <td className="p-3 text-right font-mono text-purple-700 text-base">
                                                    ₹{portfolioSips.reduce((sum, sip) => sum + sip.amount, 0).toLocaleString()}
                                                </td>
                                                <td colSpan={2}></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Portfolio Settings */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-600" />
                                    Duration (Years)
                                </label>
                                <input
                                    type="number"
                                    value={portfolioDuration}
                                    onChange={(e) => setPortfolioDuration(Number(e.target.value))}
                                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-semibold text-lg text-black"
                                    min="1"
                                    max="40"
                                />
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-600" />
                                    Annual Step-Up (%)
                                </label>
                                <input
                                    type="number"
                                    value={portfolioStepUp}
                                    onChange={(e) => setPortfolioStepUp(Number(e.target.value))}
                                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-semibold text-lg text-black"
                                    min="0"
                                    max="50"
                                    step="5"
                                />
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-orange-600" />
                                    Inflation Rate (%)
                                </label>
                                <input
                                    type="number"
                                    value={portfolioInflation}
                                    onChange={(e) => setPortfolioInflation(Number(e.target.value))}
                                    className="w-full p-3.5 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-semibold text-lg text-black"
                                    min="0"
                                    max="15"
                                    step="0.5"
                                />
                            </div>
                        </div>
                    </div>

                    {portfolioSips.length === 0 && (
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-12 rounded-2xl border-2 border-dashed border-indigo-200 text-center">
                            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                            <h4 className="text-xl font-bold text-slate-800 mb-2">No Funds Added Yet</h4>
                            <p className="text-slate-600 mb-6">Add your first fund above to start calculating portfolio projections</p>
                        </div>
                    )}

                    {portfolioProjection && (
                        <>
                            {/* Portfolio Results */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
                                    <p className="text-xs text-blue-700 font-semibold uppercase mb-1">Current Monthly SIP</p>
                                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(portfolioProjection.totalCurrentSIP)}</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
                                    <p className="text-xs text-purple-700 font-semibold uppercase mb-1">Total Investment</p>
                                    <p className="text-2xl font-bold text-purple-900">{formatCurrency(portfolioProjection.totalInvestment)}</p>
                                </div>

                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200">
                                    <p className="text-xs text-emerald-700 font-semibold uppercase mb-1">Future Value</p>
                                    <p className="text-2xl font-bold text-emerald-900">{formatCurrency(portfolioProjection.totalFutureValue)}</p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-xl border border-orange-200">
                                    <p className="text-xs text-orange-700 font-semibold uppercase mb-1">Total Returns</p>
                                    <p className="text-2xl font-bold text-orange-900">{formatCurrency(portfolioProjection.totalReturns)}</p>
                                </div>
                            </div>

                            {/* Fund-wise Breakdown */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                                <h4 className="text-base font-bold text-slate-800 mb-4">Fund-wise Projections</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-xs">
                                            <tr>
                                                <th className="p-3 text-left">Fund Name</th>
                                                <th className="p-3 text-left">Category</th>
                                                <th className="p-3 text-right">Monthly SIP</th>
                                                <th className="p-3 text-right">Expected Return</th>
                                                <th className="p-3 text-right">Future Value</th>
                                                <th className="p-3 text-right">Returns</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {portfolioProjection.fundProjections.map((fund, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50">
                                                    <td className="p-3 font-medium text-slate-800">{fund.fundName}</td>
                                                    <td className="p-3">
                                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                                                            {fund.category}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-right font-mono">₹{fund.monthlySIP.toLocaleString()}</td>
                                                    <td className="p-3 text-right">{fund.expectedReturn}%</td>
                                                    <td className="p-3 text-right font-bold text-emerald-700">{formatCurrency(fund.futureValue)}</td>
                                                    <td className="p-3 text-right font-semibold text-purple-700">{formatCurrency(fund.returns)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}

            {/* Growth Chart */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h4 className="text-base font-bold text-slate-800 mb-4">Growth Projection</h4>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Area type="monotone" dataKey="Investment" stackId="1" stroke="#3b82f6" fill="#93c5fd" />
                            <Area type="monotone" dataKey="Returns" stackId="1" stroke="#10b981" fill="#6ee7b7" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
