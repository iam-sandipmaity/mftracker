'use client';

import { useState, useEffect, useRef } from 'react';
import GoalCard, { Goal } from './GoalCard';
import GoalForm from './GoalForm';
import { Plus, Target, Download, Upload, Info } from 'lucide-react';
import { exportAllGoalsToCSV, exportGoalsToJSON, importGoalsFromJSON } from '@/lib/export';

export default function GoalPlanner() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load from LocalStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('mf_tracker_goals');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate data structure
                if (Array.isArray(parsed)) {
                    setGoals(parsed);
                } else {
                    console.error('Invalid goals data in localStorage');
                    localStorage.removeItem('mf_tracker_goals');
                }
            }
        } catch (error) {
            console.error('Failed to load goals from localStorage:', error);
            localStorage.removeItem('mf_tracker_goals');
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        try {
            localStorage.setItem('mf_tracker_goals', JSON.stringify(goals));
        } catch (error) {
            console.error('Failed to save goals to localStorage:', error);
            alert('Failed to save goals. Your browser storage might be full.');
        }
    }, [goals]);

    const handleSaveGoal = (goalData: Omit<Goal, 'id'>) => {
        if (editingGoal) {
            setGoals(prev => prev.map(g => g.id === editingGoal.id ? { ...goalData, id: g.id } : g));
        } else {
            setGoals(prev => [...prev, { ...goalData, id: crypto.randomUUID() }]);
        }
        setIsFormOpen(false);
        setEditingGoal(null);
    };

    const handleDeleteGoal = (id: string) => {
        if (confirm('Are you sure you want to delete this goal?')) {
            setGoals(prev => prev.filter(g => g.id !== id));
        }
    };

    const handleEditGoal = (goal: Goal) => {
        setEditingGoal(goal);
        setIsFormOpen(true);
    };

    const totalSIP = goals.reduce((sum, g) => sum + g.requiredSIP, 0);

    const handleExportAllGoals = () => {
        exportAllGoalsToCSV(goals);
    };

    const handleBackupGoals = () => {
        exportGoalsToJSON(goals);
    };

    const handleRestoreGoals = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const restoredGoals = await importGoalsFromJSON(file);
            
            if (confirm(`This will restore ${restoredGoals.length} goals. Do you want to replace existing goals or merge them?`)) {
                // Replace existing goals
                setGoals(restoredGoals);
                alert(`Successfully restored ${restoredGoals.length} goals!`);
            } else {
                // Merge with existing goals
                const merged = [...goals];
                restoredGoals.forEach(newGoal => {
                    const exists = merged.find(g => g.id === newGoal.id);
                    if (!exists) {
                        merged.push(newGoal);
                    }
                });
                setGoals(merged);
                alert(`Successfully merged ${restoredGoals.length} goals!`);
            }
        } catch (error) {
            alert(`Failed to restore goals: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-8">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Your data is stored locally in your browser</p>
                    <p className="text-blue-700">Goals are saved automatically and persist across sessions. Use the backup feature to save your data externally and prevent loss if you clear browser data.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Goal Planning</h1>
                    <p className="text-gray-600">Track your financial goals and plan your investments</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {goals.length > 0 && (
                        <>
                            <button
                                onClick={handleBackupGoals}
                                className="px-4 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
                                title="Backup all goals as JSON file"
                            >
                                <Download size={18} />
                                Backup
                            </button>
                            <button
                                onClick={handleExportAllGoals}
                                className="px-4 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
                                title="Export all goals as CSV"
                            >
                                <Download size={18} />
                                Export CSV
                            </button>
                        </>
                    )}
                    <label className="px-4 py-2.5 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-500/30 flex items-center gap-2 cursor-pointer">
                        <Upload size={18} />
                        Restore
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleRestoreGoals}
                            className="hidden"
                        />
                    </label>
                    <button
                        onClick={() => { setEditingGoal(null); setIsFormOpen(true); }}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add New Goal
                    </button>
                </div>
            </div>

            {goals.length > 0 && (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Target className="w-6 h-6 text-blue-200" />
                        <h2 className="text-lg font-semibold text-blue-100">Total Monthly SIP Required</h2>
                    </div>
                    <p className="text-4xl font-bold">₹{totalSIP.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-blue-200 mt-2">To achieve all {goals.length} goals on time</p>
                </div>
            )}

            {goals.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-6">
                        <Target className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Goals Set Yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-8">
                        Start by adding a financial goal like Retirement, Education, or a Dream Home.
                        We'll calculate how much you need to invest.
                    </p>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                        Create Your First Goal
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map(goal => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onEdit={handleEditGoal}
                            onDelete={handleDeleteGoal}
                        />
                    ))}
                </div>
            )}

            {isFormOpen && (
                <GoalForm
                    initialData={editingGoal}
                    onSave={handleSaveGoal}
                    onCancel={() => { setIsFormOpen(false); setEditingGoal(null); }}
                />
            )}
        </div>
    );
}
