import React from 'react';
import { SIP, Allocation } from '@/types/portfolio';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { COLORS } from '@/lib/categories';

interface VisualsSectionProps {
    sips: SIP[];
    allocations: Allocation[];
}

export default function VisualsSection({ sips, allocations }: VisualsSectionProps) {
    // Group by category for bar chart
    const categoryData = sips.reduce((acc, sip) => {
        const existing = acc.find(item => item.category === sip.category);
        if (existing) {
            existing.amount += sip.amount;
        } else {
            acc.push({ category: sip.category, amount: sip.amount });
        }
        return acc;
    }, [] as { category: string; amount: number }[]);

    // Risk distribution data
    const riskData = [
        { risk: 'Low (0-3)', count: sips.filter(s => s.risk <= 3).length },
        { risk: 'Medium (4-6)', count: sips.filter(s => s.risk >= 4 && s.risk <= 6).length },
        { risk: 'High (7-10)', count: sips.filter(s => s.risk >= 7).length },
    ].filter(item => item.count > 0);

    return (
        <div className="space-y-6">
            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart - Current Allocation */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">Current Allocation by Fund</h3>
                    <div className="h-80">
                        {sips.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sips}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name.split(' ').slice(0, 2).join(' ')}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="amount"
                                        nameKey="fund_name"
                                    >
                                        {sips.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${value}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">
                                No data to display
                            </div>
                        )}
                    </div>
                </div>

                {/* Bar Chart - Category Breakdown */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">Allocation by Category</h3>
                    <div className="h-80">
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData} layout="vertical" margin={{ left: 80, right: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="category" type="category" width={80} tick={{ fontSize: 11 }} />
                                    <Tooltip formatter={(value) => `₹${value}`} />
                                    <Bar dataKey="amount" fill="#4f46e5" radius={[0, 8, 8, 0]} barSize={24}>
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">
                                No data to display
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Risk Distribution */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wide">Risk Distribution</h3>
                <div className="h-64">
                    {riskData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={riskData}>
                                <XAxis dataKey="risk" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} barSize={60}>
                                    <Cell fill="#10b981" />
                                    <Cell fill="#f59e0b" />
                                    <Cell fill="#ef4444" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            No data to display
                        </div>
                    )}
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-xs text-blue-700 font-semibold uppercase mb-1">Largest Holding</p>
                    <p className="text-lg font-bold text-blue-900 truncate">
                        {sips.length > 0 ? sips.reduce((max, sip) => sip.amount > max.amount ? sip : max).fund_name.split(' ').slice(0, 3).join(' ') : 'N/A'}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                    <p className="text-xs text-emerald-700 font-semibold uppercase mb-1">Categories</p>
                    <p className="text-lg font-bold text-emerald-900">
                        {new Set(sips.map(s => s.category)).size}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                    <p className="text-xs text-purple-700 font-semibold uppercase mb-1">Avg. Risk</p>
                    <p className="text-lg font-bold text-purple-900">
                        {sips.length > 0 ? (sips.reduce((sum, s) => sum + s.risk, 0) / sips.length).toFixed(1) : '0'}/10
                    </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
                    <p className="text-xs text-orange-700 font-semibold uppercase mb-1">High Risk %</p>
                    <p className="text-lg font-bold text-orange-900">
                        {sips.length > 0 ? ((sips.filter(s => s.risk >= 8).reduce((sum, s) => sum + s.amount, 0) / sips.reduce((sum, s) => sum + s.amount, 0)) * 100).toFixed(0) : '0'}%
                    </p>
                </div>
            </div>
        </div>
    );
}
