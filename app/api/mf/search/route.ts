import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q');

        if (!query || query.trim().length < 1) {
            return NextResponse.json(
                { error: 'Search query is required' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.mfapi.in/mf/search?q=${encodeURIComponent(query)}`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            throw new Error(`MFAPI returned status ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error fetching mutual fund search results:', error);
        return NextResponse.json(
            { error: 'Failed to fetch search results' },
            { status: 500 }
        );
    }
}
