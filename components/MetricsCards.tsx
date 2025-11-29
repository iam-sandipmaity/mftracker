import React from 'react';
import { DollarSign, Activity, Layers, PieChart } from 'lucide-react';

interface MetricsCardsProps {
    totalSIP: number;
    riskScore: number;
    fundsCount: number;
    diversificationScore: number;
}

export default function MetricsCards({
    totalSIP,
    riskScore,
    fundsCount,
    diversificationScore
}: MetricsCardsProps) {
    const riskLevel = riskScore >= 8 ? 'Aggressive' :
        riskScore >= 6 ? 'Moderate-High' :
            riskScore >= 4 ? 'Moderate' : 'Conservative';

    const riskColor = riskScore >= 8 ? 'from-red-500 to-red-600' :
        riskScore >= 6 ? 'from-orange-500 to-orange-600' :
            riskScore >= 4 ? 'from-yellow-500 to-yellow-600' : 'from-green-500 to-green-600';

    const riskBg = riskScore >= 8 ? 'from-red-50 to-red-100' :
        riskScore >= 6 ? 'from-orange-50 to-orange-100' :
            riskScore >= 4 ? 'from-yellow-50 to-yellow-100' : 'from-green-50 to-green-100';

    const divColor = diversificationScore >= 70 ? 'from-emerald-500 to-emerald-600' :
        diversificationScore >= 50 ? 'from-yellow-500 to-yellow-600' : 'from-orange-500 to-orange-600';

    const divBg = diversificationScore >= 70 ? 'from-emerald-50 to-emerald-100' :
        diversificationScore >= 50 ? 'from-yellow-50 to-yellow-100' : 'from-orange-50 to-orange-100';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total SIP */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-blue-700 uppercase font-bold tracking-wider">Total Monthly SIP</p>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-blue-900 mb-1">₹{totalSIP.toLocaleString()}</p>
                <p className="text-xs text-blue-600 font-medium">Invested across {fundsCount} fund{fundsCount !== 1 ? 's' : ''}</p>
            </div>

            {/* Risk Score */}
            <div className={`bg-gradient-to-br ${riskBg} p-6 rounded-2xl shadow-lg border ${riskScore >= 8 ? 'border-red-200' : riskScore >= 6 ? 'border-orange-200' : riskScore >= 4 ? 'border-yellow-200' : 'border-green-200'} hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                    <p className={`text-xs uppercase font-bold tracking-wider ${riskScore >= 8 ? 'text-red-700' : riskScore >= 6 ? 'text-orange-700' : riskScore >= 4 ? 'text-yellow-700' : 'text-green-700'}`}>Risk Score</p>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Activity className={`w-5 h-5 ${riskScore >= 8 ? 'text-red-600' : riskScore >= 6 ? 'text-orange-600' : riskScore >= 4 ? 'text-yellow-600' : 'text-green-600'}`} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                    <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${riskColor} bg-clip-text text-transparent`}>
                        {riskScore.toFixed(1)}
                    </p>
                    <span className="text-lg text-slate-500 font-semibold">/10</span>
                </div>
                <span className={`text-xs px-3 py-1.5 bg-white rounded-full font-bold inline-block shadow-sm ${riskScore >= 8 ? 'text-red-700' : riskScore >= 6 ? 'text-orange-700' : riskScore >= 4 ? 'text-yellow-700' : 'text-green-700'}`}>
                    {riskLevel}
                </span>
            </div>

            {/* Funds Count */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-purple-700 uppercase font-bold tracking-wider">Active Funds</p>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-purple-900 mb-1">{fundsCount}</p>
                <p className="text-xs text-purple-600 font-medium">
                    {fundsCount === 0 ? 'Add your first fund' :
                     fundsCount <= 3 ? 'Consider diversifying more' :
                     fundsCount <= 7 ? 'Good diversification' :
                     fundsCount <= 10 ? 'Well balanced portfolio' :
                     'Risk of over-diversification'}
                </p>
            </div>

            {/* Diversification Score */}
            <div className={`bg-gradient-to-br ${divBg} p-6 rounded-2xl shadow-lg border ${diversificationScore >= 70 ? 'border-emerald-200' : diversificationScore >= 50 ? 'border-yellow-200' : 'border-orange-200'} hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                    <p className={`text-xs uppercase font-bold tracking-wider ${diversificationScore >= 70 ? 'text-emerald-700' : diversificationScore >= 50 ? 'text-yellow-700' : 'text-orange-700'}`}>Diversification</p>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                        <PieChart className={`w-5 h-5 ${diversificationScore >= 70 ? 'text-emerald-600' : diversificationScore >= 50 ? 'text-yellow-600' : 'text-orange-600'}`} />
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                    <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${divColor} bg-clip-text text-transparent`}>
                        {diversificationScore}
                    </p>
                    <span className="text-lg text-slate-500 font-semibold">/100</span>
                </div>
                <div className="w-full bg-white rounded-full h-3 shadow-inner">
                    <div
                        className={`h-3 rounded-full transition-all duration-700 bg-gradient-to-r ${divColor} shadow-sm`}
                        style={{ width: `${Math.min(diversificationScore, 100)}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
