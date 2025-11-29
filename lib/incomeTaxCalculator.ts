// Comprehensive Income Tax Calculator for India - FY 2025-26
// Supports all income sources, deductions, and tax regimes

export interface IncomeDetails {
    // Salary Income
    basicSalary: number;
    hra: number;
    rentPaid: number;
    cityType: 'metro' | 'non-metro';
    lta: number;
    specialAllowance: number;
    otherAllowances: number;
    
    // Business/Profession Income
    businessIncome: number;
    businessExpenses: number;
    
    // Capital Gains
    shortTermCapitalGain: number;
    longTermCapitalGain: number;
    
    // Other Income
    interestIncome: number;
    rentalIncome: number;
    otherIncome: number;
    
    // Agricultural Income (exempt but affects tax slab)
    agriculturalIncome: number;
}

export interface DeductionsDetails {
    // Section 80C (max 1.5L)
    epf: number;
    ppf: number;
    lifeInsurance: number;
    elss: number;
    homeLoanPrincipal: number;
    tuitionFees: number;
    nsc: number;
    sukanyaSamriddhi: number;
    other80C: number;
    
    // Section 80D - Medical Insurance
    selfHealthInsurance: number;
    parentsHealthInsurance: number;
    preventiveCheckup: number;
    
    // Section 80E - Education Loan Interest
    educationLoanInterest: number;
    
    // Section 80G - Donations
    donations: number;
    
    // Section 24 - Home Loan Interest
    homeLoanInterest: number;
    
    // NPS - Additional 80CCD(1B)
    npsAdditional: number;
    
    // Other Deductions
    disabilityDeduction: number;
    savingsAccountInterest: number;
}

export interface FamilyDetails {
    age: number;
    hasDisability: boolean;
    isSeniorCitizen: boolean;
    isSuperSeniorCitizen: boolean;
    
    // Dependents
    dependentChildren: number;
    dependentParents: number;
    dependentSeniorParents: number;
    
    // HUF
    isHUF: boolean;
    hufIncome: number;
}

export interface TaxRegime {
    name: 'old' | 'new';
    allowsDeductions: boolean;
}

export interface TaxBreakdown {
    grossIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    
    // Tax Slabs Applied
    taxSlabs: Array<{
        slab: string;
        amount: number;
        rate: number;
        tax: number;
    }>;
    
    // Tax Components
    incomeTax: number;
    surcharge: number;
    healthEducationCess: number;
    totalTax: number;
    
    // Effective Rates
    effectiveTaxRate: number;
    averageTaxRate: number;
    
    // Deduction Breakdown
    deductionBreakdown: {
        section80C: number;
        section80D: number;
        section80E: number;
        section80G: number;
        section24: number;
        nps80CCD1B: number;
        standardDeduction: number;
        other: number;
    };
    
    // Income Breakdown
    incomeBreakdown: {
        salaryIncome: number;
        businessIncome: number;
        capitalGains: number;
        otherIncome: number;
    };
}

export interface TaxComparison {
    oldRegime: TaxBreakdown;
    newRegime: TaxBreakdown;
    recommendation: string;
    savings: number;
}

// Tax Slabs for FY 2025-26
const OLD_REGIME_SLABS = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 },
];

const NEW_REGIME_SLABS = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 5 },
    { min: 700000, max: 1000000, rate: 10 },
    { min: 1000000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 },
];

const SENIOR_CITIZEN_SLABS = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 },
];

const SUPER_SENIOR_CITIZEN_SLABS = [
    { min: 0, max: 500000, rate: 0 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Infinity, rate: 30 },
];

export function calculateGrossIncome(income: IncomeDetails): number {
    const salaryIncome = income.basicSalary + income.hra + income.lta + 
                        income.specialAllowance + income.otherAllowances;
    
    const businessIncome = Math.max(0, income.businessIncome - income.businessExpenses);
    
    const capitalGains = income.shortTermCapitalGain + income.longTermCapitalGain;
    
    const otherIncome = income.interestIncome + income.rentalIncome + income.otherIncome;
    
    return salaryIncome + businessIncome + capitalGains + otherIncome;
}

export function calculateHRAExemption(
    hra: number,
    basicSalary: number,
    rentPaid: number,
    cityType: 'metro' | 'non-metro'
): number {
    if (rentPaid === 0) return 0;
    
    const hraReceived = hra;
    const salaryForHRA = basicSalary;
    const excessRent = rentPaid - (0.1 * salaryForHRA);
    const cityPercent = cityType === 'metro' ? 0.5 : 0.4;
    const cityBasedHRA = salaryForHRA * cityPercent;
    
    const exemption = Math.min(hraReceived, excessRent, cityBasedHRA);
    return Math.max(0, exemption);
}

export function calculate80CDeductions(deductions: DeductionsDetails): number {
    const total80C = deductions.epf + deductions.ppf + deductions.lifeInsurance +
                    deductions.elss + deductions.homeLoanPrincipal + deductions.tuitionFees +
                    deductions.nsc + deductions.sukanyaSamriddhi + deductions.other80C;
    
    return Math.min(total80C, 150000); // Max 1.5L
}

export function calculate80DDeductions(deductions: DeductionsDetails, family: FamilyDetails): number {
    const selfLimit = family.isSeniorCitizen ? 50000 : 25000;
    const parentsLimit = family.dependentSeniorParents > 0 ? 50000 : 25000;
    
    const selfDeduction = Math.min(deductions.selfHealthInsurance, selfLimit);
    const parentsDeduction = Math.min(deductions.parentsHealthInsurance, parentsLimit);
    const preventive = Math.min(deductions.preventiveCheckup, 5000);
    
    return selfDeduction + parentsDeduction + preventive;
}

export function calculateTotalDeductions(
    income: IncomeDetails,
    deductions: DeductionsDetails,
    family: FamilyDetails,
    regime: 'old' | 'new'
): { total: number; breakdown: any } {
    if (regime === 'new') {
        // New regime has limited deductions
        return {
            total: 50000, // Standard deduction only
            breakdown: {
                section80C: 0,
                section80D: 0,
                section80E: 0,
                section80G: 0,
                section24: 0,
                nps80CCD1B: 0,
                standardDeduction: 50000,
                other: 0,
            }
        };
    }
    
    // Old regime - all deductions allowed
    const section80C = calculate80CDeductions(deductions);
    const section80D = calculate80DDeductions(deductions, family);
    const section80E = deductions.educationLoanInterest; // No limit
    const section80G = Math.min(deductions.donations, income.basicSalary * 0.1); // 10% of gross income
    const section24 = Math.min(deductions.homeLoanInterest, 200000); // Max 2L
    const nps80CCD1B = Math.min(deductions.npsAdditional, 50000); // Additional 50k
    const standardDeduction = 50000;
    const hraExemption = calculateHRAExemption(
        income.hra,
        income.basicSalary,
        income.rentPaid,
        income.cityType
    );
    const savingsInterest = Math.min(deductions.savingsAccountInterest, 10000);
    
    const other = deductions.disabilityDeduction + savingsInterest + hraExemption;
    
    const total = section80C + section80D + section80E + section80G + 
                  section24 + nps80CCD1B + standardDeduction + other;
    
    return {
        total,
        breakdown: {
            section80C,
            section80D,
            section80E,
            section80G,
            section24,
            nps80CCD1B,
            standardDeduction,
            other,
        }
    };
}

export function calculateIncomeTax(
    taxableIncome: number,
    family: FamilyDetails,
    regime: 'old' | 'new'
): { tax: number; slabs: any[] } {
    if (taxableIncome <= 0) {
        return { tax: 0, slabs: [] };
    }
    
    let slabs;
    if (regime === 'new') {
        slabs = NEW_REGIME_SLABS;
    } else if (family.isSuperSeniorCitizen) {
        slabs = SUPER_SENIOR_CITIZEN_SLABS;
    } else if (family.isSeniorCitizen) {
        slabs = SENIOR_CITIZEN_SLABS;
    } else {
        slabs = OLD_REGIME_SLABS;
    }
    
    let totalTax = 0;
    const slabDetails = [];
    let remainingIncome = taxableIncome;
    
    for (let i = 0; i < slabs.length; i++) {
        const slab = slabs[i];
        const slabMin = slab.min;
        const slabMax = slab.max;
        const rate = slab.rate;
        
        if (remainingIncome <= 0) break;
        
        const taxableInSlab = Math.min(
            remainingIncome,
            slabMax - slabMin
        );
        
        if (taxableInSlab > 0 && remainingIncome + slabMin > slabMin) {
            const actualTaxable = Math.min(taxableInSlab, remainingIncome);
            const tax = (actualTaxable * rate) / 100;
            totalTax += tax;
            
            slabDetails.push({
                slab: `₹${slabMin.toLocaleString('en-IN')} - ${slabMax === Infinity ? 'Above' : '₹' + slabMax.toLocaleString('en-IN')}`,
                amount: actualTaxable,
                rate: rate,
                tax: tax,
            });
            
            remainingIncome -= actualTaxable;
        }
    }
    
    return { tax: totalTax, slabs: slabDetails };
}

export function calculateSurcharge(taxableIncome: number, incomeTax: number): number {
    if (taxableIncome > 50000000) {
        return incomeTax * 0.37; // 37% surcharge
    } else if (taxableIncome > 20000000) {
        return incomeTax * 0.25; // 25% surcharge
    } else if (taxableIncome > 10000000) {
        return incomeTax * 0.15; // 15% surcharge
    } else if (taxableIncome > 5000000) {
        return incomeTax * 0.10; // 10% surcharge
    }
    return 0;
}

export function calculateCess(incomeTax: number, surcharge: number): number {
    return (incomeTax + surcharge) * 0.04; // 4% Health & Education Cess
}

export function calculateTax(
    income: IncomeDetails,
    deductions: DeductionsDetails,
    family: FamilyDetails,
    regime: 'old' | 'new'
): TaxBreakdown {
    const grossIncome = calculateGrossIncome(income);
    const { total: totalDeductions, breakdown: deductionBreakdown } = 
        calculateTotalDeductions(income, deductions, family, regime);
    
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    
    const { tax: incomeTax, slabs: taxSlabs } = calculateIncomeTax(taxableIncome, family, regime);
    
    // Rebate under Section 87A (if applicable)
    let taxAfterRebate = incomeTax;
    if (regime === 'new' && taxableIncome <= 700000) {
        taxAfterRebate = Math.max(0, incomeTax - 25000);
    } else if (regime === 'old' && taxableIncome <= 500000) {
        taxAfterRebate = Math.max(0, incomeTax - 12500);
    }
    
    const surcharge = calculateSurcharge(taxableIncome, taxAfterRebate);
    const cess = calculateCess(taxAfterRebate, surcharge);
    const totalTax = taxAfterRebate + surcharge + cess;
    
    const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
    const averageTaxRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
    
    const salaryIncome = income.basicSalary + income.hra + income.lta + 
                        income.specialAllowance + income.otherAllowances;
    const businessIncome = Math.max(0, income.businessIncome - income.businessExpenses);
    const capitalGains = income.shortTermCapitalGain + income.longTermCapitalGain;
    const otherIncome = income.interestIncome + income.rentalIncome + income.otherIncome;
    
    return {
        grossIncome,
        totalDeductions,
        taxableIncome,
        taxSlabs,
        incomeTax: taxAfterRebate,
        surcharge,
        healthEducationCess: cess,
        totalTax,
        effectiveTaxRate,
        averageTaxRate,
        deductionBreakdown,
        incomeBreakdown: {
            salaryIncome,
            businessIncome,
            capitalGains,
            otherIncome,
        },
    };
}

export function compareTaxRegimes(
    income: IncomeDetails,
    deductions: DeductionsDetails,
    family: FamilyDetails
): TaxComparison {
    const oldRegime = calculateTax(income, deductions, family, 'old');
    const newRegime = calculateTax(income, deductions, family, 'new');
    
    const savings = oldRegime.totalTax - newRegime.totalTax;
    
    let recommendation = '';
    if (savings > 0) {
        recommendation = `New Tax Regime is better. You save ₹${Math.abs(savings).toLocaleString('en-IN')} annually.`;
    } else if (savings < 0) {
        recommendation = `Old Tax Regime is better. You save ₹${Math.abs(savings).toLocaleString('en-IN')} annually.`;
    } else {
        recommendation = 'Both regimes result in the same tax liability.';
    }
    
    return {
        oldRegime,
        newRegime,
        recommendation,
        savings,
    };
}

export function exportTaxDataToCSV(
    income: IncomeDetails,
    deductions: DeductionsDetails,
    family: FamilyDetails,
    taxBreakdown: TaxBreakdown,
    regime: string
): void {
    const rows = [
        ['Income Tax Calculation Report'],
        ['Generated on', new Date().toLocaleString()],
        ['Tax Regime', regime === 'old' ? 'Old Tax Regime' : 'New Tax Regime'],
        [''],
        ['=== INCOME DETAILS ==='],
        ['Basic Salary', income.basicSalary.toString()],
        ['HRA', income.hra.toString()],
        ['LTA', income.lta.toString()],
        ['Special Allowance', income.specialAllowance.toString()],
        ['Other Allowances', income.otherAllowances.toString()],
        ['Business Income', income.businessIncome.toString()],
        ['Business Expenses', income.businessExpenses.toString()],
        ['Short Term Capital Gain', income.shortTermCapitalGain.toString()],
        ['Long Term Capital Gain', income.longTermCapitalGain.toString()],
        ['Interest Income', income.interestIncome.toString()],
        ['Rental Income', income.rentalIncome.toString()],
        ['Other Income', income.otherIncome.toString()],
        [''],
        ['=== DEDUCTIONS ==='],
        ['EPF (80C)', deductions.epf.toString()],
        ['PPF (80C)', deductions.ppf.toString()],
        ['Life Insurance (80C)', deductions.lifeInsurance.toString()],
        ['ELSS (80C)', deductions.elss.toString()],
        ['Home Loan Principal (80C)', deductions.homeLoanPrincipal.toString()],
        ['Tuition Fees (80C)', deductions.tuitionFees.toString()],
        ['Health Insurance - Self (80D)', deductions.selfHealthInsurance.toString()],
        ['Health Insurance - Parents (80D)', deductions.parentsHealthInsurance.toString()],
        ['Education Loan Interest (80E)', deductions.educationLoanInterest.toString()],
        ['Home Loan Interest (24)', deductions.homeLoanInterest.toString()],
        ['NPS Additional (80CCD1B)', deductions.npsAdditional.toString()],
        ['Donations (80G)', deductions.donations.toString()],
        [''],
        ['=== TAX CALCULATION ==='],
        ['Gross Income', `₹${taxBreakdown.grossIncome.toLocaleString('en-IN')}`],
        ['Total Deductions', `₹${taxBreakdown.totalDeductions.toLocaleString('en-IN')}`],
        ['Taxable Income', `₹${taxBreakdown.taxableIncome.toLocaleString('en-IN')}`],
        [''],
        ['=== TAX BREAKDOWN ==='],
        ['Income Tax', `₹${taxBreakdown.incomeTax.toLocaleString('en-IN')}`],
        ['Surcharge', `₹${taxBreakdown.surcharge.toLocaleString('en-IN')}`],
        ['Health & Education Cess (4%)', `₹${taxBreakdown.healthEducationCess.toLocaleString('en-IN')}`],
        ['Total Tax Payable', `₹${taxBreakdown.totalTax.toLocaleString('en-IN')}`],
        [''],
        ['Effective Tax Rate', `${taxBreakdown.effectiveTaxRate.toFixed(2)}%`],
        ['Average Tax Rate', `${taxBreakdown.averageTaxRate.toFixed(2)}%`],
        [''],
        ['=== TAX SLABS APPLIED ==='],
        ['Slab', 'Amount', 'Rate', 'Tax'],
        ...taxBreakdown.taxSlabs.map(slab => [
            slab.slab,
            `₹${slab.amount.toLocaleString('en-IN')}`,
            `${slab.rate}%`,
            `₹${slab.tax.toLocaleString('en-IN')}`
        ]),
    ];
    
    const csvContent = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `income-tax-calculation-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
