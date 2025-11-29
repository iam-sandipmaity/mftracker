'use client';

import React, { useState, useEffect } from 'react';
import { 
    DollarSign, 
    Home, 
    TrendingUp, 
    Users, 
    FileText, 
    Download,
    RefreshCw,
    Info,
    Calculator,
    HelpCircle
} from 'lucide-react';
import {
    IncomeDetails,
    DeductionsDetails,
    FamilyDetails,
    TaxBreakdown,
    TaxComparison,
    calculateTax,
    compareTaxRegimes,
    exportTaxDataToCSV
} from '@/lib/incomeTaxCalculator';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const INCOME_STORAGE_KEY = 'mf_tracker_income_tax_income';
const DEDUCTIONS_STORAGE_KEY = 'mf_tracker_income_tax_deductions';
const FAMILY_STORAGE_KEY = 'mf_tracker_income_tax_family';
const REGIME_STORAGE_KEY = 'mf_tracker_income_tax_regime';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

// Tooltip definitions for all tax terms
const TAX_TERM_INFO: Record<string, string> = {
    basicSalary: "Basic Salary is the fixed component of your salary before any allowances or deductions. It typically forms 40-50% of total CTC.",
    hra: "House Rent Allowance (HRA) is provided by employers to help employees meet rental expenses. Part of it is tax-exempt if you live in rented accommodation.",
    rentPaid: "Actual rent paid per year for your accommodation. Used to calculate HRA exemption. HRA exemption = Min(HRA received, Rent - 10% of Basic, 50%/40% of Basic for Metro/Non-Metro)",
    cityType: "Metro cities (Delhi, Mumbai, Kolkata, Chennai) get 50% of basic salary as HRA exemption limit. Non-metro cities get 40%.",
    lta: "Leave Travel Allowance (LTA) is exempt for 2 trips in a block of 4 years, subject to actual travel expenses on economy class tickets.",
    specialAllowance: "Special allowance is any additional payment like shift allowance, hardship allowance, or project allowance. Generally taxable unless specifically exempted.",
    otherAllowances: "Includes medical allowance, conveyance allowance, etc. Most allowances are fully taxable unless specifically exempt under IT Act.",
    businessIncome: "Total income from business or profession before any expenses. Include all revenue from your business activities.",
    businessExpenses: "Legitimate business expenses that can be deducted from business income. Only actual expenses with proper documentation are allowed.",
    shortTermCapitalGain: "Profit from sale of equity/mutual funds held for ≤12 months. Taxed at 20% (equity) or added to income (debt).",
    longTermCapitalGain: "Profit from sale of equity/mutual funds held for >12 months. Equity LTCG taxed at 12.5% above ₹1.25L exemption limit.",
    interestIncome: "Interest earned from savings accounts, fixed deposits, bonds, etc. Fully taxable. Deduction up to ₹10,000 available under Section 80TTA.",
    rentalIncome: "Income from renting out property. You can claim 30% standard deduction and actual municipal taxes paid. Home loan interest also deductible.",
    otherIncome: "Any other income like lottery winnings, gifts above ₹50,000, income from other sources not covered elsewhere.",
    agriculturalIncome: "Income from agricultural land. Exempt from tax but considered for rate determination if exceeds ₹5,000.",
    epf: "Employee Provident Fund - Both employee and employer contributions. Employee contribution up to ₹1.5L eligible for 80C deduction.",
    ppf: "Public Provident Fund - Government savings scheme with tax-free returns. Contribution up to ₹1.5L qualifies for 80C deduction. 15-year lock-in.",
    lifeInsurance: "Premiums paid for life insurance policies. Qualifies for 80C deduction up to ₹1.5L. Premium should not exceed 10% of sum assured.",
    elss: "Equity Linked Savings Scheme - Tax-saving mutual funds with 3-year lock-in. Eligible for 80C deduction up to ₹1.5L. Shortest lock-in among 80C options.",
    homeLoanPrincipal: "Principal repayment of home loan. Eligible for 80C deduction up to ₹1.5L. Interest is separately deductible under Section 24.",
    tuitionFees: "Tuition fees for full-time education of up to 2 children. Only tuition fees qualify, not development fees or donations. Part of 80C.",
    nsc: "National Savings Certificate - Government savings scheme. 5-year lock-in. Interest is taxable but accrued interest qualifies for 80C in same year.",
    sukanyaSamriddhi: "Sukanya Samriddhi Yojana - Savings scheme for girl child under 10 years. Deposit up to ₹1.5L per year. Maturity proceeds tax-free. Part of 80C.",
    other80C: "Other 80C investments like tax-saving FDs (5 year), Senior Citizen Savings Scheme, etc. Total 80C limit is ₹1.5L across all instruments.",
    selfHealthInsurance: "Medical insurance premium for self, spouse, and dependent children. Up to ₹25,000 deduction (₹50,000 if senior citizen aged 60+).",
    parentsHealthInsurance: "Medical insurance for parents. Additional ₹25,000 deduction (₹50,000 if parents are senior citizens). Independent of self insurance limit.",
    preventiveCheckup: "Preventive health checkup expenses. Up to ₹5,000 included within 80D limit. No bills required, can be claimed every year.",
    educationLoanInterest: "Interest paid on education loan for higher studies (for self, spouse, or children). Full interest deductible under 80E. No upper limit. Available for 8 years.",
    donations: "Donations to eligible charitable institutions and funds. 50%-100% of donation qualifies for 80G deduction depending on institution. 10% of gross income limit.",
    homeLoanInterest: "Interest paid on home loan for self-occupied property. Up to ₹2,00,000 deductible under Section 24. For let-out property, full interest allowed.",
    npsAdditional: "Additional NPS contribution under Section 80CCD(1B). Up to ₹50,000 over and above ₹1.5L 80C limit. Total additional tax saving of ₹15,600 in 30% bracket.",
    disabilityDeduction: "Deduction for persons with disabilities. ₹75,000 for disability ≥40%, ₹1,25,000 for severe disability ≥80% under Section 80U.",
    savingsAccountInterest: "Interest from savings accounts in banks/post office. Up to ₹10,000 deductible under Section 80TTA. Senior citizens get ₹50,000 under 80TTB.",
    standardDeduction: "Flat deduction of ₹50,000 for salaried individuals. Available in both old and new tax regime. No proof required.",
    grossIncome: "Total income from all sources before any deductions. Sum of salary, business income, capital gains, rental income, and other income.",
    totalDeductions: "Total of all eligible deductions like 80C, 80D, HRA exemption, standard deduction, etc. Reduces taxable income.",
    taxableIncome: "Income on which tax is calculated. Gross Income minus Total Deductions. Tax slabs are applied on this amount.",
    incomeTax: "Tax calculated as per applicable slab rates. Different slabs for old regime, new regime, senior citizens, and super senior citizens.",
    surcharge: "Additional tax levied on high incomes. 10% for income ₹50L-₹1Cr, 15% for ₹1-2Cr, 25% for ₹2-5Cr, 37% above ₹5Cr.",
    healthEducationCess: "4% cess on (Income Tax + Surcharge). Used for health and education programs. Applicable to all taxpayers.",
    totalTax: "Final tax liability including Income Tax, Surcharge, and Cess. This is the amount payable to government.",
    effectiveTaxRate: "Total Tax divided by Gross Income as percentage. Shows actual tax burden on total earnings.",
    averageTaxRate: "Total Tax divided by Taxable Income as percentage. Shows average rate of tax paid on taxable portion.",
    rebate87A: "Rebate for lower incomes. Up to ₹25,000 rebate if taxable income ≤ ₹7L (new regime) or ₹12,500 if ≤ ₹5L (old regime). Can reduce tax to zero.",
    age: "Your age determines tax slabs. Below 60 = Normal, 60-79 = Senior Citizen (higher basic exemption in old regime), 80+ = Super Senior Citizen.",
    seniorCitizen: "Age 60-79 years. Basic exemption ₹3L in old regime. Lower TDS rates on bank interest. Higher health insurance deduction limit.",
    superSeniorCitizen: "Age 80+ years. Basic exemption ₹5L in old regime. Not required to pay advance tax. No TDS on bank interest up to ₹50,000.",
    dependents: "Family members financially dependent on you. Impacts deduction eligibility (like tuition fees for children, health insurance for parents).",
    huf: "Hindu Undivided Family - A separate legal entity for tax purposes. HUF can file separate return, claim separate deductions, and has own PAN.",
};

// Tooltip component
function InfoTooltip({ term }: { term: string }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const info = TAX_TERM_INFO[term];
    
    if (!info) return null;
    
    return (
        <div className="relative inline-block ml-1">
            <HelpCircle 
                className="h-4 w-4 text-blue-500 cursor-help inline-block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
            />
            {showTooltip && (
                <div className="absolute z-50 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl left-0 top-6 border border-gray-700">
                    <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 border-l border-t border-gray-700 transform rotate-45"></div>
                    {info}
                </div>
            )}
        </div>
    );
}

export default function IncomeTaxCalculator() {
    const [activeTab, setActiveTab] = useState<'income' | 'deductions' | 'family' | 'results'>('income');
    const [selectedRegime, setSelectedRegime] = useState<'old' | 'new' | 'compare'>('compare');
    const [showInfo, setShowInfo] = useState(false);

    const [income, setIncome] = useState<IncomeDetails>({
        basicSalary: 0,
        hra: 0,
        rentPaid: 0,
        cityType: 'metro',
        lta: 0,
        specialAllowance: 0,
        otherAllowances: 0,
        businessIncome: 0,
        businessExpenses: 0,
        shortTermCapitalGain: 0,
        longTermCapitalGain: 0,
        interestIncome: 0,
        rentalIncome: 0,
        otherIncome: 0,
        agriculturalIncome: 0,
    });

    const [deductions, setDeductions] = useState<DeductionsDetails>({
        epf: 0,
        ppf: 0,
        lifeInsurance: 0,
        elss: 0,
        homeLoanPrincipal: 0,
        tuitionFees: 0,
        nsc: 0,
        sukanyaSamriddhi: 0,
        other80C: 0,
        selfHealthInsurance: 0,
        parentsHealthInsurance: 0,
        preventiveCheckup: 0,
        educationLoanInterest: 0,
        donations: 0,
        homeLoanInterest: 0,
        npsAdditional: 0,
        disabilityDeduction: 0,
        savingsAccountInterest: 0,
    });

    const [family, setFamily] = useState<FamilyDetails>({
        age: 30,
        hasDisability: false,
        isSeniorCitizen: false,
        isSuperSeniorCitizen: false,
        dependentChildren: 0,
        dependentParents: 0,
        dependentSeniorParents: 0,
        isHUF: false,
        hufIncome: 0,
    });

    // Load from localStorage
    useEffect(() => {
        try {
            const savedIncome = localStorage.getItem(INCOME_STORAGE_KEY);
            const savedDeductions = localStorage.getItem(DEDUCTIONS_STORAGE_KEY);
            const savedFamily = localStorage.getItem(FAMILY_STORAGE_KEY);
            const savedRegime = localStorage.getItem(REGIME_STORAGE_KEY);

            if (savedIncome) setIncome(JSON.parse(savedIncome));
            if (savedDeductions) setDeductions(JSON.parse(savedDeductions));
            if (savedFamily) setFamily(JSON.parse(savedFamily));
            if (savedRegime) setSelectedRegime(savedRegime as any);
        } catch (error) {
            console.error('Error loading tax calculator data:', error);
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(INCOME_STORAGE_KEY, JSON.stringify(income));
            localStorage.setItem(DEDUCTIONS_STORAGE_KEY, JSON.stringify(deductions));
            localStorage.setItem(FAMILY_STORAGE_KEY, JSON.stringify(family));
            localStorage.setItem(REGIME_STORAGE_KEY, selectedRegime);
        } catch (error) {
            console.error('Error saving tax calculator data:', error);
        }
    }, [income, deductions, family, selectedRegime]);

    const handleIncomeChange = (field: keyof IncomeDetails, value: any) => {
        setIncome(prev => ({ ...prev, [field]: value }));
    };

    const handleDeductionsChange = (field: keyof DeductionsDetails, value: number) => {
        setDeductions(prev => ({ ...prev, [field]: value }));
    };

    const handleFamilyChange = (field: keyof FamilyDetails, value: any) => {
        let updatedFamily = { ...family, [field]: value };
        
        // Auto-update senior citizen flags based on age
        if (field === 'age') {
            const age = Number(value);
            updatedFamily.isSeniorCitizen = age >= 60;
            updatedFamily.isSuperSeniorCitizen = age >= 80;
        }
        
        setFamily(updatedFamily);
    };

    const clearAllData = () => {
        if (confirm('Are you sure you want to clear all data?')) {
            setIncome({
                basicSalary: 0, hra: 0, rentPaid: 0, cityType: 'metro', lta: 0,
                specialAllowance: 0, otherAllowances: 0, businessIncome: 0,
                businessExpenses: 0, shortTermCapitalGain: 0, longTermCapitalGain: 0,
                interestIncome: 0, rentalIncome: 0, otherIncome: 0, agriculturalIncome: 0,
            });
            setDeductions({
                epf: 0, ppf: 0, lifeInsurance: 0, elss: 0, homeLoanPrincipal: 0,
                tuitionFees: 0, nsc: 0, sukanyaSamriddhi: 0, other80C: 0,
                selfHealthInsurance: 0, parentsHealthInsurance: 0, preventiveCheckup: 0,
                educationLoanInterest: 0, donations: 0, homeLoanInterest: 0,
                npsAdditional: 0, disabilityDeduction: 0, savingsAccountInterest: 0,
            });
            setFamily({
                age: 30, hasDisability: false, isSeniorCitizen: false,
                isSuperSeniorCitizen: false, dependentChildren: 0, dependentParents: 0,
                dependentSeniorParents: 0, isHUF: false, hufIncome: 0,
            });
        }
    };

    const comparison = compareTaxRegimes(income, deductions, family);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Calculator className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Comprehensive Income Tax Calculator</h1>
                                <p className="text-gray-600 mt-1">FY 2025-26 | Calculate tax with all income sources, deductions & family details</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowInfo(!showInfo)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Info className="h-6 w-6 text-gray-600" />
                        </button>
                    </div>

                    {showInfo && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-900">
                                <strong>Features:</strong> All income sources (Salary, Business, Capital Gains, Rental), 
                                All deductions (80C, 80D, 80E, 80G, 24, NPS), Family & HUF support, 
                                Old vs New regime comparison, Auto-save with localStorage, CSV export
                            </p>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-xl mb-6">
                    <div className="flex border-b overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('income')}
                            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                                activeTab === 'income'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            <DollarSign className="h-5 w-5" />
                            Income Sources
                        </button>
                        <button
                            onClick={() => setActiveTab('deductions')}
                            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                                activeTab === 'deductions'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            <FileText className="h-5 w-5" />
                            Deductions
                        </button>
                        <button
                            onClick={() => setActiveTab('family')}
                            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                                activeTab === 'family'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            <Users className="h-5 w-5" />
                            Family Details
                        </button>
                        <button
                            onClick={() => setActiveTab('results')}
                            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                                activeTab === 'results'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                            <TrendingUp className="h-5 w-5" />
                            Tax Calculation
                        </button>
                    </div>

                    <div className="p-8">
                        {/* Income Tab */}
                        {activeTab === 'income' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-blue-600" />
                                        Salary Income
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Basic Salary (₹/year)
                                                <InfoTooltip term="basicSalary" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.basicSalary || ''}
                                                onChange={(e) => handleIncomeChange('basicSalary', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="600000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                HRA (₹/year)
                                                <InfoTooltip term="hra" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.hra || ''}
                                                onChange={(e) => handleIncomeChange('hra', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="240000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rent Paid (₹/year)
                                                <InfoTooltip term="rentPaid" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.rentPaid || ''}
                                                onChange={(e) => handleIncomeChange('rentPaid', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="180000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City Type
                                                <InfoTooltip term="cityType" />
                                            </label>
                                            <select
                                                value={income.cityType}
                                                onChange={(e) => handleIncomeChange('cityType', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            >
                                                <option value="metro">Metro (50% exemption)</option>
                                                <option value="non-metro">Non-Metro (40% exemption)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                LTA (₹/year)
                                                <InfoTooltip term="lta" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.lta || ''}
                                                onChange={(e) => handleIncomeChange('lta', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="50000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Special Allowance (₹/year)
                                                <InfoTooltip term="specialAllowance" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.specialAllowance || ''}
                                                onChange={(e) => handleIncomeChange('specialAllowance', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="100000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Other Allowances (₹/year)
                                                <InfoTooltip term="otherAllowances" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.otherAllowances || ''}
                                                onChange={(e) => handleIncomeChange('otherAllowances', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="50000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Home className="h-5 w-5 text-green-600" />
                                        Business & Professional Income
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Business Income (₹/year)
                                                <InfoTooltip term="businessIncome" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.businessIncome || ''}
                                                onChange={(e) => handleIncomeChange('businessIncome', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="500000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Business Expenses (₹/year)
                                                <InfoTooltip term="businessExpenses" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.businessExpenses || ''}
                                                onChange={(e) => handleIncomeChange('businessExpenses', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="200000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-purple-600" />
                                        Capital Gains & Other Income
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Short Term Capital Gain (₹)
                                                <InfoTooltip term="shortTermCapitalGain" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.shortTermCapitalGain || ''}
                                                onChange={(e) => handleIncomeChange('shortTermCapitalGain', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="50000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Long Term Capital Gain (₹)
                                                <InfoTooltip term="longTermCapitalGain" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.longTermCapitalGain || ''}
                                                onChange={(e) => handleIncomeChange('longTermCapitalGain', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="150000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Interest Income (₹/year)
                                                <InfoTooltip term="interestIncome" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.interestIncome || ''}
                                                onChange={(e) => handleIncomeChange('interestIncome', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="30000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rental Income (₹/year)
                                                <InfoTooltip term="rentalIncome" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.rentalIncome || ''}
                                                onChange={(e) => handleIncomeChange('rentalIncome', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="120000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Other Income (₹/year)
                                                <InfoTooltip term="otherIncome" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.otherIncome || ''}
                                                onChange={(e) => handleIncomeChange('otherIncome', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="25000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Agricultural Income (₹/year)
                                                <InfoTooltip term="agriculturalIncome" />
                                            </label>
                                            <input
                                                type="number"
                                                value={income.agriculturalIncome || ''}
                                                onChange={(e) => handleIncomeChange('agriculturalIncome', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                placeholder="0"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Exempt but affects tax slab</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Deductions Tab */}
                        {activeTab === 'deductions' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Section 80C (Max ₹1,50,000)</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                EPF (₹/year)
                                                <InfoTooltip term="epf" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.epf || ''}
                                                onChange={(e) => handleDeductionsChange('epf', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                PPF (₹/year)
                                                <InfoTooltip term="ppf" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.ppf || ''}
                                                onChange={(e) => handleDeductionsChange('ppf', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Life Insurance (₹/year)
                                                <InfoTooltip term="lifeInsurance" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.lifeInsurance || ''}
                                                onChange={(e) => handleDeductionsChange('lifeInsurance', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ELSS (₹/year)
                                                <InfoTooltip term="elss" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.elss || ''}
                                                onChange={(e) => handleDeductionsChange('elss', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Home Loan Principal (₹/year)
                                                <InfoTooltip term="homeLoanPrincipal" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.homeLoanPrincipal || ''}
                                                onChange={(e) => handleDeductionsChange('homeLoanPrincipal', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tuition Fees (₹/year)
                                                <InfoTooltip term="tuitionFees" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.tuitionFees || ''}
                                                onChange={(e) => handleDeductionsChange('tuitionFees', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                NSC (₹/year)
                                                <InfoTooltip term="nsc" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.nsc || ''}
                                                onChange={(e) => handleDeductionsChange('nsc', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sukanya Samriddhi (₹/year)
                                                <InfoTooltip term="sukanyaSamriddhi" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.sukanyaSamriddhi || ''}
                                                onChange={(e) => handleDeductionsChange('sukanyaSamriddhi', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Other 80C (₹/year)
                                                <InfoTooltip term="other80C" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.other80C || ''}
                                                onChange={(e) => handleDeductionsChange('other80C', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Other Deductions</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Health Insurance - Self (80D)
                                                <InfoTooltip term="selfHealthInsurance" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.selfHealthInsurance || ''}
                                                onChange={(e) => handleDeductionsChange('selfHealthInsurance', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Health Insurance - Parents (80D)
                                                <InfoTooltip term="parentsHealthInsurance" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.parentsHealthInsurance || ''}
                                                onChange={(e) => handleDeductionsChange('parentsHealthInsurance', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Preventive Checkup (80D)
                                                <InfoTooltip term="preventiveCheckup" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.preventiveCheckup || ''}
                                                onChange={(e) => handleDeductionsChange('preventiveCheckup', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Education Loan Interest (80E)
                                                <InfoTooltip term="educationLoanInterest" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.educationLoanInterest || ''}
                                                onChange={(e) => handleDeductionsChange('educationLoanInterest', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Home Loan Interest (Section 24)
                                                <InfoTooltip term="homeLoanInterest" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.homeLoanInterest || ''}
                                                onChange={(e) => handleDeductionsChange('homeLoanInterest', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                NPS Additional (80CCD1B)
                                                <InfoTooltip term="npsAdditional" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.npsAdditional || ''}
                                                onChange={(e) => handleDeductionsChange('npsAdditional', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Donations (80G)
                                                <InfoTooltip term="donations" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.donations || ''}
                                                onChange={(e) => handleDeductionsChange('donations', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Savings Account Interest
                                                <InfoTooltip term="savingsAccountInterest" />
                                            </label>
                                            <input
                                                type="number"
                                                value={deductions.savingsAccountInterest || ''}
                                                onChange={(e) => handleDeductionsChange('savingsAccountInterest', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Family Tab */}
                        {activeTab === 'family' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Details</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Age
                                                <InfoTooltip term="age" />
                                            </label>
                                            <input
                                                type="number"
                                                value={family.age || ''}
                                                onChange={(e) => handleFamilyChange('age', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {family.isSuperSeniorCitizen ? 'Super Senior Citizen (80+)' : family.isSeniorCitizen ? 'Senior Citizen (60-79)' : 'Below 60'}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Disability</label>
                                            <select
                                                value={family.hasDisability ? 'yes' : 'no'}
                                                onChange={(e) => handleFamilyChange('hasDisability', e.target.value === 'yes')}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            >
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        Dependents
                                        <InfoTooltip term="dependents" />
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Dependent Children</label>
                                            <input
                                                type="number"
                                                value={family.dependentChildren || ''}
                                                onChange={(e) => handleFamilyChange('dependentChildren', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Dependent Parents</label>
                                            <input
                                                type="number"
                                                value={family.dependentParents || ''}
                                                onChange={(e) => handleFamilyChange('dependentParents', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Senior Citizen Parents</label>
                                            <input
                                                type="number"
                                                value={family.dependentSeniorParents || ''}
                                                onChange={(e) => handleFamilyChange('dependentSeniorParents', Number(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        HUF (Hindu Undivided Family)
                                        <InfoTooltip term="huf" />
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Are you part of HUF?</label>
                                            <select
                                                value={family.isHUF ? 'yes' : 'no'}
                                                onChange={(e) => handleFamilyChange('isHUF', e.target.value === 'yes')}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            >
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </select>
                                        </div>
                                        {family.isHUF && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">HUF Income (₹/year)</label>
                                                <input
                                                    type="number"
                                                    value={family.hufIncome || ''}
                                                    onChange={(e) => handleFamilyChange('hufIncome', Number(e.target.value))}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Results Tab */}
                        {activeTab === 'results' && (
                            <ResultsSection 
                                comparison={comparison}
                                selectedRegime={selectedRegime}
                                setSelectedRegime={setSelectedRegime}
                                income={income}
                                deductions={deductions}
                                family={family}
                            />
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={clearAllData}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                        Clear All Data
                    </button>
                </div>
            </div>
        </div>
    );
}

function ResultsSection({ comparison, selectedRegime, setSelectedRegime, income, deductions, family }: any) {
    const handleExport = (regime: 'old' | 'new') => {
        const breakdown = regime === 'old' ? comparison.oldRegime : comparison.newRegime;
        exportTaxDataToCSV(income, deductions, family, breakdown, regime);
    };

    const currentBreakdown = selectedRegime === 'old' ? comparison.oldRegime : 
                            selectedRegime === 'new' ? comparison.newRegime : null;

    return (
        <div className="space-y-6">
            {/* Regime Selector */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => setSelectedRegime('old')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        selectedRegime === 'old'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Old Regime
                </button>
                <button
                    onClick={() => setSelectedRegime('new')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        selectedRegime === 'new'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    New Regime
                </button>
                <button
                    onClick={() => setSelectedRegime('compare')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        selectedRegime === 'compare'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Compare Both
                </button>
            </div>

            {selectedRegime === 'compare' ? (
                <>
                    {/* Comparison Summary */}
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Recommendation</h3>
                        <p className="text-lg text-gray-700">{comparison.recommendation}</p>
                    </div>

                    {/* Side by Side Comparison */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <RegimeCard regime="old" breakdown={comparison.oldRegime} onExport={() => handleExport('old')} />
                        <RegimeCard regime="new" breakdown={comparison.newRegime} onExport={() => handleExport('new')} />
                    </div>

                    {/* Comparison Charts */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Comparison</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={[
                                    { name: 'Old Regime', value: comparison.oldRegime.totalTax },
                                    { name: 'New Regime', value: comparison.newRegime.totalTax },
                                ]}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`} />
                                    <Bar dataKey="value" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Effective Tax Rate</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={[
                                    { name: 'Old Regime', value: comparison.oldRegime.effectiveTaxRate },
                                    { name: 'New Regime', value: comparison.newRegime.effectiveTaxRate },
                                ]}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value: any) => `${value.toFixed(2)}%`} />
                                    <Bar dataKey="value" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            ) : currentBreakdown && (
                <>
                    <RegimeCard 
                        regime={selectedRegime as 'old' | 'new'} 
                        breakdown={currentBreakdown} 
                        onExport={() => handleExport(selectedRegime as 'old' | 'new')} 
                        fullWidth 
                    />

                    {/* Income Breakdown Chart */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Income Sources Breakdown</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Salary', value: currentBreakdown.incomeBreakdown.salaryIncome },
                                        { name: 'Business', value: currentBreakdown.incomeBreakdown.businessIncome },
                                        { name: 'Capital Gains', value: currentBreakdown.incomeBreakdown.capitalGains },
                                        { name: 'Other', value: currentBreakdown.incomeBreakdown.otherIncome },
                                    ].filter(item => item.value > 0)}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name}: ₹${entry.value.toLocaleString('en-IN')}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {CHART_COLORS.map((color, index) => (
                                        <Cell key={`cell-${index}`} fill={color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: any) => `₹${value.toLocaleString('en-IN')}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Tax Slabs */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Slabs Applied</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 px-4">Slab</th>
                                        <th className="text-right py-2 px-4">Amount</th>
                                        <th className="text-right py-2 px-4">Rate</th>
                                        <th className="text-right py-2 px-4">Tax</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBreakdown.taxSlabs.map((slab: any, index: number) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2 px-4">{slab.slab}</td>
                                            <td className="text-right py-2 px-4">₹{slab.amount.toLocaleString('en-IN')}</td>
                                            <td className="text-right py-2 px-4">{slab.rate}%</td>
                                            <td className="text-right py-2 px-4">₹{slab.tax.toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function RegimeCard({ regime, breakdown, onExport, fullWidth = false }: any) {
    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 ${fullWidth ? '' : ''}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                    {regime === 'old' ? 'Old Tax Regime' : 'New Tax Regime'}
                </h3>
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700">
                        Gross Income
                        <InfoTooltip term="grossIncome" />
                    </span>
                    <span className="text-xl font-bold text-blue-600">₹{breakdown.grossIncome.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-700">
                        Total Deductions
                        <InfoTooltip term="totalDeductions" />
                    </span>
                    <span className="text-xl font-bold text-green-600">₹{breakdown.totalDeductions.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-semibold text-gray-700">
                        Taxable Income
                        <InfoTooltip term="taxableIncome" />
                    </span>
                    <span className="text-xl font-bold text-purple-600">₹{breakdown.taxableIncome.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            Income Tax
                            <InfoTooltip term="incomeTax" />
                        </span>
                        <span className="font-semibold">₹{breakdown.incomeTax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            Surcharge
                            <InfoTooltip term="surcharge" />
                        </span>
                        <span className="font-semibold">₹{breakdown.surcharge.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            Health & Education Cess
                            <InfoTooltip term="healthEducationCess" />
                        </span>
                        <span className="font-semibold">₹{breakdown.healthEducationCess.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <span className="font-bold text-gray-900">
                        Total Tax Payable
                        <InfoTooltip term="totalTax" />
                    </span>
                    <span className="text-2xl font-bold text-red-600">₹{breakdown.totalTax.toLocaleString('en-IN')}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">
                            Effective Tax Rate
                            <InfoTooltip term="effectiveTaxRate" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{breakdown.effectiveTaxRate.toFixed(2)}%</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">
                            Average Tax Rate
                            <InfoTooltip term="averageTaxRate" />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{breakdown.averageTaxRate.toFixed(2)}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
