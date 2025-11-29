'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { SIP, RiskProfile } from '../types/portfolio';
import { getRiskForCategory, COLORS } from '../lib/categories';
import { calculateAllocations, calculateRiskScore, calculateDiversificationScore, detectRedFlags } from '../lib/analyzer';
import { generateRebalancePlan } from '../lib/rebalancer';
import { exportToPDF, exportToCSV, generateSummaryText } from '../lib/export';
import { parseCSV, parseJSON, parseOCR, convertParsedToSIP } from '../lib/parser';

import MetricsCards from './MetricsCards';
import RedFlagsSection from './RedFlagsSection';
import InputSection from './InputSection';
import VisualsSection from './VisualsSection';
import RebalanceSection from './RebalanceSection';
import CalculatorSection from './CalculatorSection';

import { TrendingUp, Edit3 } from 'lucide-react';

// Initial demo data
interface PortfolioAnalyzerProps {
    initialData?: SIP[];
}

export default function PortfolioAnalyzer({ initialData = [] }: PortfolioAnalyzerProps) {
    const [sips, setSips] = useState<SIP[]>(initialData);
    const [targetProfile, setTargetProfile] = useState<RiskProfile>('Balanced');
    const [activeTab, setActiveTab] = useState<'input' | 'dashboard' | 'rebalance' | 'calculator'>('input');
    const [inputSource, setInputSource] = useState<'manual' | 'csv' | 'json' | 'screenshot'>('manual');
    const [isLoading, setIsLoading] = useState(false);

    // Calculations
    const totalSIP = useMemo(() => {
        return sips.reduce((sum, sip) => sum + sip.amount, 0);
    }, [sips]);

    const allocations = useMemo(() => {
        return calculateAllocations(sips, totalSIP);
    }, [sips, totalSIP]);

    const riskScore = useMemo(() => {
        return calculateRiskScore(sips, totalSIP);
    }, [sips, totalSIP]);

    const diversificationScore = useMemo(() => {
        return calculateDiversificationScore(sips, totalSIP);
    }, [sips, totalSIP]);

    const redFlags = useMemo(() => {
        return detectRedFlags(sips, totalSIP);
    }, [sips, totalSIP]);

    const rebalancePlan = useMemo(() => {
        return generateRebalancePlan(sips, targetProfile, totalSIP);
    }, [sips, targetProfile, totalSIP]);

    // Handlers
    const handleAddFund = (fundData: Omit<SIP, 'id' | 'risk'>) => {
        const risk = getRiskForCategory(fundData.category);
        const newSip: SIP = {
            ...fundData,
            id: Date.now(),
            risk,
        };
        setSips([...sips, newSip]);
    };

    const handleDeleteFund = (id: string | number) => {
        setSips(sips.filter(sip => sip.id !== id));
    };

    const handleUpdateFund = (id: string | number, updates: Partial<SIP>) => {
        setSips(sips.map(sip => {
            if (sip.id === id) {
                const updated = { ...sip, ...updates };
                if (updates.category) {
                    updated.risk = getRiskForCategory(updates.category);
                }
                return updated;
            }
            return sip;
        }));
    };

    const handleFileUpload = async (file: File, type: 'csv' | 'json' | 'image') => {
        setIsLoading(true);
        try {
            let parsedSips;

            if (type === 'csv') {
                parsedSips = await parseCSV(file);
                setInputSource('csv');
            } else if (type === 'json') {
                parsedSips = await parseJSON(file);
                setInputSource('json');
            } else if (type === 'image') {
                parsedSips = await parseOCR(file);
                setInputSource('screenshot');
            }

            if (parsedSips && parsedSips.length > 0) {
                const convertedSips = convertParsedToSIP(parsedSips);
                setSips(convertedSips);
            } else {
                alert('No valid SIP data found in the file.');
            }
        } catch (error) {
            console.error('File upload error:', error);
            alert('Failed to parse file: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportPDF = () => {
        const analysis = {
            input_source: inputSource,
            raw_parsed_sips: sips,
            total_monthly_sip: totalSIP,
            allocations,
            portfolio_risk_score: riskScore,
            diversification_score: diversificationScore,
            red_flags: redFlags,
            recommended_rebalance: {
                target_profile: targetProfile,
                new_allocations: [],
                actionable_changes: rebalancePlan,
            },
            visuals: {
                pie_chart_data: [],
                allocation_bar_data: [],
            },
            explanations: {
                why_recommendation: '',
                assumptions: '',
            },
        };

        exportToPDF(analysis, rebalancePlan);
    };

    const handleExportCSV = () => {
        exportToCSV(rebalancePlan);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-slate-900 pb-20 pt-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-10 shadow-2xl relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                                <TrendingUp className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Portfolio Health Analyzer</h1>
                                <p className="text-indigo-100 text-base">AI-Powered Diagnostic Engine for Your Investments</p>
                            </div>
                        </div>
                        <div className="flex gap-3 text-sm bg-white/10 backdrop-blur-md py-3 px-6 rounded-2xl border border-white/20 shadow-lg">
                            <div className="flex flex-col">
                                <span className="text-indigo-100 text-xs mb-1">Data Source</span>
                                <span className="font-bold flex items-center gap-2 text-white">
                                    <Edit3 className="w-4 h-4" />
                                    {inputSource === 'manual' ? 'Manual Input' :
                                        inputSource === 'csv' ? 'CSV Upload' :
                                            inputSource === 'json' ? 'JSON Upload' : 'Screenshot OCR'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto pt-8 px-6 pb-12">
                {/* Metrics Cards */}
                <MetricsCards
                    totalSIP={totalSIP}
                    riskScore={riskScore}
                    fundsCount={sips.length}
                    diversificationScore={diversificationScore}
                />

                {/* Red Flags */}
                {redFlags.length > 0 && (
                    <RedFlagsSection redFlags={redFlags} />
                )}

                {/* Main Content Tabs */}
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                    <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
                            <button
                                onClick={() => setActiveTab('input')}
                                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'input'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                        : 'text-slate-600 hover:bg-slate-100 hover:scale-102'
                                }`}
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    activeTab === 'input' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
                                }`}>1</span>
                                <span className="hidden md:inline">Input / Edit</span>
                                <span className="md:hidden">Input</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'dashboard'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                        : 'text-slate-600 hover:bg-slate-100 hover:scale-102'
                                }`}
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    activeTab === 'dashboard' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
                                }`}>2</span>
                                <span className="hidden md:inline">Visuals</span>
                                <span className="md:hidden">Chart</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('rebalance')}
                                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'rebalance'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                        : 'text-slate-600 hover:bg-slate-100 hover:scale-102'
                                }`}
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    activeTab === 'rebalance' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
                                }`}>3</span>
                                <span className="hidden md:inline">Rebalancer</span>
                                <span className="md:hidden">Balance</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('calculator')}
                                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${
                                    activeTab === 'calculator'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                        : 'text-slate-600 hover:bg-slate-100 hover:scale-102'
                                }`}
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    activeTab === 'calculator' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
                                }`}>4</span>
                                <span className="hidden md:inline">Calculator</span>
                                <span className="md:hidden">Calc</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {isLoading && (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
                                <p className="mt-4 text-slate-600">Processing...</p>
                            </div>
                        )}

                        {!isLoading && activeTab === 'input' && (
                            <InputSection
                                sips={sips}
                                onAddFund={handleAddFund}
                                onDeleteFund={handleDeleteFund}
                                onUpdateFund={handleUpdateFund}
                                onFileUpload={handleFileUpload}
                                totalSIP={totalSIP}
                            />
                        )}

                        {!isLoading && activeTab === 'dashboard' && (
                            <VisualsSection
                                sips={sips}
                                allocations={allocations}
                            />
                        )}

                        {!isLoading && activeTab === 'rebalance' && (
                            <RebalanceSection
                                targetProfile={targetProfile}
                                onProfileChange={setTargetProfile}
                                rebalancePlan={rebalancePlan}
                                totalSIP={totalSIP}
                                onExportPDF={handleExportPDF}
                                onExportCSV={handleExportCSV}
                            />
                        )}

                        {!isLoading && activeTab === 'calculator' && (
                            <CalculatorSection
                                sips={sips}
                                totalSIP={totalSIP}
                            />
                        )}
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-900 text-xs rounded-xl flex gap-3 items-start border border-blue-200 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-700 font-bold text-sm">ℹ</span>
                    </div>
                    <p className="leading-relaxed">
                        <strong>Disclaimer:</strong> This tool provides educational analysis based on category averages and general investment principles.
                        It is not personalized investment advice. Please consult a SEBI-registered investment advisor before making any investment decisions.
                        Past performance is not indicative of future returns. Mutual fund investments are subject to market risks.
                    </p>
                </div>
            </main>
        </div>
    );
}
