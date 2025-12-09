# Deployment Guide - MFTracker

## 🌐 Production URL

**Live Site:** https://mftracker.sandipmaity.me/

All URLs in the application have been updated to use the production domain.

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

Create `.env.local` (for local development) or set in your hosting platform:

```env
NEXT_PUBLIC_SITE_URL=https://mftracker.sandipmaity.me
```

### 2. Build & Test

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm start
```

### 3. Verify URLs

All URLs should point to `https://mftracker.sandipmaity.me`:

- ✅ Site metadata (Open Graph, Twitter Cards)
- ✅ Structured data (JSON-LD schemas)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Breadcrumb navigation
- ✅ Internal links

---

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import your Git repository
   - Select the `main` branch

2. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL = https://mftracker.sandipmaity.me
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

4. **Custom Domain**
   - Go to Project Settings → Domains
   - Add `mftracker.sandipmaity.me`
   - Update DNS records as instructed by Vercel

### Option 2: Netlify

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://netlify.com)
   - Import from Git

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL = https://mftracker.sandipmaity.me
   ```

4. **Custom Domain**
   - Domain Settings → Add custom domain
   - Update DNS records

### Option 3: Self-Hosted

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm start
   # Or use PM2 for production
   pm2 start npm --name "mftracker" -- start
   ```

3. **Configure Nginx/Apache**
   
   **Nginx Example:**
   ```nginx
   server {
       listen 80;
       server_name mftracker.sandipmaity.me;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Setup SSL**
   ```bash
   sudo certbot --nginx -d mftracker.sandipmaity.me
   ```

---

## 🔍 Post-Deployment Verification

### 1. Test Core Functionality

- [ ] Home page loads correctly
- [ ] Portfolio Tracker works
- [ ] SIP Calculator functional
- [ ] Tax Calculator operational
- [ ] Goal Planner accessible
- [ ] Smart Rebalancer working
- [ ] Tax Optimizer functional

### 2. SEO Verification

- [ ] **Sitemap:** Visit https://mftracker.sandipmaity.me/sitemap.xml
- [ ] **Robots.txt:** Visit https://mftracker.sandipmaity.me/robots.txt
- [ ] **Metadata:** View page source, check Open Graph tags
- [ ] **Structured Data:** Test with [Schema Validator](https://validator.schema.org/)

### 3. Performance Testing

- [ ] **Google PageSpeed Insights:** https://pagespeed.web.dev/
- [ ] **GTmetrix:** https://gtmetrix.com/
- [ ] **WebPageTest:** https://www.webpagetest.org/

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 4. Mobile Testing

- [ ] Responsive design on mobile devices
- [ ] Touch-friendly buttons
- [ ] No horizontal scrolling
- [ ] Fast mobile loading

### 5. Search Engine Submission

#### Google Search Console
1. Add property: https://mftracker.sandipmaity.me
2. Verify ownership (DNS or HTML file)
3. Submit sitemap: https://mftracker.sandipmaity.me/sitemap.xml
4. Request indexing for key pages

#### Bing Webmaster Tools
1. Add site: https://mftracker.sandipmaity.me
2. Verify ownership
3. Submit sitemap

---

## 📊 Analytics Setup

### Google Analytics 4

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create new property for `mftracker.sandipmaity.me`

2. **Get Measurement ID**
   - Copy your GA4 Measurement ID (G-XXXXXXXXXX)

3. **Update Analytics Component**
   - Edit `components/Analytics.tsx`
   - Replace `G-YQ0F8HJWK6` with your ID

### Microsoft Clarity (Optional)

1. Create project at [Clarity](https://clarity.microsoft.com)
2. Get tracking code
3. Add to `components/Analytics.tsx`

---

## 🛡️ Security Checklist

- [x] **Dependencies Updated:** All packages up-to-date (CVE-2025-55182 patched)
- [x] **HTTPS Enabled:** SSL certificate active
- [ ] **Security Headers:** Configured in `next.config.js`
- [ ] **CSP Headers:** Content Security Policy implemented
- [ ] **Rate Limiting:** API route protection (if needed)
- [ ] **Environment Variables:** Sensitive data in .env only

---

## 📈 Monitoring & Maintenance

### Daily
- Monitor uptime (use UptimeRobot or similar)
- Check error logs

### Weekly
- Review analytics data
- Monitor Core Web Vitals
- Check Search Console for errors

### Monthly
- Update dependencies: `npm update`
- Review security advisories: `npm audit`
- Backup database (if applicable)
- Review and update content

### Quarterly
- Performance audit with Lighthouse
- SEO audit
- Accessibility audit
- Update documentation

---

## 🔧 Troubleshooting

### Issue: URLs showing localhost instead of production domain

**Solution:** Ensure `NEXT_PUBLIC_SITE_URL` is set in environment variables and rebuild:
```bash
npm run build
```

### Issue: Sitemap not updating

**Solution:** Clear Next.js cache and rebuild:
```bash
rm -rf .next
npm run build
```

### Issue: Structured data errors

**Solution:** Test with [Schema Validator](https://validator.schema.org/) and fix any JSON-LD syntax errors.

### Issue: Slow performance

**Solution:**
1. Enable Vercel/CDN caching
2. Optimize images (use WebP/AVIF)
3. Implement lazy loading
4. Review Core Web Vitals

---

## 📞 Support & Resources

### Documentation
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Deployment](https://vercel.com/docs)
- [SEO Best Practices](https://developers.google.com/search)

### Tools
- **Search Console:** https://search.google.com/search-console
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Schema Validator:** https://validator.schema.org/

### Configuration Files
- `lib/config.ts` - Site configuration
- `lib/seo.ts` - SEO utilities
- `next.config.js` - Next.js configuration
- `app/sitemap.ts` - Sitemap generation
- `app/robots.ts` - Robots.txt

---

## 🎯 Success Metrics

### Traffic Goals
- Organic search traffic: 1000+ visitors/month (3 months)
- Direct traffic: 500+ visitors/month
- Bounce rate: < 50%
- Average session duration: > 3 minutes

### SEO Goals
- Google indexing: All 15+ pages indexed
- Average position: Top 10 for 5+ primary keywords
- Click-through rate: > 5%

### Performance Goals
- Core Web Vitals: All green
- Lighthouse Performance: > 90
- Time to Interactive: < 3 seconds

---

**Last Updated:** December 9, 2025  
**Version:** 1.0.0  
**Production URL:** https://mftracker.sandipmaity.me/
