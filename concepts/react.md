# React

## Primary Concepts

<expand title="Version History">
## Version History (Main Versions)

- React 0.3.0 - 2013
- React 0.14.0 - 2015
- React 15.0.0 - 2016
- React 16.0.0 - 2017 (Fiber Architecture)
- React 16.8.0 - 2019 (Hooks)
- React 17.0.0 - 2020
- React 18.0.0 - 2022 (Concurrent Features)
- React 19.0.0 - 2024
</expand>

<expand title="Introduction & Overview">
## Introduction & Overview

React is a front-end library developed by Facebook (now Meta) used for handling the view layer for web and mobile apps. It allows creating reusable UI components and is currently one of the most popular JavaScript libraries.

- React + React-DOM → For web development
- React + React Native → For mobile app development

### Conventions

- Component names → TitleCase
- File names → TitleCase, except index.js

### JSX (JavaScript XML)

- Syntax extension of JavaScript used to describe UI
- HTML-like syntax that can coexist with JavaScript
- Transpiled using Babel into JS (React.createElement calls)
- Faster than regular JavaScript due to optimization during compilation
- Type-safe - most errors caught during compilation
- Makes templates easier to write if familiar with HTML

### Strict Mode

- `<React.StrictMode>` activates extra checks and warnings (not for production)

### Best Practices

- Keep components small and function-specific
- Reusability is important - minimize new component creation
- Consolidate duplicate code (DRY principle)
- Separate stateful aspects from rendering
- All files related to one component should be in single folder
- Write tests for all code
- Follow linting rules

### SEO

- SEO issues in CSR solved using Next.js
</expand>

<expand title="Virtual DOM">
## Virtual DOM

- Lightweight copy of the real DOM stored in memory
- React updates Virtual DOM first → compares new & old Virtual DOM → updates only changed parts in real DOM
- Purpose: Improves performance by minimizing direct DOM manipulation
</expand>

<expand title="Diffing Algorithm">
## Diffing Algorithm

Runs on change of prop or state:

- Detect change and mark component as dirty
- Create new Virtual DOM
- Compare (Diffing) with old Virtual DOM
- Update only changed nodes in Real DOM
</expand>

<expand title="Reconciliation">
## Reconciliation

Overall process of updating the DOM when component state or props change. Uses Diffing Algorithm to decide what and how to update efficiently.

### Detailed Steps

#### Step 1: What actually happens when state changes

- React creates a new Virtual DOM tree (in memory) based on the updated state
- It then compares (diffs) this new Virtual DOM with the previous one
- React calculates the minimal set of changes (called "patches")
- Only those specific patches are applied to the real DOM

#### Step 2: When does React update the Real DOM

**NOTE:** React batches(collects) updates — it doesn't update the real DOM immediately for every single small state change.

##### Before React 18 (Legacy Mode)

- React would only batch updates (combine multiple small changes into one) inside event handlers — like onClick, onChange, etc.

**Example:**
```javascript
function handleClick() {
    setCount(c => c + 1);
    setName("Arqam");
}
// Both updates happen together → React updates the real DOM once, not twice.
```

**Example:**
```javascript
setCount(c => c + 1);
await fetchData();
setName("Arqam");
// These would trigger two separate DOM updates, because they're not inside the same event — React didn't batch async updates before React 18.
```

##### Concurrent Mode (React 18+)

**NOTE:** React now automatically batches (collects) updates everywhere, not just inside events.

**Example:**
```javascript
async function handleAsync() {
    setCount(c => c + 1);
    await fetchData();
    setName("Arqam");
}
// Even though there's an await (async code), React waits, collects all changes, and updates the real DOM once — very efficient.
```

#### Summary

- **Legacy React:** Combined updates only inside event handlers. Painting the whole wall in one go → user can't do anything until painting finishes. Although can batch events inside an event handler to achieve a little efficiency.
- **React 18+:** React batches all updates that happen close together — within the same logical block async function, or event loop tick. Painting one section at a time → user can still interact with the app while painting continues.
</expand>

<expand title="React Fiber">
## React Fiber

- New reconciliation engine (React 16+)
- Supports asynchronous rendering (splitting rendering work into chunks)
- Can pause, resume, or reuse work → better performance in complex apps
- If the browser is busy (user typing, scrolling), React can pause rendering, let the browser handle it, then resume later
</expand>

<expand title="Hydration">
## Hydration

- Used in Server-Side Rendering (SSR)
- Browser receives ready-made HTML → React attaches event handlers to make it interactive
</expand>

<expand title="Shadow DOM vs Virtual DOM">
## Shadow DOM vs Virtual DOM

- Shadow DOM → Used for encapsulation in Web Components
- Virtual DOM → Used internally by React for efficient UI rendering
- Shadow DOM affects styling and structure; Virtual DOM affects rendering performance

### Shadow DOM

- Not specific to React — it's a general web standard used by browsers
- Part of Web Components (custom HTML elements)
- Purpose: Encapsulate DOM & CSS so styles or structure inside the component don't leak outside, and outside styles don't affect it
- Example: `<my-button>` can have its own internal HTML and CSS isolated from the rest of the page
</expand>

<expand title="Hooks">
## Hooks

Purpose: Manage state, side effects, and lifecycle in functional components

### Core Hooks

#### useState()

- Manage local state

**Example:**
```javascript
const [count, setCount] = useState(0);
setCount(count + 1);
// Stores and updates local data inside a component.
```

#### useEffect()

- Handle side effects (API calls, subscriptions)
- Syntax: `useEffect(callback, dependencies)`

**Runs after every render:**
```javascript
useEffect(() => {
    console.log("Runs after every render");
});
// Useful for debugging or syncing with something external.
```

**Runs only on mount:**
```javascript
useEffect(() => {
    console.log("Runs only on mount.");
}, []);
// Equivalent to componentDidMount. Commonly used for initial API calls.
```

**Runs when dependency changes:**
```javascript
useEffect(() => {
    console.log("Runs when count changes");
}, [count]);
// Runs only when the listed dependencies (e.g., count) change. Equivalent to componentDidUpdate.
```

**With cleanup:**
```javascript
useEffect(() => {
    // Start something when component loads
    const timer = setInterval(() => console.log("Running..."), 1000);

    // Cleanup — stop it when component unmounts
    return () => {
        clearInterval(timer);
        console.log("Stopped");
    };
}, []);
```

#### useContext()

- Access global data from Context API

**Example:**
```javascript
const user = useContext(UserContext);
// Used to read shared data without prop drilling (like theme, user info).
```

### Advanced Hooks

#### useRef()

- Access or store DOM elements or mutable values

**Example:**
```javascript
const inputRef = useRef();
<input ref={inputRef} />;
// Doesn't trigger re-render when updated
```

#### useMemo()

- Memoize computed values (for optimization)

**Example:**
```javascript
const total = useMemo(() => a + b, [a, b]);
// Caches expensive calculations until dependencies change.
```

#### useCallback()

- Memorize functions to prevent re-renders

**Example:**
```javascript
const handleClick = useCallback(() => console.log("Clicked"), []);
// Useful when passing functions to child components.
```

#### useReducer()

- Alternative to useState for complex logic

**Example:**
```javascript
const [state, dispatch] = useReducer(reducerFn, initialState);
// Alternative to useState when state has multiple sub-values.
```

#### useLayoutEffect()

- Runs before browser paint (DOM measurement)

**Example:**
```javascript
useLayoutEffect(() => {
    console.log("Before paint");
});
// Similar to useEffect but executes earlier — useful for layout updates.
```

#### useId()

- Generate unique IDs (React 18+)

**Example:**
```javascript
const id = useId();
<label htmlFor={id}>Name</label>
<input id={id} />
```

#### useTransition()

- Handle slow updates without blocking UI (React 18+)

**Example:**
```javascript
const [isPending, startTransition] = useTransition();
startTransition(() => setSearch(value));
// Keeps the UI responsive while deferring non-urgent updates.
```

#### useDeferredValue()

- Delay re-rendering of expensive UI updates (React 18+)

**Example:**
```javascript
const deferredValue = useDeferredValue(value);
// Postpones heavy UI updates while showing fast feedback to the user.
```
</expand>

<expand title="Concurrent Mode">
## Concurrent Mode (React 18+)

- Purpose: Make UI more responsive by splitting rendering into small chunks
- How: React can pause, resume, or interrupt rendering to prioritize user interactions
- Works well with useTransition and useDeferredValue
</expand>

<expand title="Fragment">
## Fragment

- Purpose: Allows JSX to return multiple elements without adding extra DOM nodes

### Syntax

- Short syntax: `<>...</>`
- Full syntax: `<React.Fragment>...</React.Fragment>`

**Example:**
```javascript
return (
    <>
        <h1>Hello</h1>
        <p>World</p>
    </>
);
```
</expand>

<expand title="Props, Key Prop, and Render Prop">
## Props, Key Prop, and Render Prop

### Prop

- Purpose: Pass data from parent to child components
- Read-only: Child cannot modify props

**Example:**
```javascript
function App() {
    return <Greeting name="Arqam" />;
}
function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}
```

### Key Prop

- Helps React identify which items in a list changed, added, or removed
- Prevents unnecessary re-renders of unchanged items

**Example:**
```javascript
const items = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" }
];
return (
    <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
);
```

### Render Prop

- Purpose: Share logic between components using a function as a prop that tells the component what to render
- Behavior: Allows dynamic rendering while reusing internal logic

**Example:**
```javascript
// Parent component passes a render function as a prop
function App() {
    return (
        <DataFetcher render={(data) => <p>Fetched Value: {data}</p>} />
    );
}

// Child component contains the logic and uses the render prop
function DataFetcher({ render }) {
    const [data, setData] = React.useState("Loading...");

    // Simulate fetching data
    React.useEffect(() => {
        setTimeout(() => setData("Hello World"), 1000);
    }, []);

    // Use the render prop to decide what to display
    return <div>{render(data)}</div>;
}
```
</expand>

<expand title="State Management">
## State Management

- Local State: useState, useReducer
- Global State: Context API
- External Libraries: Redux, Redux Toolkit, Zustand, Recoil, Jotai
</expand>

<expand title="Component Types">
## Component Types

### Class Components

- Stateful components (can have state)
- More complex than functional components
- Require extending from React.Component
- Use when you need lifecycle methods or state management

### Functional Components

- Stateless components (traditionally, now can use hooks for state)
- JavaScript functions that receive props and return JSX
- Simpler and preferred in modern React
- Can now use hooks for state and lifecycle

### Presentational Components (Dumb Components)

- Components focused on how things look
- Receive data via props
- Invoke callbacks from props to change data
- No direct Redux connection

### Container Components (Smart Components)

- Components concerned with how things work
- Connected to Redux store (if using Redux)
- Subscribe to Redux state to read data
- Dispatch Redux actions to change data
- Responsible for fetching data and displaying
</expand>

<expand title="Controlled vs Uncontrolled Components">
## Controlled vs Uncontrolled Components

### Controlled Components

- Form data is handled by React component state
- Input value controlled by state via setState()
- Supports instant field validation
- Allows conditional disable/enable buttons
- Enforce input formats
- Recommended approach (more "React way")
- Takes current value through props, notifies changes via callbacks

### Uncontrolled Components

- Form data is handled by the DOM
- Use refs to access form values from DOM
- Typically easier to implement
- No need for event handler for every state update
- Limited validation control
- Less React-like, but simpler for some cases

### Form Libraries

React Hook Form, Formik, React Final Form
</expand>

<expand title="Props vs State">
## Props vs State (Detailed)

### Props

- Read-only and immutable
- Pass data from parent to child components
- Can be accessed by child component
- Used to communicate between components
- Make components reusable
- External and controlled by parent component
- Can be used by class and functional components

### State

- Mutable (changes can be asynchronous)
- Holds information about the component
- Cannot be accessed by child components
- Used for rendering dynamic changes within component
- Local to component, cannot be used in other components
- Internal and controlled by React component itself
- Used to be only in class components (now useState hook for functional)

### Comparison

| Condition | Props | State |
|-----------|-------|-------|
| Initial value from parent | Yes | Yes |
| Changed by parent | Yes | No |
| Default values inside component | Yes | Yes |
| Change inside component | No | Yes |
| Set initial value for child | Yes | Yes |
| Change in child | Yes | No |

### Similarities

- Both are plain JavaScript objects
- Both can contain default values
- Both trigger re-render when changed
</expand>

<expand title="Directory Structure">
## Directory Structure

- Components Folder: Common reusable components (buttons, inputs, etc)
- Views Folder: Screens using components
- Layout Folder: Common views (Header, SideBar, Footer, etc)
</expand>

<expand title="Routing">
## Routing

Library: React Router DOM

### Route Types

#### Basic Route

- Maps a URL to a single component

**Example:**
```javascript
<Route path="/home" element={<Home />} />
```

#### Nested Route

- Routes inside other routes (child routes)

**Example:**
```javascript
<Route path="/dashboard" element={<Dashboard />}>
    <Route path="settings" element={<Settings />} />
</Route>
```

#### Dynamic Route

- URL contains variables (params)

**Example:**
```javascript
<Route path="/user/:id" element={<UserProfile />} />
```

#### Protected Route

- Only accessible if a condition is met (e.g., user is logged in)

**Example:**
```javascript
<Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
```

#### Lazy Route

- Component loads only when route is visited → improves performance

**Example:**
```javascript
const Settings = React.lazy(() => import('./Settings'));
<Route path="/settings" element={<Suspense fallback="Loading..."><Settings /></Suspense>} />
```
</expand>

<expand title="Project Creation">
## Project Creation

- CRA: `npx create-react-app myApp` (Deprecated in 2025)
- Vite (Preferred): `npm create vite@latest myApp`
</expand>

<expand title="Rendering Methods">
## Rendering Methods

- **CSR (Client-Side Rendering):** Rendered in browser after JS loads (React, Angular)
- **SSR (Server-Side Rendering):** HTML generated on server, hydrated in client (Next.js)
- **SSG (Static Site Generation):** Pre-built HTML at build time (Next.js static export)
  - The HTML pages of your website are pre-built at build time, not on the fly
  - Ideal for pages that don't change often, like blogs, documentation, landing pages
- **ISR (Incremental Static Regeneration):** SSG + on-demand regeneration (Next.js revalidate)
</expand>

<expand title="Optimization Techniques">
## Optimization Techniques

- Avoid anonymous functions in render
- Use React.memo for pure components
- Use useMemo / useCallback for optimization
- Lazy load heavy components
- Split code using dynamic imports
- Manage large states efficiently
</expand>

## Secondary Concepts

<expand title="Portals">
## Portals

**Why:** Sometimes you need an element to appear visually above other content, like modals, tooltips, dropdowns, or overlays, but without affecting the CSS/layout of the parent component.

Without Portals, all JSX must be returned in the normal React component tree.

**Example:**
```javascript
// HTML
<div id="modal-root"></div>

// React
const Modal = () => {
    return ReactDOM.createPortal(
        <div className="modal">
            <h1>I'm a modal!</h1>
        </div>,
        document.getElementById("modal-root") // Renders outside main app div
    );
};

function App() {
    return (
        <div>
            <h1>Main App</h1>
            <Modal />
        </div>
    );
}
```
</expand>

<expand title="Higher-Order Components (HOCs)">
## Higher-Order Components (HOCs)

- Purpose: Reuse component logic by wrapping a component in a function that returns a new enhanced component
- A function in React that takes a component as input and returns a new enhanced component
- It wraps it and adds extra behavior without updating the main component (like a Decorator)

### Example Scenarios

- Adding common UI elements (like headers, borders, or greetings)
- Logging or analytics
</expand>

<expand title="Error Boundaries">
## Error Boundaries

- Purpose: Catch JavaScript errors in a component tree and show a fallback UI instead of crashing the whole app
- Why: Without error boundaries, an error in a child component can break the entire React app

**Example:**
```javascript
class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log("Error:", error, info);
    }

    render() {
        return this.state.hasError ? <h1>Something went wrong!</h1> : this.props.children;
    }
}

// Usage
<ErrorBoundary>
    <MyComponent />
</ErrorBoundary>
```
</expand>

<expand title="Suspense">
## Suspense

- Purpose: Handle lazy-loaded components or async data gracefully
- Why: Show a fallback UI (like a loader) while waiting for components or data

**Example:**
```javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
    return (
        <React.Suspense fallback={<h1>Loading...</h1>}>
            <LazyComponent />
        </React.Suspense>
    );
}
// React.lazy() → dynamically imports a component.
```
</expand>
