'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { MutualFundSearchResult } from '@/types/mutualfund';

interface FundSearchBarProps {
    onSelectFund: (schemeCode: number, schemeName: string) => void;
}

export default function FundSearchBar({ onSelectFund }: FundSearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<MutualFundSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const debounceTimer = useRef<number | undefined>(undefined);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const searchFunds = useCallback(async (searchQuery: string) => {
        if (searchQuery.trim().length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/mf/search?q=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data.slice(0, 50)); // Increased limit to 50 results
                setShowDropdown(true);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleInputChange = (value: string) => {
        setQuery(value);
        setSelectedIndex(-1);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            searchFunds(value);
        }, 300) as any as number;
    };

    const handleSelectFund = (result: MutualFundSearchResult) => {
        setQuery(result.schemeName);
        setShowDropdown(false);
        onSelectFund(result.schemeCode, result.schemeName);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showDropdown || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < results.length) {
                    handleSelectFund(results[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => results.length > 0 && setShowDropdown(true)}
                    placeholder="Search mutual funds by name (e.g., SBI, HDFC, Axis)"
                    className="w-full pl-12 pr-12 py-4 text-lg text-black border-2 border-gray-300 rounded-xl 
                             focus:border-blue-500 focus:outline-none transition-colors
                             bg-white shadow-sm placeholder:text-gray-400"
                />
                {isLoading && (
                    <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin" />
                )}
            </div>

            {showDropdown && results.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
                    {results.map((result, index) => (
                        <button
                            key={result.schemeCode}
                            onClick={() => handleSelectFund(result)}
                            className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0
                                ${index === selectedIndex ? 'bg-blue-50' : ''}`}
                        >
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                {result.schemeName}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Code: {result.schemeCode}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showDropdown && results.length === 0 && !isLoading && query.trim().length >= 2 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl p-4">
                    <p className="text-gray-500 text-center">No mutual funds found</p>
                </div>
            )}
        </div>
    );
}
