# Next.js

<expand title="Version History">
## Version History (Main Versions)

- Next.js 1.0 - 2016
- Next.js 2.0 - 2017
- Next.js 3.0 - 2017
- Next.js 4.0 - 2017
- Next.js 5.0 - 2018
- Next.js 6.0 - 2018
- Next.js 7.0 - 2018
- Next.js 8.0 - 2019
- Next.js 9.0 - 2019
- Next.js 10.0 - 2020
- Next.js 11.0 - 2021
- Next.js 12.0 - 2021
- Next.js 13.0 - 2022 (App Router introduced)
- Next.js 14.0 - 2023
- Next.js 15.0 - 2024
</expand>

<expand title="Introduction & Overview">
## Introduction & Overview

Next.js is a React framework for building full-stack web applications. It provides production-ready features out of the box.

### Key Features:
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- Client-Side Rendering (CSR)
- API Routes (backend functionality)
- File-based routing
- Automatic code splitting
- Image optimization
- Built-in CSS support
- TypeScript support

### What Next.js Solves:
- SEO issues in Client-Side Rendering (CSR)
- Performance optimization
- Full-stack development in one framework
- Production-ready configurations
- Developer experience improvements
</expand>

<expand title="App Router vs Pages Router">
## App Router vs Pages Router

### What They Are:

**Pages Router (Legacy - Next.js 1-12):**
- The original routing system in Next.js
- Uses a `pages/` folder in your project root
- Each file in `pages/` automatically becomes a route
- Files are React components that export as pages
- Uses special functions like `getServerSideProps` and `getStaticProps` for data fetching

**App Router (Next.js 13+):**
- The new routing system introduced in Next.js 13
- Uses an `app/` folder instead of `pages/`
- More structured: each route needs a `page.js` file inside a folder
- Uses Server Components by default (better performance)
- Built-in support for layouts, loading states, and error handling

### Key Differences:

**Directory:**
- Pages Router: Uses `pages/` folder
- App Router: Uses `app/` folder

**File Structure:**
- Pages Router: `pages/about.js` → `/about`
- App Router: `app/about/page.js` → `/about`

**Home Page:**
- Pages Router: `pages/index.js`
- App Router: `app/page.js`

**Data Fetching:**
- Pages Router: Uses `getServerSideProps`, `getStaticProps`
- App Router: Direct `async/await` in components

**Components:**
- Pages Router: All Client Components
- App Router: Server Components by default

**Layouts:**
- Pages Router: Custom `_app.js`
- App Router: Built-in `layout.js` files

**Loading States:**
- Pages Router: Manual implementation
- App Router: Built-in `loading.js`

**Error Handling:**
- Pages Router: Manual implementation
- App Router: Built-in `error.js`

### When to Use:
- **Pages Router:** Existing projects, simpler routing needs, legacy codebase
- **App Router:** New projects, need Server Components, better performance, modern React features
</expand>

<expand title="Server Components vs Client Components">
## Server Components vs Client Components

### Server Components (Default):
- Render on server only
- No JavaScript sent to client
- Can directly access backend resources
- Cannot use browser APIs
- Cannot use React hooks (useState, useEffect)
- Better performance and SEO
- Reduced bundle size

### Client Components:
- Render on client (browser)
- Must use `'use client'` directive
- Can use browser APIs
- Can use React hooks
- Interactive components
- Larger bundle size

### When to Use:
- **Server Components:** Static content, data fetching, SEO-critical pages
- **Client Components:** Interactive UI, browser APIs, state management
</expand>

<expand title="Routing">
## Routing

### App Router Structure:
- `app/page.js` → Home page (`/`)
- `app/about/page.js` → `/about`
- `app/blog/[id]/page.js` → Dynamic route `/blog/:id`
- `app/shop/[...slug]/page.js` → Catch-all route
- `app/docs/[[...slug]]/page.js` → Optional catch-all

### Route Groups:
- `app/(marketing)/about/page.js` → `/about` (group name not in URL)
- `app/(shop)/products/page.js` → `/products`

### Layouts:
- `app/layout.js` → Root layout (wraps all pages)
- `app/dashboard/layout.js` → Layout for dashboard routes

### Loading & Error:
- `app/loading.js` → Loading UI
- `app/error.js` → Error UI
- `app/not-found.js` → 404 page
</expand>

<expand title="Data Fetching">
## Data Fetching

### Server Components (App Router):
- Direct async/await in components
- Fetch requests are automatically cached
- Revalidate for ISR

### Pages Router Methods:
- `getServerSideProps` → Server-side rendering (runs on every request)
- `getStaticProps` → Static generation (runs at build time)
- `getStaticPaths` → Dynamic routes for static generation

### Fetch Options:
- `cache: 'force-cache'` → Default, cached indefinitely
- `cache: 'no-store'` → Always fetch fresh data
- `next: { revalidate: 60 }` → Revalidate every 60 seconds (ISR)
</expand>

<expand title="Rendering Methods">
## Rendering Methods

Next.js offers four rendering strategies. Understanding when to use each is crucial for building performant applications.

### What is Rendering?
Rendering is the process of converting React components into HTML that browsers can display. The **when** and **where** this happens determines the rendering method.

---

### 1. Static Site Generation (SSG)

**What it is:**
- Pages are pre-rendered at **build time** (when you run `next build`)
- HTML is generated once and stored as static files
- Same HTML is served to all users

**How it works:**
1. During build: Next.js runs your component code on the server
2. Generates HTML files for each page
3. Stores these HTML files
4. When user visits: Serves the pre-built HTML instantly

**Characteristics:**
- ✅ Fastest performance (HTML already ready)
- ✅ Best SEO (content in HTML source)
- ✅ Works without server (can use CDN)
- ✅ Lowest server costs
- ❌ Content is static until next build
- ❌ Must rebuild to update content

**When to use:**
- Blog posts and articles
- Documentation sites
- Marketing/landing pages
- Product catalogs (if products don't change often)
- Any content that doesn't change frequently

**Example scenario:**
A blog post about "JavaScript Basics" doesn't change daily. Generate it once at build time, serve the same HTML to everyone.

---

### 2. Server-Side Rendering (SSR)

**What it is:**
- Pages are generated **on each request** (when user visits)
- HTML is created fresh for every page load
- Server processes the request and generates HTML dynamically

**How it works:**
1. User requests a page
2. Server runs your component code
3. Server generates HTML with current data
4. Sends HTML to user's browser
5. Process repeats for every request

**Characteristics:**
- ✅ Always shows fresh, up-to-date data
- ✅ Good SEO (content in HTML)
- ✅ Can access server resources (databases, APIs)
- ❌ Slower than SSG (must generate on each request)
- ❌ Requires server running (higher costs)
- ❌ More server load

**When to use:**
- User-specific dashboards
- Real-time data (stock prices, live scores)
- Content that changes frequently
- Pages requiring authentication
- E-commerce product pages with inventory

**Example scenario:**
A user's dashboard showing their account balance. Each user sees different data, and it must be current. Generate HTML on each request with fresh data.

---

### 3. Incremental Static Regeneration (ISR)

**What it is:**
- Combines SSG and SSR benefits
- Pages are pre-rendered at build time (like SSG)
- But can be **regenerated in the background** after a time period
- First user gets cached HTML, regeneration happens in background

**How it works:**
1. Build time: Generate static HTML (like SSG)
2. User visits: Serve cached static HTML (fast!)
3. After time period (e.g., 60 seconds): Next request triggers background regeneration
4. Next user gets the newly generated page
5. Process repeats

**Characteristics:**
- ✅ Fast performance (serves cached HTML)
- ✅ Good SEO (content in HTML)
- ✅ Can update without full rebuild
- ✅ Best of both SSG and SSR
- ❌ First request after revalidation period is slower
- ❌ Slightly more complex than pure SSG

**When to use:**
- Blog with occasional updates
- Product pages that update daily
- News sites (update every few minutes)
- Content that changes periodically but not constantly
- When you want SSG speed but need occasional updates

**Example scenario:**
A news article page. Generate it once, but if the article gets updated, regenerate it every hour. Users get fast cached pages, but content stays relatively fresh.

---

### 4. Client-Side Rendering (CSR)

**What it is:**
- Pages are rendered **in the user's browser** using JavaScript
- Server sends minimal HTML + JavaScript bundle
- Browser executes JavaScript to create the page

**How it works:**
1. Server sends basic HTML shell + JavaScript files
2. Browser downloads JavaScript
3. Browser executes JavaScript
4. JavaScript fetches data (if needed)
5. JavaScript renders components in browser
6. User sees the page

**Characteristics:**
- ✅ Fast navigation between pages (after initial load)
- ✅ Rich interactivity
- ✅ Can use browser APIs
- ❌ Slower initial load (must download and execute JS)
- ❌ Poor SEO (content not in initial HTML)
- ❌ Requires JavaScript enabled
- ❌ Larger bundle size

**When to use:**
- Admin panels and dashboards
- Single Page Applications (SPAs)
- Highly interactive applications
- Pages behind authentication
- When SEO is not important

**Example scenario:**
An admin dashboard with complex charts and filters. SEO doesn't matter (it's behind login), and you need rich interactivity. Render everything in the browser.

---

### Comparison Table

| Feature | SSG | SSR | ISR | CSR |
|---------|-----|-----|-----|-----|
| **When rendered** | Build time | Each request | Build + background | Browser |
| **Performance** | Fastest | Slower | Fast | Slow initial |
| **SEO** | Excellent | Good | Excellent | Poor |
| **Fresh data** | No | Yes | Periodic | Yes |
| **Server needed** | No | Yes | Yes | No |
| **Cost** | Lowest | Higher | Medium | Low |
| **Use case** | Static content | Dynamic per user | Periodic updates | Interactive apps |

---

### How to Choose?

**Ask yourself:**
1. **Does content change frequently?**
   - No → SSG
   - Yes, but periodically → ISR
   - Yes, constantly → SSR

2. **Is it user-specific?**
   - No → SSG or ISR
   - Yes → SSR or CSR

3. **Is SEO important?**
   - Yes → SSG, SSR, or ISR
   - No → CSR is fine

4. **Do you need interactivity?**
   - High interactivity → CSR (or hybrid)
   - Mostly static → SSG/SSR/ISR

**Best Practice:**
- Default to **SSG** (fastest, best SEO)
- Use **ISR** when you need occasional updates
- Use **SSR** only when you need fresh data on every request
- Use **CSR** for interactive parts, but keep main content as SSG/SSR

---

### Hybrid Approach (Recommended)

You can mix rendering methods:
- **Main page**: SSG (fast, SEO-friendly)
- **Interactive components**: CSR (buttons, modals, forms)
- **Dynamic sections**: SSR or ISR (user data, real-time content)

This gives you the best of all worlds: fast performance, good SEO, and rich interactivity.
</expand>

<expand title="API Routes">
## API Routes

### App Router:
- `app/api/route.js` → API endpoint
- Supports GET, POST, PUT, DELETE, etc.
- Server-side only

### Pages Router:
- `pages/api/users.js` → `/api/users`
- `pages/api/users/[id].js` → `/api/users/:id`

### Use Cases:
- Form submissions
- Database operations
- Authentication
- Webhooks
- Proxy requests
</expand>

<expand title="Middleware">
## Middleware

- Runs before request completes
- Can modify request/response
- Use for: Authentication, redirects, rewrites, headers
- File: `middleware.js` in root directory

### Use Cases:
- Redirect based on locale
- Authentication checks
- A/B testing
- Bot protection
- Rate limiting
</expand>

<expand title="Image Optimization">
## Image Optimization

- Automatic image optimization
- Lazy loading by default
- Responsive images
- WebP format support
- Component: `<Image>` from `next/image`

### Benefits:
- Reduced bandwidth
- Faster page loads
- Better Core Web Vitals
- Automatic format conversion
</expand>

<expand title="Font Optimization">
## Font Optimization

- Automatic font optimization
- Zero layout shift
- Self-hosted fonts
- Component: `next/font`

### Font Types:
- `next/font/google` → Google Fonts
- `next/font/local` → Local fonts

### Benefits:
- Reduced layout shift
- Better performance
- Privacy (self-hosted)
</expand>

<expand title="Metadata & SEO">
## Metadata & SEO

### App Router:
- `metadata` object in layout or page
- Dynamic metadata with `generateMetadata`
- Built-in SEO optimization

### Pages Router:
- `Head` component from `next/head`
- Custom document for global meta tags

### Features:
- Automatic sitemap generation
- Robots.txt
- Open Graph tags
- Twitter cards
</expand>

<expand title="Styling">
## Styling

### Supported Methods:
- CSS Modules
- Global CSS
- Sass/SCSS
- Tailwind CSS
- Styled JSX
- CSS-in-JS libraries

### CSS Modules:
- Scoped styles
- File: `Component.module.css`
- Automatic class name hashing

### Tailwind CSS:
- Utility-first CSS
- JIT compiler
- Purge unused styles
</expand>

<expand title="Environment Variables">
## Environment Variables

- `.env.local` → Local development (not committed)
- `.env` → Default for all environments
- `.env.production` → Production only
- `.env.development` → Development only

### Access:
- Server-side: `process.env.VARIABLE_NAME`
- Client-side: `NEXT_PUBLIC_` prefix required
</expand>

<expand title="Deployment">
## Deployment

### Vercel (Recommended):
- Made by Next.js creators
- Zero configuration
- Automatic deployments
- Edge functions support

### Other Platforms:
- Netlify
- AWS Amplify
- Docker containers
- Self-hosted servers

### Build:
- `next build` → Production build
- `next start` → Start production server
- `next export` → Static export (Pages Router)
</expand>

<expand title="Performance Optimization">
## Performance Optimization

### Automatic Optimizations:
- Code splitting
- Image optimization
- Font optimization
- Script optimization
- Bundle analysis

### Manual Optimizations:
- Dynamic imports
- React.lazy()
- useMemo, useCallback
- Server Components
- Edge runtime
</expand>

<expand title="TypeScript Support">
## TypeScript Support

- Built-in TypeScript support
- Type checking during build
- Automatic type generation
- File: `tsconfig.json`

### Features:
- Type-safe API routes
- Type-safe props
- Type-safe environment variables
</expand>

<expand title="Key Differences from React">
## Key Differences from React

### Next.js Adds:
- File-based routing
- Server-side rendering
- API routes
- Built-in optimizations
- Production-ready config

### React Only:
- Client-side rendering
- Manual routing setup
- Manual optimization
- More configuration needed
</expand>

<expand title="Best Practices">
## Best Practices

- Use Server Components by default
- Use Client Components only when needed
- Optimize images with next/image
- Use dynamic imports for large components
- Implement proper error boundaries
- Use TypeScript for type safety
- Follow file naming conventions
- Organize code in feature folders
- Use middleware for cross-cutting concerns
- Implement proper caching strategies
</expand>

