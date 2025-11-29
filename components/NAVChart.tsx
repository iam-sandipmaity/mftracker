'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NAVData } from '@/types/mutualfund';

interface NAVChartProps {
    data: NAVData[];
    schemeName: string;
}

type TimePeriod = '1M' | '3M' | '6M' | '1Y' | 'MAX';

export default function NAVChart({ data, schemeName }: NAVChartProps) {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('1Y');

    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];

        const today = new Date();
        let startDate: Date;

        switch (timePeriod) {
            case '1M':
                startDate = new Date(today.setMonth(today.getMonth() - 1));
                break;
            case '3M':
                startDate = new Date(today.setMonth(today.getMonth() - 3));
                break;
            case '6M':
                startDate = new Date(today.setMonth(today.getMonth() - 6));
                break;
            case '1Y':
                startDate = new Date(today.setFullYear(today.getFullYear() - 1));
                break;
            case 'MAX':
                // For MAX, reverse to show oldest to newest (left to right)
                return [...data].reverse();
            default:
                startDate = new Date(today.setFullYear(today.getFullYear() - 1));
        }

        return data
            .filter(item => {
                const itemDate = new Date(item.date.split('-').reverse().join('-'));
                return itemDate >= startDate;
            })
            .reverse();
    }, [data, timePeriod]);

    const chartData = useMemo(() => {
        return filteredData.map(item => ({
            date: item.date,
            nav: parseFloat(item.nav),
            displayDate: new Date(item.date.split('-').reverse().join('-')).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: '2-digit'
            })
        }));
    }, [filteredData]);

    //Calculate growth percentage
    const growthPercentage = useMemo(() => {
        if (chartData.length < 2) return null;
        const firstNav = chartData[0].nav;
        const lastNav = chartData[chartData.length - 1].nav;
        const growth = ((lastNav - firstNav) / firstNav) * 100;
        return growth;
    }, [chartData]);

    // Calculate annualized return (CAGR) for MAX period
    const annualizedReturn = useMemo(() => {
        if (timePeriod !== 'MAX' || chartData.length < 2) return null;

        const firstNav = chartData[0].nav;
        const lastNav = chartData[chartData.length - 1].nav;

        const firstDate = new Date(chartData[0].date.split('-').reverse().join('-'));
        const lastDate = new Date(chartData[chartData.length - 1].date.split('-').reverse().join('-'));
        const years = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

        if (years <= 0) return null;

        const cagr = (Math.pow(lastNav / firstNav, 1 / years) - 1) * 100;
        return cagr;
    }, [chartData, timePeriod]);

    // Calculate maximum return achieved
    const maxReturn = useMemo(() => {
        if (chartData.length < 2) return null;
        const firstNav = chartData[0].nav;
        let maxGrowth = 0;

        chartData.forEach(item => {
            const currentGrowth = ((item.nav - firstNav) / firstNav) * 100;
            if (currentGrowth > maxGrowth) {
                maxGrowth = currentGrowth;
            }
        });

        return maxGrowth;
    }, [chartData]);

    // Get date range
    const dateRange = useMemo(() => {
        if (chartData.length < 2) return null;
        return {
            startDate: chartData[0].displayDate,
            endDate: chartData[chartData.length - 1].displayDate
        };
    }, [chartData]);

    const periods: { key: TimePeriod; label: string }[] = [
        { key: '1M', label: '1M' },
        { key: '3M', label: '3M' },
        { key: '6M', label: '6M' },
        { key: '1Y', label: '1Y' },
        { key: 'MAX', label: 'MAX' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">NAV History</h3>
                    {growthPercentage !== null && dateRange && (
                        <div className="mt-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Period:</span>
                                <span className="text-sm font-medium text-gray-800">
                                    {dateRange.startDate} to {dateRange.endDate}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Growth:</span>
                                    <span className={`text-lg font-bold flex items-center gap-1 ${growthPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {growthPercentage >= 0 ? '↑' : '↓'}
                                        {Math.abs(growthPercentage).toFixed(2)}%
                                    </span>
                                </div>
                                {maxReturn !== null && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Max Return:</span>
                                        <span className="text-sm font-semibold text-blue-600">
                                            {maxReturn.toFixed(2)}%
                                        </span>
                                    </div>
                                )}
                                {annualizedReturn !== null && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">CAGR:</span>
                                        <span className={`text-sm font-semibold ${annualizedReturn >= 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {annualizedReturn.toFixed(2)}% p.a.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    {periods.map(period => (
                        <button
                            key={period.key}
                            onClick={() => setTimePeriod(period.key)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                                ${timePeriod === period.key
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="displayDate"
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            tickFormatter={(value, index) => {
                                if (chartData.length > 50 && index % Math.floor(chartData.length / 10) !== 0) {
                                    return '';
                                }
                                return value;
                            }}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            tickFormatter={(value) => `₹${value.toFixed(0)}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                padding: '12px'
                            }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                                            <p className="text-sm font-semibold text-gray-800 mb-1">
                                                {data.displayDate}
                                            </p>
                                            <p className="text-lg font-bold text-blue-600">
                                                NAV: ₹{data.nav.toFixed(4)}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="nav"
                            stroke="#2563eb"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6, fill: '#2563eb' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    No NAV data available for the selected period
                </div>
            )}

            <div className="text-sm text-gray-500 text-center">
                Showing {chartData.length} data points
            </div>

            {/* Glossary Section */}
            <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Understanding the Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-semibold text-gray-800 mb-1">Growth</p>
                        <p className="text-gray-600 text-xs">
                            Total percentage change in NAV from the start to end of the selected period.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-semibold text-gray-800 mb-1">Max Return</p>
                        <p className="text-gray-600 text-xs">
                            The highest return achieved at any point during the selected period from the starting NAV.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-semibold text-gray-800 mb-1">CAGR (Compound Annual Growth Rate)</p>
                        <p className="text-gray-600 text-xs">
                            The annualized rate of return over the entire period, showing average yearly growth. Only shown for MAX period.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
