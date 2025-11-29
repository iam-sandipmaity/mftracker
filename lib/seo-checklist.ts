/**
 * SEO and Accessibility Checklist
 * 
 * This file contains guidelines and best practices for SEO and accessibility
 */

export const SEO_BEST_PRACTICES = {
    // Meta Tags
    metaTags: {
        title: {
            minLength: 30,
            maxLength: 60,
            optimal: 55,
            tips: [
                'Include primary keyword near the beginning',
                'Make it compelling and unique',
                'Match search intent',
                'Include brand name at the end'
            ]
        },
        description: {
            minLength: 120,
            maxLength: 160,
            optimal: 155,
            tips: [
                'Include primary and secondary keywords',
                'Write compelling copy that encourages clicks',
                'Include a call-to-action',
                'Accurately describe the page content'
            ]
        },
        keywords: {
            min: 5,
            max: 15,
            optimal: 10,
            tips: [
                'Focus on long-tail keywords',
                'Include semantic variations',
                'Research competitor keywords',
                'Use keyword research tools'
            ]
        }
    },

    // Content Structure
    content: {
        headings: {
            h1: { count: 1, tips: ['Should include primary keyword', 'Make it descriptive and unique'] },
            h2: { min: 2, max: 6, tips: ['Use for main sections', 'Include secondary keywords'] },
            h3: { tips: ['Use for subsections', 'Maintain hierarchy'] }
        },
        paragraphs: {
            maxLength: 300,
            tips: ['Keep paragraphs short and scannable', 'Use transition words', 'One idea per paragraph']
        },
        images: {
            altText: { min: 10, max: 125, optimal: 100 },
            tips: [
                'Descriptive alt text for all images',
                'Include keywords naturally',
                'Describe image content accurately',
                'Use next/image for optimization'
            ]
        }
    },

    // Technical SEO
    technical: {
        url: {
            maxLength: 75,
            optimal: 60,
            tips: [
                'Use hyphens to separate words',
                'Keep URLs short and descriptive',
                'Include primary keyword',
                'Avoid special characters and numbers'
            ]
        },
        loading: {
            lcp: { target: 2500, unit: 'ms', name: 'Largest Contentful Paint' },
            fid: { target: 100, unit: 'ms', name: 'First Input Delay' },
            cls: { target: 0.1, name: 'Cumulative Layout Shift' },
            fcp: { target: 1800, unit: 'ms', name: 'First Contentful Paint' },
            ttfb: { target: 600, unit: 'ms', name: 'Time to First Byte' }
        },
        mobile: {
            tips: [
                'Mobile-first responsive design',
                'Touch-friendly buttons (min 44x44px)',
                'Readable font sizes (min 16px)',
                'Avoid horizontal scrolling'
            ]
        }
    },

    // Structured Data
    structuredData: {
        required: [
            'Organization schema',
            'WebSite schema with SearchAction',
            'BreadcrumbList for navigation'
        ],
        recommended: [
            'FAQPage for FAQ sections',
            'HowTo for step-by-step guides',
            'SoftwareApplication for web apps',
            'Review/Rating schemas'
        ]
    },

    // Internal Linking
    internalLinks: {
        min: 3,
        optimal: 5,
        tips: [
            'Link to related content',
            'Use descriptive anchor text',
            'Follow logical hierarchy',
            'Avoid excessive linking'
        ]
    }
};

export const ACCESSIBILITY_CHECKLIST = {
    // ARIA and Semantic HTML
    aria: {
        labels: ['All interactive elements should have accessible labels'],
        roles: ['Use semantic HTML or ARIA roles'],
        landmarks: ['Use ARIA landmarks for navigation'],
        liveRegions: ['Use aria-live for dynamic content']
    },

    // Keyboard Navigation
    keyboard: {
        focusVisible: 'All interactive elements should be keyboard accessible',
        tabOrder: 'Logical tab order should be maintained',
        shortcuts: 'Provide keyboard shortcuts for common actions',
        skipLinks: 'Include skip to main content link'
    },

    // Color and Contrast
    colorContrast: {
        normalText: { ratio: 4.5, wcagLevel: 'AA' },
        largeText: { ratio: 3, wcagLevel: 'AA' },
        enhanced: { ratio: 7, wcagLevel: 'AAA' },
        tips: [
            'Do not rely on color alone for information',
            'Use tools to check contrast ratios',
            'Provide alternatives for color-coded information'
        ]
    },

    // Forms
    forms: {
        labels: 'All form inputs must have labels',
        errors: 'Error messages should be clear and associated with inputs',
        required: 'Indicate required fields',
        validation: 'Provide inline validation feedback'
    },

    // Media
    media: {
        images: 'All images must have descriptive alt text',
        video: 'Provide captions and transcripts',
        audio: 'Provide transcripts',
        animations: 'Respect prefers-reduced-motion'
    }
};

// Quick SEO audit function
export function auditPageSEO(pageData: {
    title: string;
    description: string;
    h1Count: number;
    h2Count: number;
    imageCount: number;
    imagesWithAlt: number;
    internalLinks: number;
    hasStructuredData: boolean;
}) {
    const issues: string[] = [];
    const warnings: string[] = [];
    const successes: string[] = [];

    // Check title
    if (pageData.title.length < SEO_BEST_PRACTICES.metaTags.title.minLength) {
        issues.push(`Title too short (${pageData.title.length} chars). Aim for 50-60.`);
    } else if (pageData.title.length > SEO_BEST_PRACTICES.metaTags.title.maxLength) {
        warnings.push(`Title may be truncated (${pageData.title.length} chars).`);
    } else {
        successes.push('Title length is optimal');
    }

    // Check description
    if (pageData.description.length < SEO_BEST_PRACTICES.metaTags.description.minLength) {
        issues.push(`Description too short (${pageData.description.length} chars). Aim for 150-160.`);
    } else if (pageData.description.length > SEO_BEST_PRACTICES.metaTags.description.maxLength) {
        warnings.push(`Description may be truncated (${pageData.description.length} chars).`);
    } else {
        successes.push('Description length is optimal');
    }

    // Check heading structure
    if (pageData.h1Count !== 1) {
        issues.push(`Should have exactly 1 H1 tag (found ${pageData.h1Count})`);
    } else {
        successes.push('Proper H1 structure');
    }

    if (pageData.h2Count < SEO_BEST_PRACTICES.content.headings.h2.min) {
        warnings.push(`Consider adding more H2 headings (found ${pageData.h2Count})`);
    }

    // Check images
    const imagesWithoutAlt = pageData.imageCount - pageData.imagesWithAlt;
    if (imagesWithoutAlt > 0) {
        issues.push(`${imagesWithoutAlt} images missing alt text`);
    } else if (pageData.imageCount > 0) {
        successes.push('All images have alt text');
    }

    // Check internal links
    if (pageData.internalLinks < SEO_BEST_PRACTICES.internalLinks.min) {
        warnings.push(`Add more internal links (found ${pageData.internalLinks})`);
    }

    // Check structured data
    if (!pageData.hasStructuredData) {
        warnings.push('Consider adding structured data (JSON-LD)');
    } else {
        successes.push('Structured data present');
    }

    return {
        score: Math.max(0, 100 - (issues.length * 15) - (warnings.length * 5)),
        issues,
        warnings,
        successes
    };
}
