# Frontend Interview Questions

## General Questions & Answers

<expand title="What is the difference between HTTP/1.1 and HTTP/2?">
**Question:** What is the difference between HTTP/1.1 and HTTP/2?

**Answer:**
HTTP/2 is a major revision of HTTP/1.1 that improves performance and efficiency. Key differences include:

1. **Multiplexing:** HTTP/2 allows multiple requests and responses to be sent simultaneously over a single connection, while HTTP/1.1 requires separate connections for each request.

2. **Header Compression:** HTTP/2 uses HPACK compression to reduce header overhead, making requests more efficient.

3. **Server Push:** HTTP/2 allows servers to proactively send resources to clients before they're requested.

4. **Binary Protocol:** HTTP/2 uses binary framing instead of text-based protocol, making it more efficient to parse.

5. **Stream Prioritization:** HTTP/2 allows prioritization of requests, ensuring critical resources load first.

These improvements result in faster page loads, especially for sites with many resources.
</expand>

<expand title="Explain the browser rendering process">
**Question:** Explain the browser rendering process.

**Answer:**
The browser rendering process involves several steps:

1. **HTML Parsing:** Browser parses HTML to create the DOM (Document Object Model) tree.

2. **CSS Parsing:** Browser parses CSS to create the CSSOM (CSS Object Model) tree.

3. **Render Tree Construction:** Browser combines DOM and CSSOM to create the render tree, which contains only visible elements.

4. **Layout (Reflow):** Browser calculates the position and size of each element in the render tree.

5. **Paint:** Browser fills in pixels for each element based on styles and layout.

6. **Composite:** Browser layers elements and composites them into the final image.

The browser optimizes this process by:
- Parsing HTML incrementally
- Using separate threads for parsing and rendering
- Caching resources
- Using GPU acceleration for compositing

Understanding this process helps optimize web performance.
</expand>

<expand title="What is Critical Rendering Path?">
**Question:** What is Critical Rendering Path?

**Answer:**
The Critical Rendering Path (CRP) is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on the screen. Optimizing CRP is crucial for fast page loads.

**Key steps:**
1. **DOM:** Parse HTML → DOM tree
2. **CSSOM:** Parse CSS → CSSOM tree
3. **Render Tree:** Combine DOM + CSSOM
4. **Layout:** Calculate positions and sizes
5. **Paint:** Fill pixels
6. **Composite:** Layer and display

**Optimization techniques:**
- Minimize render-blocking resources
- Defer non-critical CSS
- Minimize JavaScript execution time
- Use async/defer for scripts
- Optimize images and fonts
- Reduce DOM complexity

The goal is to minimize the time to First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
</expand>

<expand title="What is Lighthouse and what metrics does it measure?">
**Question:** What is Lighthouse and what metrics does it measure?

**Answer:**
Lighthouse is an open-source tool by Google that audits web pages for performance, accessibility, SEO, and best practices. It provides scores and recommendations.

**Core Web Vitals (Performance Metrics):**
1. **LCP (Largest Contentful Paint):** Measures loading performance. Should be under 2.5 seconds.

2. **FID (First Input Delay):** Measures interactivity. Should be under 100 milliseconds.

3. **CLS (Cumulative Layout Shift):** Measures visual stability. Should be under 0.1.

**Other Metrics:**
- **FCP (First Contentful Paint):** Time until first content appears
- **TTI (Time to Interactive):** Time until page is fully interactive
- **TBT (Total Blocking Time):** Total time page is blocked from responding
- **Speed Index:** How quickly content is visually displayed

**Categories:**
- Performance (0-100 score)
- Accessibility (0-100 score)
- Best Practices (0-100 score)
- SEO (0-100 score)

Lighthouse helps identify performance bottlenecks and provides actionable recommendations.
</expand>

<expand title="How does browser caching work?">
**Question:** How does browser caching work?

**Answer:**
Browser caching stores resources locally to reduce server requests and improve performance.

**Types of Caching:**
1. **Memory Cache:** Fastest, stores resources in RAM. Cleared when tab closes.

2. **Disk Cache:** Persistent storage on disk. Survives browser restarts.

3. **Service Worker Cache:** Programmatic caching controlled by JavaScript.

**Cache Headers:**
- **Cache-Control:** Controls caching behavior (max-age, no-cache, no-store, etc.)
- **ETag:** Entity tag for cache validation
- **Last-Modified:** Timestamp for validation
- **Expires:** Absolute expiration date

**Cache Strategies:**
- **Cache-First:** Serve from cache, fallback to network
- **Network-First:** Try network, fallback to cache
- **Stale-While-Revalidate:** Serve cache immediately, update in background

**Benefits:**
- Faster page loads
- Reduced server load
- Better user experience
- Lower bandwidth usage

Proper cache configuration is essential for web performance.
</expand>

## Scenario-Based Questions & Answers

<expand title="Scenario: A user reports that your website loads slowly on mobile devices. How would you diagnose and fix this?">
**Question:** A user reports that your website loads slowly on mobile devices. How would you diagnose and fix this?

**Answer:**
**Diagnosis Steps:**
1. **Use Lighthouse Mobile:** Run Lighthouse with mobile throttling to identify issues.

2. **Check Network Tab:** Analyze resource sizes, load times, and waterfall charts.

3. **Measure Core Web Vitals:** Check LCP, FID, and CLS scores.

4. **Test on Real Devices:** Use actual mobile devices or device emulation.

5. **Check Resource Prioritization:** Ensure critical resources load first.

**Common Fixes:**
1. **Image Optimization:**
   - Use WebP format
   - Implement lazy loading
   - Serve responsive images
   - Compress images

2. **JavaScript Optimization:**
   - Code splitting
   - Tree shaking
   - Minification
   - Defer non-critical scripts

3. **CSS Optimization:**
   - Remove unused CSS
   - Inline critical CSS
   - Defer non-critical CSS

4. **Font Optimization:**
   - Use font-display: swap
   - Preload critical fonts
   - Subset fonts

5. **Caching:**
   - Set proper cache headers
   - Use CDN
   - Implement service workers

6. **Reduce Render-Blocking:**
   - Minimize render-blocking resources
   - Use async/defer for scripts
   - Optimize third-party scripts

**Monitoring:**
- Set up Real User Monitoring (RUM)
- Track Core Web Vitals
- Monitor error rates
- Use performance budgets
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

