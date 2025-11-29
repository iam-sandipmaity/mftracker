import Link from 'next/link';
import { Home, ArrowLeft, BarChart3 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Page Not Found - MFTracker",
    description: "The page you're looking for doesn't exist. Return to MFTracker to analyze your mutual fund portfolio.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-6">
                        <BarChart3 className="w-12 h-12 text-indigo-400" />
                    </div>
                    <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-slate-400 mb-12">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </Link>
                    <Link
                        href="/analyzer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
                    >
                        <BarChart3 className="w-5 h-5" />
                        Analyze Portfolio
                    </Link>
                </div>

                <div className="mt-12 pt-12 border-t border-slate-700">
                    <p className="text-sm text-slate-400 mb-4">Popular Pages:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link href="/analyzer/tracker" className="text-sm text-indigo-400 hover:text-indigo-300 underline">
                            Portfolio Tracker
                        </Link>
                        <span className="text-slate-600">•</span>
                        <Link href="/analyzer/calculator" className="text-sm text-indigo-400 hover:text-indigo-300 underline">
                            SIP Calculator
                        </Link>
                        <span className="text-slate-600">•</span>
                        <Link href="/analyzer/rebalancer" className="text-sm text-indigo-400 hover:text-indigo-300 underline">
                            Smart Rebalancer
                        </Link>
                        <span className="text-slate-600">•</span>
                        <Link href="/formula" className="text-sm text-indigo-400 hover:text-indigo-300 underline">
                            Methodology
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
