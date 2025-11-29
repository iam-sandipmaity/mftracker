export interface SIP {
    id: string | number;
    fund_name: string;
    amount: number;
    category: string;
    amc?: string;
    folio_id?: string;
    start_date?: string;
    nav?: number;
    aum?: number;
    expense_ratio?: number;
    risk: number;
}

export interface Allocation {
    fund_name: string;
    amount: number;
    pct: number;
    category: string;
}

export interface RedFlag {
    code: string;
    message: string;
    severity: 'high' | 'medium' | 'low';
}

export interface RebalanceChange {
    fund_name: string;
    category: string;
    current: number;
    recommended: number;
    diff: number;
    reason?: string;
    isNew?: boolean;
}

export interface RebalanceData {
    target_profile: string;
    new_allocations: { category: string; target_pct: number }[];
    actionable_changes: RebalanceChange[];
}

export interface VisualizationData {
    pie_chart_data: { name: string; value: number }[];
    allocation_bar_data: { category: string; amount: number }[];
}

export interface Explanations {
    why_recommendation: string;
    assumptions: string;
}

export interface AnalysisResult {
    input_source: 'screenshot' | 'csv' | 'json' | 'manual';
    raw_parsed_sips: SIP[];
    total_monthly_sip: number;
    allocations: Allocation[];
    portfolio_risk_score: number;
    diversification_score: number;
    red_flags: RedFlag[];
    recommended_rebalance: RebalanceData;
    visuals: VisualizationData;
    explanations: Explanations;
}

export type RiskProfile = 'Conservative' | 'Balanced' | 'Growth' | 'Aggressive';

export interface ParsedSIP extends Omit<SIP, 'risk'> {
    confidence?: number;
    notes?: string;
}
