# How to Identify SSR, CSR, and SSG in Your Project

## Quick Identification Guide

### 🔵 **CSR (Client-Side Rendering)** - Renders in Browser

**Look for:**
- `"use client"` directive at the top of the file
- React hooks: `useState`, `useEffect`, `useRouter`, etc.
- Browser APIs: `window`, `localStorage`, `document`, etc.
- Event handlers: `onClick`, `onChange`, etc.

**Examples in Your Project:**

1. **`app/page.tsx`** - Home Page
   ```tsx
   "use client";  // ← CSR Indicator
   import { useState, useEffect } from "react";
   ```

2. **`app/content/page.tsx`** - Content Page
   ```tsx
   "use client";  // ← CSR Indicator
   import { useState, useEffect } from "react";
   ```

3. **`app/components/ConceptPageContent.tsx`**
   ```tsx
   "use client";  // ← CSR Indicator
   import { useRouter, usePathname } from "next/navigation";
   ```

4. **`app/components/QuizModal.tsx`**
   ```tsx
   "use client";  // ← CSR Indicator
   ```

**All files with `"use client"` are CSR components.**

---

### 🟢 **SSG (Static Site Generation)** - Pre-rendered at Build Time

**Look for:**
- No `"use client"` directive
- Uses `fs.readFileSync()` or `fs.readFile()` to read files
- No `export const dynamic = 'force-dynamic'`
- No async data fetching from APIs
- Server-side file operations

**Examples in Your Project:**

1. **`app/concepts/[concept]/page.tsx`** - Dynamic Concept Pages
   ```tsx
   // No "use client" ← SSG Indicator
   import fs from "fs";
   import path from "path";
   
   export default function ConceptDynamicPage({ params }: ConceptPageProps) {
     const filePath = path.join(process.cwd(), "concepts", `${conceptName}.md`);
     const content = fs.readFileSync(filePath, "utf8");  // ← Reads at build time
     return <ConceptPageContent content={content} conceptName={conceptName} />;
   }
   ```

2. **`app/concepts/node/page.tsx`**
   ```tsx
   // No "use client" ← SSG Indicator
   import fs from "fs";
   const content = fs.readFileSync(filePath, "utf8");  // ← Static file read
   ```

3. **`app/concepts/nextjs/page.tsx`**
   ```tsx
   // No "use client" ← SSG Indicator
   import fs from "fs";
   const content = fs.readFileSync(filePath, "utf8");
   ```

**Note:** Even though these use `fs.readFileSync()`, Next.js will pre-render them at build time, making them SSG.

---

### 🟡 **SSR (Server-Side Rendering)** - Renders on Each Request

**Look for:**
- No `"use client"` directive
- `export const dynamic = 'force-dynamic'` ← SSR Indicator
- Or uses `fetch()` with `cache: 'no-store'`
- Or uses `cookies()`, `headers()` from Next.js

**Examples in Your Project:**

1. **`app/concepts/webdevelopment/page.tsx`**
   ```tsx
   // No "use client" ← Server Component
   export const dynamic = 'force-dynamic';  // ← SSR Indicator
   
   export default function WebdevelopmentPage() {
     const content = fs.readFileSync(filePath, "utf8");
     return <ConceptPageContent content={content} />;
   }
   ```

2. **`app/concepts/vs-comparisons/page.tsx`**
   ```tsx
   // No "use client" ← Server Component
   export const dynamic = 'force-dynamic';  // ← SSR Indicator
   
   export default function VsComparisonsPage() {
     const content = fs.readFileSync(filePath, "utf8");
     return <ConceptPageContent content={content} />;
   }
   ```

**These pages render on every request, not at build time.**

---

### 🔴 **ISR (Incremental Static Regeneration)** - Not Currently Used

**Look for:**
- `export const revalidate = 60;` (number in seconds)
- Or `fetch()` with `next: { revalidate: 60 }`

**Your Project:** ❌ Not using ISR currently

**To add ISR, you would do:**
```tsx
export const revalidate = 3600; // Revalidate every hour

export default function MyPage() {
  // ... your code
}
```

---

## Summary Table for Your Project

| File/Component | Rendering Type | Indicator |
|---------------|----------------|-----------|
| `app/page.tsx` | **CSR** | `"use client"` |
| `app/content/page.tsx` | **CSR** | `"use client"` |
| `app/portfolio/page.tsx` | **CSR** | `"use client"` |
| `app/components/*.tsx` | **CSR** | `"use client"` |
| `app/concepts/[concept]/page.tsx` | **SSG** | No `"use client"`, uses `fs.readFileSync()` |
| `app/concepts/node/page.tsx` | **SSG** | No `"use client"`, uses `fs.readFileSync()` |
| `app/concepts/webdevelopment/page.tsx` | **SSR** | `export const dynamic = 'force-dynamic'` |
| `app/concepts/vs-comparisons/page.tsx` | **SSR** | `export const dynamic = 'force-dynamic'` |
| `app/api/*/route.ts` | **API Routes** | Server-side only |

---

## How to Check in Browser DevTools

1. **View Page Source** (Right-click → View Page Source)
   - **SSG/SSR**: HTML content is visible in source
   - **CSR**: Mostly empty HTML, content loads via JavaScript

2. **Network Tab**
   - **SSG**: Fast initial load, HTML already contains content
   - **SSR**: HTML fetched on each request
   - **CSR**: HTML minimal, JavaScript fetches data

3. **Disable JavaScript**
   - **SSG/SSR**: Content still visible
   - **CSR**: Content disappears (needs JavaScript)

---

## Quick Decision Tree

```
Does the file have "use client"?
├─ YES → CSR (Client-Side Rendering)
└─ NO → Is it a Server Component?
    ├─ Has "export const dynamic = 'force-dynamic'"?
    │   └─ YES → SSR (Server-Side Rendering)
    ├─ Has "export const revalidate = X"?
    │   └─ YES → ISR (Incremental Static Regeneration)
    └─ NO → SSG (Static Site Generation)
```

---

## Your Current Project Breakdown

- **CSR Pages**: 3 main pages (home, content, portfolio)
- **SSG Pages**: ~25 concept pages (most concepts)
- **SSR Pages**: 2 concept pages (webdevelopment, vs-comparisons)
- **ISR Pages**: 0 (not implemented)

**Recommendation:** Most concept pages could benefit from ISR instead of SSG if you update content frequently, or keep SSG if content is mostly static.