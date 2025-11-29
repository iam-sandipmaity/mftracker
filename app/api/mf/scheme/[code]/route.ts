import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    try {
        const { code } = await params;

        if (!code || !/^\d+$/.test(code)) {
            return NextResponse.json(
                { error: 'Valid scheme code is required' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.mfapi.in/mf/${code}`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 21600 } // Cache for 6 hours (NAV updates daily)
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json(
                    { error: 'Mutual fund scheme not found' },
                    { status: 404 }
                );
            }
            throw new Error(`MFAPI returned status ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error fetching mutual fund scheme details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch scheme details' },
            { status: 500 }
        );
    }
}
