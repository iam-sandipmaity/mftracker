export const CATEGORY_RISK_MAP: Record<string, number> = {
    "Small Cap": 9,
    "Thematic": 9,
    "Sector": 10,
    "Flexi Cap": 7,
    "Multi Cap": 7,
    "Large & Mid": 6,
    "Large Cap": 5,
    "Gold": 4,
    "Commodity": 4,
    "Index": 3,
    "Debt": 2,
    "Hybrid": 5,
    "International": 6,
    "ELSS": 6,
};

export const RISK_PROFILES = {
    Conservative: {
        Index: 50,
        Debt: 30,
        Gold: 10,
        "Large & Mid": 10,
        "Flexi Cap": 0,
        "Small Cap": 0,
        Thematic: 0
    },
    Balanced: {
        Index: 40,
        "Large & Mid": 20,
        "Flexi Cap": 20,
        Gold: 10,
        "Small Cap": 5,
        Debt: 5,
        Thematic: 0
    },
    Growth: {
        Index: 30,
        "Flexi Cap": 30,
        "Large & Mid": 15,
        "Small Cap": 15,
        Thematic: 5,
        Gold: 5
    },
    Aggressive: {
        "Small Cap": 30,
        "Flexi Cap": 25,
        "Large & Mid": 15,
        Thematic: 15,
        Index: 10,
        Gold: 5
    }
};

// Keywords for fuzzy matching fund names to categories
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
    "Small Cap": ["small cap", "smallcap", "small-cap"],
    "Large Cap": ["large cap", "largecap", "large-cap", "bluechip", "blue chip"],
    "Large & Mid": ["large & mid", "large and mid", "large mid", "largemid"],
    "Flexi Cap": ["flexi cap", "flexicap", "flexi-cap", "multi cap", "multicap"],
    "Index": ["index", "nifty", "sensex", "nifty 50", "nifty50", "nifty next 50"],
    "Thematic": ["thematic", "consumption", "infrastructure", "banking", "pharma", "healthcare", "technology", "digital", "new age"],
    "Sector": ["sector", "sectoral"],
    "Gold": ["gold", "silver", "precious metal"],
    "Debt": ["debt", "bond", "gilt", "liquid", "money market", "short term", "medium term", "long term"],
    "Hybrid": ["hybrid", "balanced", "aggressive hybrid", "conservative hybrid"],
    "ELSS": ["elss", "tax saver", "tax saving"],
    "International": ["international", "global", "us equity", "emerging market"],
};

export const COLORS = [
    '#FFBB28', '#8884d8', '#FF8042', '#00C49F',
    '#FF6384', '#0088FE', '#AA336A', '#33AA6A',
    '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181'
];

export function categorizeFund(fundName: string): string {
    const lowerName = fundName.toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some(keyword => lowerName.includes(keyword))) {
            return category;
        }
    }

    // Default to Flexi Cap if no match found
    return "Flexi Cap";
}

export function getRiskForCategory(category: string): number {
    return CATEGORY_RISK_MAP[category] || 5;
}
