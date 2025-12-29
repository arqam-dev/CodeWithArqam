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

### Static Site Generation (SSG):
- Pages generated at build time
- Served as static HTML
- Fastest performance
- No server needed
- Use: Blog posts, documentation, marketing pages

### Server-Side Rendering (SSR):
- Pages generated on each request
- Fresh data on every request
- Use: User-specific content, real-time data

### Incremental Static Regeneration (ISR):
- Static pages regenerated in background
- Combines benefits of SSG and SSR
- Use: Content that updates periodically

### Client-Side Rendering (CSR):
- Rendered in browser
- Use: Dashboard, admin panels, authenticated content
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

