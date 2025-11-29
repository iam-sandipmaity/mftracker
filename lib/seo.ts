import { Metadata } from 'next';

interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    image?: string;
    noindex?: boolean;
    type?: 'website' | 'article';
}

export function generateMetadata({
    title,
    description,
    keywords = [],
    canonical,
    image = '/opengraph-image',
    noindex = false,
    type = 'website',
}: SEOConfig): Metadata {
    const siteUrl = 'https://mftracker.com';
    const fullTitle = title.includes('MFTracker') ? title : `${title} | MFTracker`;
    const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;

    return {
        title: fullTitle,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,
        alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
        robots: noindex ? 'noindex,nofollow' : 'index,follow',
        openGraph: {
            title: fullTitle,
            description,
            type,
            url: canonicalUrl,
            siteName: 'MFTracker',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
        },
    };
}

// Generate article metadata for blog posts
export function generateArticleMetadata({
    title,
    description,
    author = 'MFTracker Team',
    publishedTime,
    modifiedTime,
    tags = [],
    canonical,
}: {
    title: string;
    description: string;
    author?: string;
    publishedTime: string;
    modifiedTime?: string;
    tags?: string[];
    canonical: string;
}): Metadata {
    const siteUrl = 'https://mftracker.com';
    const fullTitle = `${title} | MFTracker`;
    const canonicalUrl = `${siteUrl}${canonical}`;

    return {
        title: fullTitle,
        description,
        keywords: tags,
        alternates: { canonical: canonicalUrl },
        authors: [{ name: author }],
        openGraph: {
            title: fullTitle,
            description,
            type: 'article',
            url: canonicalUrl,
            siteName: 'MFTracker',
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors: [author],
            tags,
            images: [
                {
                    url: '/opengraph-image',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: ['/opengraph-image'],
        },
    };
}

// SEO Best Practices Checklist
export const SEO_CHECKLIST = {
    // Title optimization
    titleLength: { min: 30, max: 60, optimal: 55 },
    // Description optimization
    descriptionLength: { min: 120, max: 160, optimal: 155 },
    // Keywords
    keywordCount: { min: 5, max: 15, optimal: 10 },
    // Image alt text
    imageAltLength: { min: 10, max: 125, optimal: 100 },
    // URL structure
    urlLength: { max: 75, optimal: 60 },
    // Heading structure
    h1Count: 1,
    h2Count: { min: 2, max: 6 },
};

// Validate SEO metadata
export function validateSEOMetadata(metadata: SEOConfig): {
    isValid: boolean;
    warnings: string[];
    suggestions: string[];
} {
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // Check title length
    if (metadata.title.length < SEO_CHECKLIST.titleLength.min) {
        warnings.push('Title is too short. Aim for 30-60 characters.');
    } else if (metadata.title.length > SEO_CHECKLIST.titleLength.max) {
        warnings.push('Title is too long. It may be truncated in search results.');
    }

    // Check description length
    if (metadata.description.length < SEO_CHECKLIST.descriptionLength.min) {
        warnings.push('Description is too short. Aim for 120-160 characters.');
    } else if (metadata.description.length > SEO_CHECKLIST.descriptionLength.max) {
        warnings.push('Description is too long. It may be truncated in search results.');
    }

    // Check keywords
    if (metadata.keywords && metadata.keywords.length < SEO_CHECKLIST.keywordCount.min) {
        suggestions.push('Consider adding more relevant keywords (5-15 recommended).');
    }

    // Check for focus keyword in title
    const focusKeyword = metadata.keywords?.[0]?.toLowerCase();
    if (focusKeyword && !metadata.title.toLowerCase().includes(focusKeyword)) {
        suggestions.push('Include your primary keyword in the title for better SEO.');
    }

    // Check for focus keyword in description
    if (focusKeyword && !metadata.description.toLowerCase().includes(focusKeyword)) {
        suggestions.push('Include your primary keyword in the description.');
    }

    return {
        isValid: warnings.length === 0,
        warnings,
        suggestions,
    };
}

// Rich snippets helpers
export function generateLocalBusinessSchema(business: {
    name: string;
    description: string;
    address?: string;
    telephone?: string;
    priceRange?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: business.name,
        description: business.description,
        address: business.address,
        telephone: business.telephone,
        priceRange: business.priceRange || 'Free',
    };
}

export function generateProductSchema(product: {
    name: string;
    description: string;
    price: string;
    currency: string;
    rating?: number;
    reviewCount?: number;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: product.currency,
        },
        aggregateRating: product.rating
            ? {
                  '@type': 'AggregateRating',
                  ratingValue: product.rating,
                  reviewCount: product.reviewCount || 0,
              }
            : undefined,
    };
}

// Social media share helpers
export function generateShareUrls(url: string, title: string) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    };
}
