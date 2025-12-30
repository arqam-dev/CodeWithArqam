# Frontend Interview Questions

## General Questions & Answers

<expand title="How does HTTP/2 improve performance compared to HTTP/1.1?">
**Question:** How does HTTP/2 improve performance compared to HTTP/1.1?

**Answer:**
**Key Improvements:**

1. **Multiplexing:**
   - Multiple requests/responses on single connection
   - HTTP/1.1: 6 connections per domain, sequential requests
   - HTTP/2: Unlimited concurrent streams on one connection
   - **Impact:** Eliminates head-of-line blocking

2. **Header Compression (HPACK):**
   - Compresses headers (often 90%+ reduction)
   - HTTP/1.1: Headers sent in plain text every request
   - **Impact:** Significant bandwidth savings

3. **Server Push:**
   - Server proactively sends resources
   - **Example:** Push CSS/JS files before client requests
   - **Impact:** Reduces round trips

4. **Binary Protocol:**
   - More efficient parsing than text
   - **Impact:** Faster processing, less CPU

5. **Stream Prioritization:**
   - Prioritize critical resources
   - **Impact:** Important content loads first

**Real-world Impact:**
- 15-50% faster page loads
- Better for sites with many resources
- Reduced server load
- Better mobile performance

**When HTTP/2 helps most:**
- Sites with many small resources
- High latency connections
- Mobile networks
</expand>

<expand title="What causes layout shifts and how do you prevent them?">
**Question:** What causes layout shifts and how do you prevent them?

**Answer:**
**Common Causes:**

1. **Images without dimensions:**
   - Browser doesn't know size until loaded
   - Causes shift when image loads
   - **Fix:** Always set width/height or aspect-ratio

2. **Web fonts loading:**
   - FOIT (Flash of Invisible Text) or FOUT (Flash of Unstyled Text)
   - Text size changes when font loads
   - **Fix:** Use `font-display: swap` or preload fonts

3. **Ads/Embeds:**
   - Third-party content loads asynchronously
   - No reserved space
   - **Fix:** Reserve space with aspect-ratio or fixed dimensions

4. **Dynamically injected content:**
   - Content added after page load
   - **Fix:** Reserve space or use skeleton loaders

5. **Animations:**
   - Animating layout properties (width, height, top, left)
   - **Fix:** Use transform and opacity (GPU-accelerated)

**Prevention:**
```html
<!-- Images -->
<img src="image.jpg" width="800" height="600" alt="Description" />
<!-- Or -->
<img src="image.jpg" style="aspect-ratio: 4/3;" alt="Description" />

<!-- Fonts -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'MyFont';
  font-display: swap; /* Prevents invisible text */
}
```

**Best Practices:**
- Always set dimensions for media
- Use CSS aspect-ratio
- Preload critical fonts
- Reserve space for dynamic content
- Use skeleton loaders
</expand>

<expand title="How do you optimize a website for mobile performance?">
**Question:** How do you optimize a website for mobile performance?

**Answer:**
**Key Optimizations:**

1. **Image Optimization:**
   - Use WebP format with fallbacks
   - Implement responsive images (srcset)
   - Lazy load below-the-fold images
   - Compress images (TinyPNG, ImageOptim)
   - **Impact:** 50-70% size reduction

2. **JavaScript:**
   - Code splitting (load only what's needed)
   - Tree shaking (remove unused code)
   - Minification and compression
   - Defer non-critical scripts
   - **Impact:** Faster initial load

3. **CSS:**
   - Remove unused CSS
   - Inline critical CSS
   - Defer non-critical CSS
   - Use CSS containment
   - **Impact:** Faster render

4. **Fonts:**
   - Use `font-display: swap`
   - Preload critical fonts
   - Subset fonts (only needed characters)
   - Use system fonts when possible

5. **Network:**
   - Use CDN for static assets
   - Enable compression (gzip, brotli)
   - Use HTTP/2 or HTTP/3
   - Implement service workers for offline

6. **Rendering:**
   - Minimize render-blocking resources
   - Use async/defer for scripts
   - Optimize third-party scripts
   - Reduce DOM complexity

**Mobile-Specific:**
- Touch-friendly UI (larger tap targets)
- Optimize for slower networks (3G throttling)
- Reduce JavaScript execution time
- Prioritize above-the-fold content

**Target Metrics:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- TTI < 3.5s
</expand>

## Scenario-Based Questions & Answers

<expand title="Scenario: Your website's Lighthouse performance score dropped from 90 to 40. How would you diagnose and fix it?">
**Question:** Your website's Lighthouse performance score dropped from 90 to 40. How would you diagnose and fix it?

**Answer:**
**Diagnosis Steps:**

1. **Run Lighthouse Audit:**
   - Identify specific metrics that degraded
   - Check LCP, FID, CLS scores
   - Review opportunities and diagnostics

2. **Compare Before/After:**
   - What changed recently? (new features, dependencies, deployments)
   - Check git history for recent changes
   - Review new third-party scripts

3. **Network Analysis:**
   - Check Network tab for large resources
   - Identify slow-loading resources
   - Check waterfall chart for blocking resources

4. **JavaScript Analysis:**
   - Check Coverage tab for unused JavaScript
   - Identify large bundles
   - Check for render-blocking scripts

**Common Causes & Fixes:**

1. **Large JavaScript Bundle:**
   - **Cause:** New dependency or code split issue
   - **Fix:** Code splitting, tree shaking, lazy loading
   - **Check:** Bundle analyzer to see what's large

2. **Render-Blocking Resources:**
   - **Cause:** CSS or JS blocking render
   - **Fix:** Inline critical CSS, defer non-critical JS
   - **Check:** Coverage tab, render-blocking resources

3. **Large Images:**
   - **Cause:** Unoptimized images added
   - **Fix:** Compress, use WebP, lazy load
   - **Check:** Network tab for image sizes

4. **Third-Party Scripts:**
   - **Cause:** New analytics, ads, or widgets
   - **Fix:** Defer, async, or lazy load
   - **Check:** Third-party summary in Lighthouse

5. **Font Loading:**
   - **Cause:** Fonts blocking render
   - **Fix:** Preload, font-display: swap
   - **Check:** Font display timing

**Action Plan:**
1. Fix largest impact issues first
2. Set performance budgets
3. Add to CI/CD pipeline
4. Monitor in production
</expand>

<expand title="Scenario: Your website has a high Cumulative Layout Shift (CLS) score. How would you fix it?">
**Question:** Your website has a high Cumulative Layout Shift (CLS) score. How would you fix it?

**Answer:**
**Common Causes:**
1. Images without dimensions
2. Ads, embeds, or iframes without dimensions
3. Dynamically injected content
4. Web fonts causing FOIT/FOUT
5. Actions that update DOM

**Fixes:**

1. **Images:**
   ```html
   <!-- Always specify width and height -->
   <img src="image.jpg" width="800" height="600" alt="Description" />
   <!-- Or use aspect-ratio in CSS -->
   <img src="image.jpg" style="aspect-ratio: 4/3;" alt="Description" />
   ```

2. **Fonts:**
   ```css
   /* Use font-display: swap to prevent invisible text */
   @font-face {
     font-family: 'MyFont';
     font-display: swap;
   }
   ```

3. **Ads/Embeds:**
   - Reserve space for ads
   - Use aspect-ratio CSS
   - Load ads after content

4. **Dynamic Content:**
   - Reserve space for dynamic content
   - Use skeleton loaders
   - Avoid inserting content above existing content

5. **Animations:**
   - Use transform and opacity (GPU-accelerated)
   - Avoid animating layout properties
   - Use will-change sparingly

**Best Practices:**
- Always set dimensions for media
- Use CSS aspect-ratio
- Preload critical resources
- Test with Lighthouse
- Monitor CLS in production
</expand>

<expand title="Scenario: Your website receives a sudden traffic spike from a viral social media post. How do you ensure it stays online?">
**Question:** Your website receives a sudden traffic spike from a viral social media post. How do you ensure it stays online?

**Answer:**
**Immediate Actions:**

1. **CDN:**
   - Serve all static assets from CDN
   - Cache HTML pages if possible
   - **Impact:** Reduces origin server load by 80-90%

2. **Caching:**
   - Aggressively cache responses
   - Increase cache TTL temporarily
   - Cache database queries
   - **Example:** Cache homepage for 5 minutes

3. **Auto-Scaling:**
   - Trigger aggressive auto-scaling
   - Scale from 5 to 50+ servers
   - Pre-configure scaling policies
   - **Cloud:** AWS Auto Scaling, GCP Managed Instance Groups

4. **Load Balancing:**
   - Distribute traffic across all servers
   - Health checks to remove unhealthy instances
   - Multiple load balancers for redundancy

5. **Optimize Critical Path:**
   - Minimize render-blocking resources
   - Defer non-critical JavaScript
   - Inline critical CSS
   - **Impact:** Faster page loads, less server load

6. **Database Protection:**
   - Use read replicas for database reads
   - Aggressive query caching
   - Connection pooling limits
   - Temporarily disable expensive queries

7. **Rate Limiting:**
   - Implement rate limiting
   - Protect backend from overload
   - Queue requests if needed

**Architecture Patterns:**

1. **Static Site Generation:**
   - Pre-render pages at build time
   - Serve from CDN
   - **Impact:** Minimal server load

2. **Edge Computing:**
   - Run code at edge (Cloudflare Workers, AWS Lambda@Edge)
   - Handle requests closer to users
   - **Impact:** Reduced latency, less origin load

**Monitoring:**
- Real-time dashboards
- Alert on thresholds (CPU > 80%, error rate > 1%)
- Track response times
- Monitor CDN cache hit rates

**Prevention:**
- Load testing before launch
- Capacity planning
- Auto-scaling policies
- CDN for all static content
</expand>

<expand title="Scenario: You need to optimize a website that has 50+ third-party scripts. How would you approach this?">
**Question:** You need to optimize a website that has 50+ third-party scripts. How would you approach this?

**Answer:**
**Assessment:**
1. **Audit all scripts:** Identify what each script does and if it's necessary.

2. **Measure impact:** Use Lighthouse and Network tab to see load times and blocking behavior.

3. **Categorize:**
   - Critical (analytics, authentication)
   - Important (ads, social widgets)
   - Nice-to-have (chat widgets, tracking)

**Optimization Strategies:**

1. **Remove Unnecessary Scripts:**
   - Remove unused scripts
   - Consolidate similar functionality
   - Use native alternatives when possible

2. **Defer/Async:**
   ```html
   <!-- Non-critical scripts -->
   <script src="analytics.js" defer></script>
   <script src="chat.js" async></script>
   ```

3. **Lazy Load:**
   - Load scripts when needed
   - Use Intersection Observer
   - Load on user interaction
   - **Example:** Load chat widget when user scrolls to bottom

4. **Use Resource Hints:**
   ```html
   <link rel="preconnect" href="https://api.example.com">
   <link rel="dns-prefetch" href="https://cdn.example.com">
   ```

5. **Third-Party Script Manager:**
   - Use tools like Partytown to offload scripts to Web Workers
   - Implement script loading manager
   - Use iframe sandboxing for ads

6. **CDN and Caching:**
   - Use CDN for third-party resources
   - Set proper cache headers
   - Use service workers for offline support

7. **Monitor:**
   - Track script load times
   - Monitor Core Web Vitals
   - Set performance budgets

**Priority:**
Focus on scripts that block rendering first, then optimize others based on impact.
</expand>

<expand title="Scenario: Your website loads slowly on mobile devices but fast on desktop. How would you diagnose and fix this?">
**Question:** Your website loads slowly on mobile devices but fast on desktop. How would you diagnose and fix this?

**Answer:**
**Diagnosis Steps:**
1. **Use Lighthouse Mobile:** Run Lighthouse with mobile throttling to identify issues.

2. **Check Network Tab:** Analyze resource sizes, load times, and waterfall charts with mobile throttling.

3. **Measure Core Web Vitals:** Check LCP, FID, and CLS scores on mobile.

4. **Test on Real Devices:** Use actual mobile devices or device emulation.

5. **Check Resource Prioritization:** Ensure critical resources load first.

**Common Mobile-Specific Issues:**

1. **Large JavaScript Bundles:**
   - Mobile has slower CPU
   - **Fix:** Code splitting, reduce bundle size
   - **Check:** Coverage tab for unused code

2. **Unoptimized Images:**
   - Mobile has slower network
   - **Fix:** Use responsive images, WebP, compress
   - **Check:** Network tab for image sizes

3. **Render-Blocking Resources:**
   - Mobile has slower parsing
   - **Fix:** Inline critical CSS, defer non-critical JS
   - **Check:** Render-blocking resources in Lighthouse

4. **Font Loading:**
   - Mobile has slower network
   - **Fix:** Preload critical fonts, font-display: swap
   - **Check:** Font display timing

5. **Third-Party Scripts:**
   - Mobile has slower CPU and network
   - **Fix:** Defer, async, or lazy load
   - **Check:** Third-party summary

**Mobile-Specific Optimizations:**
- Serve smaller images to mobile (responsive images)
- Reduce JavaScript execution time
- Minimize main thread work
- Use passive event listeners
- Optimize touch interactions

**Monitoring:**
- Set up Real User Monitoring (RUM) for mobile
- Track Core Web Vitals on mobile
- Monitor error rates
- Use performance budgets
</expand>
