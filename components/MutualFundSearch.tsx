'use client';

import { useState } from 'react';
import FundSearchBar from './FundSearchBar';
import FundDetails from './FundDetails';
import NAVChart from './NAVChart';
import { MutualFundScheme } from '@/types/mutualfund';
import { Loader2, TrendingUp } from 'lucide-react';

export default function MutualFundSearch() {
    const [selectedFund, setSelectedFund] = useState<MutualFundScheme | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectFund = async (schemeCode: number, schemeName: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/mf/scheme/${schemeCode}`);
            if (!response.ok) {
                throw new Error('Failed to fetch fund details');
            }

            const data: MutualFundScheme = await response.json();
            setSelectedFund(data);
        } catch (err) {
            setError('Failed to load fund details. Please try again.');
            console.error('Error fetching fund details:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <TrendingUp className="w-10 h-10 text-blue-600" />
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Mutual Fund Explorer
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Search and analyze mutual funds with real-time NAV data and comprehensive fund details
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-12">
                    <FundSearchBar onSelectFund={handleSelectFund} />
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <p className="text-gray-600">Loading fund details...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                            <p className="text-red-800 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {/* Fund Details and Chart */}
                {!isLoading && selectedFund && (
                    <div className="space-y-8 animate-fadeIn">
                        <FundDetails scheme={selectedFund} />
                        <NAVChart data={selectedFund.data} schemeName={selectedFund.meta.scheme_name} />
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !selectedFund && !error && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                            <TrendingUp className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Start Exploring Mutual Funds
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Search for any mutual fund above to view detailed information, historical NAV data, and performance charts
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
