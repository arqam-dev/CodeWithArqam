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

Next.js is a React framework created by Vercel that enables developers to build production-ready, full-stack web applications with minimal configuration.

### What is Next.js?

**Next.js** is:
- A **React framework** (not just a library)
- Built on top of React
- Provides structure and conventions
- Adds server-side capabilities to React
- Handles routing, rendering, and optimization automatically

**Key Difference from React:**
- **React:** Library for building UI components
- **Next.js:** Framework that uses React + adds routing, server-side rendering, API routes, and more

### Why Use Next.js?

**Problems React Alone Has:**
- ❌ No built-in routing (need React Router)
- ❌ Client-side only (poor SEO)
- ❌ Manual optimization needed
- ❌ No API routes

**What Next.js Provides:**
- ✅ Built-in routing (file-based)
- ✅ Server-side rendering (great SEO)
- ✅ Automatic optimizations
- ✅ API routes included
- ✅ Production-ready defaults

### Key Features:

- **Server-Side Rendering (SSR)** - Pages rendered on server (great SEO)
- **Static Site Generation (SSG)** - Pages pre-rendered at build time (fastest)
- **Incremental Static Regeneration (ISR)** - Combines SSG speed with SSR freshness
- **Client-Side Rendering (CSR)** - Renders in browser (rich interactivity)
- **API Routes** - Build backend API endpoints in same project
- **File-Based Routing** - Create files/folders = automatic routes
- **Automatic Code Splitting** - Loads only what's needed
- **Image Optimization** - Automatic optimization, lazy loading
- **Built-in CSS Support** - CSS Modules, Sass, Tailwind CSS
- **TypeScript Support** - Built-in, no additional configuration

### What Next.js Solves:

1. **SEO Issues** - Server-side rendering makes content visible to search engines
2. **Performance** - Automatic optimizations without extra work
3. **Full-Stack Development** - Backend and frontend in one project
4. **Production-Ready** - Optimized defaults and best practices built-in
5. **Developer Experience** - Simple conventions, great tooling

### When to Use Next.js:

**Perfect For:**
- E-commerce websites, blogs, marketing pages
- Dashboards and admin panels
- Full-stack applications
- Any app needing SEO or performance

**Consider Alternatives If:**
- Simple static site (plain HTML/CSS might be enough)
- Very simple React app (React alone might be enough)
- Mobile app (use React Native instead)

### Getting Started:

**Installation:**
```bash
npx create-next-app@latest my-app
```

**Key Files:**
- `app/page.js` - Home page
- `app/layout.js` - Root layout
- `app/api/` - API routes
- `next.config.js` - Configuration

### Summary:

Next.js is the go-to framework for building modern React applications that need great SEO, fast performance, full-stack capabilities, and production-ready features. It takes the power of React and adds everything needed to build real-world, production applications.
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

Understanding the difference between Server Components and Client Components is crucial in Next.js App Router.

### Server Components (Default):

**What they are:**
- Render only on the server
- No JavaScript sent to browser
- Can access backend resources (databases, file system, APIs)
- Cannot use browser APIs or React hooks

**Key Characteristics:**
- ✅ Zero JavaScript bundle
- ✅ Better performance and SEO
- ✅ Secure (secrets stay on server)
- ❌ No interactivity (no event handlers)
- ❌ Cannot use `useState`, `useEffect`, `window`, `document`

**How to identify:**
- No `'use client'` directive
- Default in App Router
- Can use `async/await` directly

### Client Components:

**What they are:**
- Render in the browser
- Send JavaScript to client
- Can use browser APIs and React hooks
- Interactive components

**Key Characteristics:**
- ✅ Interactive (event handlers, state)
- ✅ Can use `useState`, `useEffect`, browser APIs
- ❌ Larger bundle size
- ❌ Slower initial load
- ❌ No direct server access

**How to identify:**
- Has `'use client'` directive at top
- Uses React hooks or event handlers

### Key Differences:

**Server Components:**
- Renders on server, no JavaScript sent to client
- Cannot use hooks or browser APIs
- Can access backend resources
- Not interactive, smaller bundle, faster performance

**Client Components:**
- Renders in browser, JavaScript sent to client
- Can use hooks and browser APIs
- Cannot access backend directly
- Interactive, larger bundle, slower initial load

### When to Use:

**Server Components:**
- Static content, data fetching, SEO-critical pages
- Blog posts, product listings, layouts
- Any content that doesn't need interactivity

**Client Components:**
- Interactive UI (buttons, forms, modals)
- State management, browser APIs
- Search bars, image galleries, charts

### Best Practice:

- Use Server Components by default
- Only add `'use client'` when you need interactivity
- Mix them: Server Component fetches data, Client Component handles interaction
- Keep Client Components small and focused

**Rule of Thumb:** If it doesn't need to be interactive, make it a Server Component!
</expand>

<expand title="Routing">
## Routing

Next.js uses **file-based routing** - the file structure in your `app/` directory automatically creates routes.

### What is File-Based Routing?

- Files and folders in `app/` = Routes
- `page.js` creates a route
- Folder name = URL path segment
- No manual configuration needed

### Basic Routes:

**Home Page:**
- `app/page.js` → `/`

**Static Routes:**
- `app/about/page.js` → `/about`
- `app/contact/page.js` → `/contact`
- `app/blog/page.js` → `/blog`

### Dynamic Routes:

**Single Parameter:**
- `app/blog/[id]/page.js` → `/blog/123`, `/blog/456`
- Access via `params.id`

**Multiple Parameters:**
- `app/shop/[category]/[product]/page.js` → `/shop/electronics/laptop`
- Access via `params.category` and `params.product`

### Catch-All Routes:

**Required Catch-All:**
- `app/shop/[...slug]/page.js` → `/shop/a`, `/shop/a/b`, `/shop/a/b/c`
- `params.slug` is an array

**Optional Catch-All:**
- `app/docs/[[...slug]]/page.js` → `/docs` OR `/docs/a` OR `/docs/a/b`
- Matches zero or more segments

### Route Groups:

- Organize routes without affecting URL
- Use parentheses: `(group-name)`
- Group name doesn't appear in URL

**Example:**
- `app/(marketing)/about/page.js` → `/about` (not `/marketing/about`)
- `app/(shop)/products/page.js` → `/products`

**Benefits:**
- Organize related routes
- Share layouts within group
- Keep URL clean

### Layouts:

**Root Layout:**
- `app/layout.js` → Wraps ALL pages
- Required in App Router
- Defines HTML structure

**Nested Layouts:**
- `app/dashboard/layout.js` → Wraps `/dashboard/*` routes
- Layouts are nested hierarchically

### Special Files:

**Loading States:**
- `app/loading.js` → Shows while page loads
- Uses React Suspense automatically

**Error Handling:**
- `app/error.js` → Error boundary for route
- Catches errors, shows error UI

**Not Found:**
- `app/not-found.js` → Custom 404 page
- Shown when route doesn't exist

### Route Matching Priority:

1. Static routes (exact match)
2. Dynamic routes (`[id]`)
3. Catch-all routes (`[...slug]`)
4. Optional catch-all (`[[...slug]]`)

### Accessing Parameters:

**Server Components:**
```javascript
export default async function Page({ params }) {
  const { id } = await params; // params is Promise in App Router
  return <div>{id}</div>;
}
```

**Client Components:**
```javascript
'use client';
import { useParams } from 'next/navigation';

export default function Component() {
  const params = useParams();
  return <div>{params.id}</div>;
}
```

### Navigation:

**Link Component (Server/Client):**
```javascript
import Link from 'next/link';
<Link href="/about">About</Link>
```

**useRouter Hook (Client only):**
```javascript
'use client';
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/about');
```

### Best Practices:

- Use descriptive folder names
- Organize with route groups
- Use layouts for shared UI
- Handle loading and errors
- Keep routes shallow when possible

**Key Takeaway:** File structure = Route structure. If you can organize files, you can create routes!
</expand>

<expand title="Data Fetching">
## Data Fetching

Data fetching is how you get data into your Next.js application. Next.js provides multiple ways to fetch data, each optimized for different use cases.

### App Router: Data Fetching (Next.js 13+)

#### Server Components - Direct Async/Await

**What it is:**
- Simplest way to fetch data in App Router
- Use `async/await` directly in Server Components
- No special functions needed
- Automatic optimization and caching

**Example:**
```javascript
export default async function BlogPage() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  return <div>{posts.map(post => <div key={post.id}>{post.title}</div>)}</div>;
}
```

**Benefits:**
- ✅ Simple and intuitive
- ✅ Automatic caching
- ✅ Type-safe with TypeScript

### Fetch Cache Options:

#### 1. Force Cache (Default)
```javascript
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache' // Cached indefinitely
});
```
- Caches response indefinitely
- Use for: Static data that doesn't change

#### 2. No Store (Always Fresh)
```javascript
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store' // Always fetch fresh
});
```
- Never caches response
- Use for: Real-time data, user-specific content

#### 3. Revalidate (ISR)
```javascript
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // Revalidate every 60 seconds
});
```
- Caches initially, revalidates after time period
- Use for: Content that updates periodically

**How ISR works:**
1. First request: Fetches and caches
2. Next period: Serves cached (fast!)
3. After period: Background revalidation
4. Subsequent: Fresh data

### Pages Router: Data Fetching (Legacy)

#### getServerSideProps (SSR)
- Runs on **every request**
- Fresh data on each page load
- Use for: User dashboards, real-time data

#### getStaticProps (SSG)
- Runs at **build time**
- Pre-renders pages
- Use for: Blog posts, documentation, static content

#### getStaticPaths
- Defines which dynamic routes to pre-render
- Works with `getStaticProps`
- Fallback options: `false`, `'blocking'`, `true`

### Client-Side Data Fetching

**When to use:**
- User interactions trigger fetches
- Real-time updates
- Client Components only

**Limitations:**
- ❌ Not SEO-friendly
- ❌ Slower initial load
- ❌ More JavaScript bundle

### Best Practices:

1. **Use Server Components by default** - Better performance and SEO
2. **Choose right caching strategy** - Based on data freshness needs
3. **Fetch only what you need** - Don't fetch everything
4. **Handle errors gracefully** - Always use try/catch
5. **Show loading states** - Better user experience

### Summary:

**Key Takeaways:**
- App Router: Use `async/await` directly in Server Components
- Pages Router: Use `getServerSideProps` or `getStaticProps`
- Caching: Choose based on data freshness (`force-cache`, `no-store`, `revalidate`)
- Server Components: Default choice for data fetching
- Client Components: Only when you need interactivity

**Remember:** Fetch on server when possible for better performance and SEO!
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

API Routes allow you to build backend functionality directly in your Next.js application. You can create API endpoints without a separate backend server.

### What are API Routes?

**API Routes** are:
- Server-side endpoints in your Next.js app
- Handle HTTP requests (GET, POST, PUT, DELETE, etc.)
- Can access databases, file system, external APIs
- Perfect for full-stack applications

**Key Benefits:**
- ✅ No separate backend needed
- ✅ Same deployment as frontend
- ✅ Type-safe with TypeScript
- ✅ Server-side only (secure)

### App Router: API Routes (Next.js 13+)

#### Basic API Route

**Structure:**
- `app/api/route.js` → `/api`

**Example:**
```javascript
import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

**HTTP Methods:** GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS

#### Dynamic API Routes

**Structure:**
- `app/api/users/[id]/route.js` → `/api/users/123`

**Example:**
```javascript
export async function GET(request, { params }) {
  const { id } = await params;
  const user = await getUserById(id);
  return NextResponse.json(user);
}
```

#### Accessing Request Data

**Request Body:**
```javascript
const body = await request.json();
```

**Query Parameters:**
```javascript
const { searchParams } = new URL(request.url);
const name = searchParams.get('name');
```

**Headers:**
```javascript
const authHeader = request.headers.get('authorization');
```

**Cookies:**
```javascript
import { cookies } from 'next/headers';
const cookieStore = cookies();
const token = cookieStore.get('token');
```

### Pages Router: API Routes (Legacy)

**Structure:**
- `pages/api/users.js` → `/api/users`
- `pages/api/users/[id].js` → `/api/users/123`

**Example:**
```javascript
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    res.status(201).json({ message: 'Created' });
  }
}
```

### Common Use Cases:

- **Form Submissions:** Handle contact forms, user input
- **Database Operations:** CRUD operations
- **Authentication:** Login, registration, token management
- **Webhooks:** Handle external service callbacks
- **Proxy Requests:** Forward requests to external APIs

### Response Helpers:

```javascript
// JSON Response
return NextResponse.json({ message: 'Success' });

// Error Response
return NextResponse.json({ error: 'Not found' }, { status: 404 });

// Redirect
return NextResponse.redirect('https://example.com');
```

### Best Practices:

1. **Validate Input** - Always validate and sanitize user input
2. **Handle Errors** - Use try/catch and return appropriate status codes
3. **Use Environment Variables** - Never expose secrets in code
4. **Set Status Codes** - Use appropriate HTTP status codes (200, 201, 400, 401, 404, 500)
5. **Use TypeScript** - Type-safe API routes

### Security Considerations:

- **Never trust client input** - Always validate and sanitize
- **Use HTTPS in production** - Protect sensitive data
- **Implement rate limiting** - Prevent abuse
- **Validate authentication** - Check tokens and permissions

### App Router vs Pages Router:

**App Router (Next.js 13+):**
- File structure: `app/api/route.js`
- Handler: Named exports (`GET`, `POST`)
- Request object: Web API Request
- Response: `NextResponse` helper

**Pages Router (Legacy):**
- File structure: `pages/api/users.js`
- Handler: Default export function
- Request object: Node.js req/res
- Response: `res.json()`, `res.status()` methods

### Summary:

**Key Takeaways:**
- API Routes let you build backend in Next.js
- App Router uses modern Web API (Request/Response)
- Always validate input and handle errors
- Use appropriate HTTP methods and status codes
- Secure your API routes

**Remember:** API Routes are server-side only, perfect for full-stack applications!
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

Next.js provides built-in font optimization to improve performance, user experience, and SEO. Understanding font optimization is crucial for building fast, professional websites.

### What is Font Optimization?

Font optimization involves:
- Loading fonts efficiently
- Preventing layout shifts when fonts load
- Reducing font file sizes
- Hosting fonts on your own domain

### The Problem Without Optimization

**Traditional Font Loading Issues:**

1. **FOUT (Flash of Unstyled Text):**
   - Text appears in fallback font first
   - Then switches to custom font when loaded
   - Creates visual "flash" or "jump"

2. **Layout Shift (CLS - Cumulative Layout Shift):**
   - Text changes size when font loads
   - Page elements move/shift
   - Poor user experience
   - Bad for SEO (Core Web Vitals)

3. **Performance Issues:**
   - Large font files slow page load
   - External requests to Google Fonts
   - Blocking render process

4. **Privacy Concerns:**
   - Google Fonts tracks user IP addresses
   - GDPR compliance issues

### Zero Layout Shift Explained

**What is Layout Shift?**
- When page elements move after initial render
- Measured as Cumulative Layout Shift (CLS)
- Happens when fonts load and text size changes

**Why Zero Layout Shift Matters:**
- ✅ Better user experience (no jumping content)
- ✅ Better SEO scores (Core Web Vitals)
- ✅ Professional appearance
- ✅ Prevents user frustration

**How Next.js Achieves Zero Layout Shift:**
1. Pre-calculates font metrics (width, height, ascent, descent)
2. Reserves exact space for text before font loads
3. Uses fallback font with matching metrics
4. Seamlessly swaps to custom font when ready
5. No visible shift or movement

**Example:**
```
Without optimization:
- Text renders in Arial (fallback)
- Font loads, text switches to Roboto
- Text size changes → layout shifts

With Next.js optimization:
- Space reserved for Roboto metrics
- Text renders in fallback with same size
- Font loads, swaps invisibly
- No layout shift!
```

### Self-Hosted Fonts Explained

**What are Self-Hosted Fonts?**
- Fonts stored on your own server/domain
- Not loaded from external CDN (like Google Fonts)
- Served from your Next.js application

**Benefits of Self-Hosting:**
- ✅ **Privacy:** No third-party tracking
- ✅ **Performance:** Faster (same domain, no DNS lookup)
- ✅ **Reliability:** No dependency on external services
- ✅ **Control:** Full control over font files
- ✅ **GDPR Compliance:** No data sent to Google

**How Next.js Self-Hosts:**
1. Downloads font files at build time
2. Optimizes and stores in `.next` folder
3. Serves from your domain
4. Automatically generates CSS with correct paths

### Automatic Font Optimization

**What Next.js Does Automatically:**

1. **Font Subsetting:**
   - Removes unused characters
   - Reduces file size significantly
   - Only includes characters you use

2. **Format Optimization:**
   - Converts to modern formats (WOFF2)
   - Better compression
   - Smaller file sizes

3. **Preloading:**
   - Adds `<link rel="preload">` tags
   - Starts downloading fonts early
   - Improves perceived performance

4. **CSS Generation:**
   - Generates optimized CSS
   - Includes font-display strategy
   - Adds fallback fonts

### Font Types in Next.js

#### 1. Google Fonts (`next/font/google`)

**What it does:**
- Automatically downloads from Google Fonts
- Self-hosts on your domain
- Optimizes and subsets fonts

**Usage:**
```javascript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

**Features:**
- ✅ Automatic optimization
- ✅ Self-hosted
- ✅ Zero layout shift
- ✅ Easy to use

#### 2. Local Fonts (`next/font/local`)

**What it does:**
- Uses fonts from your project folder
- Optimizes local font files
- Same optimization benefits

**Usage:**
```javascript
import localFont from 'next/font/local'

const myFont = localFont({ src: './fonts/my-font.woff2' })
```

**When to use:**
- Custom fonts not on Google Fonts
- Brand-specific fonts
- Premium font licenses

### Font Display Strategy

**What is font-display?**
- Controls how fonts render during loading
- Prevents invisible text
- Improves perceived performance

**Next.js Default:**
- Uses `font-display: optional` or `swap`
- Balances performance and visual quality
- Ensures text is always visible

### Benefits Summary

**Performance:**
- Faster page loads (optimized files)
- Reduced bandwidth (subsetting)
- Better Core Web Vitals scores

**User Experience:**
- No layout shifts
- Smooth font loading
- Professional appearance

**SEO:**
- Better CLS scores
- Improved page speed metrics
- Better search rankings

**Privacy & Compliance:**
- No third-party tracking
- GDPR compliant
- Full data control

### Best Practices

1. **Use Next.js font optimization:**
   - Always use `next/font` instead of external links
   - Get automatic optimization benefits

2. **Limit font families:**
   - Use 1-2 font families maximum
   - Each font adds load time

3. **Subset fonts:**
   - Only include needed character sets
   - Reduces file size significantly

4. **Use system fonts as fallback:**
   - Next.js does this automatically
   - Ensures text is always readable

5. **Preload critical fonts:**
   - Next.js handles this automatically
   - Ensures fonts load early

### Common Mistakes to Avoid

❌ **Don't:** Use `<link>` tags for Google Fonts
```html
<!-- Bad -->
<link href="https://fonts.googleapis.com/css2?family=Inter" />
```

✅ **Do:** Use `next/font/google`
```javascript
// Good
import { Inter } from 'next/font/google'
```

❌ **Don't:** Load multiple font weights separately
✅ **Do:** Load all weights in one import

❌ **Don't:** Ignore font optimization
✅ **Do:** Always use Next.js font optimization
</expand>

<expand title="Metadata & SEO">
## Metadata & SEO

Next.js provides powerful built-in tools for managing metadata and optimizing your site for search engines.

### What is Metadata?

**Metadata** is information about your webpage that:
- Describes the page content
- Helps search engines understand your page
- Controls how your page appears in search results and social media

**Common Metadata Types:**
- **Title:** Page title in browser tabs and search results
- **Description:** Brief summary (shown in search results)
- **Open Graph:** Controls appearance on Facebook, LinkedIn, etc.
- **Twitter Cards:** Controls appearance on Twitter/X
- **Canonical URL:** Prevents duplicate content issues

### What is SEO?

**SEO (Search Engine Optimization)** is the practice of:
- Making your website discoverable by search engines
- Improving your ranking in search results
- Getting more organic (free) traffic

**Why SEO Matters:**
- ✅ More visibility = more visitors
- ✅ Better rankings = more traffic
- ✅ Organic traffic is free (vs paid ads)

### How Next.js Helps with SEO

**Built-in SEO Features:**
1. Server-side rendering (content in HTML)
2. Automatic metadata management
3. Sitemap generation
4. Robots.txt handling
5. Social media optimization
6. Performance optimization (affects SEO)

### App Router: Metadata Management

#### Static Metadata

**What it is:**
- Metadata defined at build time
- Same for all users
- Defined using `metadata` object

**Example:**
```javascript
// app/about/page.js
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
}
```

#### Dynamic Metadata

**What it is:**
- Metadata that changes based on data
- Uses `generateMetadata` function

**Example:**
```javascript
// app/blog/[id]/page.js
export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

**When to use:** Blog posts, product pages, user profiles, any dynamic content

### Pages Router: Metadata Management

**Legacy Approach:**
- Uses `<Head>` component from `next/head`
- Client-side metadata management
- Less ideal for SEO

**Example:**
```javascript
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn about our company" />
      </Head>
      <div>About page content</div>
    </>
  );
}
```

### Automatic Sitemap Generation

**What is a Sitemap?**
- XML file listing all pages on your site
- Helps search engines discover and index pages

**App Router:**
- Create `app/sitemap.js` or `app/sitemap.ts`
- Next.js automatically generates `/sitemap.xml`

**Example:**
```javascript
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}
```

### Robots.txt

**What is robots.txt?**
- File that tells search engines which pages to crawl
- Controls search engine access

**App Router:**
- Create `app/robots.js` or `app/robots.ts`
- Next.js automatically generates `/robots.txt`

**Example:**
```javascript
// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

### Open Graph Tags

**What are Open Graph Tags?**
- Metadata for social media sharing
- Controls how your page appears on Facebook, LinkedIn, WhatsApp

**App Router:**
```javascript
export const metadata = {
  openGraph: {
    title: 'My Page Title',
    description: 'Page description',
    images: ['/og-image.jpg'],
    url: 'https://yoursite.com',
    type: 'website',
  },
}
```

**Best Practices:**
- Always include an image (1200x630px recommended)
- Write compelling titles and descriptions
- Use high-quality images

### Twitter Cards

**What are Twitter Cards?**
- Special metadata for Twitter/X
- Makes tweets with your links look better

**App Router:**
```javascript
export const metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'My Page Title',
    description: 'Page description',
    images: ['/twitter-image.jpg'],
  },
}
```

### SEO Best Practices

1. **Unique Metadata Per Page** - Each page should have unique title and description
2. **Descriptive Titles** - Keep under 60 characters, include keywords
3. **Compelling Descriptions** - Keep under 160 characters, summarize content
4. **Use Images** - Always include Open Graph image (1200x630px)
5. **Structured Data** - Use JSON-LD for rich snippets
6. **Performance** - Fast page load, mobile-friendly, accessible

### Common SEO Mistakes to Avoid

❌ **Don't:** Use same metadata on all pages
✅ **Do:** Use unique metadata per page

❌ **Don't:** Forget Open Graph images
✅ **Do:** Always include social sharing images

❌ **Don't:** Use generic descriptions
✅ **Do:** Write specific, compelling descriptions

❌ **Don't:** Ignore mobile optimization
✅ **Do:** Ensure mobile-friendly design

### App Router vs Pages Router

| Feature | App Router | Pages Router |
|---------|------------|--------------|
| **Metadata** | `metadata` object | `<Head>` component |
| **Dynamic** | `generateMetadata()` | Manual in component |
| **SEO** | ✅ Better (server-side) | ⚠️ Good (client-side) |
| **Sitemap** | `sitemap.js` | Manual or plugin |
| **Robots.txt** | `robots.js` | Manual file |

**Recommendation:** Use App Router for new projects (better SEO, easier to use)

### Summary

**Key Takeaways:**
- Metadata helps search engines and social media understand your pages
- Next.js makes metadata management easy and automatic
- App Router provides better SEO features than Pages Router
- Always use unique, descriptive metadata per page
- Include Open Graph and Twitter Cards for social sharing
- Generate sitemaps and robots.txt automatically
- Follow SEO best practices for better rankings
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

