'use client';

import { useState } from 'react';
import FundSearchBar from './FundSearchBar';
import ComparisonTable from './ComparisonTable';
import { MutualFundScheme } from '@/types/mutualfund';
import { Plus, ArrowRight, BarChart2, X } from 'lucide-react';

export default function FundComparison() {
    const [selectedFunds, setSelectedFunds] = useState<MutualFundScheme[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectFund = async (schemeCode: number, schemeName: string) => {
        // Check if already added
        if (selectedFunds.some(f => f.meta.scheme_code === schemeCode)) {
            setError('Fund already added to comparison');
            setTimeout(() => setError(null), 3000);
            return;
        }

        if (selectedFunds.length >= 5) {
            setError('You can compare up to 5 funds at a time');
            setTimeout(() => setError(null), 3000);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/mf/scheme/${schemeCode}`);
            if (!response.ok) throw new Error('Failed to fetch fund details');

            const data: MutualFundScheme = await response.json();
            setSelectedFunds(prev => [...prev, data]);
        } catch (err) {
            setError('Failed to load fund details');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFund = (schemeCode: number) => {
        setSelectedFunds(prev => prev.filter(f => f.meta.scheme_code !== schemeCode));
    };

    const MAX_FUNDS = 5;
    const slots = [...selectedFunds, ...Array(Math.max(0, MAX_FUNDS - selectedFunds.length)).fill(null)];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Compare Mutual Funds
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Select up to {MAX_FUNDS} funds to compare side-by-side.
                </p>
            </div>

            {/* Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
                {slots.map((fund, index) => (
                    <div key={fund ? fund.meta.scheme_code : `empty-${index}`} className="relative">
                        {fund ? (
                            <div className="h-full p-4 bg-white rounded-xl border-2 border-blue-100 shadow-sm flex flex-col justify-between group hover:border-blue-300 transition-all">
                                <div>
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveFund(fund.meta.scheme_code)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-full"
                                            title="Remove fund"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm mb-1" title={fund.meta.scheme_name}>
                                        {fund.meta.scheme_name}
                                    </h3>
                                    <p className="text-xs text-gray-500">{fund.meta.scheme_category}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-4 flex flex-col items-center justify-center min-h-[140px]">
                                <span className="text-xs font-bold text-gray-400 mb-2">Fund {index + 1}</span>
                                <div className="w-full">
                                    <FundSearchBar onSelectFund={handleSelectFund} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {error && (
                <div className="max-w-2xl mx-auto p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 text-center animate-in fade-in">
                    {error}
                </div>
            )}

            {/* Comparison Section */}
            {selectedFunds.length > 0 ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ComparisonTable funds={selectedFunds} onRemoveFund={handleRemoveFund} />
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                        <BarChart2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-gray-500">
                        Search for funds in the boxes above to start comparing.
                    </p>
                </div>
            )}

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <span className="font-medium text-gray-700">Loading fund data...</span>
                    </div>
                </div>
            )}
        </div>
    );
}
