import React, { useState, useRef } from 'react';
import { SIP } from '@/types/portfolio';
import { CATEGORY_RISK_MAP } from '@/lib/categories';
import { Plus, Trash2, Upload, FileText, Image as ImageIcon, Edit2, Check, X } from 'lucide-react';

interface InputSectionProps {
    sips: SIP[];
    onAddFund: (fund: Omit<SIP, 'id' | 'risk'>) => void;
    onDeleteFund: (id: string | number) => void;
    onUpdateFund: (id: string | number, updates: Partial<SIP>) => void;
    onFileUpload: (file: File, type: 'csv' | 'json' | 'image') => void;
    totalSIP: number;
}

export default function InputSection({
    sips,
    onAddFund,
    onDeleteFund,
    onUpdateFund,
    onFileUpload,
    totalSIP
}: InputSectionProps) {
    const [newItem, setNewItem] = useState({
        fund_name: '',
        amount: '',
        category: 'Large Cap'
    });

    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editForm, setEditForm] = useState({
        fund_name: '',
        amount: '',
        category: ''
    });

    const csvInputRef = useRef<HTMLInputElement>(null);
    const jsonInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.fund_name || !newItem.amount) return;

        onAddFund({
            fund_name: newItem.fund_name,
            amount: parseFloat(newItem.amount),
            category: newItem.category,
        });

        setNewItem({ fund_name: '', amount: '', category: 'Large Cap' });
    };

    const handleEdit = (sip: SIP) => {
        setEditingId(sip.id);
        setEditForm({
            fund_name: sip.fund_name,
            amount: sip.amount.toString(),
            category: sip.category
        });
    };

    const handleSaveEdit = (id: string | number) => {
        if (!editForm.fund_name || !editForm.amount) return;

        onUpdateFund(id, {
            fund_name: editForm.fund_name,
            amount: parseFloat(editForm.amount),
            category: editForm.category
        });

        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'csv' | 'json' | 'image') => {
        const file = e.target.files?.[0];
        if (file) {
            onFileUpload(file, type);
        }
        e.target.value = ''; // Reset input
    };

    return (
        <div className="space-y-6">
            {/* File Upload Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200">
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-600" /> Quick Import
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                        onClick={() => csvInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 bg-white hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-700 px-4 py-3 rounded-lg transition-all font-medium text-sm"
                    >
                        <FileText className="w-4 h-4" />
                        Upload CSV
                    </button>
                    <button
                        onClick={() => jsonInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 bg-white hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-700 px-4 py-3 rounded-lg transition-all font-medium text-sm"
                    >
                        <FileText className="w-4 h-4" />
                        Upload JSON
                    </button>
                    <button
                        onClick={() => imageInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 bg-white hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-700 px-4 py-3 rounded-lg transition-all font-medium text-sm"
                    >
                        <ImageIcon className="w-4 h-4" />
                        Upload Screenshot
                    </button>
                </div>

                <input
                    ref={csvInputRef}
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileChange(e, 'csv')}
                    className="hidden"
                />
                <input
                    ref={jsonInputRef}
                    type="file"
                    accept=".json"
                    onChange={(e) => handleFileChange(e, 'json')}
                    className="hidden"
                />
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')}
                    className="hidden"
                />
            </div>

            {/* Manual Entry Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-600" /> Add Fund Manually
                </h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="md:col-span-5">
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Fund Name</label>
                        <input
                            type="text"
                            placeholder="e.g. SBI Bluechip Fund"
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={newItem.fund_name}
                            onChange={e => setNewItem({ ...newItem, fund_name: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                        <select
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white transition-all"
                            value={newItem.category}
                            onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                        >
                            {Object.keys(CATEGORY_RISK_MAP).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount (₹)</label>
                        <input
                            type="number"
                            placeholder="1000"
                            min="0"
                            step="10"
                            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            value={newItem.amount}
                            onChange={e => setNewItem({ ...newItem, amount: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 flex items-end">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white p-2.5 rounded-lg transition-all font-semibold flex justify-center items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-4 h-4" /> Add
                        </button>
                    </div>
                </form>

                {/* Funds Table */}
                <div className="overflow-hidden rounded-lg border border-slate-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 font-semibold uppercase text-xs">
                                <tr>
                                    <th className="p-3">Fund Name</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3 text-right">Amount</th>
                                    <th className="p-3 text-center">Risk</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {sips.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500 italic">
                                            No funds added yet. Add a fund above or import from file.
                                        </td>
                                    </tr>
                                )}
                                {sips.map((sip) => (
                                    <tr key={sip.id} className="hover:bg-slate-50 transition-colors">
                                        {editingId === sip.id ? (
                                            // Edit mode
                                            <>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border border-indigo-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                        value={editForm.fund_name}
                                                        onChange={(e) => setEditForm({ ...editForm, fund_name: e.target.value })}
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <select
                                                        className="w-full p-2 border border-indigo-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                        value={editForm.category}
                                                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                    >
                                                        {Object.keys(CATEGORY_RISK_MAP).map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 border border-indigo-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-right"
                                                        value={editForm.amount}
                                                        onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                                                        min="0"
                                                        step="10"
                                                    />
                                                </td>
                                                <td className="p-3 text-center">
                                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${sip.risk >= 8 ? 'bg-red-500' : sip.risk >= 5 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}>
                                                        {sip.risk}/10
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <div className="flex justify-center gap-1">
                                                        <button
                                                            onClick={() => handleSaveEdit(sip.id)}
                                                            className="text-green-600 hover:text-green-700 transition-colors p-1.5 hover:bg-green-50 rounded"
                                                            title="Save Changes"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 hover:bg-slate-100 rounded"
                                                            title="Cancel"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            // View mode
                                            <>
                                                <td className="p-3 font-medium text-slate-800">{sip.fund_name}</td>
                                                <td className="p-3">
                                                    <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                                                        {sip.category}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-right font-mono font-semibold text-slate-700">₹{sip.amount.toLocaleString()}</td>
                                                <td className="p-3 text-center">
                                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${sip.risk >= 8 ? 'bg-red-500' : sip.risk >= 5 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}>
                                                        {sip.risk}/10
                                                    </span>
                                                </td>
                                                <td className="p-3 text-center">
                                                    <div className="flex justify-center gap-1">
                                                        <button
                                                            onClick={() => handleEdit(sip)}
                                                            className="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 hover:bg-indigo-50 rounded"
                                                            title="Edit Fund"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => onDeleteFund(sip.id)}
                                                            className="text-slate-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded"
                                                            title="Remove Fund"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                            {sips.length > 0 && (
                                <tfoot className="bg-gradient-to-r from-indigo-50 to-purple-50 font-bold text-slate-800">
                                    <tr>
                                        <td colSpan={2} className="p-3 text-right">Total Monthly Investment:</td>
                                        <td className="p-3 text-right font-mono text-indigo-700 text-base">₹{totalSIP.toLocaleString()}</td>
                                        <td colSpan={2}></td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
