import { MutualFundScheme } from '@/types/mutualfund';
import { calculateReturns, calculateRiskMetrics, getFundMockData } from '@/lib/fundAnalytics';
import { X, Star, TrendingUp, AlertTriangle, IndianRupee, Percent, Download, Info } from 'lucide-react';

interface ComparisonTableProps {
    funds: MutualFundScheme[];
    onRemoveFund: (schemeCode: number) => void;
}

export default function ComparisonTable({ funds, onRemoveFund }: ComparisonTableProps) {
    if (funds.length === 0) return null;

    // Pre-calculate data for all funds
    const fundsData = funds.map(fund => {
        const returns = calculateReturns(fund.data);
        const risk = calculateRiskMetrics(fund.data);
        const mock = getFundMockData(fund.meta.scheme_code);
        return { ...fund, returns, risk, mock };
    });

    const handleDownloadCSV = () => {
        const headers = ['Metric', ...fundsData.map(f => f.meta.scheme_name)];
        const rows = [
            ['Category', ...fundsData.map(f => f.meta.scheme_category)],
            ['1 Year Return', ...fundsData.map(f => f.returns.oneYear ? `${f.returns.oneYear.toFixed(2)}%` : '-')],
            ['3 Year Return', ...fundsData.map(f => f.returns.threeYear ? `${f.returns.threeYear.toFixed(2)}%` : '-')],
            ['5 Year Return', ...fundsData.map(f => f.returns.fiveYear ? `${f.returns.fiveYear.toFixed(2)}%` : '-')],
            ['Max Return', ...fundsData.map(f => f.returns.max ? `${f.returns.max.toFixed(2)}%` : '-')],
            ['Risk Level', ...fundsData.map(f => f.mock.riskLevel)],
            ['Standard Deviation', ...fundsData.map(f => `${f.risk.standardDeviation}%`)],
            ['Sharpe Ratio', ...fundsData.map(f => f.risk.sharpeRatio)],
            ['Sortino Ratio', ...fundsData.map(f => f.risk.sortinoRatio)],
            ['Rating', ...fundsData.map(f => f.mock.rating)],
            ['AUM', ...fundsData.map(f => f.mock.aum)],
            ['Expense Ratio', ...fundsData.map(f => f.mock.expenseRatio)],
            ['Exit Load', ...fundsData.map(f => f.mock.exitLoad)],
            ['Min Investment', ...fundsData.map(f => f.mock.minInvestment)],
            ['Fund House', ...fundsData.map(f => f.meta.fund_house)],
        ];

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'fund_comparison.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderCell = (label: string, icon: React.ReactNode, values: (string | number | React.ReactNode)[], highlight = false) => (
        <tr className={`border-b border-gray-100 ${highlight ? 'bg-blue-50/50' : ''}`}>
            <td className="py-4 px-4 text-sm font-medium text-gray-500 w-48 sticky left-0 bg-white/95 backdrop-blur-sm border-r border-gray-100 z-10">
                <div className="flex items-center gap-2">
                    {icon}
                    {label}
                </div>
            </td>
            {values.map((val, idx) => (
                <td key={idx} className="py-4 px-6 text-sm text-gray-900 font-medium text-center min-w-[200px]">
                    {val}
                </td>
            ))}
        </tr>
    );

    const formatReturn = (val: number | null) => {
        if (val === null) return '-';
        return (
            <span className={val >= 0 ? 'text-green-600' : 'text-red-600'}>
                {val.toFixed(2)}%
            </span>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-end bg-gray-50/50">
                <button
                    onClick={handleDownloadCSV}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
                >
                    <Download size={16} />
                    Download CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-6 px-4 text-left bg-gray-50/80 sticky left-0 z-20 border-r border-gray-200 w-48">
                                <span className="text-lg font-bold text-gray-800">Metrics</span>
                            </th>
                            {fundsData.map((fund) => (
                                <th key={fund.meta.scheme_code} className="py-6 px-6 bg-gray-50/50 min-w-[200px] relative group">
                                    <button
                                        onClick={() => onRemoveFund(fund.meta.scheme_code)}
                                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                        title="Remove fund"
                                    >
                                        <X size={14} />
                                    </button>
                                    <div className="text-sm font-bold text-gray-900 line-clamp-2 h-10 mb-2" title={fund.meta.scheme_name}>
                                        {fund.meta.scheme_name}
                                    </div>
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {fund.meta.scheme_category || 'Mutual Fund'}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Returns Section */}
                        <tr>
                            <td colSpan={funds.length + 1} className="bg-gray-50/30 py-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Returns (CAGR)
                            </td>
                        </tr>
                        {renderCell('1 Year', <TrendingUp size={16} className="text-blue-500" />, fundsData.map(f => formatReturn(f.returns.oneYear)))}
                        {renderCell('3 Year', <TrendingUp size={16} className="text-blue-500" />, fundsData.map(f => formatReturn(f.returns.threeYear)))}
                        {renderCell('5 Year', <TrendingUp size={16} className="text-blue-500" />, fundsData.map(f => formatReturn(f.returns.fiveYear)))}
                        {renderCell('Max', <TrendingUp size={16} className="text-purple-500" />, fundsData.map(f => formatReturn(f.returns.max)), true)}

                        {/* Risk Section */}
                        <tr>
                            <td colSpan={funds.length + 1} className="bg-gray-50/30 py-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Risk Metrics
                            </td>
                        </tr>
                        {renderCell('Risk Level', <AlertTriangle size={16} className="text-orange-500" />, fundsData.map(f => (
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${f.mock.riskLevel.includes('High') ? 'bg-red-100 text-red-700' :
                                f.mock.riskLevel.includes('Moderate') ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                }`}>
                                {f.mock.riskLevel}
                            </span>
                        )))}
                        {renderCell('Std Dev', <AlertTriangle size={16} className="text-gray-400" />, fundsData.map(f => `${f.risk.standardDeviation}%`))}
                        {renderCell('Sharpe Ratio', <AlertTriangle size={16} className="text-gray-400" />, fundsData.map(f => f.risk.sharpeRatio))}
                        {renderCell('Sortino Ratio', <AlertTriangle size={16} className="text-gray-400" />, fundsData.map(f => f.risk.sortinoRatio))}

                        {/* Fund Details Section */}
                        <tr>
                            <td colSpan={funds.length + 1} className="bg-gray-50/30 py-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Fund Details
                            </td>
                        </tr>
                        {renderCell('Rating', <Star size={16} className="text-yellow-400" />, fundsData.map(f => (
                            <div className="flex items-center justify-center gap-1">
                                <span className="font-bold text-gray-900">{f.mock.rating}</span>
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            </div>
                        )))}
                        {renderCell('AUM', <IndianRupee size={16} className="text-green-600" />, fundsData.map(f => f.mock.aum))}
                        {renderCell('Expense Ratio', <Percent size={16} className="text-gray-500" />, fundsData.map(f => f.mock.expenseRatio))}
                        {renderCell('Exit Load', <Info size={16} className="text-gray-400" />, fundsData.map(f => (
                            <span className="text-xs" title={f.mock.exitLoad}>{f.mock.exitLoad}</span>
                        )))}
                        {renderCell('Min Investment', <IndianRupee size={16} className="text-gray-400" />, fundsData.map(f => f.mock.minInvestment))}
                        {renderCell('Fund House', <IndianRupee size={16} className="text-gray-400 opacity-0" />, fundsData.map(f => f.meta.fund_house))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
