export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    suggestions?: string[];
}

export interface AIResponse {
    message: string;
    suggestions?: string[];
    actionLinks?: ActionLink[];
}

export interface ActionLink {
    label: string;
    href: string;
    icon?: string;
}

export interface QueryIntent {
    category: 'portfolio' | 'goal' | 'tax' | 'rebalance' | 'general' | 'calculator';
    confidence: number;
    keywords: string[];
}

export interface PortfolioContext {
    hasPortfolio?: boolean;
    totalInvestment?: number;
    currentValue?: number;
    monthlyInvestment?: number;
    numberOfFunds?: number;
}
