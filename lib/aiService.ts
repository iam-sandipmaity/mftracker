import { AIResponse, QueryIntent, PortfolioContext } from '@/types/aiTypes';

// Intent recognition based on keywords
export function analyzeIntent(message: string): QueryIntent {
    const lowerMessage = message.toLowerCase();

    // Portfolio analysis keywords
    const portfolioKeywords = ['portfolio', 'holdings', 'investment', 'performance', 'risk', 'diversification', 'analyze', 'review'];
    const portfolioMatches = portfolioKeywords.filter(kw => lowerMessage.includes(kw)).length;

    // Goal planning keywords
    const goalKeywords = ['goal', 'retirement', 'education', 'house', 'home', 'target', 'plan', 'achieve', 'future'];
    const goalMatches = goalKeywords.filter(kw => lowerMessage.includes(kw)).length;

    // Tax keywords
    const taxKeywords = ['tax', 'ltcg', 'stcg', 'save', 'deduction', 'elss', '80c'];
    const taxMatches = taxKeywords.filter(kw => lowerMessage.includes(kw)).length;

    // Rebalancing keywords
    const rebalanceKeywords = ['rebalance', 'allocation', 'adjust', 'optimize', 'redistribute'];
    const rebalanceMatches = rebalanceKeywords.filter(kw => lowerMessage.includes(kw)).length;

    // Calculator keywords
    const calcKeywords = ['calculate', 'sip', 'return', 'growth', 'compound', 'cagr', 'how much'];
    const calcMatches = calcKeywords.filter(kw => lowerMessage.includes(kw)).length;

    // Determine category based on highest matches
    const scores = {
        portfolio: portfolioMatches,
        goal: goalMatches,
        tax: taxMatches,
        rebalance: rebalanceMatches,
        calculator: calcMatches,
        general: 0
    };

    const maxScore = Math.max(...Object.values(scores));

    if (maxScore === 0) {
        return { category: 'general', confidence: 0.5, keywords: [] };
    }

    const category = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as QueryIntent['category'];
    const confidence = Math.min(maxScore / 3, 1); // Normalize confidence

    return { category, confidence, keywords: [] };
}

// Generate AI response based on intent and context
export function generateAIResponse(message: string, context?: PortfolioContext): AIResponse {
    const intent = analyzeIntent(message);

    switch (intent.category) {
        case 'portfolio':
            return generatePortfolioResponse(message, context);
        case 'goal':
            return generateGoalResponse(message);
        case 'tax':
            return generateTaxResponse(message);
        case 'rebalance':
            return generateRebalanceResponse(message);
        case 'calculator':
            return generateCalculatorResponse(message);
        default:
            return generateGeneralResponse(message);
    }
}

function generatePortfolioResponse(message: string, context?: PortfolioContext): AIResponse {
    if (context?.hasPortfolio) {
        return {
            message: `Great! I can help you analyze your portfolio. Based on your current investments, here's what I recommend:\n\n📊 **Portfolio Health Check**\n- Track your portfolio's risk score and diversification\n- Identify any red flags or concentration risks\n- Monitor your asset allocation\n\nWould you like me to help you with a specific aspect of your portfolio?`,
            suggestions: [
                'How can I reduce portfolio risk?',
                'Is my portfolio well diversified?',
                'Should I rebalance my portfolio?'
            ],
            actionLinks: [
                { label: 'Analyze Portfolio', href: '/analyzer/tracker', icon: 'BarChart3' },
                { label: 'Rebalance Portfolio', href: '/analyzer/rebalancer', icon: 'Target' }
            ]
        };
    } else {
        return {
            message: `I'd love to help you analyze your portfolio! 🎯\n\nTo get started, you can use our **Portfolio Tracker** tool to:\n- Upload your portfolio data\n- Get a comprehensive risk analysis\n- Identify red flags and concentration risks\n- Receive diversification recommendations\n\nOnce you've set up your portfolio, I can provide personalized insights and recommendations!`,
            suggestions: [
                'How do I upload my portfolio?',
                'What is a good risk score?',
                'Tell me about diversification'
            ],
            actionLinks: [
                { label: 'Start Portfolio Tracker', href: '/analyzer/tracker', icon: 'BarChart3' }
            ]
        };
    }
}

function generateGoalResponse(message: string): AIResponse {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('retirement')) {
        return {
            message: `Planning for retirement is one of the most important financial goals! 🎯\n\n**Here's how I can help:**\n\n1. **Set Your Retirement Goal** - Define your target corpus and timeline\n2. **Calculate Required SIP** - Find out how much to invest monthly\n3. **Track Progress** - Monitor your journey towards retirement\n\nTypically, financial advisors recommend having 25-30x your annual expenses saved for retirement. Would you like to calculate your retirement corpus?`,
            suggestions: [
                'Calculate retirement SIP',
                'How much should I save for retirement?',
                'What is a good retirement corpus?'
            ],
            actionLinks: [
                { label: 'Goal Planning Tool', href: '/analyzer/goals', icon: 'Target' },
                { label: 'SIP Calculator', href: '/analyzer/calculator', icon: 'Calculator' }
            ]
        };
    }

    return {
        message: `Let me help you plan your financial goals! 🎯\n\n**Popular Goals:**\n- 🏠 Dream Home\n- 🎓 Child's Education\n- 💍 Wedding\n- 🌴 Retirement\n- 🚗 Vehicle Purchase\n\nOur Goal Planning tool can help you:\n✓ Set specific financial targets\n✓ Calculate required monthly SIP\n✓ Track your progress\n✓ Adjust plans as needed\n\nWhat goal would you like to plan for?`,
        suggestions: [
            'Plan for child education',
            'Calculate home down payment',
            'Retirement planning'
        ],
        actionLinks: [
            { label: 'Start Goal Planning', href: '/analyzer/goals', icon: 'Target' }
        ]
    };
}

function generateTaxResponse(message: string): AIResponse {
    return {
        message: `I can help you optimize your mutual fund taxes! 💰\n\n**Key Tax Considerations:**\n\n📌 **Long-Term Capital Gains (LTCG)**\n- Equity funds: >1 year holding = 12.5% tax (₹1.25L exemption)\n- Debt funds: >3 years = as per income slab\n\n📌 **Short-Term Capital Gains (STCG)**\n- Equity: ≤1 year = 20% tax\n- Debt: ≤3 years = as per slab\n\n**Tax-Saving Tips:**\n✓ Use ELSS funds for 80C deduction (up to ₹1.5L)\n✓ Harvest tax losses to offset gains\n✓ Plan redemptions strategically\n✓ Consider holding period before selling\n\nWould you like to analyze your tax situation?`,
        suggestions: [
            'How to save tax on mutual funds?',
            'What is tax-loss harvesting?',
            'Calculate my tax liability'
        ],
        actionLinks: [
            { label: 'Tax Optimizer', href: '/analyzer/tax-optimizer', icon: 'Receipt' },
            { label: 'Income Tax Calculator', href: '/analyzer/tax-calculator', icon: 'DollarSign' }
        ]
    };
}

function generateRebalanceResponse(message: string): AIResponse {
    return {
        message: `Portfolio rebalancing is crucial for maintaining your target asset allocation! ⚖️\n\n**When to Rebalance:**\n- Asset allocation drifts >5% from target\n- Major life events or goal changes\n- Market volatility creates opportunities\n- At least once a year\n\n**Our Smart Rebalancer helps you:**\n✓ Choose from 4 risk profiles (Conservative to Aggressive)\n✓ Get AI-powered allocation recommendations\n✓ Receive actionable rebalancing steps\n✓ Optimize for your goals\n\n**Rebalancing Strategies:**\n1. Sell overweight assets, buy underweight\n2. Direct new investments to underweight assets\n3. Pause SIPs in overweight categories\n\nReady to rebalance your portfolio?`,
        suggestions: [
            'What is my ideal allocation?',
            'How often should I rebalance?',
            'Conservative vs Aggressive portfolio'
        ],
        actionLinks: [
            { label: 'Smart Rebalancer', href: '/analyzer/rebalancer', icon: 'Target' }
        ]
    };
}

function generateCalculatorResponse(message: string): AIResponse {
    return {
        message: `Let me help you with SIP calculations! 🧮\n\n**Our Advanced SIP Calculator offers:**\n\n📈 **Step-up SIP** - Increase SIP annually with income growth\n💹 **Inflation Adjustment** - Real returns calculation\n🎯 **Goal-based Planning** - Work backwards from target\n📊 **Multiple Funds** - Portfolio-wide projections\n\n**Example Calculation:**\nMonthly SIP: ₹10,000\nExpected Return: 12% p.a.\nTime Period: 15 years\n**Future Value: ~₹50 lakhs** 🎉\n\nWith 10% annual step-up:\n**Future Value: ~₹1.2 crores** 🚀\n\nWhat would you like to calculate?`,
        suggestions: [
            'Calculate SIP for ₹1 crore',
            'What is step-up SIP?',
            'How much will my SIP grow?'
        ],
        actionLinks: [
            { label: 'SIP Calculator', href: '/analyzer/calculator', icon: 'Calculator' }
        ]
    };
}

function generateGeneralResponse(message: string): AIResponse {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good evening)/)) {
        return {
            message: `Hello! 👋 I'm your AI Portfolio Assistant, here to help you make smarter investment decisions.\n\n**I can help you with:**\n\n📊 Portfolio analysis and risk assessment\n🎯 Goal planning and SIP calculations\n💰 Tax optimization strategies\n⚖️ Portfolio rebalancing recommendations\n📚 Mutual fund basics and guidance\n\nWhat would you like to know about your investments today?`,
            suggestions: [
                'Analyze my portfolio',
                'Plan for retirement',
                'How to save tax?',
                'Calculate SIP returns'
            ]
        };
    }

    // What is SIP
    if (lowerMessage.includes('what is sip') || lowerMessage.includes('explain sip')) {
        return {
            message: `**SIP (Systematic Investment Plan)** is a disciplined way to invest in mutual funds! 💡\n\n**How it works:**\n- Invest a fixed amount regularly (monthly/quarterly)\n- Automatic deduction from your bank account\n- Buy more units when NAV is low, fewer when high\n- Benefit from rupee cost averaging\n\n**Advantages:**\n✓ Start with as little as ₹500/month\n✓ Disciplined investing habit\n✓ Power of compounding\n✓ Reduces market timing risk\n✓ Flexible - can pause/stop anytime\n\n**Example:**\n₹5,000/month for 20 years @ 12% return\n= Investment: ₹12 lakhs\n= Corpus: ~₹50 lakhs 🎉\n\nWould you like to calculate your SIP?`,
            suggestions: [
                'Calculate my SIP returns',
                'How much SIP for ₹1 crore?',
                'What is step-up SIP?'
            ],
            actionLinks: [
                { label: 'SIP Calculator', href: '/analyzer/calculator', icon: 'Calculator' }
            ]
        };
    }

    // Default helpful response
    return {
        message: `I'm here to help! 😊\n\nI can assist you with:\n\n🔍 **Portfolio Analysis** - Risk scoring, diversification, red flags\n🎯 **Goal Planning** - Retirement, education, home buying\n💰 **Tax Optimization** - LTCG/STCG, tax-loss harvesting\n⚖️ **Rebalancing** - Asset allocation optimization\n🧮 **Calculations** - SIP returns, future value projections\n\nCould you tell me more about what you'd like help with? Or try one of the suggestions below!`,
        suggestions: [
            'How is my portfolio performing?',
            'Plan for my child\'s education',
            'How to reduce taxes?',
            'What is a good SIP amount?'
        ]
    };
}

// Get example prompts for first-time users
export function getExamplePrompts(): string[] {
    return [
        'How can I analyze my portfolio?',
        'Calculate SIP for retirement',
        'How to save tax on mutual funds?',
        'Should I rebalance my portfolio?',
        'What is a good diversification strategy?',
        'Plan for child education in 15 years'
    ];
}
