'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Send vitals to analytics
function sendToAnalytics(metric: Metric) {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
        });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log('[Web Vitals]', metric.name, metric.value, metric.rating);
    }
}

export function WebVitals() {
    useEffect(() => {
        // Core Web Vitals
        onCLS(sendToAnalytics);  // Cumulative Layout Shift
        onINP(sendToAnalytics);  // Interaction to Next Paint (replaces FID)
        onLCP(sendToAnalytics);  // Largest Contentful Paint
        
        // Additional metrics
        onFCP(sendToAnalytics);  // First Contentful Paint
        onTTFB(sendToAnalytics); // Time to First Byte
    }, []);

    return null;
}

// Performance monitoring helper
export function logPerformanceMetrics() {
    if (typeof window === 'undefined') return;

    // Navigation Timing API
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (perfData) {
        const metrics = {
            'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
            'TCP Connection': perfData.connectEnd - perfData.connectStart,
            'Request Time': perfData.responseStart - perfData.requestStart,
            'Response Time': perfData.responseEnd - perfData.responseStart,
            'DOM Interactive': perfData.domInteractive - perfData.fetchStart,
            'DOM Complete': perfData.domComplete - perfData.fetchStart,
            'Page Load Time': perfData.loadEventEnd - perfData.fetchStart,
        };

        if (process.env.NODE_ENV === 'development') {
            console.table(metrics);
        }

        return metrics;
    }
}
