# MFTracker - Portfolio Health Analyzer

A comprehensive mutual fund portfolio management platform with **9 powerful tools** for analysis, planning, optimization, and tracking. Built with Next.js 15, TypeScript, and modern web technologies.

## 🚀 Features Overview

MFTracker provides a complete suite of tools for mutual fund investors:

### 1. 📊 **Portfolio Tracker**
- Multi-input support: Manual entry, CSV upload, JSON import, and OCR screenshot parsing
- Automated risk scoring (0-10 scale) based on fund categories
- 8+ intelligent red-flag detection rules
- Visual analytics with interactive charts
- Diversification analysis and category breakdowns
- Export to PDF and CSV

### 2. 🤖 **AI Portfolio Assistant** ⭐ NEW
- Chat-based interface for personalized portfolio insights
- AI-powered recommendations and actionable advice
- Query answering about your investments
- Goal planning assistance
- Tax optimization suggestions
- 100% client-side processing for privacy

### 3. 🧮 **MF Calculator**
- Advanced SIP calculator with step-up options
- Inflation adjustment capabilities
- Portfolio-wide projections
- Lumpsum vs SIP comparison
- Future value calculations with detailed breakdowns

### 4. 🎯 **Goal Planner**
- Set and track multiple financial goals
- Calculate required SIP amounts automatically
- Progress tracking with visual indicators
- Export goal plans to CSV
- Personalized recommendations based on time horizon

### 5. 💰 **Tax Optimizer**
- Analyze tax implications of mutual fund investments
- Identify tax-loss harvesting opportunities
- LTCG (Long Term Capital Gains) optimization
- STCG (Short Term Capital Gains) analysis
- Minimize overall tax liability with smart strategies

### 6. 📋 **Income Tax Calculator**
- Comprehensive tax planning for all income sources
- Support for Salary, Business, Capital Gains, and Other Income
- All deductions: 80C, 80D, 80E, 80G, and more
- Family member and HUF support
- Old vs New tax regime comparison
- Detailed tax breakdown and savings analysis

### 7. 🔄 **Smart Rebalancer**
- AI-powered rebalancing recommendations
- 4 risk profiles: Conservative, Balanced, Growth, Aggressive
- Actionable insights with specific fund suggestions
- Portfolio optimization based on target allocation
- Export rebalancing plans

### 8. 📈 **MF Search & Analysis**
- Search and track mutual funds
- NAV history with interactive charts
- Growth metrics and CAGR calculations
- Comprehensive fund details and performance analysis
- Historical performance tracking

### 9. ⚖️ **Fund Comparison**
- Compare up to 5 mutual funds side-by-side
- Returns analysis across multiple time periods
- Risk metrics: Sharpe Ratio, Sortino Ratio
- Key details: Expense Ratio, Exit Load, Min Investment
- Export comparison data to CSV

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **OCR**: Tesseract.js
- **PDF Export**: jsPDF with jsPDF-AutoTable
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Performance**: Web Vitals tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd MFTracker

# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Open [https://mftracker.sandipmaity.me](https://mftracker.sandipmaity.me) to view the application in production, or [http://localhost:3000](http://localhost:3000) for local development.

## 📖 Usage Guide

### Portfolio Tracker

1. **Input Your Portfolio**
   - Manual entry: Add funds with name, category, and SIP amount
   - CSV upload: Use format `fund_name`, `category`, `amount`
   - JSON upload: Import structured portfolio data
   - Screenshot OCR: Upload portfolio screenshots (experimental)

2. **View Analytics**
   - Allocation pie charts by fund and category
   - Risk distribution analysis
   - Key metrics dashboard
   - Red flag alerts

3. **Get Insights**
   - Review detected red flags
   - Check diversification metrics
   - Analyze risk scores
   - Export reports

### AI Portfolio Assistant

1. Navigate to `/analyzer/ai-assistant`
2. Input your portfolio data
3. Chat with the AI about your investments
4. Ask questions like:
   - "How can I reduce my portfolio risk?"
   - "What are tax-saving opportunities?"
   - "Should I rebalance my portfolio?"
5. Get personalized, actionable recommendations

### Goal Planner

1. Navigate to `/analyzer/goals`
2. Create a new financial goal
3. Enter target amount, time horizon, and expected returns
4. Get SIP amount recommendations
5. Track progress and export plans

### Tax Optimizer

1. Navigate to `/analyzer/tax-optimizer`
2. Input your mutual fund holdings with purchase details
3. Analyze LTCG and STCG implications
4. Identify tax-loss harvesting opportunities
5. Get optimization recommendations

### Income Tax Calculator

1. Navigate to `/analyzer/tax-calculator`
2. Enter all income sources
3. Add applicable deductions
4. Compare old vs new tax regime
5. View detailed tax breakdown and savings

## 🚨 Red Flag Detection Rules

The Portfolio Tracker automatically detects:

1. ⚠️ **High Concentration**: Single fund > 40% of portfolio
2. ⚠️ **Small Cap Overweight**: Small Cap allocation > 25%
3. ⚠️ **Thematic/Sector Risk**: Thematic/Sector funds > 15%
4. ⚠️ **High Expense Ratio**: Funds with expense ratio > 2%
5. ⚠️ **No Core Holdings**: >50% in high-risk funds without core holdings
6. ⚠️ **No Hedge**: Risk score ≥8 without debt/hedge funds
7. ⚠️ **AMC Concentration**: Single AMC > 40% of portfolio
8. ⚠️ **Duplicate Folios**: Duplicate folio IDs detected

## 📁 Project Structure

```
f:/MFTracker/
├── app/
│   ├── analyzer/
│   │   ├── tracker/           # Portfolio tracking
│   │   ├── ai-assistant/      # AI chat interface
│   │   ├── calculator/        # SIP calculator
│   │   ├── goals/            # Goal planner
│   │   ├── tax-optimizer/    # Tax optimization
│   │   ├── tax-calculator/   # Income tax calculator
│   │   ├── rebalancer/       # Smart rebalancing
│   │   └── page.tsx          # Analyzer hub
│   ├── compare/              # Fund comparison
│   ├── mf-search/            # Fund search
│   ├── blog/                 # Blog section
│   ├── formula/              # Analysis formulas
│   ├── layout.tsx            # Root layout with SEO
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── HomePage.tsx              # Landing page component
│   ├── PortfolioAnalyzer.tsx    # Portfolio tracker
│   ├── AIAssistant.tsx          # AI chat component
│   ├── CalculatorSection.tsx    # SIP calculator
│   ├── GoalPlanner.tsx          # Goal planning
│   ├── TaxOptimizer.tsx         # Tax optimization
│   ├── IncomeTaxCalculator.tsx  # Tax calculator
│   ├── SmartRebalancer.tsx      # Rebalancing
│   ├── FundComparison.tsx       # Fund comparison
│   ├── MutualFundSearch.tsx     # Fund search
│   ├── MetricsCards.tsx         # Metrics display
│   ├── RedFlagsSection.tsx      # Red flags alerts
│   ├── InputSection.tsx         # Data input
│   ├── VisualsSection.tsx       # Charts & graphs
│   ├── NavBar.tsx               # Navigation
│   └── Footer.tsx               # Footer component
├── lib/
│   ├── analyzer.ts           # Core analysis logic
│   ├── rebalancer.ts         # Rebalancing engine
│   ├── aiService.ts          # AI assistant logic
│   ├── parser.ts             # CSV/JSON/OCR parsers
│   ├── categories.ts         # Category definitions
│   └── export.ts             # PDF/CSV export
├── types/
│   └── portfolio.ts          # TypeScript types
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🔒 Privacy & Security

- **100% Client-Side**: All calculations and data processing happen in your browser
- **No Data Upload**: Your portfolio data never leaves your device
- **No Tracking**: No analytics or user tracking
- **Open Source**: Transparent codebase you can audit

## ⚠️ Important Disclaimer

This platform provides **hypothetical analysis** based on market capitalization, sectors, and investment themes. It does **NOT** track actual historical fund returns or performance over time.

**Key Points:**
- This is an **educational tool** for portfolio structure analysis
- Not personalized investment advice
- Please consult a SEBI-registered investment advisor before making investment decisions
- Past performance is not indicative of future returns
- Mutual fund investments are subject to market risks
- Read all scheme-related documents carefully

## 🎯 Use Cases

- **Retail Investors**: Analyze and optimize personal portfolios
- **Financial Planning**: Set and track financial goals
- **Tax Planning**: Minimize tax liability on investments
- **Portfolio Rebalancing**: Maintain optimal asset allocation
- **Fund Research**: Compare and analyze mutual funds
- **SIP Planning**: Calculate required investments for goals

## 🌟 Key Benefits

✅ **8+ Red-flag detection rules** for portfolio health  
✅ **Multi-input support** (CSV, JSON, OCR)  
✅ **Real-time risk scoring** and analysis  
✅ **Inflation-adjusted calculations**  
✅ **Portfolio-wide projections**  
✅ **Export to PDF & CSV**  
✅ **AI-powered insights** and recommendations  
✅ **Comprehensive tax planning** tools  
✅ **Goal-based investment planning**  

## 📊 Supported Fund Categories

- Large Cap Equity
- Mid Cap Equity
- Small Cap Equity
- Multi Cap / Flexi Cap
- Hybrid (Aggressive / Balanced)
- Debt Funds
- ELSS (Tax Saver)
- Index Funds
- Sectoral / Thematic Funds
- International / Global Funds
- And more...

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow TypeScript best practices
2. Maintain component modularity
3. Write clean, documented code
4. Test thoroughly before submitting
5. Follow the existing code style

## 📄 License

MIT License - feel free to use and modify for your needs.

## 🔗 Links

- **Live Demo**: [Your deployment URL]
- **Documentation**: See `/formula` for analysis methodology
- **Blog**: Educational content at `/blog`

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the `/formula` page for methodology details
- Review the disclaimer and terms of service

---

**Made with ❤️ for Indian mutual fund investors**

*If You have any quary please feel free to contact me via Twitter/X at [@iam_sandipmaity](https://x.com/iam_sandipmaity)*

*Last Updated: 29 November 2025 by [Sandip Maity](https://sandipmaity.vercel.app)*

