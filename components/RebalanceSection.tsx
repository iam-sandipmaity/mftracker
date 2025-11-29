import React from 'react';
import { RiskProfile, RebalanceChange } from '../types/portfolio';
import { RISK_PROFILES } from '../lib/categories';
import { TrendingUp, TrendingDown, Download, FileText, Sliders } from 'lucide-react';

interface RebalanceSectionProps {
    targetProfile: RiskProfile;
    onProfileChange: (profile: RiskProfile) => void;
    rebalancePlan: RebalanceChange[];
    totalSIP: number;
    onExportPDF: () => void;
    onExportCSV: () => void;
}

export default function RebalanceSection({
    targetProfile,
    onProfileChange,
    rebalancePlan,
    totalSIP,
    onExportPDF,
    onExportCSV
}: RebalanceSectionProps) {
    const profiles: RiskProfile[] = ['Conservative', 'Balanced', 'Growth', 'Aggressive'];

    const profileDescriptions = {
        Conservative: 'Low risk, stable returns. Ideal for short-term goals or risk-averse investors.',
        Balanced: 'Moderate risk-reward balance. Suitable for medium-term wealth building.',
        Growth: 'Higher risk for potentially higher returns. For long-term wealth creation.',
        Aggressive: 'Maximum growth potential with high volatility. For experienced investors with long horizons.'
    };

    return (
        <div className="space-y-6">
            {/* Profile Selector */}
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-2 mb-4">
                    <Sliders className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-base font-bold text-slate-800">Select Target Investment Profile</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {profiles.map(profile => (
                        <button
                            key={profile}
                            onClick={() => onProfileChange(profile)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${targetProfile === profile
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                                }`}
                        >
                            {profile}
                        </button>
                    ))}
                </div>

                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-indigo-200">
                    <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-semibold text-indigo-700">{targetProfile}:</span> {profileDescriptions[targetProfile]}
                    </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Target Monthly SIP</p>
                        <p className="font-mono font-bold text-xl text-indigo-700">₹{totalSIP.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-600 mb-1">Recommended Changes</p>
                        <p className="font-bold text-xl text-slate-800">{rebalancePlan.filter(p => p.diff !== 0).length}</p>
                    </div>
                </div>
            </div>

            {/* Target Allocation Overview */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">Target Allocation for {targetProfile} Profile</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(RISK_PROFILES[targetProfile]).map(([category, pct]) => (
                        pct > 0 && (
                            <div key={category} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <p className="text-xs text-slate-600 mb-1">{category}</p>
                                <p className="text-lg font-bold text-indigo-600">{pct}%</p>
                                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                                    <div
                                        className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                                        style={{ width: `${pct}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Recommendations Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <h3 className="text-base font-bold text-slate-800">Actionable Rebalancing Plan</h3>
                    <p className="text-sm text-slate-600 mt-1">Adjust your SIP amounts to match the target profile</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-xs">
                            <tr>
                                <th className="p-4">Fund / Category</th>
                                <th className="p-4 text-right">Current</th>
                                <th className="p-4 text-right">Recommended</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rebalancePlan.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-500 italic">
                                        No rebalancing needed
                                    </td>
                                </tr>
                            )}
                            {rebalancePlan.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className={`hover:bg-slate-50 transition-colors ${item.isNew ? 'bg-indigo-50/30' : ''
                                        }`}
                                >
                                    <td className="p-4">
                                        <div>
                                            <p className={`font-medium ${item.isNew ? 'text-indigo-700' : 'text-slate-800'}`}>
                                                {item.isNew && '✨ '}
                                                {item.fund_name}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                                                    {item.category}
                                                </span>
                                                {item.reason && (
                                                    <span className="text-xs text-slate-500 italic">
                                                        {item.reason}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-mono text-slate-700">
                                        {item.current > 0 ? `₹${item.current.toLocaleString()}` : '-'}
                                    </td>
                                    <td className="p-4 text-right font-mono font-bold text-slate-800">
                                        ₹{item.recommended.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        {item.diff > 0 && (
                                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-bold">
                                                <TrendingUp className="w-3.5 h-3.5" /> +₹{item.diff.toLocaleString()}
                                            </span>
                                        )}
                                        {item.diff < 0 && (
                                            <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-3 py-1.5 rounded-full text-xs font-bold">
                                                <TrendingDown className="w-3.5 h-3.5" /> -₹{Math.abs(item.diff).toLocaleString()}
                                            </span>
                                        )}
                                        {item.diff === 0 && (
                                            <span className="text-slate-400 text-xs uppercase tracking-wide font-semibold">Keep</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Export Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                    onClick={onExportCSV}
                    className="flex items-center justify-center gap-2 bg-white border-2 border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all text-sm font-semibold shadow-sm"
                >
                    <FileText className="w-4 h-4" /> Export CSV
                </button>
                <button
                    onClick={onExportPDF}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-5 py-2.5 rounded-lg hover:from-slate-900 hover:to-black transition-all text-sm font-semibold shadow-md hover:shadow-lg"
                >
                    <Download className="w-4 h-4" /> Export Full Report (PDF)
                </button>
            </div>
        </div>
    );
}
