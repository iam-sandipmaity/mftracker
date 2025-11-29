import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MFTracker - Free Mutual Fund Portfolio Analyzer';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #312e81 50%, #1e293b 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px',
                }}
            >
                {/* Logo/Icon */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '40px',
                    }}
                >
                    <svg width="120" height="120" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="48" fill="url(#grad1)" />
                        <path d="M30 70 L30 55 L40 45 L50 50 L60 35 L70 40 L70 70 Z" fill="white" opacity="0.3" />
                        <polyline points="30,55 40,45 50,50 60,35 70,40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M65 25 L75 35 L70 35 L70 45 L60 45 L60 35 L55 35 Z" fill="white" />
                        <circle cx="30" cy="55" r="3" fill="white" />
                        <circle cx="40" cy="45" r="3" fill="white" />
                        <circle cx="50" cy="50" r="3" fill="white" />
                        <circle cx="60" cy="35" r="3" fill="white" />
                        <circle cx="70" cy="40" r="3" fill="white" />
                    </svg>
                </div>

                {/* Main Heading */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        marginBottom: '24px',
                        textAlign: 'center',
                    }}
                >
                    MFTracker
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: 36,
                        color: '#e2e8f0',
                        marginBottom: '48px',
                        textAlign: 'center',
                        maxWidth: '900px',
                    }}
                >
                    Free Mutual Fund Portfolio Analyzer
                </div>

                {/* Features */}
                <div
                    style={{
                        display: 'flex',
                        gap: '32px',
                        color: '#94a3b8',
                        fontSize: 24,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#818cf8' }}>✓</span> Risk Scoring
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#818cf8' }}>✓</span> SIP Calculator
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#818cf8' }}>✓</span> Smart Rebalancing
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
