# Site URL Configuration

All URLs in the application are now centralized in `lib/config.ts`. This makes it easy to update your site URL when deploying to production or a custom domain.

## Quick Start

### 1. Update Environment Variable

Edit `.env.local` and set your site URL:

```env
NEXT_PUBLIC_SITE_URL=https://mftracker-ten.vercel.app
```

Or when deploying to production/custom domain:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. That's It!

All URLs across the site will automatically update, including:
- Metadata (Open Graph, Twitter Cards)
- Structured Data (JSON-LD schemas)
- Sitemap
- Canonical URLs
- Internal links in blog posts

## Configuration File

The main configuration is in `lib/config.ts`:

```typescript
export const SITE_CONFIG = {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mftracker-ten.vercel.app',
    name: 'MFTracker',
    description: 'Portfolio Health Analyzer for Mutual Funds',
}
```

## Helper Functions

### getAbsoluteUrl(path)

Use this to generate absolute URLs:

```typescript
import { getAbsoluteUrl } from '@/lib/config';

const blogUrl = getAbsoluteUrl('/blog');
// Result: https://mftracker-ten.vercel.app/blog
```

## Files Updated

The following files now use `SITE_CONFIG`:

- ✅ `app/layout.tsx` - Root metadata, Open Graph, schemas
- ✅ `app/sitemap.ts` - Sitemap generation
- ✅ `app/blog/page.tsx` - Blog index metadata
- ✅ `app/blog/portfolio-tracker-guide/page.tsx`
- ✅ `app/blog/sip-calculator-guide/page.tsx`
- ✅ `app/blog/rebalancer-guide/page.tsx`

## Deployment

### Vercel

Vercel will automatically use `.env.local` for local development. For production:

1. Go to your Vercel project settings
2. Add Environment Variable: `NEXT_PUBLIC_SITE_URL`
3. Set value to your production domain
4. Redeploy

### Other Platforms

Set the `NEXT_PUBLIC_SITE_URL` environment variable in your hosting platform's settings.

## Default Behavior

If `NEXT_PUBLIC_SITE_URL` is not set, the app defaults to `https://mftracker-ten.vercel.app`.

To change the default, edit `lib/config.ts`:

```typescript
url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-default-url.com',
```
