'use client';

import { useState, useEffect } from 'react';
import { Goal } from './GoalCard';
import { calculateRequiredSIP } from '@/lib/goalCalculator';
import { X, Save, Calculator } from 'lucide-react';

interface GoalFormProps {
    initialData?: Goal | null;
    onSave: (goal: Omit<Goal, 'id'>) => void;
    onCancel: () => void;
}

export default function GoalForm({ initialData, onSave, onCancel }: GoalFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: '',
        years: '',
        expectedReturn: '12',
        currentSavings: '0'
    });

    const [calculatedSIP, setCalculatedSIP] = useState(0);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                targetAmount: initialData.targetAmount.toString(),
                years: initialData.years.toString(),
                expectedReturn: initialData.expectedReturn.toString(),
                currentSavings: initialData.currentSavings.toString()
            });
        }
    }, [initialData]);

    useEffect(() => {
        const target = parseFloat(formData.targetAmount) || 0;
        const years = parseFloat(formData.years) || 0;
        const rate = parseFloat(formData.expectedReturn) || 0;
        const current = parseFloat(formData.currentSavings) || 0;

        const result = calculateRequiredSIP(target, years, rate, current);
        setCalculatedSIP(result.requiredSIP);
    }, [formData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name: formData.name,
            targetAmount: parseFloat(formData.targetAmount) || 0,
            years: parseFloat(formData.years) || 0,
            expectedReturn: parseFloat(formData.expectedReturn) || 0,
            currentSavings: parseFloat(formData.currentSavings) || 0,
            requiredSIP: calculatedSIP
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? 'Edit Goal' : 'New Financial Goal'}
                    </h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., Retirement, Dream Home"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (₹)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                                value={formData.targetAmount}
                                onChange={e => setFormData({ ...formData, targetAmount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time Horizon (Years)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                max="50"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                                value={formData.years}
                                onChange={e => setFormData({ ...formData, years: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Exp. Return (%)</label>
                            <input
                                type="number"
                                required
                                min="1"
                                max="30"
                                step="0.1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                                value={formData.expectedReturn}
                                onChange={e => setFormData({ ...formData, expectedReturn: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings (₹)</label>
                            <input
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                                value={formData.currentSavings}
                                onChange={e => setFormData({ ...formData, currentSavings: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-blue-900">Required Monthly SIP</span>
                            <span className="text-xl font-bold text-blue-700">₹{calculatedSIP.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            Save Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
