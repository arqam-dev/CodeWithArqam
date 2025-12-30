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

<expand title="What is the difference between async and defer in script tags?">
**Question:** What is the difference between async and defer in script tags?

**Answer:**
**No Attribute:**
```html
<script src="script.js"></script>
```
- Blocks HTML parsing
- Downloads and executes immediately
- **Impact:** Slows page load

**Async:**
```html
<script src="script.js" async></script>
```
- Downloads in parallel with HTML parsing
- Executes immediately when downloaded (may interrupt parsing)
- **Use When:** Script doesn't depend on DOM
- **Example:** Analytics, ads

**Defer:**
```html
<script src="script.js" defer></script>
```
- Downloads in parallel with HTML parsing
- Executes after HTML parsing completes
- Maintains execution order
- **Use When:** Script depends on DOM
- **Example:** DOM manipulation scripts

**Comparison:**
- **Async:** Faster execution, may block parsing
- **Defer:** Waits for parsing, maintains order
- **Both:** Download in parallel (non-blocking)

**Best Practice:**
- Use defer for DOM-dependent scripts
- Use async for independent scripts
- Avoid blocking scripts when possible
</expand>

<expand title="How does the browser handle CORS?">
**Question:** How does the browser handle CORS?

**Answer:**
**CORS (Cross-Origin Resource Sharing):** Allows web pages to request resources from different domains.

**Same-Origin Policy:**
- Browser blocks cross-origin requests by default
- Same origin = same protocol, domain, port
- **Example:** `https://example.com` ≠ `https://api.example.com`

**CORS Headers:**

1. **Access-Control-Allow-Origin:**
   ```
   Access-Control-Allow-Origin: https://example.com
   Access-Control-Allow-Origin: *  // Allow all (not recommended)
   ```

2. **Access-Control-Allow-Methods:**
   ```
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   ```

3. **Access-Control-Allow-Headers:**
   ```
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```

4. **Access-Control-Allow-Credentials:**
   ```
   Access-Control-Allow-Credentials: true
   ```

**Preflight Requests:**
- Browser sends OPTIONS request for complex requests
- Server responds with allowed methods/headers
- Actual request sent if allowed

**Common Issues:**
- Missing CORS headers
- Wildcard with credentials
- Preflight failures
- Cached preflight responses

**Best Practices:**
- Configure CORS on server
- Don't use wildcard with credentials
- Set appropriate headers
- Handle preflight requests
</expand>

<expand title="What is the difference between localStorage and sessionStorage?">
**Question:** What is the difference between localStorage and sessionStorage?

**Answer:**
**localStorage:**
- Persists across browser sessions
- Shared across tabs/windows (same origin)
- 5-10MB storage limit
- **Use Case:** User preferences, cached data

**sessionStorage:**
- Cleared when tab/window closes
- Isolated per tab/window
- 5-10MB storage limit
- **Use Case:** Temporary data, form drafts

**API (Same for both):**
```javascript
// Set
localStorage.setItem('key', 'value');
sessionStorage.setItem('key', 'value');

// Get
const value = localStorage.getItem('key');

// Remove
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

**When to Use:**
- **localStorage:** Data that should persist
- **sessionStorage:** Temporary, tab-specific data

**Limitations:**
- Synchronous (blocks main thread)
- String storage only (JSON.stringify needed)
- No expiration mechanism
- Size limits (5-10MB)

**Best Practices:**
- Use for non-sensitive data
- Handle quota exceeded errors
- Use JSON for complex data
- Consider IndexedDB for large data
</expand>

<expand title="How do you optimize images for the web?">
**Question:** How do you optimize images for the web?

**Answer:**
**Optimization Techniques:**

1. **Image Formats:**
   - **WebP:** Modern, 25-35% smaller than JPEG
   - **AVIF:** Newest, 50% smaller than JPEG
   - **JPEG:** Photos, good compression
   - **PNG:** Graphics, transparency
   - **SVG:** Vector graphics, scalable

2. **Responsive Images:**
   ```html
   <img 
     srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
     src="image-800.jpg"
     alt="Description"
   />
   ```

3. **Lazy Loading:**
   ```html
   <img src="image.jpg" loading="lazy" alt="Description" />
   ```
   - Loads when in viewport
   - Reduces initial page load

4. **Compression:**
   - Use tools: TinyPNG, ImageOptim, Squoosh
   - Compress without visible quality loss
   - **Target:** 70-80% size reduction

5. **Dimensions:**
   - Serve appropriately sized images
   - Don't scale large images with CSS
   - Use srcset for different sizes

6. **CDN:**
   - Serve from CDN
   - Automatic optimization
   - **Example:** Cloudinary, Imgix

**Best Practices:**
- Use modern formats (WebP, AVIF)
- Implement responsive images
- Lazy load below-the-fold
- Compress images
- Use CDN for delivery
- Set width/height to prevent CLS
</expand>

<expand title="What is the Critical Rendering Path?">
**Question:** What is the Critical Rendering Path?

**Answer:**
**Critical Rendering Path (CRP):** Sequence of steps browser takes to render a page.

**Steps:**

1. **HTML Parsing:**
   - Parse HTML → DOM tree
   - Incremental parsing
   - Can be blocked by scripts

2. **CSS Parsing:**
   - Parse CSS → CSSOM tree
   - Render-blocking
   - Blocks rendering until complete

3. **Render Tree:**
   - Combine DOM + CSSOM
   - Only visible elements
   - Excludes hidden elements

4. **Layout (Reflow):**
   - Calculate positions and sizes
   - Determines where elements go
   - Can be expensive

5. **Paint:**
   - Fill pixels
   - Draw visual representation
   - Multiple layers

6. **Composite:**
   - Layer elements
   - Final image to screen
   - GPU-accelerated

**Optimization:**
- Minimize render-blocking resources
- Inline critical CSS
- Defer non-critical CSS
- Use async/defer for scripts
- Optimize images
- Reduce DOM complexity

**Metrics:**
- **FCP (First Contentful Paint):** First content appears
- **LCP (Largest Contentful Paint):** Largest element visible
- **TTI (Time to Interactive):** Page fully interactive

**Goal:** Minimize time to FCP and LCP.
</expand>

<expand title="How do you handle browser compatibility issues?">
**Question:** How do you handle browser compatibility issues?

**Answer:**
**Strategies:**

1. **Polyfills:**
   ```javascript
   // Add missing features
   if (!Array.prototype.includes) {
     Array.prototype.includes = function(item) {
       return this.indexOf(item) !== -1;
     };
   }
   ```
   - Add missing features
   - Use libraries: core-js, polyfill.io

2. **Feature Detection:**
   ```javascript
   if ('serviceWorker' in navigator) {
     // Use service worker
   } else {
     // Fallback
   }
   ```
   - Check if feature exists
   - Provide fallbacks

3. **Transpilation:**
   - Babel converts modern JS to older syntax
   - Supports older browsers
   - **Example:** ES6+ → ES5

4. **CSS Prefixes:**
   ```css
   .box {
     -webkit-transform: rotate(45deg);
     -moz-transform: rotate(45deg);
     transform: rotate(45deg);
   }
   ```
   - Autoprefixer adds prefixes automatically

5. **Browser Testing:**
   - Test on multiple browsers
   - Use BrowserStack, Sauce Labs
   - Test on real devices

6. **Progressive Enhancement:**
   - Build for basic functionality first
   - Add enhancements for modern browsers
   - Graceful degradation

**Tools:**
- Babel (JavaScript transpilation)
- Autoprefixer (CSS prefixes)
- Can I Use (feature support)
- BrowserStack (testing)

**Best Practices:**
- Define browser support policy
- Use feature detection
- Provide fallbacks
- Test on target browsers
- Use progressive enhancement
</expand>

<expand title="What is the difference between cookies and localStorage?">
**Question:** What is the difference between cookies and localStorage?

**Answer:**
**Cookies:**
- Sent with every HTTP request
- 4KB size limit
- Can be set with expiration
- Accessible on server
- **Use Case:** Authentication, server-side data

**localStorage:**
- Not sent with requests
- 5-10MB size limit
- Persists until cleared
- Client-side only
- **Use Case:** Client-side data, preferences

**Comparison:**

| Feature | Cookies | localStorage |
|---------|---------|-------------|
| Size | 4KB | 5-10MB |
| Sent to Server | Yes | No |
| Expiration | Yes | No |
| Access | Client + Server | Client only |
| Blocking | Can block requests | Non-blocking |

**When to Use:**
- **Cookies:** Authentication tokens, server needs data
- **localStorage:** User preferences, client-side cache

**Security:**
- Cookies: HttpOnly, Secure flags
- localStorage: XSS vulnerable
- Both: Don't store sensitive data

**Best Practices:**
- Use cookies for authentication
- Use localStorage for client data
- Set HttpOnly on sensitive cookies
- Use Secure flag for HTTPS
</expand>

<expand title="How do you implement code splitting in a React application?">
**Question:** How do you implement code splitting in a React application?

**Answer:**
**Code Splitting:** Split code into smaller chunks, load on demand.

**React.lazy() and Suspense:**
```javascript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

**Route-Based Splitting:**
```javascript
import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**Webpack Dynamic Imports:**
```javascript
// Manual code splitting
import('./module').then(module => {
  module.doSomething();
});
```

**Benefits:**
- Smaller initial bundle
- Faster initial load
- Load code when needed
- Better performance

**Best Practices:**
- Split by routes
- Split large components
- Use Suspense for loading states
- Monitor bundle sizes
- Use React.lazy() for components
</expand>

<expand title="What is the difference between SSR and CSR?">
**Question:** What is the difference between SSR and CSR?

**Answer:**
**SSR (Server-Side Rendering):**
- HTML generated on server
- Sent to browser as complete HTML
- Faster initial load
- Better SEO
- **Example:** Next.js, Nuxt.js

**CSR (Client-Side Rendering):**
- HTML generated in browser
- JavaScript fetches data and renders
- Slower initial load
- SEO challenges
- **Example:** React, Vue (SPA)

**Comparison:**

| Feature | SSR | CSR |
|---------|-----|-----|
| Initial Load | Fast | Slow |
| SEO | Good | Poor |
| Interactivity | Slower | Faster |
| Server Load | High | Low |
| Caching | Difficult | Easy |

**SSR Flow:**
```
Server → Generate HTML → Send to Browser → Hydrate with JS
```

**CSR Flow:**
```
Server → Send HTML shell → Browser → Fetch Data → Render
```

**When to Use:**
- **SSR:** SEO important, fast initial load needed
- **CSR:** Interactive apps, SEO not critical

**Hybrid (SSG + CSR):**
- Pre-render static pages (SSG)
- Client-side for dynamic content (CSR)
- **Example:** Next.js static generation + client-side routing
</expand>

<expand title="How do you optimize bundle size in a JavaScript application?">
**Question:** How do you optimize bundle size in a JavaScript application?

**Answer:**
**Optimization Techniques:**

1. **Code Splitting:**
   - Split code into chunks
   - Load on demand
   - **Impact:** Smaller initial bundle

2. **Tree Shaking:**
   - Remove unused code
   - **Example:** Import only used functions
   ```javascript
   // Bad
   import * as utils from './utils';
   
   // Good
   import { specificFunction } from './utils';
   ```

3. **Minification:**
   - Remove whitespace, comments
   - Shorten variable names
   - **Tools:** Terser, UglifyJS

4. **Compression:**
   - Gzip or Brotli compression
   - **Impact:** 70-90% size reduction

5. **Remove Unused Dependencies:**
   - Audit dependencies
   - Remove unused packages
   - **Tool:** npm-check-unused

6. **Use Dynamic Imports:**
   ```javascript
   // Load only when needed
   const module = await import('./heavy-module');
   ```

7. **Optimize Dependencies:**
   - Use lighter alternatives
   - **Example:** date-fns instead of moment.js

8. **Bundle Analysis:**
   - Analyze bundle composition
   - **Tools:** webpack-bundle-analyzer, source-map-explorer

**Best Practices:**
- Code split by routes
- Tree shake unused code
- Minify and compress
- Monitor bundle size
- Use bundle analyzer
- Set performance budgets
</expand>

<expand title="What is the difference between let, const, and var?">
**Question:** What is the difference between let, const, and var?

**Answer:**
**var:**
- Function-scoped
- Hoisted (undefined before declaration)
- Can be redeclared
- **Example:** Available in entire function

**let:**
- Block-scoped
- Not hoisted (TDZ - Temporal Dead Zone)
- Cannot be redeclared
- Can be reassigned
- **Example:** Available only in block

**const:**
- Block-scoped
- Not hoisted (TDZ)
- Cannot be redeclared
- Cannot be reassigned
- **Example:** Constant value

**Examples:**
```javascript
// var
function example() {
  console.log(x); // undefined (hoisted)
  var x = 1;
  var x = 2; // OK - redeclared
}

// let
{
  console.log(x); // ReferenceError (TDZ)
  let x = 1;
  let x = 2; // SyntaxError - cannot redeclare
}

// const
const x = 1;
x = 2; // TypeError - cannot reassign
const obj = {};
obj.prop = 1; // OK - object is mutable
```

**Best Practices:**
- Use const by default
- Use let when reassignment needed
- Avoid var
- Prefer block scope
</expand>

<expand title="How do you handle state management in a large React application?">
**Question:** How do you handle state management in a large React application?

**Answer:**
**State Management Options:**

1. **React Context:**
   ```javascript
   const ThemeContext = createContext();
   
   function App() {
     return (
       <ThemeContext.Provider value="dark">
         <Component />
       </ThemeContext.Provider>
     );
   }
   ```
   - Good for theme, user data
   - Can cause re-renders
   - **Use When:** Simple global state

2. **Redux:**
   - Centralized state store
   - Predictable state updates
   - DevTools support
   - **Use When:** Complex state, time travel needed

3. **Zustand:**
   - Lightweight
   - Simple API
   - **Use When:** Need simplicity

4. **Recoil:**
   - Facebook's state management
   - Atom-based
   - **Use When:** Complex derived state

5. **Local State:**
   - useState, useReducer
   - **Use When:** Component-specific state

**Best Practices:**
- Start with local state
- Use Context for simple global state
- Use Redux/Zustand for complex state
- Keep state close to where it's used
- Avoid prop drilling
- Normalize state structure

**When to Use What:**
- **Local State:** Component-specific
- **Context:** Simple global state (theme, user)
- **Redux:** Complex state, multiple sources
- **Zustand:** Simpler alternative to Redux
</expand>

<expand title="What is the event loop in JavaScript?">
**Question:** What is the event loop in JavaScript?

**Answer:**
**Event Loop:** JavaScript's mechanism for handling asynchronous operations.

**Components:**

1. **Call Stack:**
   - Executes synchronous code
   - LIFO (Last In, First Out)
   - **Example:** Function calls

2. **Web APIs:**
   - Browser APIs (setTimeout, fetch)
   - Run asynchronously
   - **Example:** Timer, network requests

3. **Callback Queue:**
   - Stores callbacks from Web APIs
   - FIFO (First In, First Out)
   - **Example:** setTimeout callbacks

4. **Microtask Queue:**
   - Higher priority than callback queue
   - **Example:** Promise callbacks, queueMicrotask

**How It Works:**
```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2
// Call stack → Microtasks → Callback queue
```

**Execution Order:**
1. Execute call stack
2. Process microtask queue
3. Process callback queue
4. Repeat

**Best Practices:**
- Understand execution order
- Use Promises for async operations
- Avoid blocking call stack
- Use async/await for readability
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

<expand title="Scenario: Your React app is experiencing memory leaks. How would you identify and fix them?">
**Question:** Your React app is experiencing memory leaks. How would you identify and fix them?

**Answer:**
**Common Causes:**

1. **Event Listeners:**
   ```javascript
   // Bad - not cleaned up
   useEffect(() => {
     window.addEventListener('scroll', handleScroll);
   }, []);
   
   // Good - cleaned up
   useEffect(() => {
     window.addEventListener('scroll', handleScroll);
     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, []);
   ```

2. **Subscriptions:**
   ```javascript
   // Bad
   useEffect(() => {
     const subscription = observable.subscribe();
   }, []);
   
   // Good
   useEffect(() => {
     const subscription = observable.subscribe();
     return () => subscription.unsubscribe();
   }, []);
   ```

3. **Timers:**
   ```javascript
   // Bad
   useEffect(() => {
     setInterval(() => {}, 1000);
   }, []);
   
   // Good
   useEffect(() => {
     const timer = setInterval(() => {}, 1000);
     return () => clearInterval(timer);
   }, []);
   ```

4. **Closures:**
   - Variables captured in closures
   - Keep references to large objects
   - **Fix:** Avoid unnecessary closures

**Identification:**
- Chrome DevTools Memory Profiler
- Performance tab
- Check for growing memory
- Monitor component unmounts

**Best Practices:**
- Clean up in useEffect return
- Remove event listeners
- Cancel subscriptions
- Clear timers
- Avoid memory leaks in closures
</expand>

<expand title="Scenario: Your website has poor SEO. How would you improve it?">
**Question:** Your website has poor SEO. How would you improve it?

**Answer:**
**SEO Improvements:**

1. **Meta Tags:**
   ```html
   <title>Page Title</title>
   <meta name="description" content="Page description">
   <meta name="keywords" content="relevant, keywords">
   ```

2. **Semantic HTML:**
   ```html
   <header>
     <nav>
       <h1>Site Title</h1>
     </nav>
   </header>
   <main>
     <article>
       <h2>Article Title</h2>
     </article>
   </main>
   ```

3. **Alt Text:**
   ```html
   <img src="image.jpg" alt="Descriptive alt text">
   ```

4. **Structured Data:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Article",
     "headline": "Article Title"
   }
   ```

5. **URL Structure:**
   - Clean, descriptive URLs
   - Use keywords
   - **Example:** `/blog/seo-tips` not `/p/123`

6. **Internal Linking:**
   - Link related content
   - Use descriptive anchor text
   - Create sitemap

7. **Performance:**
   - Fast page loads
   - Mobile-friendly
   - Core Web Vitals

8. **Content:**
   - Quality, relevant content
   - Proper heading hierarchy
   - Keyword optimization

**Tools:**
- Google Search Console
- Lighthouse
- Schema.org validator

**Best Practices:**
- Use semantic HTML
- Optimize meta tags
- Improve performance
- Add structured data
- Create quality content
</expand>

<expand title="Scenario: Your website needs to work offline. How would you implement this?">
**Question:** Your website needs to work offline. How would you implement this?

**Answer:**
**Service Workers:**

1. **Register Service Worker:**
   ```javascript
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

2. **Cache Strategy:**
   ```javascript
   // Cache-first strategy
   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request).then((response) => {
         return response || fetch(event.request);
       })
     );
   });
   ```

3. **Cache Assets:**
   ```javascript
   // Cache on install
   self.addEventListener('install', (event) => {
     event.waitUntil(
       caches.open('v1').then((cache) => {
         return cache.addAll([
           '/',
           '/styles.css',
           '/app.js'
         ]);
       })
     );
   });
   ```

4. **IndexedDB:**
   - Store data for offline use
   - Sync when online
   - **Example:** User data, form submissions

5. **Offline Detection:**
   ```javascript
   window.addEventListener('online', () => {
     // Sync data
   });
   
   window.addEventListener('offline', () => {
     // Show offline message
   });
   ```

**Strategies:**
- **Cache-first:** Serve from cache, fallback to network
- **Network-first:** Try network, fallback to cache
- **Stale-while-revalidate:** Serve cache, update in background

**Best Practices:**
- Cache critical assets
- Store user data in IndexedDB
- Show offline indicator
- Sync when online
- Handle offline gracefully
</expand>

<expand title="Scenario: Your website has accessibility issues. How would you fix them?">
**Question:** Your website has accessibility issues. How would you fix them?

**Answer:**
**Common Issues & Fixes:**

1. **Missing Alt Text:**
   ```html
   <!-- Bad -->
   <img src="image.jpg">
   
   <!-- Good -->
   <img src="image.jpg" alt="Description of image">
   ```

2. **Poor Color Contrast:**
   - Use sufficient contrast ratios
   - WCAG AA: 4.5:1 for text
   - **Tool:** WebAIM Contrast Checker

3. **Keyboard Navigation:**
   ```css
   /* Ensure focusable elements are visible */
   *:focus {
     outline: 2px solid blue;
   }
   ```

4. **ARIA Labels:**
   ```html
   <button aria-label="Close dialog">×</button>
   <nav aria-label="Main navigation">
   ```

5. **Semantic HTML:**
   ```html
   <!-- Bad -->
   <div onclick="...">Button</div>
   
   <!-- Good -->
   <button>Button</button>
   ```

6. **Form Labels:**
   ```html
   <!-- Bad -->
   <input type="text">
   
   <!-- Good -->
   <label for="email">Email</label>
   <input type="email" id="email">
   ```

7. **Heading Hierarchy:**
   ```html
   <h1>Main Title</h1>
   <h2>Section Title</h2>
   <h3>Subsection Title</h3>
   ```

**Testing:**
- Screen readers (NVDA, JAWS)
- Keyboard navigation
- Lighthouse accessibility audit
- axe DevTools

**Best Practices:**
- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast
- Provide text alternatives
</expand>

<expand title="Scenario: Your website needs to support multiple languages. How would you implement internationalization?">
**Question:** Your website needs to support multiple languages. How would you implement internationalization?

**Answer:**
**Implementation:**

1. **i18n Libraries:**
   - React: react-i18next
   - Vue: vue-i18n
   - Angular: @angular/localize

2. **Translation Files:**
   ```json
   // en.json
   {
     "welcome": "Welcome",
     "button": {
       "submit": "Submit",
       "cancel": "Cancel"
     }
   }
   
   // es.json
   {
     "welcome": "Bienvenido",
     "button": {
       "submit": "Enviar",
       "cancel": "Cancelar"
     }
   }
   ```

3. **Usage:**
   ```javascript
   import { useTranslation } from 'react-i18next';
   
   function Component() {
     const { t } = useTranslation();
     return <h1>{t('welcome')}</h1>;
   }
   ```

4. **Language Detection:**
   ```javascript
   // Detect from browser
   const language = navigator.language;
   
   // Store user preference
   localStorage.setItem('language', 'en');
   ```

5. **URL Structure:**
   ```
   /en/about
   /es/about
   /fr/about
   ```

6. **Date/Number Formatting:**
   ```javascript
   const date = new Intl.DateTimeFormat('en-US').format(new Date());
   const number = new Intl.NumberFormat('en-US').format(1234.56);
   ```

**Best Practices:**
- Use i18n libraries
- Organize translation files
- Handle pluralization
- Format dates/numbers
- Test all languages
- Consider RTL languages
</expand>

<expand title="Scenario: Your website's forms are not user-friendly. How would you improve them?">
**Question:** Your website's forms are not user-friendly. How would you improve them?

**Answer:**
**Improvements:**

1. **Clear Labels:**
   ```html
   <label for="email">Email Address</label>
   <input type="email" id="email" required>
   ```

2. **Inline Validation:**
   ```javascript
   // Show errors as user types
   <input 
     type="email" 
     onBlur={validateEmail}
     aria-invalid={hasError}
     aria-describedby="email-error"
   />
   {hasError && <span id="email-error">Invalid email</span>}
   ```

3. **Progress Indicators:**
   - Show form progress
   - Multi-step forms
   - **Example:** "Step 2 of 4"

4. **Autocomplete:**
   ```html
   <input 
     type="text" 
     autocomplete="name"
     autocomplete="email"
   >
   ```

5. **Helpful Placeholders:**
   ```html
   <input 
     type="text" 
     placeholder="Enter your full name"
   >
   ```

6. **Error Messages:**
   - Clear, actionable errors
   - Show near field
   - Use icons/colors

7. **Mobile Optimization:**
   - Large tap targets
   - Appropriate input types
   - **Example:** `type="tel"` for phone

8. **Save Progress:**
   - Auto-save drafts
   - localStorage
   - Resume later

**Best Practices:**
- Clear labels and placeholders
- Inline validation
- Helpful error messages
- Mobile-friendly
- Save progress
- Show required fields
</expand>

<expand title="Scenario: Your website needs to handle large datasets efficiently. How would you implement virtualization?">
**Question:** Your website needs to handle large datasets efficiently. How would you implement virtualization?

**Answer:**
**Virtualization:** Render only visible items, not entire list.

**React Virtualization Libraries:**
- react-window
- react-virtualized
- @tanstack/react-virtual

**Example with react-window:**
```javascript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**Benefits:**
- Render only visible items
- Handle thousands of items
- Better performance
- Lower memory usage

**When to Use:**
- Large lists (1000+ items)
- Tables with many rows
- Long scrollable content

**Best Practices:**
- Use virtualization for large lists
- Estimate item heights
- Handle dynamic heights
- Optimize item rendering
- Use windowing libraries
</expand>

<expand title="Scenario: Your website needs real-time updates. How would you implement this?">
**Question:** Your website needs real-time updates. How would you implement this?

**Answer:**
**Options:**

1. **WebSockets:**
   ```javascript
   const ws = new WebSocket('wss://api.example.com');
   
   ws.onmessage = (event) => {
     const data = JSON.parse(event.data);
     updateUI(data);
   };
   
   ws.send(JSON.stringify({ type: 'subscribe' }));
   ```
   - Bidirectional
   - Low latency
   - Persistent connection

2. **Server-Sent Events (SSE):**
   ```javascript
   const eventSource = new EventSource('/api/events');
   
   eventSource.onmessage = (event) => {
     const data = JSON.parse(event.data);
     updateUI(data);
   };
   ```
   - One-way (server to client)
   - Simpler than WebSockets
   - Good for notifications

3. **Polling:**
   ```javascript
   setInterval(async () => {
     const updates = await fetch('/api/updates');
     const data = await updates.json();
     updateUI(data);
   }, 5000);
   ```
   - Simple
   - Higher latency
   - More server load

4. **Long Polling:**
   - Server holds request until update
   - More efficient than polling
   - Still uses HTTP

**Best Practices:**
- Use WebSockets for bidirectional
- Use SSE for server-to-client
- Handle reconnections
- Implement heartbeat
- Handle connection failures
</expand>

<expand title="Scenario: Your website has security vulnerabilities. How would you secure it?">
**Question:** Your website has security vulnerabilities. How would you secure it?

**Answer:**
**Security Measures:**

1. **XSS Prevention:**
   ```javascript
   // Sanitize user input
   import DOMPurify from 'dompurify';
   const clean = DOMPurify.sanitize(userInput);
   ```
   - Escape user input
   - Use Content Security Policy
   - Avoid innerHTML with user data

2. **CSRF Protection:**
   ```javascript
   // Use CSRF tokens
   const token = document.querySelector('meta[name="csrf-token"]').content;
   fetch('/api/data', {
     headers: { 'X-CSRF-Token': token }
   });
   ```

3. **HTTPS:**
   - Encrypt all traffic
   - Use TLS 1.2+
   - HSTS headers

4. **Content Security Policy:**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self'">
   ```

5. **Input Validation:**
   - Validate on client and server
   - Sanitize inputs
   - Use parameterized queries

6. **Authentication:**
   - Secure password storage (hashing)
   - JWT tokens
   - Session management

7. **Dependencies:**
   - Keep updated
   - Scan for vulnerabilities
   - Use npm audit

**Best Practices:**
- Sanitize user input
- Use HTTPS
- Implement CSP
- Validate inputs
- Keep dependencies updated
- Use secure authentication
</expand>

<expand title="Scenario: Your website needs to support dark mode. How would you implement it?">
**Question:** Your website needs to support dark mode. How would you implement it?

**Answer:**
**Implementation:**

1. **CSS Variables:**
   ```css
   :root {
     --bg-color: #ffffff;
     --text-color: #000000;
   }
   
   [data-theme="dark"] {
     --bg-color: #1a1a1a;
     --text-color: #ffffff;
   }
   
   body {
     background-color: var(--bg-color);
     color: var(--text-color);
   }
   ```

2. **Toggle Theme:**
   ```javascript
   function toggleTheme() {
     const current = document.documentElement.getAttribute('data-theme');
     const newTheme = current === 'dark' ? 'light' : 'dark';
     document.documentElement.setAttribute('data-theme', newTheme);
     localStorage.setItem('theme', newTheme);
   }
   ```

3. **System Preference:**
   ```javascript
   // Detect system preference
   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
   
   if (prefersDark.matches) {
     document.documentElement.setAttribute('data-theme', 'dark');
   }
   ```

4. **Persist Preference:**
   ```javascript
   // Load saved preference
   const savedTheme = localStorage.getItem('theme') || 
                      (prefersDark.matches ? 'dark' : 'light');
   document.documentElement.setAttribute('data-theme', savedTheme);
   ```

**Best Practices:**
- Use CSS variables
- Support system preference
- Persist user choice
- Smooth transitions
- Test both themes
- Consider accessibility
</expand>
