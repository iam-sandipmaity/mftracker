import React from 'react';
import { RedFlag } from '@/types/portfolio';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface RedFlagsSectionProps {
    redFlags: RedFlag[];
}

export default function RedFlagsSection({ redFlags }: RedFlagsSectionProps) {
    if (redFlags.length === 0) return null;

    return (
        <div className="mb-8 animate-slide-up">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldAlert className="text-red-500 w-6 h-6" />
                Detected Red Flags
                <span className="ml-2 text-sm font-normal text-slate-500">({redFlags.length} issue{redFlags.length > 1 ? 's' : ''})</span>
            </h2>
            <div className="space-y-3">
                {redFlags.map((flag, idx) => (
                    <div
                        key={idx}
                        className={`p-4 rounded-xl border-l-4 flex gap-3 shadow-sm transition-all duration-200 hover:shadow-md ${flag.severity === 'high'
                                ? 'bg-red-50 border-red-500'
                                : flag.severity === 'medium'
                                    ? 'bg-orange-50 border-orange-400'
                                    : 'bg-yellow-50 border-yellow-400'
                            }`}
                    >
                        <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${flag.severity === 'high'
                                ? 'text-red-600'
                                : flag.severity === 'medium'
                                    ? 'text-orange-500'
                                    : 'text-yellow-500'
                            }`} />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${flag.severity === 'high'
                                        ? 'bg-red-200 text-red-800'
                                        : flag.severity === 'medium'
                                            ? 'bg-orange-200 text-orange-800'
                                            : 'bg-yellow-200 text-yellow-800'
                                    }`}>
                                    {flag.severity}
                                </span>
                                <span className="text-xs text-slate-500 font-mono">{flag.code}</span>
                            </div>
                            <p className={`text-sm leading-relaxed ${flag.severity === 'high'
                                    ? 'text-red-900'
                                    : flag.severity === 'medium'
                                        ? 'text-orange-900'
                                        : 'text-yellow-900'
                                }`}>
                                {flag.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
