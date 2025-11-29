import IncomeTaxCalculator from '@/components/IncomeTaxCalculator';

export const metadata = {
    title: 'Income Tax Calculator - Complete Tax Planning Tool | MFTracker',
    description: 'Comprehensive income tax calculator for India FY 2025-26. Calculate tax with all income sources (salary, business, capital gains, rental), deductions (80C, 80D, 80E), family details, HUF support. Compare old vs new tax regime with interactive visualizations.',
    keywords: 'income tax calculator, tax planning India, 80C deductions, old vs new regime, salary tax calculator, capital gains tax, HUF tax, tax comparison tool',
};

export default function TaxCalculatorPage() {
    return <IncomeTaxCalculator />;
}
