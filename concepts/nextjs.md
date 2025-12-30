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

Next.js is a powerful React framework created by Vercel that enables developers to build production-ready, full-stack web applications with minimal configuration. It extends React with essential features needed for modern web development.

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
- ❌ More configuration required

**What Next.js Provides:**
- ✅ Built-in routing (file-based)
- ✅ Server-side rendering (great SEO)
- ✅ Automatic optimizations
- ✅ API routes included
- ✅ Production-ready defaults

### Key Features Explained:

#### 1. Server-Side Rendering (SSR)
- Pages rendered on server before sending to browser
- Content visible in HTML source (good for SEO)
- Faster initial page load

#### 2. Static Site Generation (SSG)
- Pages pre-rendered at build time
- Served as static HTML files
- Fastest performance, best for static content

#### 3. Incremental Static Regeneration (ISR)
- Combines SSG speed with SSR freshness
- Regenerates pages in background
- Best of both worlds

#### 4. Client-Side Rendering (CSR)
- Renders in browser using JavaScript
- Rich interactivity
- Good for dashboards and admin panels

#### 5. API Routes
- Build backend API endpoints
- Server-side logic
- Database connections
- Authentication handling
- All in the same project

#### 6. File-Based Routing
- Create files/folders = automatic routes
- No manual route configuration
- Intuitive and organized

#### 7. Automatic Code Splitting
- Splits JavaScript into smaller chunks
- Loads only what's needed
- Faster page loads

#### 8. Image Optimization
- Automatic image optimization
- Lazy loading
- Modern formats (WebP)
- Responsive images

#### 9. Built-in CSS Support
- CSS Modules
- Sass/SCSS
- Tailwind CSS
- Global CSS
- All supported out of the box

#### 10. TypeScript Support
- Built-in TypeScript support
- Type checking
- Better developer experience
- No additional configuration needed

### What Next.js Solves:

#### 1. SEO Issues in Client-Side Rendering
**Problem:** React apps render in browser, so search engines see empty HTML
**Solution:** Next.js renders on server, content is in HTML source
**Result:** Better search engine rankings

#### 2. Performance Optimization
**Problem:** Manual optimization is time-consuming
**Solution:** Automatic optimizations (code splitting, image optimization, etc.)
**Result:** Fast, optimized apps without extra work

#### 3. Full-Stack Development
**Problem:** Need separate backend and frontend
**Solution:** API routes allow backend in same project
**Result:** One codebase, easier deployment

#### 4. Production-Ready Configurations
**Problem:** Complex setup for production
**Solution:** Optimized defaults and best practices built-in
**Result:** Production-ready apps from the start

#### 5. Developer Experience
**Problem:** Complex tooling and configuration
**Solution:** Simple conventions, great tooling, hot reload
**Result:** Faster development, less configuration

### When to Use Next.js:

**Perfect For:**
- ✅ E-commerce websites
- ✅ Blogs and content sites
- ✅ Marketing/landing pages
- ✅ Dashboards and admin panels
- ✅ Full-stack applications
- ✅ Any app needing SEO
- ✅ Any app needing performance

**Consider Alternatives If:**
- Simple static site (might use plain HTML/CSS)
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

**Next Steps:**
1. Learn file-based routing
2. Understand rendering methods
3. Explore API routes
4. Master Server Components
5. Optimize performance

### Summary:

Next.js is the go-to framework for building modern React applications that need:
- Great SEO
- Fast performance
- Full-stack capabilities
- Production-ready features
- Excellent developer experience

It takes the power of React and adds everything needed to build real-world, production applications.
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

Understanding the difference between Server Components and Client Components is crucial in Next.js App Router. It's one of the most important concepts for building performant applications.

### What Are Server Components?

**Server Components** are React components that:
- Render **only on the server**
- Never send JavaScript to the browser
- Execute during server-side rendering
- Can access server-side resources directly

**Key Characteristics:**
- ✅ **No JavaScript bundle:** Zero JavaScript sent to client
- ✅ **Direct backend access:** Can access databases, file system, APIs
- ✅ **Better performance:** Smaller bundle size, faster loads
- ✅ **Better SEO:** Content rendered on server
- ✅ **Secure:** API keys and secrets stay on server
- ❌ **No interactivity:** Cannot use event handlers
- ❌ **No browser APIs:** Cannot use `window`, `document`, `localStorage`
- ❌ **No React hooks:** Cannot use `useState`, `useEffect`, etc.

**How to Identify:**
- No `'use client'` directive
- Default in App Router
- Can use `async/await` directly
- Can use `fs`, database connections, etc.

**Example:**
```javascript
// app/blog/page.js (Server Component)
import fs from 'fs';

export default async function BlogPage() {
  // Can use fs directly - this is server-side only!
  const posts = fs.readdirSync('./posts');
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => <div key={post}>{post}</div>)}
    </div>
  );
}
```

### What Are Client Components?

**Client Components** are React components that:
- Render **in the browser**
- Send JavaScript to client
- Execute in user's browser
- Can use browser features

**Key Characteristics:**
- ✅ **Interactive:** Can use event handlers (`onClick`, `onChange`)
- ✅ **Browser APIs:** Can use `window`, `document`, `localStorage`
- ✅ **React hooks:** Can use `useState`, `useEffect`, `useRouter`
- ✅ **Dynamic:** Can update based on user interaction
- ❌ **Larger bundle:** JavaScript must be sent to client
- ❌ **Slower initial load:** Must download and execute JavaScript
- ❌ **No server access:** Cannot access file system, databases directly

**How to Identify:**
- Has `'use client'` directive at top
- Uses React hooks
- Uses event handlers
- Uses browser APIs

**Example:**
```javascript
// app/components/Counter.js (Client Component)
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Key Differences:

| Feature | Server Components | Client Components |
|---------|------------------|-------------------|
| **Renders where** | Server | Browser |
| **JavaScript sent** | No | Yes |
| **Can use hooks** | No | Yes |
| **Can use browser APIs** | No | Yes |
| **Can access backend** | Yes | No |
| **Interactive** | No | Yes |
| **Bundle size** | Smaller | Larger |
| **Performance** | Faster | Slower initial load |
| **SEO** | Excellent | Good |

### When to Use Server Components:

**Use Server Components for:**
- ✅ Static content (text, images, layouts)
- ✅ Data fetching (databases, APIs, file system)
- ✅ SEO-critical pages
- ✅ Content that doesn't change based on user interaction
- ✅ Components that don't need interactivity
- ✅ Reducing JavaScript bundle size

**Examples:**
- Blog post content
- Product listings
- Navigation menus (if not interactive)
- Footer content
- Static pages

### When to Use Client Components:

**Use Client Components for:**
- ✅ Interactive UI (buttons, forms, modals)
- ✅ State management (`useState`, `useReducer`)
- ✅ Browser APIs (`localStorage`, `window`, `document`)
- ✅ Event handlers (`onClick`, `onChange`, `onSubmit`)
- ✅ Third-party libraries that need browser APIs
- ✅ Components using React hooks

**Examples:**
- Search bars with autocomplete
- Image galleries with lightbox
- Forms with validation
- Interactive charts/graphs
- Modal dialogs
- Counters and timers

### Mixing Server and Client Components:

**You can mix them!** This is the recommended approach:

```javascript
// app/page.js (Server Component)
import { fetchPosts } from './lib/api';
import InteractiveButton from './components/InteractiveButton';

export default async function Page() {
  const posts = await fetchPosts(); // Server-side data fetching
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Client Component for interactivity */}
          <InteractiveButton postId={post.id} />
        </div>
      ))}
    </div>
  );
}
```

**Best Practice:**
- Use Server Components by default
- Only use Client Components when you need interactivity
- Keep Client Components small and focused
- Pass data from Server to Client Components as props

### Common Patterns:

#### Pattern 1: Server Component fetches, Client Component displays
```javascript
// Server Component
export default async function Page() {
  const data = await fetchData();
  return <ClientChart data={data} />;
}

// Client Component
'use client';
export function ClientChart({ data }) {
  // Interactive chart using data from server
}
```

#### Pattern 2: Server Component for layout, Client Component for interaction
```javascript
// Server Component
export default function Layout({ children }) {
  return (
    <div>
      <ServerHeader />
      {children}
      <ClientFooter />
    </div>
  );
}
```

### Performance Impact:

**Server Components:**
- Zero JavaScript sent to client
- Faster page loads
- Better Core Web Vitals
- Lower bandwidth usage

**Client Components:**
- JavaScript must be downloaded
- Slower initial load
- More bandwidth usage
- But enables interactivity

**Recommendation:** Use Server Components as much as possible, only add Client Components where interactivity is needed.

### Migration from Pages Router:

**Pages Router:**
- All components were Client Components
- Everything sent to browser
- Larger bundles

**App Router:**
- Server Components by default
- Only Client Components when needed
- Smaller bundles, better performance

### Summary:

**Remember:**
- **Server Components** = Default, no JavaScript, fast, SEO-friendly
- **Client Components** = When you need interactivity, use `'use client'`
- **Best Practice** = Use Server Components by default, add Client Components only when needed
- **Performance** = More Server Components = Better performance

**Rule of Thumb:** If it doesn't need to be interactive, make it a Server Component!
</expand>

<expand title="Routing">
## Routing

Next.js uses **file-based routing**, meaning the file structure in your `app/` directory automatically creates routes. Understanding routing is fundamental to building Next.js applications.

### What is File-Based Routing?

**File-based routing** means:
- Files and folders in `app/` directory = Routes
- No manual route configuration needed
- Intuitive and organized
- Automatic route generation

**Key Concept:**
- `page.js` = Creates a route
- Folder name = URL path segment
- Special files have special purposes

### Basic Routes:

#### Home Page:
```
app/page.js → /
```
- Root route of your application
- Must be named `page.js`
- Located in `app/` directory

#### Static Routes:
```
app/about/page.js → /about
app/contact/page.js → /contact
app/blog/page.js → /blog
```
- Each folder with `page.js` creates a route
- Folder name becomes the URL path

**Example:**
```javascript
// app/about/page.js
export default function AboutPage() {
  return <h1>About Us</h1>;
}
```
Visiting `/about` shows this page.

### Dynamic Routes:

#### Single Dynamic Segment:
```
app/blog/[id]/page.js → /blog/123, /blog/456, etc.
```
- `[id]` is a dynamic parameter
- Can access via `params.id`

**Example:**
```javascript
// app/blog/[id]/page.js
export default function BlogPost({ params }) {
  return <h1>Post ID: {params.id}</h1>;
}
```

#### Multiple Dynamic Segments:
```
app/shop/[category]/[product]/page.js → /shop/electronics/laptop
```
- Multiple dynamic parameters
- Access via `params.category` and `params.product`

### Catch-All Routes:

#### Catch-All (Required):
```
app/shop/[...slug]/page.js → /shop/a, /shop/a/b, /shop/a/b/c
```
- `[...slug]` matches one or more segments
- `params.slug` is an array

**Example:**
```javascript
// app/shop/[...slug]/page.js
export default function ShopPage({ params }) {
  // /shop/electronics/laptops → params.slug = ['electronics', 'laptops']
  return <div>Path: {params.slug.join('/')}</div>;
}
```

#### Optional Catch-All:
```
app/docs/[[...slug]]/page.js → /docs OR /docs/a OR /docs/a/b
```
- `[[...slug]]` matches zero or more segments
- Works for both `/docs` and `/docs/anything`

**Use Case:**
- Documentation sites
- Nested category pages
- Flexible routing needs

### Route Groups:

**What are Route Groups?**
- Organize routes without affecting URL
- Use parentheses: `(group-name)`
- Group name doesn't appear in URL

**Example:**
```
app/(marketing)/about/page.js → /about (not /marketing/about)
app/(marketing)/contact/page.js → /contact
app/(shop)/products/page.js → /products
app/(shop)/cart/page.js → /cart
```

**Benefits:**
- Organize related routes together
- Share layouts within group
- Keep URL structure clean
- Better code organization

### Layouts:

**What are Layouts?**
- Shared UI that wraps multiple pages
- Persist across route changes
- Perfect for headers, footers, navigation

#### Root Layout:
```
app/layout.js → Wraps ALL pages
```
- Required in App Router
- Defines HTML structure
- Global styles and fonts

**Example:**
```javascript
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Navigation</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

#### Nested Layouts:
```
app/dashboard/layout.js → Wraps /dashboard/* routes
```
- Layouts are nested
- Child layouts wrap their routes
- Useful for section-specific UI

**Example:**
```javascript
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

**Layout Hierarchy:**
```
app/layout.js (root)
  └── app/dashboard/layout.js (nested)
      └── app/dashboard/settings/page.js
```

### Special Files:

#### Loading States:
```
app/loading.js → Shows while page loads
app/dashboard/loading.js → Shows while dashboard routes load
```
- Automatically shows loading UI
- Uses React Suspense
- Better user experience

**Example:**
```javascript
// app/loading.js
export default function Loading() {
  return <div>Loading...</div>;
}
```

#### Error Handling:
```
app/error.js → Error boundary for route
app/dashboard/error.js → Error boundary for dashboard routes
```
- Catches errors in route
- Shows error UI
- Prevents entire app from crashing

**Example:**
```javascript
// app/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

#### Not Found Pages:
```
app/not-found.js → 404 page
```
- Custom 404 page
- Shown when route doesn't exist
- Better than default error

**Example:**
```javascript
// app/not-found.js
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}
```

### Route Matching Rules:

**Priority Order:**
1. Static routes (exact match)
2. Dynamic routes (`[id]`)
3. Catch-all routes (`[...slug]`)
4. Optional catch-all (`[[...slug]]`)

**Example:**
```
app/page.js → /
app/about/page.js → /about
app/blog/[id]/page.js → /blog/123
app/shop/[...slug]/page.js → /shop/electronics/laptops
```

### Accessing Route Parameters:

**In Server Components:**
```javascript
// app/blog/[id]/page.js
export default async function BlogPost({ params }) {
  const { id } = await params; // params is a Promise in App Router
  return <div>Post: {id}</div>;
}
```

**In Client Components:**
```javascript
'use client';
import { useParams } from 'next/navigation';

export default function ClientComponent() {
  const params = useParams();
  return <div>ID: {params.id}</div>;
}
```

### Navigation:

#### Server-Side Navigation:
```javascript
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/blog/123">Blog Post</Link>
    </nav>
  );
}
```

#### Client-Side Navigation:
```javascript
'use client';
import { useRouter } from 'next/navigation';

export default function Button() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.push('/about')}>
      Go to About
    </button>
  );
}
```

### Best Practices:

1. **Use descriptive folder names:**
   - ✅ `app/products/page.js`
   - ❌ `app/p/page.js`

2. **Organize with route groups:**
   - Group related routes together
   - Keep URL structure clean

3. **Use layouts for shared UI:**
   - Don't repeat headers/footers
   - Use nested layouts for sections

4. **Handle loading and errors:**
   - Always add loading states
   - Provide error boundaries

5. **Keep routes shallow when possible:**
   - ✅ `/about`, `/contact`
   - ⚠️ `/company/about/team/members` (consider if needed)

### Common Patterns:

#### Pattern 1: Blog with Categories
```
app/blog/page.js → /blog (list all posts)
app/blog/[id]/page.js → /blog/123 (single post)
app/blog/category/[slug]/page.js → /blog/category/tech
```

#### Pattern 2: E-commerce
```
app/shop/page.js → /shop (product listing)
app/shop/[...slug]/page.js → /shop/electronics/laptops (category pages)
app/product/[id]/page.js → /product/123 (product detail)
```

#### Pattern 3: Dashboard
```
app/dashboard/layout.js → Shared dashboard layout
app/dashboard/page.js → /dashboard (overview)
app/dashboard/settings/page.js → /dashboard/settings
app/dashboard/analytics/page.js → /dashboard/analytics
```

### Summary:

**Key Takeaways:**
- File structure = Route structure
- `page.js` creates routes
- Folders create URL segments
- Layouts wrap routes
- Special files handle loading, errors, 404s
- Dynamic routes use brackets `[id]`
- Route groups organize without affecting URL

**Remember:** Next.js routing is intuitive - if you can organize files, you can create routes!
</expand>

<expand title="Data Fetching">
## Data Fetching

Data fetching is how you get data into your Next.js application. Next.js provides multiple ways to fetch data, each optimized for different use cases. Understanding data fetching is crucial for building performant applications.

### What is Data Fetching?

**Data Fetching** means:
- Getting data from APIs
- Reading from databases
- Loading files from file system
- Fetching external resources
- Getting user-specific data

**Key Considerations:**
- **When** to fetch (build time, request time, client-side)
- **Where** to fetch (server vs client)
- **How** to cache (performance optimization)
- **What** to fetch (only what you need)

---

### App Router: Data Fetching (Next.js 13+)

#### Server Components - Direct Async/Await

**What it is:**
- Simplest way to fetch data in App Router
- Use `async/await` directly in Server Components
- No special functions needed
- Automatic optimization

**How it works:**
```javascript
// app/blog/page.js
export default async function BlogPage() {
  // Direct async/await - this is a Server Component
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**Benefits:**
- ✅ Simple and intuitive
- ✅ Automatic caching
- ✅ Type-safe with TypeScript
- ✅ No extra configuration

**When to use:**
- Server Components
- Static or dynamic data
- API calls, database queries
- File system operations

#### Automatic Fetch Caching

**What it is:**
- Next.js automatically caches `fetch()` requests
- Improves performance
- Reduces server load
- Configurable behavior

**Default Behavior:**
- `fetch()` requests are cached indefinitely
- Same request = cached response
- Fast subsequent requests

**Example:**
```javascript
// First request: Fetches from API
const data = await fetch('https://api.example.com/data');

// Second request: Uses cached data (fast!)
const data2 = await fetch('https://api.example.com/data');
```

---

### Fetch Cache Options:

#### 1. Force Cache (Default)
```javascript
const data = await fetch('https://api.example.com/data', {
  cache: 'force-cache' // Default - cached indefinitely
});
```

**What it does:**
- Caches response indefinitely
- Uses cached data on subsequent requests
- Never revalidates automatically

**When to use:**
- Static data that doesn't change
- Content that updates rarely
- Performance-critical pages

#### 2. No Store (Always Fresh)
```javascript
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store' // Always fetch fresh data
});
```

**What it does:**
- Never caches response
- Always fetches fresh data
- Each request = new API call

**When to use:**
- Real-time data
- User-specific content
- Data that changes frequently
- Authentication-dependent data

#### 3. Revalidate (ISR - Incremental Static Regeneration)
```javascript
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // Revalidate every 60 seconds
});
```

**What it does:**
- Caches response initially
- Revalidates after time period (60 seconds)
- Background regeneration
- Best of SSG and SSR

**When to use:**
- Content that updates periodically
- Blog posts, news articles
- Product listings
- Data that changes but not constantly

**How it works:**
1. First request: Fetches and caches data
2. Next 60 seconds: Serves cached data (fast!)
3. After 60 seconds: Next request triggers background revalidation
4. Subsequent requests: Get fresh data

---

### Pages Router: Data Fetching (Legacy)

#### getServerSideProps (SSR)

**What it is:**
- Runs on **every request**
- Server-side rendering
- Fresh data on each page load

**How it works:**
```javascript
// pages/blog/[id].js
export async function getServerSideProps(context) {
  const { id } = context.params;
  const post = await fetch(`https://api.example.com/posts/${id}`).then(res => res.json());
  
  return {
    props: {
      post
    }
  };
}

export default function BlogPost({ post }) {
  return <div>{post.title}</div>;
}
```

**Characteristics:**
- ✅ Always fresh data
- ✅ Can access request context
- ✅ Good for user-specific content
- ❌ Slower (runs on every request)
- ❌ Higher server load

**When to use:**
- User dashboards
- Real-time data
- Authentication-required pages
- Content that changes frequently

#### getStaticProps (SSG)

**What it is:**
- Runs at **build time**
- Pre-renders pages
- Same data for all users

**How it works:**
```javascript
// pages/blog/[id].js
export async function getStaticProps(context) {
  const { id } = context.params;
  const post = await fetch(`https://api.example.com/posts/${id}`).then(res => res.json());
  
  return {
    props: {
      post
    }
  };
}

export default function BlogPost({ post }) {
  return <div>{post.title}</div>;
}
```

**Characteristics:**
- ✅ Fastest performance
- ✅ Best SEO
- ✅ No server needed
- ❌ Data is static until rebuild
- ❌ Must rebuild to update

**When to use:**
- Blog posts
- Documentation
- Marketing pages
- Static content

#### getStaticPaths (Dynamic Routes for SSG)

**What it is:**
- Defines which dynamic routes to pre-render
- Works with `getStaticProps`
- Generates static pages for specified paths

**How it works:**
```javascript
// pages/blog/[id].js
export async function getStaticPaths() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return {
    paths,
    fallback: false // or 'blocking' or true
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const post = await fetch(`https://api.example.com/posts/${id}`).then(res => res.json());
  
  return {
    props: { post }
  };
}
```

**Fallback Options:**
- `fallback: false` - 404 if path not in list
- `fallback: 'blocking'` - Generate on-demand, wait for generation
- `fallback: true` - Show loading state, generate in background

---

### Client-Side Data Fetching

**What it is:**
- Fetching data in the browser
- Using `useEffect` and `fetch`
- Or using data fetching libraries

**How it works:**
```javascript
'use client';
import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  if (!data) return <div>Loading...</div>;
  
  return <div>{data.title}</div>;
}
```

**When to use:**
- User interactions trigger fetches
- Real-time updates
- Data that changes based on user input
- Client Components only

**Limitations:**
- ❌ Not SEO-friendly
- ❌ Slower initial load
- ❌ More JavaScript bundle

---

### Data Fetching Best Practices:

#### 1. Use Server Components by Default
```javascript
// ✅ Good - Server Component
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// ❌ Avoid - Client Component when not needed
'use client';
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>{data}</div>;
}
```

#### 2. Choose Right Caching Strategy
- **Static content:** `cache: 'force-cache'`
- **Dynamic content:** `cache: 'no-store'`
- **Periodic updates:** `revalidate: 60`

#### 3. Fetch Only What You Need
```javascript
// ✅ Good - Specific endpoint
const user = await fetch(`/api/users/${id}`);

// ❌ Avoid - Fetching everything
const allUsers = await fetch('/api/users');
const user = allUsers.find(u => u.id === id);
```

#### 4. Handle Errors
```javascript
export default async function Page() {
  try {
    const data = await fetch('https://api.example.com/data');
    if (!data.ok) throw new Error('Failed to fetch');
    return <div>{data}</div>;
  } catch (error) {
    return <div>Error loading data</div>;
  }
}
```

#### 5. Use Loading States
- Show loading UI while fetching
- Use `loading.js for automatic loading states
- Better user experience

---

### Comparison: App Router vs Pages Router

| Feature | App Router | Pages Router |
|---------|------------|--------------|
| **Method** | Direct `async/await` | `getServerSideProps`, `getStaticProps` |
| **Caching** | Automatic with options | Manual configuration |
| **Type Safety** | ✅ Better | ⚠️ Good |
| **Ease of Use** | ✅ Simpler | ⚠️ More complex |
| **Flexibility** | ✅ More flexible | ⚠️ Limited |

---

### Common Patterns:

#### Pattern 1: Static Data (SSG)
```javascript
// App Router
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache'
  });
  return <div>{data}</div>;
}
```

#### Pattern 2: Dynamic Data (SSR)
```javascript
// App Router
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'
  });
  return <div>{data}</div>;
}
```

#### Pattern 3: Periodic Updates (ISR)
```javascript
// App Router
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 1 hour
  });
  return <div>{data}</div>;
}
```

---

### Summary:

**Key Takeaways:**
- App Router: Use `async/await` directly in Server Components
- Pages Router: Use `getServerSideProps` or `getStaticProps`
- Caching: Choose strategy based on data freshness needs
- Server Components: Default choice for data fetching
- Client Components: Only when you need interactivity

**Remember:**
- Fetch on server when possible (better performance, SEO)
- Use appropriate caching strategy
- Handle errors gracefully
- Show loading states
- Fetch only what you need
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

API Routes allow you to build backend functionality directly in your Next.js application. You can create API endpoints without a separate backend server, making it perfect for full-stack applications.

### What are API Routes?

**API Routes** are:
- Server-side endpoints in your Next.js app
- Handle HTTP requests (GET, POST, PUT, DELETE, etc.)
- Can access databases, file system, external APIs
- Perfect for building full-stack applications

**Key Benefits:**
- ✅ No separate backend needed
- ✅ Same deployment as frontend
- ✅ Type-safe with TypeScript
- ✅ Easy to maintain
- ✅ Server-side only (secure)

### App Router: API Routes (Next.js 13+)

#### Basic API Route

**Structure:**
```
app/api/route.js → /api
```

**How it works:**
```javascript
// app/api/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

**HTTP Methods Supported:**
- `GET` - Retrieve data
- `POST` - Create data
- `PUT` - Update data
- `DELETE` - Delete data
- `PATCH` - Partial update
- `HEAD`, `OPTIONS` - Other HTTP methods

#### Dynamic API Routes

**Structure:**
```
app/api/users/[id]/route.js → /api/users/123
```

**Example:**
```javascript
// app/api/users/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  const user = await getUserById(id);
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  
  return NextResponse.json(user);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const updatedUser = await updateUser(id, body);
  return NextResponse.json(updatedUser);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await deleteUser(id);
  return NextResponse.json({ message: 'User deleted' });
}
```

#### Accessing Request Data

**Request Body:**
```javascript
export async function POST(request) {
  const body = await request.json(); // Parse JSON body
  return NextResponse.json({ received: body });
}
```

**Query Parameters:**
```javascript
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const age = searchParams.get('age');
  return NextResponse.json({ name, age });
}
// Usage: /api/users?name=John&age=30
```

**Headers:**
```javascript
export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  return NextResponse.json({ auth: authHeader });
}
```

**Cookies:**
```javascript
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  return NextResponse.json({ token: token?.value });
}
```

### Pages Router: API Routes (Legacy)

#### Basic API Route

**Structure:**
```
pages/api/users.js → /api/users
```

**Example:**
```javascript
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    res.status(201).json({ message: 'User created' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

#### Dynamic API Routes

**Structure:**
```
pages/api/users/[id].js → /api/users/123
```

**Example:**
```javascript
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    res.status(200).json({ id, name: 'User' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ message: 'Deleted' });
  }
}
```

### Common Use Cases:

#### 1. Form Submissions

**Example:**
```javascript
// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, email, message } = await request.json();
  
  // Validate data
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'All fields required' },
      { status: 400 }
    );
  }
  
  // Save to database or send email
  await saveContactForm({ name, email, message });
  
  return NextResponse.json({ success: true });
}
```

#### 2. Database Operations

**Example:**
```javascript
// app/api/posts/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET() {
  const posts = await db.posts.findMany();
  return NextResponse.json(posts);
}

export async function POST(request) {
  const data = await request.json();
  const post = await db.posts.create({ data });
  return NextResponse.json(post, { status: 201 });
}
```

#### 3. Authentication

**Example:**
```javascript
// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function POST(request) {
  const { email, password } = await request.json();
  
  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }
  
  const isValid = await compare(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }
  
  const token = sign({ userId: user.id }, process.env.JWT_SECRET);
  return NextResponse.json({ token });
}
```

#### 4. Webhooks

**Example:**
```javascript
// app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const event = await request.json();
  
  // Handle different event types
  switch (event.type) {
    case 'payment.succeeded':
      await handlePaymentSuccess(event.data);
      break;
    case 'payment.failed':
      await handlePaymentFailure(event.data);
      break;
  }
  
  return NextResponse.json({ received: true });
}
```

#### 5. Proxy Requests

**Example:**
```javascript
// app/api/proxy/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  const response = await fetch(url);
  const data = await response.json();
  
  return NextResponse.json(data);
}
```

### Response Helpers:

#### JSON Response
```javascript
return NextResponse.json({ message: 'Success' });
```

#### Error Response
```javascript
return NextResponse.json(
  { error: 'Not found' },
  { status: 404 }
);
```

#### Redirect
```javascript
return NextResponse.redirect('https://example.com');
```

#### Set Headers
```javascript
return NextResponse.json(
  { data: 'value' },
  {
    headers: {
      'Set-Cookie': 'token=abc123',
      'Cache-Control': 'no-store'
    }
  }
);
```

### Best Practices:

#### 1. Validate Input
```javascript
export async function POST(request) {
  const body = await request.json();
  
  // Always validate
  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json(
      { error: 'Invalid email' },
      { status: 400 }
    );
  }
  
  // Process request
}
```

#### 2. Handle Errors Gracefully
```javascript
export async function GET() {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 3. Use Environment Variables
```javascript
// Never expose secrets in code
const apiKey = process.env.API_KEY;
const dbUrl = process.env.DATABASE_URL;
```

#### 4. Set Appropriate Status Codes
```javascript
// 200 - Success
return NextResponse.json({ data }, { status: 200 });

// 201 - Created
return NextResponse.json({ data }, { status: 201 });

// 400 - Bad Request
return NextResponse.json({ error }, { status: 400 });

// 401 - Unauthorized
return NextResponse.json({ error }, { status: 401 });

// 404 - Not Found
return NextResponse.json({ error }, { status: 404 });

// 500 - Server Error
return NextResponse.json({ error }, { status: 500 });
```

#### 5. Use TypeScript for Type Safety
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: string;
  name: string;
  email: string;
}

export async function GET(): Promise<NextResponse<User[]>> {
  const users: User[] = await getUsers();
  return NextResponse.json(users);
}
```

### Security Considerations:

#### 1. Never Trust Client Input
```javascript
// Always validate and sanitize
const input = await request.json();
const sanitized = sanitizeInput(input);
```

#### 2. Use HTTPS in Production
- Always use HTTPS for API routes
- Protect sensitive data in transit

#### 3. Implement Rate Limiting
```javascript
// Prevent abuse
const rateLimit = new Map();

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for');
  const count = rateLimit.get(ip) || 0;
  
  if (count > 10) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
  
  rateLimit.set(ip, count + 1);
  // Process request
}
```

#### 4. Validate Authentication
```javascript
export async function GET(request) {
  const token = request.headers.get('authorization');
  
  if (!isValidToken(token)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Process authenticated request
}
```

### App Router vs Pages Router:

| Feature | App Router | Pages Router |
|---------|------------|--------------|
| **File Structure** | `app/api/route.js` | `pages/api/users.js` |
| **Handler** | Named exports (`GET`, `POST`) | Default export function |
| **Request Object** | Web API Request | Node.js req/res |
| **Response** | `NextResponse` | `res.json()`, `res.status()` |
| **Type Safety** | ✅ Better | ⚠️ Good |
| **Modern** | ✅ Yes | ⚠️ Legacy |

### Summary:

**Key Takeaways:**
- API Routes let you build backend in Next.js
- App Router uses modern Web API (Request/Response)
- Pages Router uses Node.js style (req/res)
- Always validate input and handle errors
- Use appropriate HTTP methods and status codes
- Secure your API routes

**Remember:**
- API Routes are server-side only (secure)
- Perfect for full-stack applications
- No separate backend needed
- Type-safe with TypeScript
- Follow RESTful conventions
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

Next.js provides powerful built-in tools for managing metadata and optimizing your site for search engines. Understanding metadata and SEO is essential for building discoverable, shareable websites.

### What is Metadata?

**Metadata** is information about your webpage that:
- Describes the page content
- Helps search engines understand your page
- Controls how your page appears in search results
- Determines how your page looks when shared on social media

**Common Metadata Types:**
- **Title:** The page title shown in browser tabs and search results
- **Description:** Brief summary of page content (shown in search results)
- **Keywords:** Relevant terms (less important now, but still used)
- **Open Graph:** Controls how page appears on Facebook, LinkedIn, etc.
- **Twitter Cards:** Controls how page appears on Twitter/X
- **Canonical URL:** Prevents duplicate content issues

### What is SEO?

**SEO (Search Engine Optimization)** is the practice of:
- Making your website discoverable by search engines
- Improving your ranking in search results
- Getting more organic (free) traffic
- Making your content accessible to search engines

**Why SEO Matters:**
- ✅ More visibility = more visitors
- ✅ Better rankings = more traffic
- ✅ Organic traffic is free (vs paid ads)
- ✅ Long-term growth strategy

### How Next.js Helps with SEO

**Built-in SEO Features:**
1. Server-side rendering (content in HTML)
2. Automatic metadata management
3. Sitemap generation
4. Robots.txt handling
5. Social media optimization
6. Performance optimization (affects SEO)

---

### App Router: Metadata Management

**Modern Approach (Next.js 13+):**

#### Static Metadata

**What it is:**
- Metadata defined at build time
- Same for all users
- Defined using `metadata` object

**How to use:**
```javascript
// app/about/page.js
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  keywords: ['about', 'company', 'team'],
}
```

**Benefits:**
- ✅ Simple and straightforward
- ✅ Type-safe (TypeScript support)
- ✅ Automatic optimization

#### Dynamic Metadata

**What it is:**
- Metadata that changes based on data
- Different for each page/request
- Uses `generateMetadata` function

**How to use:**
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

**When to use:**
- Blog posts (each post has different metadata)
- Product pages (each product has different info)
- User profiles (each user has different data)
- Any page with dynamic content

**Benefits:**
- ✅ SEO-friendly (unique metadata per page)
- ✅ Better social sharing
- ✅ Improved search rankings

---

### Pages Router: Metadata Management

**Legacy Approach (Next.js 12 and earlier):**

#### Using Head Component

**What it is:**
- Client-side metadata management
- Uses `<Head>` component from `next/head`
- Renders in browser

**How to use:**
```javascript
// pages/about.js
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

**Limitations:**
- ❌ Client-side only (not ideal for SEO)
- ❌ More manual work
- ❌ Less type-safe

#### Custom Document

**What it is:**
- Global metadata for all pages
- Defined in `pages/_document.js`
- Applies to entire site

**How to use:**
```javascript
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="author" content="Your Name" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

### Automatic Sitemap Generation

**What is a Sitemap?**
- XML file listing all pages on your site
- Helps search engines discover and index pages
- Improves crawling efficiency

**How Next.js Generates Sitemaps:**

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
    {
      url: 'https://yoursite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

**Benefits:**
- ✅ Search engines find all pages
- ✅ Faster indexing
- ✅ Better SEO
- ✅ Automatic updates

---

### Robots.txt

**What is robots.txt?**
- File that tells search engines which pages to crawl
- Controls search engine access
- Prevents indexing of certain pages

**How Next.js Handles It:**

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

**Common Use Cases:**
- Block admin pages from indexing
- Prevent duplicate content
- Control crawling rate
- Protect private areas

---

### Open Graph Tags

**What are Open Graph Tags?**
- Metadata for social media sharing
- Controls how your page appears on Facebook, LinkedIn, WhatsApp
- Makes shares look professional

**What They Control:**
- **og:title:** Title shown in social post
- **og:description:** Description shown
- **og:image:** Image shown (important!)
- **og:url:** Canonical URL
- **og:type:** Type of content (website, article, etc.)

**How Next.js Handles It:**

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

**Why It Matters:**
- ✅ Professional appearance when shared
- ✅ More clicks (attractive preview)
- ✅ Better engagement
- ✅ Brand consistency

**Best Practices:**
- Always include an image (1200x630px recommended)
- Write compelling titles and descriptions
- Use high-quality images
- Test with Facebook Debugger

---

### Twitter Cards

**What are Twitter Cards?**
- Special metadata for Twitter/X
- Makes tweets with your links look better
- Increases engagement

**Card Types:**
- **Summary:** Basic card with title, description, image
- **Summary Large Image:** Larger image version
- **Player:** For video content
- **App:** For mobile apps

**How Next.js Handles It:**

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

**Benefits:**
- ✅ Stands out in Twitter feed
- ✅ More retweets and clicks
- ✅ Professional appearance
- ✅ Better engagement

---

### SEO Best Practices

**1. Unique Metadata Per Page:**
- Each page should have unique title and description
- Don't duplicate metadata across pages
- Make it relevant to page content

**2. Descriptive Titles:**
- Keep under 60 characters
- Include important keywords
- Make it compelling
- Include brand name if space allows

**3. Compelling Descriptions:**
- Keep under 160 characters
- Summarize page content
- Include call-to-action
- Use relevant keywords naturally

**4. Use Images:**
- Always include Open Graph image
- Use high-quality images (1200x630px)
- Optimize image file size
- Use descriptive alt text

**5. Structured Data:**
- Use JSON-LD for rich snippets
- Helps search engines understand content
- Can show extra info in search results

**6. Performance:**
- Fast page load (affects SEO)
- Mobile-friendly (mobile-first indexing)
- Accessible content
- Clean URL structure

---

### Common SEO Mistakes to Avoid

❌ **Don't:** Use same metadata on all pages
```javascript
// Bad - same title everywhere
export const metadata = { title: 'My Website' }
```

✅ **Do:** Use unique metadata per page
```javascript
// Good - unique per page
export const metadata = { title: 'About Us - My Website' }
```

❌ **Don't:** Forget Open Graph images
✅ **Do:** Always include social sharing images

❌ **Don't:** Use generic descriptions
✅ **Do:** Write specific, compelling descriptions

❌ **Don't:** Ignore mobile optimization
✅ **Do:** Ensure mobile-friendly design

❌ **Don't:** Forget to generate sitemap
✅ **Do:** Always create sitemap for better indexing

---

### App Router vs Pages Router Comparison

| Feature | App Router | Pages Router |
|---------|------------|--------------|
| **Metadata** | `metadata` object | `<Head>` component |
| **Dynamic** | `generateMetadata()` | Manual in component |
| **Type Safety** | ✅ Built-in | ❌ Manual |
| **SEO** | ✅ Better (server-side) | ⚠️ Good (client-side) |
| **Sitemap** | `sitemap.js` | Manual or plugin |
| **Robots.txt** | `robots.js` | Manual file |
| **Ease of Use** | ✅ Easier | ⚠️ More manual |

**Recommendation:** Use App Router for new projects (better SEO, easier to use)

---

### Summary

**Key Takeaways:**
- Metadata helps search engines and social media understand your pages
- Next.js makes metadata management easy and automatic
- App Router provides better SEO features than Pages Router
- Always use unique, descriptive metadata per page
- Include Open Graph and Twitter Cards for social sharing
- Generate sitemaps and robots.txt automatically
- Follow SEO best practices for better rankings

**Remember:** Good SEO is a long-term strategy. Consistent, quality content with proper metadata will improve your search rankings over time.
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

