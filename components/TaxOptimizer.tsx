'use client';

import { useState, useEffect, useRef } from 'react';
import { 
    Holding, 
    RedemptionPlan, 
    generateTaxOptimizationSummary,
    optimizeRedemptionSequence,
    canRedeemELSS
} from '@/lib/taxOptimizer';
import { Plus, Trash2, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, IndianRupee, Calendar, DollarSign, Search, Loader2, Lock, X, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface MFSearchResult {
    schemeCode: string;
    schemeName: string;
}

interface MFSchemeData {
    meta: {
        scheme_code: string;
        scheme_name: string;
        scheme_category: string;
    };
    data: Array<{
        date: string;
        nav: string;
    }>;
}

export default function TaxOptimizer() {
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [redemptionPlans, setRedemptionPlans] = useState<RedemptionPlan[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [optimizationAmount, setOptimizationAmount] = useState('');
    
    // MF Search states
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<MFSearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isFetchingNAV, setIsFetchingNAV] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [newHolding, setNewHolding] = useState({
        fundName: '',
        fundCategory: 'Equity' as 'Equity' | 'Debt' | 'Hybrid' | 'ELSS',
        purchaseDate: '',
        units: '',
        purchaseNAV: '',
        currentNAV: '',
        schemeCode: '',
    });

    // Optimization flow states
    const [showOptimizationModal, setShowOptimizationModal] = useState(false);
    const [optimizationStep, setOptimizationStep] = useState<'input' | 'preview' | 'result'>('input');
    const [optimizedResult, setOptimizedResult] = useState<any>(null);

    // Load holdings and redemption plans from localStorage on mount
    useEffect(() => {
        try {
            const savedHoldings = localStorage.getItem('mf_tracker_tax_holdings');
            const savedPlans = localStorage.getItem('mf_tracker_tax_redemption_plans');
            const savedAmount = localStorage.getItem('mf_tracker_tax_optimization_amount');
            
            if (savedHoldings) {
                const parsed = JSON.parse(savedHoldings);
                if (Array.isArray(parsed)) {
                    setHoldings(parsed);
                } else {
                    console.error('Invalid holdings data in localStorage');
                    localStorage.removeItem('mf_tracker_tax_holdings');
                }
            }
            
            if (savedPlans) {
                const parsed = JSON.parse(savedPlans);
                if (Array.isArray(parsed)) {
                    setRedemptionPlans(parsed);
                } else {
                    console.error('Invalid redemption plans data in localStorage');
                    localStorage.removeItem('mf_tracker_tax_redemption_plans');
                }
            }
            
            if (savedAmount) {
                setOptimizationAmount(savedAmount);
            }
        } catch (error) {
            console.error('Failed to load tax optimizer data from localStorage:', error);
            localStorage.removeItem('mf_tracker_tax_holdings');
            localStorage.removeItem('mf_tracker_tax_redemption_plans');
            localStorage.removeItem('mf_tracker_tax_optimization_amount');
        }
    }, []);

    // Save holdings to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('mf_tracker_tax_holdings', JSON.stringify(holdings));
        } catch (error) {
            console.error('Failed to save holdings to localStorage:', error);
            alert('Failed to save holdings. Your browser storage might be full.');
        }
    }, [holdings]);

    // Save redemption plans to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('mf_tracker_tax_redemption_plans', JSON.stringify(redemptionPlans));
        } catch (error) {
            console.error('Failed to save redemption plans to localStorage:', error);
        }
    }, [redemptionPlans]);

    // Save optimization amount to localStorage whenever it changes
    useEffect(() => {
        try {
            if (optimizationAmount) {
                localStorage.setItem('mf_tracker_tax_optimization_amount', optimizationAmount);
            } else {
                localStorage.removeItem('mf_tracker_tax_optimization_amount');
            }
        } catch (error) {
            console.error('Failed to save optimization amount to localStorage:', error);
        }
    }, [optimizationAmount]);

    // MF Search functionality
    useEffect(() => {
        if (searchQuery.length < 3) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(async () => {
            setIsSearching(true);
            try {
                const response = await fetch(`/api/mf/search?q=${encodeURIComponent(searchQuery)}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.slice(0, 10)); // Limit to 10 results
                    setShowResults(true);
                }
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    const handleSelectFund = async (result: MFSearchResult) => {
        setIsFetchingNAV(true);
        setSearchQuery(result.schemeName);
        setShowResults(false);

        try {
            // Fetch current NAV
            const response = await fetch(`/api/mf/scheme/${result.schemeCode}`);
            if (response.ok) {
                const data: MFSchemeData = await response.json();
                const latestNAV = data.data[0]?.nav || '';
                
                // Determine category from scheme name
                let category: 'Equity' | 'Debt' | 'Hybrid' | 'ELSS' = 'Equity';
                const name = result.schemeName.toLowerCase();
                if (name.includes('elss') || name.includes('tax saver') || name.includes('80c')) {
                    category = 'ELSS';
                } else if (name.includes('debt') || name.includes('gilt') || name.includes('liquid') || name.includes('income')) {
                    category = 'Debt';
                } else if (name.includes('hybrid') || name.includes('balanced')) {
                    category = 'Hybrid';
                }

                setNewHolding({
                    ...newHolding,
                    fundName: result.schemeName,
                    currentNAV: latestNAV,
                    fundCategory: category,
                    schemeCode: result.schemeCode,
                });
            }
        } catch (error) {
            console.error('Failed to fetch NAV:', error);
            alert('Failed to fetch current NAV. Please enter manually.');
        } finally {
            setIsFetchingNAV(false);
        }
    };

    const handleAddHolding = () => {
        const units = parseFloat(newHolding.units);
        const purchaseNAV = parseFloat(newHolding.purchaseNAV);
        const currentNAV = parseFloat(newHolding.currentNAV);

        if (!newHolding.fundName || !newHolding.purchaseDate || !units || !purchaseNAV || !currentNAV) {
            alert('Please fill all fields');
            return;
        }

        const holding: Holding = {
            id: crypto.randomUUID(),
            fundName: newHolding.fundName,
            fundCategory: newHolding.fundCategory,
            purchaseDate: newHolding.purchaseDate,
            units,
            purchaseNAV,
            currentNAV,
            investedAmount: units * purchaseNAV,
            currentValue: units * currentNAV,
        };

        setHoldings([...holdings, holding]);
        setNewHolding({
            fundName: '',
            fundCategory: 'Equity',
            purchaseDate: '',
            units: '',
            purchaseNAV: '',
            currentNAV: '',
            schemeCode: '',
        });
        setSearchQuery('');
        setShowAddForm(false);
    };

    const handleDeleteHolding = (id: string) => {
        setHoldings(holdings.filter(h => h.id !== id));
        setRedemptionPlans(redemptionPlans.filter(p => p.holdingId !== id));
    };

    const handleClearAllData = () => {
        if (confirm('Are you sure you want to clear all holdings and redemption plans? This action cannot be undone.')) {
            setHoldings([]);
            setRedemptionPlans([]);
            setOptimizationAmount('');
            localStorage.removeItem('mf_tracker_tax_holdings');
            localStorage.removeItem('mf_tracker_tax_redemption_plans');
            localStorage.removeItem('mf_tracker_tax_optimization_amount');
            alert('All data cleared successfully!');
        }
    };

    const handleAddRedemption = (holdingId: string) => {
        const holding = holdings.find(h => h.id === holdingId);
        if (!holding) return;

        const unitsStr = prompt(`Enter units to redeem (Max: ${holding.units}):`, holding.units.toString());
        if (!unitsStr) return;

        const units = parseFloat(unitsStr);
        if (units <= 0 || units > holding.units) {
            alert('Invalid units');
            return;
        }

        const dateStr = prompt('Enter redemption date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
        if (!dateStr) return;

        setRedemptionPlans([
            ...redemptionPlans,
            {
                holdingId,
                unitsToRedeem: units,
                redemptionDate: dateStr,
            },
        ]);
    };

    const handleOptimizeRedemption = () => {
        const amount = parseFloat(optimizationAmount);
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
        if (amount > totalValue) {
            alert(`Amount exceeds total portfolio value of ₹${totalValue.toLocaleString('en-IN')}`);
            return;
        }

        setShowOptimizationModal(true);
        setOptimizationStep('input');
    };

    const executeOptimization = () => {
        const amount = parseFloat(optimizationAmount);
        const result = optimizeRedemptionSequence(holdings, amount);
        setOptimizedResult(result);
        setRedemptionPlans(result.optimizedPlans);
        setOptimizationStep('result');
    };

    const closeOptimizationModal = () => {
        setShowOptimizationModal(false);
        setOptimizationStep('input');
        setOptimizedResult(null);
    };

    const summary = holdings.length > 0 
        ? generateTaxOptimizationSummary(holdings, redemptionPlans)
        : null;

    const totalGainLoss = holdings.reduce((sum, h) => sum + (h.currentValue - h.investedAmount), 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Tax Optimizer</h1>
                <p className="text-gray-600 mt-2">
                    Analyze tax implications, identify tax-loss harvesting opportunities, and optimize LTCG/STCG
                </p>
            </div>

            {/* Info Banner */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                        <p className="font-medium mb-1">Your data is stored locally in your browser</p>
                        <p className="text-blue-700">Holdings and redemption plans are saved automatically and persist across sessions.</p>
                    </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                        <p className="font-medium mb-1">Tax rates for FY 2025-26</p>
                        <div className="text-amber-700 space-y-1">
                            <p>• <strong>Equity LTCG:</strong> 12.5% (above ₹1.25L exemption) | <strong>Equity STCG:</strong> 20%</p>
                            <p>• <strong>ELSS:</strong> 3-year lock-in, then 12.5% LTCG (above ₹1.25L exemption)</p>
                            <p>• <strong>Debt LTCG:</strong> 12.5% | <strong>Debt STCG:</strong> As per tax slab</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Holding Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Your Holdings</h2>
                <div className="flex gap-3">
                    {holdings.length > 0 && (
                        <button
                            onClick={handleClearAllData}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-all flex items-center gap-2"
                            title="Clear all data"
                        >
                            <Trash2 size={18} />
                            Clear All
                        </button>
                    )}
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Holding
                    </button>
                </div>
            </div>

            {/* Add Holding Form */}
            {showAddForm && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Add New Holding</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Search for a fund to auto-fill current NAV. You only need to provide purchase date, units, and average purchase NAV.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Search Mutual Fund
                            </label>
                            <div className="relative">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Type fund name (e.g., HDFC Top 100, SBI Bluechip...)"
                                    />
                                    {isSearching && (
                                        <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5 animate-spin" />
                                    )}
                                </div>
                                
                                {/* Search Results Dropdown */}
                                {showResults && searchResults.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {searchResults.map((result) => (
                                            <button
                                                key={result.schemeCode}
                                                type="button"
                                                onClick={() => handleSelectFund(result)}
                                                className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                                            >
                                                <p className="text-sm font-medium text-gray-900">{result.schemeName}</p>
                                                <p className="text-xs text-gray-500">Code: {result.schemeCode}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                
                                {showResults && searchResults.length === 0 && !isSearching && searchQuery.length >= 3 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                                        <p className="text-sm text-gray-500">No funds found. Try a different search term.</p>
                                    </div>
                                )}
                            </div>
                            {isFetchingNAV && (
                                <p className="text-sm text-blue-600 mt-1 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Fetching current NAV...
                                </p>
                            )}
                        </div>
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fund Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                                value={newHolding.fundName}
                                onChange={e => setNewHolding({ ...newHolding, fundName: e.target.value })}
                                placeholder="e.g., HDFC Top 100"
                                readOnly={!!newHolding.schemeCode}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                                value={newHolding.fundCategory}
                                onChange={e => setNewHolding({ ...newHolding, fundCategory: e.target.value as any })}
                            >
                                <option value="Equity">Equity</option>
                                <option value="ELSS">ELSS (Tax Saver - 3 year lock-in)</option>
                                <option value="Debt">Debt</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                                value={newHolding.purchaseDate}
                                onChange={e => setNewHolding({ ...newHolding, purchaseDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Units</label>
                            <input
                                type="number"
                                step="0.001"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                                value={newHolding.units}
                                onChange={e => setNewHolding({ ...newHolding, units: e.target.value })}
                                placeholder="100.500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Average Purchase NAV (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                                value={newHolding.purchaseNAV}
                                onChange={e => setNewHolding({ ...newHolding, purchaseNAV: e.target.value })}
                                placeholder="50.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current NAV (₹)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 bg-blue-50"
                                value={newHolding.currentNAV}
                                onChange={e => setNewHolding({ ...newHolding, currentNAV: e.target.value })}
                                placeholder="Auto-filled from API"
                                readOnly={!!newHolding.schemeCode && !!newHolding.currentNAV}
                            />
                            {newHolding.schemeCode && newHolding.currentNAV && (
                                <p className="text-xs text-green-600 mt-1">✓ Latest NAV fetched from API</p>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleAddHolding}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isFetchingNAV}
                        >
                            {isFetchingNAV ? 'Loading...' : 'Add Holding'}
                        </button>
                        <button
                            onClick={() => {
                                setShowAddForm(false);
                                setNewHolding({
                                    fundName: '',
                                    fundCategory: 'Equity',
                                    purchaseDate: '',
                                    units: '',
                                    purchaseNAV: '',
                                    currentNAV: '',
                                    schemeCode: '',
                                });
                                setSearchQuery('');
                                setShowResults(false);
                            }}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        {newHolding.schemeCode && (
                            <button
                                onClick={() => {
                                    setNewHolding({
                                        fundName: '',
                                        fundCategory: 'Equity',
                                        purchaseDate: '',
                                        units: '',
                                        purchaseNAV: '',
                                        currentNAV: '',
                                        schemeCode: '',
                                    });
                                    setSearchQuery('');
                                    setShowResults(false);
                                }}
                                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-semibold hover:bg-amber-200"
                            >
                                Clear & Search Again
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Holdings List */}
            {holdings.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fund Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purchase Date</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Invested</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Current</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Gain/Loss</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {holdings.map(holding => {
                                    const gainLoss = holding.currentValue - holding.investedAmount;
                                    const gainLossPct = (gainLoss / holding.investedAmount) * 100;
                                    const isGain = gainLoss >= 0;
                                    const today = new Date().toISOString().split('T')[0];
                                    const isELSSLocked = holding.fundCategory === 'ELSS' && !canRedeemELSS(holding.purchaseDate, today);

                                    return (
                                        <tr key={holding.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                <div className="flex items-center gap-2">
                                                    {holding.fundName}
                                                    {isELSSLocked && (
                                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full flex items-center gap-1">
                                                            <Lock size={10} />
                                                            Locked
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                    holding.fundCategory === 'ELSS' ? 'bg-purple-100 text-purple-800' :
                                                    holding.fundCategory === 'Equity' ? 'bg-blue-100 text-blue-800' :
                                                    holding.fundCategory === 'Debt' ? 'bg-green-100 text-green-800' :
                                                    'bg-orange-100 text-orange-800'
                                                }`}>
                                                    {holding.fundCategory}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{holding.purchaseDate}</td>
                                            <td className="px-4 py-3 text-sm text-right text-gray-900">₹{holding.investedAmount.toLocaleString('en-IN')}</td>
                                            <td className="px-4 py-3 text-sm text-right text-gray-900">₹{holding.currentValue.toLocaleString('en-IN')}</td>
                                            <td className="px-4 py-3 text-sm text-right">
                                                <div className={`flex items-center justify-end gap-1 ${isGain ? 'text-green-600' : 'text-red-600'}`}>
                                                    {isGain ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                    <span className="font-medium">
                                                        ₹{Math.abs(gainLoss).toLocaleString('en-IN')} ({gainLossPct.toFixed(2)}%)
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleAddRedemption(holding.id)}
                                                        className={`text-sm font-medium ${
                                                            isELSSLocked 
                                                                ? 'text-gray-400 cursor-not-allowed' 
                                                                : 'text-blue-600 hover:text-blue-800'
                                                        }`}
                                                        disabled={isELSSLocked}
                                                        title={isELSSLocked ? 'ELSS funds are locked for 3 years' : 'Plan redemption'}
                                                    >
                                                        {isELSSLocked ? (
                                                            <span className="flex items-center gap-1">
                                                                <Lock size={14} />
                                                                Locked
                                                            </span>
                                                        ) : (
                                                            'Plan Redemption'
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteHolding(holding.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Auto-Optimize Section */}
            {holdings.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        Auto-Optimize Redemption
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Enter the amount you need to redeem, and we'll optimize the sequence to minimize tax liability.
                    </p>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-gray-900"
                            placeholder="Enter amount to redeem (₹)"
                            value={optimizationAmount}
                            onChange={e => setOptimizationAmount(e.target.value)}
                        />
                        <button
                            onClick={handleOptimizeRedemption}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
                        >
                            Optimize
                        </button>
                    </div>
                </div>
            )}

            {/* Tax Analysis Summary */}
            {summary && (
                <div className="space-y-6">
                    {/* Overview Cards */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                            <p className="text-2xl font-bold text-gray-900">₹{summary.totalInvestedAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <p className="text-sm text-gray-600 mb-1">Current Value</p>
                            <p className="text-2xl font-bold text-gray-900">₹{summary.totalCurrentValue.toLocaleString('en-IN')}</p>
                        </div>
                        <div className={`bg-white rounded-xl p-6 border ${totalGainLoss >= 0 ? 'border-green-200' : 'border-red-200'}`}>
                            <p className="text-sm text-gray-600 mb-1">Total Gain/Loss</p>
                            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toLocaleString('en-IN')}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl p-6 text-white">
                            <p className="text-sm text-red-100 mb-1">Tax Liability</p>
                            <p className="text-2xl font-bold">₹{summary.totalTaxLiability.toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    {/* Visualization Charts */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Portfolio Allocation Pie Chart */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={holdings.map(h => ({
                                            name: h.fundName.length > 25 ? h.fundName.substring(0, 25) + '...' : h.fundName,
                                            value: h.currentValue,
                                            category: h.fundCategory
                                        }))}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {holdings.map((entry, index) => {
                                            const colors = {
                                                'Equity': '#3b82f6',
                                                'ELSS': '#a855f7',
                                                'Debt': '#10b981',
                                                'Hybrid': '#f59e0b'
                                            };
                                            return <Cell key={`cell-${index}`} fill={colors[entry.fundCategory as keyof typeof colors] || '#6b7280'} />;
                                        })}
                                    </Pie>
                                    <Tooltip formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Category-wise Distribution */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={Object.entries(
                                    holdings.reduce((acc, h) => {
                                        acc[h.fundCategory] = (acc[h.fundCategory] || 0) + h.currentValue;
                                        return acc;
                                    }, {} as Record<string, number>)
                                ).map(([category, value]) => ({ category, value }))}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`} />
                                    <Bar dataKey="value" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tax Breakdown Visualization */}
                    {redemptionPlans.length > 0 && summary.totalTaxLiability > 0 && (
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Breakdown (Planned Redemptions)</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'LTCG Tax', value: summary.ltcgTaxLiability, fill: '#3b82f6' },
                                            { name: 'STCG Tax', value: summary.stcgTaxLiability, fill: '#f97316' },
                                        ].filter(item => item.value > 0)}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent, value }) => `${name}: ₹${value.toLocaleString('en-IN')} (${(percent * 100).toFixed(1)}%)`}
                                        outerRadius={100}
                                        dataKey="value"
                                    >
                                        {[
                                            { name: 'LTCG Tax', value: summary.ltcgTaxLiability, fill: '#3b82f6' },
                                            { name: 'STCG Tax', value: summary.stcgTaxLiability, fill: '#f97316' },
                                        ].filter(item => item.value > 0).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Tax Breakdown */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Breakdown</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">LTCG Tax</span>
                                    <span className="text-lg font-bold text-blue-600">₹{summary.ltcgTaxLiability.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">STCG Tax</span>
                                    <span className="text-lg font-bold text-orange-600">₹{summary.stcgTaxLiability.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Unrealized Gain</span>
                                    <span className="text-lg font-bold text-green-600">₹{summary.totalUnrealizedGain.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Unrealized Loss</span>
                                    <span className="text-lg font-bold text-red-600">₹{summary.totalUnrealizedLoss.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                            <div className="space-y-3">
                                {summary.recommendations.map((rec, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-gray-700">{rec}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tax-Loss Harvesting Opportunities */}
                    {summary.taxLossHarvestingOpportunities.length > 0 && (
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax-Loss Harvesting Opportunities</h3>
                            <div className="space-y-3">
                                {summary.taxLossHarvestingOpportunities.map(opp => (
                                    <div
                                        key={opp.holdingId}
                                        className={`p-4 rounded-lg border-l-4 ${
                                            opp.riskLevel === 'Low' ? 'bg-green-50 border-green-500' :
                                            opp.riskLevel === 'Medium' ? 'bg-yellow-50 border-yellow-500' :
                                            'bg-red-50 border-red-500'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{opp.fundName}</h4>
                                                <p className="text-sm text-gray-600">Current Loss: ₹{opp.currentLoss.toLocaleString('en-IN')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Potential Tax Saving</p>
                                                <p className="text-lg font-bold text-green-600">₹{opp.potentialTaxSaving.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-2">{opp.recommendation}</p>
                                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                            opp.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                                            opp.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {opp.riskLevel} Risk
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Redemption Analysis */}
                    {summary.redemptionAnalysis.length > 0 && (
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Redemption Tax Analysis</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fund</th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Type</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Capital Gain</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Taxable Gain</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tax Rate</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tax Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {summary.redemptionAnalysis.map(analysis => (
                                            <tr key={analysis.holdingId} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{analysis.fundName}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        analysis.isLongTerm 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                        {analysis.isLongTerm ? 'LTCG' : 'STCG'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-900">
                                                    ₹{(analysis.capitalGain || analysis.capitalLoss).toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-900">
                                                    ₹{analysis.taxableGain.toLocaleString('en-IN')}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right text-gray-600">
                                                    {analysis.taxRate}%
                                                </td>
                                                <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">
                                                    ₹{analysis.taxAmount.toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {holdings.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <IndianRupee className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Holdings Added</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Add your mutual fund holdings to analyze tax implications and identify optimization opportunities.
                    </p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Add Your First Holding
                    </button>
                </div>
            )}

            {/* Optimization Modal */}
            {showOptimizationModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold">Redemption Optimizer</h2>
                                    <p className="text-purple-100 mt-1">Minimize your tax liability with smart redemption</p>
                                </div>
                                <button onClick={closeOptimizationModal} className="text-white hover:bg-white/20 p-2 rounded-lg">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Step Indicator */}
                            <div className="flex items-center justify-center mb-8">
                                <div className={`flex items-center ${optimizationStep === 'input' ? 'text-purple-600' : 'text-green-600'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${optimizationStep === 'input' ? 'bg-purple-100' : 'bg-green-100'}`}>
                                        {optimizationStep === 'input' ? '1' : '✓'}
                                    </div>
                                    <span className="ml-2 font-semibold">Enter Amount</span>
                                </div>
                                <div className={`w-16 h-0.5 mx-4 ${optimizationStep === 'result' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                <div className={`flex items-center ${optimizationStep === 'result' ? 'text-purple-600' : 'text-gray-400'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${optimizationStep === 'result' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                                        2
                                    </div>
                                    <span className="ml-2 font-semibold">Optimized Result</span>
                                </div>
                            </div>

                            {/* Step 1: Input Confirmation */}
                            {optimizationStep === 'input' && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Redemption Details</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Amount to Redeem:</span>
                                                <span className="font-bold text-xl text-purple-600">₹{parseFloat(optimizationAmount).toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Portfolio Value:</span>
                                                <span className="font-semibold">₹{holdings.reduce((sum, h) => sum + h.currentValue, 0).toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Percentage of Portfolio:</span>
                                                <span className="font-semibold">{((parseFloat(optimizationAmount) / holdings.reduce((sum, h) => sum + h.currentValue, 0)) * 100).toFixed(2)}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                        <div className="flex items-start gap-3">
                                            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-amber-900">
                                                <p className="font-semibold mb-2">Optimization Strategy</p>
                                                <ul className="space-y-1 text-amber-800">
                                                    <li>• Priority 1: Harvest tax losses first</li>
                                                    <li>• Priority 2: Use LTCG with ₹1.25L exemption</li>
                                                    <li>• Priority 3: Redeem other LTCG holdings</li>
                                                    <li>• Priority 4: STCG redemptions (last resort)</li>
                                                    <li>• ELSS funds in lock-in will be skipped</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={executeOptimization}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                                        >
                                            Generate Optimized Plan
                                        </button>
                                        <button
                                            onClick={closeOptimizationModal}
                                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Results */}
                            {optimizationStep === 'result' && optimizedResult && (
                                <div className="space-y-6">
                                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">Optimization Complete!</h3>
                                                <p className="text-sm text-green-700">{optimizedResult.explanation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray-200">
                                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                                            <h4 className="font-semibold text-gray-900">Redemption Plan ({optimizedResult.optimizedPlans.length} holdings)</h4>
                                        </div>
                                        <div className="divide-y divide-gray-200">
                                            {optimizedResult.optimizedPlans.map((plan: RedemptionPlan, idx: number) => {
                                                const holding = holdings.find(h => h.id === plan.holdingId);
                                                if (!holding) return null;
                                                const amount = plan.unitsToRedeem * holding.currentNAV;
                                                return (
                                                    <div key={idx} className="p-4 hover:bg-gray-50">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <p className="font-medium text-gray-900">{holding.fundName}</p>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {plan.unitsToRedeem.toFixed(3)} units @ ₹{holding.currentNAV.toFixed(2)}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-bold text-purple-600">₹{amount.toLocaleString('en-IN')}</p>
                                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                                    holding.fundCategory === 'ELSS' ? 'bg-purple-100 text-purple-800' :
                                                                    holding.fundCategory === 'Equity' ? 'bg-blue-100 text-blue-800' :
                                                                    holding.fundCategory === 'Debt' ? 'bg-green-100 text-green-800' :
                                                                    'bg-orange-100 text-orange-800'
                                                                }`}>
                                                                    {holding.fundCategory}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={closeOptimizationModal}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                                        >
                                            Apply Redemption Plan
                                        </button>
                                        <button
                                            onClick={() => {
                                                setRedemptionPlans([]);
                                                closeOptimizationModal();
                                            }}
                                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                                        >
                                            Discard
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
