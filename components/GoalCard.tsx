'use client';

import { Edit2, Trash2, TrendingUp, Calendar, Target, Download } from 'lucide-react';
import { exportGoalToCSV } from '@/lib/export';

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    years: number;
    expectedReturn: number;
    currentSavings: number;
    requiredSIP: number;
}

interface GoalCardProps {
    goal: Goal;
    onEdit: (goal: Goal) => void;
    onDelete: (id: string) => void;
}

export default function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
    const progress = Math.min(100, (goal.currentSavings / goal.targetAmount) * 100);

    const handleDownloadCSV = () => {
        exportGoalToCSV(goal);
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600" />

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{goal.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar size={14} />
                        <span>{goal.years} years to go</span>
                    </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleDownloadCSV}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        title="Download as CSV"
                    >
                        <Download size={16} />
                    </button>
                    <button
                        onClick={() => onEdit(goal)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(goal.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-900">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>₹{goal.currentSavings.toLocaleString('en-IN')}</span>
                        <span>Target: ₹{goal.targetAmount.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Required Monthly SIP</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">
                        ₹{goal.requiredSIP.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        Assuming {goal.expectedReturn}% annual returns
                    </p>
                </div>
            </div>
        </div>
    );
}
