'use client';

import { MutualFundScheme } from '@/types/mutualfund';
import { Building2, TrendingUp, Tag, Hash, Calendar } from 'lucide-react';

interface FundDetailsProps {
    scheme: MutualFundScheme;
}

export default function FundDetails({ scheme }: FundDetailsProps) {
    const latestNAV = scheme.data && scheme.data.length > 0 ? scheme.data[0] : null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {scheme.meta.scheme_name}
                </h2>
                {latestNAV && (
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-blue-600">
                            ₹{parseFloat(latestNAV.nav).toFixed(4)}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(latestNAV.date.split('-').reverse().join('-')).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                    icon={<Building2 className="w-5 h-5" />}
                    label="Fund House"
                    value={scheme.meta.fund_house}
                />
                <InfoCard
                    icon={<TrendingUp className="w-5 h-5" />}
                    label="Scheme Type"
                    value={scheme.meta.scheme_type}
                />
                <InfoCard
                    icon={<Tag className="w-5 h-5" />}
                    label="Category"
                    value={scheme.meta.scheme_category}
                />
                <InfoCard
                    icon={<Hash className="w-5 h-5" />}
                    label="Scheme Code"
                    value={scheme.meta.scheme_code.toString()}
                />
            </div>

            {(scheme.meta.isin_growth || scheme.meta.isin_div_reinvestment) && (
                <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">ISIN Codes</h3>
                    <div className="space-y-2">
                        {scheme.meta.isin_growth && (
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <span className="text-sm text-gray-600">Growth</span>
                                <span className="text-sm font-mono font-medium text-gray-900">
                                    {scheme.meta.isin_growth}
                                </span>
                            </div>
                        )}
                        {scheme.meta.isin_div_reinvestment && (
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <span className="text-sm text-gray-600">Dividend Reinvestment</span>
                                <span className="text-sm font-mono font-medium text-gray-900">
                                    {scheme.meta.isin_div_reinvestment}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            <p className="text-gray-900 font-semibold text-base line-clamp-2">
                {value}
            </p>
        </div>
    );
}
