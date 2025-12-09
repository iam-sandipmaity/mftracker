/**
 * Site Configuration
 * Update SITE_URL to change the base URL across the entire application
 */

export const SITE_CONFIG = {
    // Update this URL when deploying to a custom domain
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mftracker.sandipmaity.me',
    name: 'MFTracker',
    description: 'Portfolio Health Analyzer for Mutual Funds',
} as const;

/**
 * Helper function to get absolute URL for a path
 */
export function getAbsoluteUrl(path: string = ''): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_CONFIG.url}${cleanPath}`;
}
