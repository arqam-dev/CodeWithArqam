# JavaScript

## Primary Concepts

<expand title="Version History (ECMAScript Versions)">
## Version History (ECMAScript Versions)

- ES1 (ECMAScript 1) - 1997
- ES2 - 1998
- ES3 - 1999
- ES5 - 2009
- ES6/ES2015 - 2015 (Major update: Classes, Modules, Arrow functions, Promises)
- ES2016 - 2016
- ES2017 - 2017
- ES2018 - 2018
- ES2019 - 2019
- ES2020 - 2020
- ES2021 - 2021
- ES2022 - 2022
- ES2023 - 2023
- ES2024 - 2024

</expand>

<expand title="General Points">
## General Points

- function statement = function declaration
- cannot call arrow or anonymous function with name after placing in a varible, because after that function name becomes in local scope. we can call by variable name as normally we do.
- browser has local storage, timers, etc.
- whenever the programe executes in JS, Global context object is created even on running the empty js file.
- Dev goal: do not block the main thread
- When we load a web page, two things happen. HTML parsing & Scripts loading.
- POC = proof of concept
- 0 == "0" and 0 == []; therefore, "0" != []
- work around = CHAIPI
- let arr = [1,2,3].; console.log(typeof(arr)); // object
- functions and classses are default inherited with "prototype" in JS. // has to confirm
- we usually use ".then" in promise of callback, ".then" also returns a promise.
- let courseHolder = {};

courseHolder['name'] = 'arqam'; = courseHolder.name = 'arqam'; // output: {name: "arqam"};

courseHolder[0] = 'arqam'; !== courseHolder.0 = 'arqam'; // second will give error.

NOTE: How to get value when use 0 instead of name like courseHolder.name. We can't write courseHolder.0 to access objects.

- mocha => livescript => javascript
- if it is not the primitive (boolean, null, undefined, number, string, NAN, symbol) then it is an object(functions, arrays, class instances, etc)
- non-primitive: Object, Array, RegExp
- truthy and falsy
- In JS object, array and functions are reference type when you campare two objects their reference mismatch.
- shallow copy = by reference, faster
- let arr = [1,2,3,4,5]; arr.length = 0; console.log(arr)//[] , arr.length=3; console.log(arr)//1,2,3
- creating something using "new" keyword, binds "this" automatically.
- JS is Scripting as well as Compile time (due to JIT=Jist in time compilation) language. Means convert the whole block's code to the machine language on starting of execution of that block.
- JS uses pass by value as well as pass by reference.
- browser console is not in strict mode by default.
- Js is a garbage collector language.
- The best way to check if a language is single-threaded is if it has one call stack.
- NaN !== NaN

</expand>

<expand title="Environments for Javascript">
## Environments for Javascript

- Node
- Deno
- Rhino
- Browser

</expand>

<expand title="What Makes JavaScript Unique">
## What Makes JavaScript Unique

- Full integration with HTML/CSS
- Simple things are done simply
- Support by all major browsers and enabled by default
- JavaScript is the only browser technology that combines above three things

</expand>

<expand title="typeof Operator">
## typeof Operator

- Returns the type of the argument
- Syntax: typeof x or typeof(x) (both same output)
- typeof null returns "object" (known JavaScript quirk)

</expand>

<expand title="Type Conversions">
## Type Conversions

- String conversion: String(value) converts value to string
- Numeric conversion: Number(value) converts value to number
- Boolean conversion: Boolean(value) converts value to boolean
- Automatic conversion happens in certain contexts (e.g., string + number)

</expand>

<expand title="Boolean Conversion Rules">
## Boolean Conversion Rules

- Falsy values: 0, "", null, undefined, NaN, false
- All other values become true
- Examples: Boolean(0) // false, Boolean("0") // true, Boolean("hello") // true

</expand>

<expand title="Alert VS Prompt VS Confirm">
## Alert VS Prompt VS Confirm

- Alert: Shows a message and pauses script execution until user presses OK
- Prompt: Accepts user input with title and optional default value
- Confirm: Shows modal with question and OK/Cancel buttons, returns boolean

</expand>

<expand title="Comparison Operators">
## Comparison Operators

- == (loose equality): Performs type coercion
- === (strict equality): No type coercion, compares type and value
- null == undefined // true, null === undefined // false (important distinction)

</expand>

<expand title="Browser Development Tools & Performance Optimization">
## Browser Development Tools & Performance Optimization

### Overview
Browser development tools (primarily Chrome DevTools) are essential debugging and optimization utilities that help developers build, debug, and optimize web applications. These tools provide real-time insights into application behavior, performance bottlenecks, and user experience metrics.

### Purpose
- **Debugging:** Identify and fix bugs in JavaScript, CSS, and HTML
- **Performance Analysis:** Measure and optimize application speed and efficiency
- **Network Monitoring:** Track API calls, resource loading, and network performance
- **Memory Profiling:** Detect memory leaks and optimize memory usage
- **Accessibility Auditing:** Ensure applications are accessible to all users
- **SEO Optimization:** Improve search engine visibility and rankings
- **Mobile Testing:** Simulate different devices and network conditions

### When to Use

**During Development:**
- Debugging JavaScript errors and logic issues
- Inspecting DOM structure and CSS styling
- Testing responsive designs across different screen sizes
- Monitoring network requests and API responses
- Verifying console logs and error messages

**Performance Optimization:**
- Identifying slow-loading resources
- Analyzing rendering performance
- Detecting memory leaks
- Optimizing bundle sizes
- Measuring Core Web Vitals (FCP, LCP, CLS, etc.)

**Before Production:**
- Running Lighthouse audits for performance, accessibility, and SEO
- Testing on different devices and browsers
- Verifying security headers and best practices
- Checking for console errors and warnings

**During Production Issues:**
- Debugging production bugs using source maps
- Analyzing performance issues reported by users
- Monitoring network failures and API errors
- Investigating memory-related crashes

### How to Use

**Opening DevTools:**
- **Windows/Linux:** `F12` or `Ctrl + Shift + I` or `Ctrl + Shift + J`
- **Mac:** `Cmd + Option + I` or `Cmd + Option + J`
- **Right-click → Inspect:** Opens DevTools with Elements panel focused on clicked element

**Key Panels:**

1. **Elements Panel:**
   - Inspect and modify HTML/CSS in real-time
   - View computed styles and box model
   - Edit attributes and classes
   - Use: `Ctrl/Cmd + Shift + C` to toggle element selector

2. **Console Panel:**
   - View JavaScript logs, errors, and warnings
   - Execute JavaScript commands
   - Debug with breakpoints and step-through
   - Use: `Ctrl/Cmd + Shift + J` to focus console

3. **Sources Panel:**
   - View and edit source files
   - Set breakpoints for debugging
   - Step through code execution
   - Use source maps for debugging minified code

4. **Network Panel:**
   - Monitor all network requests (XHR, Fetch, WebSocket, etc.)
   - View request/response headers and payloads
   - Analyze loading times and waterfall charts
   - Filter by type, status, or domain

5. **Performance Panel:**
   - Record and analyze runtime performance
   - Identify bottlenecks and long tasks
   - View frame rates and rendering performance
   - Analyze JavaScript execution time

6. **Memory Panel:**
   - Take heap snapshots to analyze memory usage
   - Track memory leaks over time
   - Compare snapshots to find memory growth
   - Identify objects preventing garbage collection

7. **Application Panel:**
   - View and manage Local Storage, Session Storage, Cookies
   - Inspect IndexedDB and Web SQL databases
   - Manage service workers and cache storage
   - View application manifest and security

8. **Lighthouse Panel:**
   - Run automated audits for performance, accessibility, SEO
   - Get actionable recommendations
   - View Core Web Vitals metrics
   - Compare performance over time

### Chrome DevTools Features (Chrome 143+)

**DevTools MCP Server Updates:**
- **What it is:** Enhanced Model Context Protocol (MCP) server integration
- **Purpose:** Enables AI applications and agents to interact with Chrome DevTools
- **Use case:** Building AI-powered debugging tools or integrating AI assistants
- **How it works:** DevTools exposes debugging capabilities through MCP protocol
- **Benefit:** Enables AI-powered development workflows and automated debugging
- **When to use:** When building AI tools that need to inspect pages, analyze performance, or debug issues programmatically

**Improved Trace Sharing:**
- **What it is:** Enhanced sharing and collaboration for performance traces
- **Purpose:** Better team collaboration on performance optimization
- **Use case:** Sharing performance traces with team members or stakeholders
- **How to use:** Export trace files and share with team for analysis
- **Benefit:** Easier collaboration on debugging and performance optimization
- **When to use:** When multiple developers need to analyze the same performance issue

**Lighthouse 13:**
- **What it is:** Updated Lighthouse panel with unified performance insights
- **Purpose:** Comprehensive audits for performance, accessibility, SEO, and best practices
- **Key improvement:** Unification of performance insights across DevTools and Lighthouse
- **Use case:** Auditing website performance, accessibility, and SEO before production
- **How to use:** Open DevTools → Lighthouse panel → Select categories → Run audit → Review insights
- **Benefit:** Consistent performance metrics and actionable recommendations
- **When to use:** Before production deployment, during performance reviews, or when optimizing existing applications

**Support for @starting-style:**
- **What it is:** Debug and inspect CSS @starting-style rules
- **Purpose:** View and edit @starting-style at-rules for CSS transitions
- **Use case:** When working with CSS transitions and animations using @starting-style
- **How to use:** Elements panel → Styles pane → Look for @starting-style rules
- **Benefit:** Easier debugging of CSS transition initial states

**Editor Widget for display: masonry:**
- **What it is:** Visual editor for CSS Masonry layout
- **Purpose:** Quickly toggle through alignment options in masonry layouts
- **Use case:** When experimenting with CSS Masonry layout (display: masonry)
- **How to use:** Elements panel → Styles pane → Click on display: masonry → Use editor widget
- **Benefit:** Faster testing and adjustment of masonry layouts without manual CSS editing

### Website Performance Metrics Explained

**Core Web Vitals and Performance Indicators:**

**1. First Contentful Paint (FCP) – Target: < 1.8s (Good), < 3.0s (Needs Improvement)**
- **Definition:** Time from page load start until first text or image is rendered
- **What it measures:** How quickly users see any content on the page
- **Why it matters:** Users perceive the page as loading when they see content
- **How to improve:**
  - Minimize render-blocking resources (CSS, JavaScript)
  - Optimize critical rendering path
  - Use server-side rendering (SSR) or static site generation (SSG)
  - Reduce server response time
- **When to monitor:** Always, especially for landing pages and critical user flows

**2. Largest Contentful Paint (LCP) – Target: < 2.5s (Good), < 4.0s (Needs Improvement)**
- **Definition:** Time until the largest visible element (main image, heading, or text block) is rendered
- **What it measures:** Perceived loading speed of main content
- **Why it matters:** Users judge page load speed by when main content appears
- **How to improve:**
  - Optimize images (compress, use modern formats like WebP, lazy loading)
  - Preload critical resources
  - Optimize server response time
  - Remove render-blocking JavaScript and CSS
  - Use CDN for static assets
- **When to monitor:** Critical for user experience, especially on content-heavy pages

**3. Total Blocking Time (TBT) – Target: < 200ms (Good), < 600ms (Needs Improvement)**
- **Definition:** Sum of all time periods when the main thread was blocked for more than 50ms
- **What it measures:** How long the page is unresponsive to user input
- **Why it matters:** Affects interactivity and user experience
- **How to improve:**
  - Code splitting and lazy loading
  - Minimize JavaScript execution time
  - Break up long tasks into smaller chunks
  - Use Web Workers for heavy computations
  - Optimize third-party scripts
- **When to monitor:** For interactive applications, SPAs, and pages with heavy JavaScript

**4. Cumulative Layout Shift (CLS) – Target: < 0.1 (Good), < 0.25 (Needs Improvement)**
- **Definition:** Measures unexpected movement of visible elements during page load
- **What it measures:** Visual stability of the page
- **Why it matters:** Layout shifts frustrate users and can cause accidental clicks
- **How to improve:**
  - Set size attributes on images and videos (width, height)
  - Reserve space for ads, embeds, and iframes
  - Avoid inserting content above existing content
  - Use CSS aspect-ratio for responsive images
  - Preload fonts or use font-display: swap
- **When to monitor:** Always, especially for pages with dynamic content, ads, or images

**5. Speed Index – Target: < 3.4s (Good), < 5.8s (Needs Improvement)**
- **Definition:** Measures how quickly page contents are visually populated
- **What it measures:** Perceived loading speed (how fast the page looks complete)
- **Why it matters:** Users judge loading speed by visual completeness
- **How to improve:**
  - Optimize above-the-fold content
  - Minimize render-blocking resources
  - Use progressive rendering
  - Optimize critical CSS (inline or preload)
  - Reduce server response time
- **When to monitor:** For pages where visual completeness is important (landing pages, product pages)

**6. Time to Interactive (TTI) – Target: < 3.8s (Good), < 7.3s (Needs Improvement)**
- **Definition:** Time until the page is fully interactive (all resources loaded, main thread idle)
- **What it measures:** When users can actually interact with the page
- **Why it matters:** Users expect pages to be interactive quickly
- **How to improve:**
  - Minimize JavaScript execution time
  - Reduce main thread work
  - Code splitting and lazy loading
  - Optimize third-party scripts
  - Use efficient JavaScript frameworks

**7. First Input Delay (FID) / Interaction to Next Paint (INP)**
- **Definition:** Time from first user interaction (click, tap, keypress) until browser responds
- **What it measures:** Responsiveness to user input
- **Why it matters:** Users expect immediate feedback from interactions
- **How to improve:**
  - Minimize JavaScript execution time
  - Break up long tasks
  - Optimize event handlers
  - Use passive event listeners
  - Defer non-critical JavaScript

### Pros of Using Browser DevTools

**Development Benefits:**
- **Real-time debugging:** See changes immediately without page refresh
- **Comprehensive inspection:** Access to all aspects of web application
- **Free and built-in:** No additional tools or subscriptions needed
- **Source maps support:** Debug minified production code
- **Network throttling:** Test on slow connections without actual slow network
- **Device emulation:** Test responsive designs without physical devices

**Performance Benefits:**
- **Identify bottlenecks:** Pinpoint exactly what's slowing down your app
- **Memory leak detection:** Find and fix memory issues before production
- **Bundle analysis:** Understand what's in your JavaScript bundles
- **Core Web Vitals:** Measure and improve user experience metrics
- **Actionable recommendations:** Get specific suggestions for improvements

**Collaboration Benefits:**
- **Shareable traces:** Export and share performance data with team
- **Screenshot and video:** Capture issues for bug reports
- **Console logs:** Debug issues reported by users
- **Network logs:** Reproduce API issues

### Cons and Limitations

**Limitations:**
- **Browser-specific:** Chrome DevTools may differ from Firefox, Safari, Edge
- **Development environment:** Some features don't work in production (source maps needed)
- **Learning curve:** Can be overwhelming for beginners
- **Performance overhead:** DevTools itself can slow down the page slightly
- **Not always accurate:** Some metrics may differ from real user experience
- **Requires manual testing:** Doesn't catch all issues automatically

**Challenges:**
- **Complex interfaces:** Many panels and options can be confusing
- **Information overload:** Too much data can make it hard to find issues
- **False positives:** Some warnings may not be actual problems
- **Time-consuming:** Deep performance analysis can take significant time

### Best Practices

**General:**
- Use Chrome Canary, Dev, or Beta for latest features
- Keep DevTools updated to access new capabilities
- Learn keyboard shortcuts for faster workflow
- Use Workspaces to edit files directly from DevTools
- Enable "Preserve log" in Console for debugging navigation issues

**Performance:**
- Run Lighthouse audits regularly (before major releases)
- Monitor Core Web Vitals in production (use Real User Monitoring)
- Use Performance panel for detailed runtime analysis
- Take heap snapshots to track memory usage over time
- Use Network panel to identify slow resources

**Debugging:**
- Use breakpoints instead of console.log for complex debugging
- Utilize conditional breakpoints for specific scenarios
- Use "Blackbox" feature to skip third-party library code
- Enable "Pause on exceptions" for error debugging
- Use "Logpoints" for non-intrusive logging

**Production:**
- Use source maps for debugging production code
- Monitor console errors in production
- Set up error tracking (Sentry, LogRocket, etc.)
- Use Real User Monitoring (RUM) tools alongside DevTools
- Test on real devices, not just emulation

### Common Use Cases in Interviews

**Interview Questions You Might Face:**
- "How do you debug a performance issue in production?"
- "What tools do you use to optimize web application performance?"
- "How do you measure and improve Core Web Vitals?"
- "Explain how you would identify a memory leak."
- "How do you debug a network request that's failing?"
- "What's the difference between FCP and LCP?"
- "How would you optimize a page with poor CLS score?"

**How to Answer:**
- Start with DevTools as your primary tool
- Explain the specific panel you'd use (Performance, Network, Memory, etc.)
- Walk through the process step-by-step
- Mention metrics you'd look at (Core Web Vitals, bundle size, etc.)
- Discuss tools you'd use alongside DevTools (Lighthouse, WebPageTest, etc.)
- Explain how you'd verify improvements

### Summary

Browser development tools, especially Chrome DevTools, are essential for modern web development. They provide comprehensive debugging, performance analysis, and optimization capabilities that help developers build better applications. Understanding how to use these tools effectively is crucial for:

- **Debugging:** Quickly identify and fix issues
- **Performance:** Optimize applications for speed and efficiency
- **User Experience:** Ensure applications meet Core Web Vitals standards
- **Production Issues:** Debug problems in live applications
- **Team Collaboration:** Share findings and work together on optimizations

Mastering DevTools is not just about knowing which buttons to click—it's about understanding how web applications work, how browsers render pages, and how to systematically identify and solve problems. This knowledge is invaluable in interviews and daily development work.

</expand>

## Secondary Concepts

<expand title="JavaScript RoadMap">
## JavaScript RoadMap

- Basic:
  - Primitives (pirmary(null, undefined, boolean, number, string) Secondary (NAN, Symbol)).
  - Operators
  - Variables (var, let, const) (Scope) (Hoisting)
  - Data Structures (JSON, Arrays, Map, etc)
  - Browser development tools
  - Karma
- Intermediate:
  - Native Methods:
  - Math, loops, Array, filter, map, etc.
  - Prototypes
  - Async/Promises
  - CallBacks
  - Closures
  - TypeScript
  - Elm
  - Transpilers
  - Dart
  - Babel
  - CofeeScript
- Advance:
  - Design Patterns (Factory, Module, Singleton)
  - Decorators
  - Observers
  - Paradigms (Object-Oriented, Procedular, Prototypal programming)
  - Bundlers
  - WebPack
  - RollUp
  - Garbage Collector

</expand>

<expand title="Weird JS">
## Weird JS

- Example:
  - const arr = [null, 'a', NaN, 'b', 0, 'c', undefined];
  - console.log(arr.filter(String)); // Output: [null, "a", NaN, "b", 0, "c", undefined]
  - console.log(arr.filter(Boolean)); // Output: ["a", "b", "c"]
  - console.log(arr.filter(Number)); // Output: []
  - console.log(arr.filter(Array)); // Output: [null, 'a', NaN, 'b', 0, 'c', undefined]
  - console.log(typeof(arr)); // Output: object

</expand>

<expand title="Garbage Collection in JS (Automatic Memory Management in JS)">
## Garbage Collection in JS (Automatic Memory Management in JS)

- Take the memory back from "unreachable" variables, functions, objects, etc.
- Algo "Mark-and-Sweep":
  - Starts from the root object/variables etc (global objects) and checks for the references linked.
  - Remove unreachable variable/objects etc locations.
- Memory leakage in JS:
  - global variables.
  - chain/circular references:
  - Example: // will not release location or memory because of circular assignments.

let obj1 = 1;

let obj2 = 2;

​

obj1.key = obj2;

obj2.key = obj1;

​

console.log('obj1', obj1);

console.log('obj2', obj2);

</expand>

<expand title="Garbage Collector Lang VS non-garbage collector lang">
## Garbage Collector Lang VS non-garbage collector lang

- 
- 

</expand>

<expand title="Lagacy Code">
## Lagacy Code

- Application system source code type that is no longer supported.
- Also refer to unsupported operating systems, hardware, and formats.

</expand>

<expand title="Top Libraries">
## Top Libraries

- elasticsearch
- knex.js // deals with raw queries
- bookshelf
- crypto-js
- patch-package
- bluebird
- moment.js // date library
- date-fns // date library. better version of moment.js because we can only import required fucntions from the library.
- password hashing: md5, bcrypt
- node-sass
- WOPI
- abbyy.com
- anime.js // frontend animations
- Howler.js // frontend sounds
- Chart.js // frontend charts
- Reveal.js // frontend html presention framework. create slides, etc.
- Threee.js // frontend affects
- dotenv
- socket.io
- uuid
- axios // to call APIs
- request // to call APIs
- classnames
- typescript
- express
- async
- lodash
- Cloudinary
- Nodist
- Browserify
- Debug
- Chalk // styling
- commander.js
- debug
- download // to download file. Best npm for downloading.
- js-file-download // to download file
- node-sass
- quokka.js // runs code immediately as you type

</expand>

<expand title="Built-in Methods">
## Built-in Methods

- Numbers:
  - 
- String:
  - 
- Arrays:
  - 
- Format:
  - test

</expand>

<expand title="Dart">
## Dart

- Dart is a client-optimized language for developing fast apps on any platform.
- Dart is currently actively used with Flutter for developing the frontend of cross-platform mobile apps. Dart can be also used for web development, but there is no mention of Dart being used for backend development
- "dart:js library" : Provides access to JavaScript objects from Dart, allowing Dart code to get and set properties, and call methods of JavaScript objects and invoke JavaScript functions.

</expand>

<expand title="SDK vs API vs APK Library">
## SDK vs API vs APK Library

- SDK contains APIs and APIs contains libraries.
- API vs SDK: API is really just an interface for a service, while an SDK is the tools/components/code fragments that have been created for a specific purpose.
- Library vs API: library refers to the code itself, while API refers to the interface that can contains multiple libraries.
- API:
  - Interface
  - Abstraction
  - Standardize: Rest, SOAP, GraphQL
  - Example:
  - Payment methods, etc.
- SDK:
  - Software developement kit
  - Sets of tools (tool box) of code in a single installation package. It contains documents, code samples, APIs and code libraries.
  - Works with specific programming languages
  - Example:
  - Android SDK: It has all the elements to create the code like debugger, sample source-code, require libraries, etc.
  - Cloud SDK: manage apps in the google cloud
- SDK vs API:
  - Toolbox used to build apps <=> Communication between apps
  - can contains api <=> not vice versa
  - easy to use and faster to integrate <=> Easy to modify

</expand>

<expand title="Promises VS AsyncAwait">
## Promises VS AsyncAwait

- Next line will be executed when promise resolved where await only blocks the code within the async function.
- Cons of promise:
  - It kills the purpose of asynchronous non-blocking I/O.
  - Only one object can be returned.
  - We cannot return multiple arguments.

</expand>

<expand title="ElasticSearch">
## ElasticSearch

- Highly scalable open-source full-text search and analytics engine.
- It allows you to store, search, and analyze big volumes of data quickly and in near real time.
- You want Elasticsearch when you're doing a lot of text search, where traditional RDBMS databases are not performing really well.

</expand>

<expand title="Postgres VS MySQL">
## Postgres VS MySQL

- Postgres is an object-relational database (ORDBMS), while MySQL is a purely relational database (community driven DBMS system).
- This means that Postgres includes features like table inheritance and function overloading, which can be important to certain applications.
- Postgres supports Materialized Views whereas MySQL doesn't supports Materialized Views.
- PostgreSQL is known to be faster while handling massive data sets, complicated queries, and read-write operations. Meanwhile, MySQL is known to be faster with read-only commands.

</expand>

<expand title="ACID compliance">
## ACID compliance

- ACID is a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps.
- In the context of databases, a sequence of database operations that satisfies the ACID properties is called a transaction.
- Databases supports ACID:
  - MySQL with only innoDb
  - PostgreSQL, etc.

</expand>

<expand title="Raw http header">
## Raw http header

- Raw means that the header is not URL-encoded, whereas if the word "raw" is omitted, the header is encoded.
- For example: $header = 'http://www.mywebsite.com?

</expand>

<expand title="Octa Cert">
## Octa Cert

- Okta Certified Professionals possess knowledge about secure identity management and mobility concepts.

</expand>

<expand title="DocuSign">
## DocuSign

- American company deal with electronic agreements using eSignature.

</expand>

<expand title=".transacting(trx) call">
## .transacting(trx) call

- 
- 

</expand>

<expand title="Architectures">
## Architectures

- Micro Service Architecture *
- Monolith Architecture *
- Cloud Native Architecture *
- Hybrid Architecture *
- Service Oriented Architecture *

</expand>

<expand title="Security types">
## Security types

- Application Security *
- Network Security *
- System Security *
- Physical Security *
- Cyber Security *

</expand>

<expand title="Caches">
## Caches

- Redis *
- Memcache *
- Other:
  - Varnish HTTP Cache

</expand>

<expand title="Cloudinary">
## Cloudinary

- Cloudinary is an end-to-end image- and video-management solution for websites and mobile apps, covering everything from image and video uploads, storage, manipulations, optimizations to delivery.
- It is a cloud package with numerous features. Some of the things that you can do fast with Cloudinary include cropping an image, resizing the same image, naming the image, etc.

</expand>

<expand title="Nodist">
## Nodist

- t is a complete package where you can use different programs like Powershell, CMD, Cygwin, Git bash, and more. However, for beginners, using Nodist can be a big deal.

</expand>

<expand title="JS task runner">
## JS task runner

- A JS task runner basically runs commands for you that would otherwise be tedious or impossible.
- They do things like compile your code from SCSS to CSS or TypeScript to JavaScript.
- Tools:
  - Webpack, gulp, Grunt, Parcel, and rollup, etc. Gulp is the most popular.
  - webpack is actually a module bundler like Browserify or Brunch. It is not a task runner

</expand>

<expand title="Token Based Authorization">
## Token Based Authorization

- Passport
- JSON Web Tokens (JWT)
- Bcrypt

</expand>

<expand title="Jenkins">
## Jenkins

- 
- 
- 

</expand>

<expand title="monolithic architecture VS microservice architecture">
## monolithic architecture VS microservice architecture

- 
- 
- 

</expand>

<expand title="JavaScript FrameWorks">
## JavaScript FrameWorks

- 
- 
- 
- Select2
- Typeahead JS
- jQuery 1.11.2
- jQuery UI 1.10.3
- 

</expand>

<expand title="Cloud Watch">
## Cloud Watch

- 

</expand>

<expand title="Tenant">
## Tenant

- production env

</expand>

<expand title="data Farming">
## data Farming

- 

</expand>

<expand title="Realtime db">
## Realtime db

- 

</expand>

<expand title="Top AWS Services">
## Top AWS Services

- Amazon S3
- Amazon EC2 [Elastic Compute Cloud]
- AWS Lambda
- Amazon Glacier
- Amazon SNS
- Amazon CloudFront
- Amazon EBS [Elastic Block Store]
- Amazon Kinesis
- Amazon VPC
- Amazon SQS

</expand>

<expand title="Top AWS Cloud Services">
## Top AWS Cloud Services

- Amazon Elastic Beanstalk
- DynamoDB
- Amazon RDS [Relational Database Service]
- Amazon ElastiCache
- Amazon Redshift
- 
- 

</expand>

<expand title="Temporal Dead Zone in JS">
## Temporal Dead Zone in JS

- 
- 

</expand>

<expand title="Block in JS">
## Block in JS

- curly paranthesis area
- also known as compound statement

</expand>

<expand title="Shadowing">
## Shadowing

- when we declare a variable outside the function and again declare the same variable, that variable will be shadowed. Means value will be replaced because both are pointing to the same location.

</expand>

<expand title="Closure">
## Closure

- variables and functions uses its lexical scope.
- Its not so simple as lexical scope. take a example to view in detail.
- preserve data from outer function.
- Combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
- In JavaScript, closures are created every time a function is created, at function creation time.
- Every closure has three scopes:
  - Local Scope (Own scope)
  - Outer Functions Scope
  - Global Scope
- 
- Example:
  - when we call a function x() and saved in a variable "z". after execution of function, result will be saved in z and x() fucntion will get remove from the execution stack. But if we call z() again, what will happen because x() is not in the memory

As x() is returning inner function y(), when we call z(), it contains the statement "console.log(a)" because x() returns the y() fucntion. At this point, we can see x() fucntion is no longer exists, but still y() function

remembers its lexical scope and hence it will print "7".

Hint: statement return "y" in the function x() not only returns the function, infact returing the comple closure.

  - function x(){

var a = 7;

function y(){

console.log(a);

}

return y;

}

var z = x();

console.log(z);

// any code here

z();

- Example:

function outerScope() {

console.log("outer called");

var outerVar = 'foo';

return function innerScope() {8

console.log('My parent\'s value is ' + outerVar);

}

}

const myInnerScope = outerScope(); // the function returned from outerScope is saved inside 'myInnerScope'. Only Outer fucntion will call here.

myInnerScope(); // 'My parent's value is foo'. Only inner fucntion will call here.

myInnerScope(); // 'My parent's value is foo'. Again Only inner fucntion will call here.

myInnerScope(); // 'My parent's value is foo'. Again Only inner fucntion will call here.

outerScope()(); // this will call both outer and inner. /currying fucntions

</expand>

<expand title="Clousure VS Lexical Scope VS Scope Chain">
## Clousure VS Lexical Scope VS Scope Chain

- 

</expand>

<expand title="Uniqueness in JS">
## Uniqueness in JS

- can use variable before declaration. although gives undefined.
- can pass complete function as a parameter.

</expand>

<expand title="SetTimeOut() function">
## SetTimeOut() function

- also based on cloure completely.
- for(var i = 0; i < 3; i++){

setTimeOut(function() =>{

console.log(i);

}, i*1000)

}

console.log("After loop");

Output: After loop , 6, 6, ,6

Output: After loop , 1, 2, 3 // if we use let despite var in for loop iteration.

- It has trust issues. let say we have setTimeOut of 5s. If we have millions if lines after set function that takes 10s to finish and if event loop is busy in it, then despite running setTimeOut code after 5s,

it will execute after 10s.

</expand>

<expand title="Functions">
## Functions

- Anonumous function
- First Class fucntion:
  - ability of functions to be used as passing functions as param, can assign to a variable, and return complete function, etc.
  - it is in ither programming lang too but not in all.
- 

</expand>

<expand title="Callback function">
## Callback function

- passing function to another function is a cb function
- async to sync
- 

</expand>

<expand title="REST vs RESTful">
## REST vs RESTful

- REST: It's an architectural pattern for creating web services
- RESTful: It's one that implements that pattern.

</expand>

<expand title="Arrays">
## Arrays

- const arr = [1,2] as const; // this is in TypeScript. we cannot add elements now.
- const arr = new Array(5); // create an array with undefined values on first 5 indexes.
- It is not possible to create a native javascript Array with a fixed length. But, you can create an object which will behave like a fixed-length Array.

But it will get converted into object.

  - Example:
  - const arr = [1,2];

Object.freeze(arr);

arr.push(3); // error

console.log(typeof(arr)); // Object

</expand>

<expand title="Event Loop">
## Event Loop

- Event loop pushes cb from callback queue when it finds call stack as empty. it continuously checks the call stack and callback queue
- It will continously looking the call stack and callback and micr task queue. When it finds call stack as empty, it will push callbacks from the two queues.

</expand>

<expand title="Call Stack">
## Call Stack

- The very first object that pushes into it is Global Execution (GEC) object.

</expand>

<expand title="Callback queue">
## Callback queue

- cb pushes into this array when ever return from a function or from any where in the app.

</expand>

<expand title="Micro task queue">
## Micro task queue

- Similar to callback queue but having high priority.

</expand>

<expand title="JS Applications">
## JS Applications

- Js is every where. It can run inside:
  - browser
  - server
  - smart watch
  - light bulbs
  - robots
  - etc.
- This is all because of its runtime environment and runtime environment's heart is JS engine.
- "console" (like console.log), "setTimeOut" are the APIs present in runtime environment of JS
  - Available in both browser and Node.js runtime environments
  - May have different implementations but provide similar functionality
- We can access outer environment through these APIs
- 

</expand>

<expand title="JS Engine (VMs)">
## JS Engine (VMs)

- It depends on js-engine rather uses interpreter or compilation or both(most common)
- Steps:
  - Code
  - Parsing:
  - Tokenization
  - Syntax parser:
    - AST (abstract syntax tree)
    - convert code into tree form like object within anthother object, etc.
  - Compilation (JIT compilation):
  - Interpreter:
    - execute the code line by line
  - Compiler:
    - Optimize the code and gives another code
    - JIT compiles the scoped code and then interpret it line by line.
  - Execution
- First JS engine: SpiderMonkey (for Mozilla Firefox).
- It is not a machine or any hardware. It is a program written in low-level lang like V8 written in C++.
- V8 JS Engine Steps:
  - JS source code
  - parser (Parsing means analyzing and converting a tokenized program into an internal format that a runtime environment can actually run) ( for example the JavaScript engine inside browsers. The parser parses tokenized input into the document, building up the document tree)
  - AST (Abstract syntax tree)(result of parsing code) (object containing a tree representation of your source) (AST is generated by Syntax Parser)
  - interpreter ignition   ->   compiler turbo fan

|						|

bytecode          <-   Optimized machine code

- Examples: V8 (most popular), Chakra, SpiderMonkey

</expand>

<expand title="Memory Heap VS Call Stack">
## Memory Heap VS Call Stack

- 
- 

</expand>

<expand title="concurrency vs parallelism">
## concurrency vs parallelism

- Concurrency is when two or more tasks can start, run, and complete in overlapping time periods.
- It doesn't necessarily mean they'll ever both be running at the same instant. For example, multitasking on a single-core machine.
- Parallelism is when tasks literally run at the same time, e.g., on a multicore processor

</expand>

<expand title="Storage">
## Storage

- System Storage:
  - Data is persisted for particular session.
  - Means when he close the tab or windows, data will be lost.
  - Usefull than cookies as do not make network request and having large storage capacity.
  - Min limit of data storage is 5MBs of data.
- Local Storage
  - same as system storage but does not finishes the data on closing tab or even laptops.
  - much more storage capacity.
  - NOTE: Local storage for resourceinn.com is different from tkxel.resourceinn.com
  - Means valid for same origin, protocol (http, https), port, etc. not same for two two different ports, etc.
- Example:
  - recent searches, use basic data, etc.
- localStorage.setItem("user", JSON.stringify(user)); // to store object in the local storage
- JSON.parse(localStorage.getItem("user"));

</expand>

<expand title="Amazon Textract">
## Amazon Textract

- Substitute of OCR
- Convert image/pdf etc to document form in a key value pair of strings where OCR converts them to word document with indentation.
- see seperate file for it.
  - 

</expand>

<expand title="Debouncing VS Throttling">
## Debouncing VS Throttling

- Used for performance optimization, rate limiting of certain function, etc.
- limiting the rate of execution of a particular function.
- Scenario: like search bar especially in e-commerce web, scrolling events, re-sizing the window, logging, etc.
- HINT: Usually hit the API when user gives a pause. Do not hit on each tap.
- So, calling api on each call, call by comparing with time.
- take a method and return a better method.
- Debouncing: call the api if the defference between two key stroke is N-seconds. Means it will not ignore any event.
- Throttling: call the api after every N-seconds. Means it will ignore the intermediate functions.

</expand>

<expand title="Search">
## Search

- 

</expand>

<expand title="CORS">
## CORS

- Cross-Origin Resource Sharing
- CORS preflight(options call):
  - When a request is made from one origin to other, this method is followed.
  - On matching the header, 2nd origin will respond to the first origin if matches the header.
  - After handshaking or preflight, then the actual call will be made.
- Header Example:
  - Accept-Control-Allow-Origin: * // most common header
- There are two scenarios of calling the apis:
  - With preflight
  - without preflight
- has very use in microservice architecture

</expand>

<expand title="Higher order functions">
## Higher order functions

- In Javascript, functions can be assigned to variables in the same way that strings or arrays can.
- They can be passed into other functions as parameters or returned from them as well.
- A “higher-order function” is a function that accepts functions as parameters and/or returns a function.

</expand>

<expand title="Async VS Defer">
## Async VS Defer

- 

</expand>

<expand title="Template Engines">
## Template Engines

- Examples:
  - Jade, Vash, EJS, handlebars, etc.

</expand>

<expand title="Jade VS EJS">
## Jade VS EJS

- ejs' purpose is to directly add javascript logic and import values to strings of html
- Jade is a full templating language with its own syntax.
- In the end, both compile a template into a javascript function which then glues together the resulting snippets into html.

</expand>

<expand title="Top ORMs(Relational query builder)">
## Top ORMs(Relational query builder)

- Objection.js // uses knex in bg. Now the bluebird dependency has been dropped and the native Promise is used instead.
- Sequelize.js //
- Knex.js // low level. uses raw queries.

</expand>

<expand title="Bluebird">
## Bluebird

- 
- Methods:
  - map, reduce, reflect, bind, spread, asCallback, nodeify

</expand>

<expand title="Coersion">
## Coersion

- 

</expand>

<expand title="Object Wrappers">
## Object Wrappers

- 
- 

</expand>

<expand title="Prototypal inheritance">
## Prototypal inheritance

- 

</expand>

<expand title="OLOO vs OO">
## OLOO vs OO

- OLOO:
  - stands for Objects Linking to Other Objects.
  - object design pattern.
  - 
- 

</expand>

<expand title="How can we create a query builder in knex">
## How can we create a query builder in knex

- 
- 

</expand>

<expand title="query builder VS orm">
## query builder VS orm

- If you are more aware of efficiency rather than ease of development, go for query builder.
- If you dealing with one entity go for ORM, (Eloquent). If you dealing with multiple entities it's better to deal with query builder.
- If you are new to mysql or your application is not very complex, definitely choose ORM.

</expand>

<expand title="Knex.js">
## Knex.js

- Knex is just a query builder, not an ORM.
- Although usually it is known to be an ORM.
- ORMs don't actually fit very well in many use cases, it's easy to run up against the limits of what they can express, and end up needing to break your way out of them.

</expand>

<expand title="const [user] = ....">
## const [user] = ....

</expand>

<expand title="Filter">
## Filter

- 
- 

</expand>

<expand title="Map">
## Map

- 
- 

</expand>

<expand title="Reduce">
## Reduce

- The reduce() method reduces the array to a single value.
- The reduce() method executes a provided function for each value of the array (from left-to-right).
- Note: reduce() does not execute the function for array elements without values.
- Note: This method does not change the original array.
- 

</expand>

<expand title="Optional chaining operator">
## Optional chaining operator

- if property is not present, gives undefined.
- Example:
  - let obj = {};

console.log(obj.name); // gives "cannot read property name of undefined"

console.log(obj?.name) // it will undefine. not error.

</expand>

<expand title="Last minute crunches">
## Last minute crunches

- 

</expand>

<expand title="Kubernetes">
## Kubernetes

- Open-source container-orchestration system for automating computer application deployment, scaling, and management.
- It was originally designed by Google and is now maintained by the Cloud Native Computing Foundation.

</expand>

<expand title="Serverless">
## Serverless

- Serverless computing is a cloud computing execution model in which the cloud provider allocates machine resources on demand, taking care of the servers on behalf of their customers.
- person who deals with the business logic, does not need to be concerned with the server. The service provider handles it.
- 

</expand>

<expand title="Top Codes;">
## Top Codes;

- 201: Successful request after a create, usually a POST
- 204: Successful request with no content returned, usually a PUT or PATCH
- 301: Permanently redirect to another endpoint
- 304: A Modified message is an HTTP response status code indicating that the requested resource has not been modified since the previous transmission
- 400: Bad request (client should modify the request)
- 401: Unauthorized, credentials not recognized
- 403: Forbidden, credentials accepted but don’t have permission
- 404: Not found, the resource does not exist
- 410: Gone, the resource previously existed but does not now
- 429: Too many requests, used for rate limiting and should include retry headers
- 500: Server error, generic and worth looking at other 500-level errors instead
- 503: Service unavailable, another where retry headers are useful

</expand>

<expand title="common types of parameters to consider for your API">
## common types of parameters to consider for your API

- Filtering
- Pagination
- Sorting

</expand>

<expand title="Is GraphQL a REST API?">
## Is GraphQL a REST API?

- GraphQL follows the same set of constraints as REST APIs, but it organizes data into a graph using one interface.
- Each object is then backed by a resolver that accesses the server's data.

</expand>

<expand title="Breadcrumbs">
## Breadcrumbs

- 
- 

</expand>

<expand title="Promises">
## Promises

- A promise is a placeholder for a value that can either resolve or reject at some time in the future.
- States:
  - fulfilled = resolved
  - rejected = rejected
  - pending = neither resolved nor reject
- Methods:
  - all:
  - max calls in it:
    - 
  - 
  - 

</expand>

<expand title="Regular Expression">
## Regular Expression

- 

</expand>

<expand title="DOM methods">
## DOM methods

- 

</expand>

<expand title="Let VS Const">
## Let VS Const

- Let + var = when declare inside the function, cannot get outside.
- Let = when declare inside if statement or a foor loop, cannot be accessed outside. Block Scope.
- Var = when declare inside if statement or a foor loop, can be accessed outside. Global Scope.
- Var = can be redeclared.
- Let = cannot be redeclared.

</expand>

<expand title="Template String or Template Literal">
## Template String or Template Literal

- `Hello ${name}`

</expand>

<expand title="Object Literal">
## Object Literal

- Objects are stored by reference as it is a non-primitive like:
  - primitives: let a = 2; let b = a; a = 3; console.log(a,b)//3,2
  - non-primitives: let ob1 = {a: 2}, let ob2=obj1, obj1.a = 3, console.log(obj1, obj2)// both will be same
- Example:

let obj = {

name, // name: name

course

}

- Example:

let attr = 'name';

let obj = {

["student_" + attr]: "Ali" // student_name: "Ali"

}

- Example:

let name = "Ali";

let obj = {

detail: fucntion(){

return `${name} is a student of our college.`

}

}

console.log(obj.detail());

- Ways:
  - let obj = {a: 2}
  - let obj = new Object();
  - let obj = Object.Create({a: 2}); console.log(obj);// {} , console.log(obj.a)//output is 2. "a" becomes the hidden property which shows when console explicitely.

</expand>

<expand title="Deep Copy VS Shallow Copy">
## Deep Copy VS Shallow Copy

- shallow = by reference, faster
- non-primitives uses shallow copy.
- Example (shallow copy):
  - assigning obj or array to other and changes in the first will updates the second too because both ointing to the same location.
  - let arr2 = arr1 // shallow copy.
  - let arr2 = [...arr1] // deep copy

</expand>

<expand title="OOP in JS">
## OOP in JS

- Style of coding
- Modular
- Class:
  - Properties:
  - variables
  - Methods:
  - fucntions
- Object:
  - 
- Example of class and object:
  - Blue print or map is a Class and real-time houses are the objects.
- Modules:
  - Usage of a file in another like using import.
- Promise:
  - parts:
  - result
  - States:
    - Pending
    - Resolve
    - Reject
  - Promise.all:
  - multiple promises have a common resolve and reject that will execute after the execution of all the promises.
  - Syntax: Promise.all([p1, p2]).then().catch()

</expand>

<expand title="AJAX">
## AJAX

- Asynchronous, JS, XML
- technique for creating a web page fast and dynamic.
- we don't call the server. in fact, call the JS and JS uses its special class known as XMLHttpRequest that takes data fromt he server in the background.
- Data in response of server:
  - Text file data
  - XML data
  - JSON data
- Steps between reques and response:
  - 0 step: request not initialize
  - 1 step: server connection establishes
  - 2 step: reqyest receive
  - 3 step: processing request
  - 4 step: request finished and response ready
- Using JQuery with AJAX:
  - Methods (let say in PHP):
  - $.ajax();
  - $.get();
  - $.post();
  - It is easy to use ajax with jquery and code also reduces but we need to attach 100kb file each time that increases the size as well as the speed.
- Using JS with AJAX:
  - can be used using XMLHttpRequest.
  - Disadvatage: need to write extra code. that is why developer prefer less to use it.

</expand>

<expand title="Fetch method">
## Fetch method

- Substitue of AJAX and JQuery.
- fetch(file/url).then().catch();
- return the promise
- we cannot only call the api using fetch in fact we can also use another file in the project like let res = await fetch("file path here")

</expand>

<expand title="Async Await">
## Async Await

- async always returns a promise
- Example:
  - async function test(){

console.log("A");

await console.log("B");

console.log("C");

}

test();

console.log("D");

console.log("E");

  - Output: A, B, D, E, C // though "B" is not taking time but it will execute the code after "B" after executing the lines outside async.

</expand>

<expand title="Symbol">
## Symbol

- data type like string, number, boolean, array, object, Null, Underfined.
- Example:

var x= Symbol("Hello");

var y= Symbol("Hello");

// NOTE: x != y althogh having the same idetifier i.e. Hello

// console.log(x); // output: Symbol(Hello)

// alert(x); // output: cannot convert type symbol to string

// alert(x.toSting()); // output: Symbol(Hello)

// alert(x.description); // output: Hello // description is a builtin method of Symbol

- unique value means
- Using it with objects:
  - Example:

let age = Symbol();

let user = {

name: "Ali",

[age]:

};

console.log(user); // {name: "Ali", Symbol(): } // NOTE: if we give idetifier to the sysmbol, it will show with that identifier.

</expand>

<expand title="Iterators">
## Iterators

- array, string, generatorObject
- Although they are iterators because we can use map, for-of, rest operator or any other iterator on it. But they actually called the Iterrators because of the " [Symbol.iterator] " property in it.
  - Example:
  - let arr = [];

console.log(arr[Symbol.iterator]);

- We can convert non-iterables to iterables by adding "[Symbol.iterator]" manually.

</expand>

<expand title="github copilot">
## github copilot

- 
- 

</expand>

<expand title="Generator">
## Generator

- Type or implementation of Iterator.
- Iterator: sequence of execution. Returns value and done in an object.
- Functions that can pause execution and resume at the same point whenever you call it again.
- They keep their state between calls and are capable of returning multiple values.
- A generator is a function that produces a sequence of results instead of a single value, i.e you generate a series of values.
- Besides the point that what this function does is debouncing and not throttling.
- Invoking a generator function returns a generator object, which is an iterator.
- It returns the generator object (iterator) in the response.
- Example (Simple):
- Example (function that maintain counts of a function calling):

function * naturalNumbers() {

let num = 1;

while (true) {

yield num;

num = num + 1

}

}

const numbers = naturalNumbers();

console.log(numbers.next().value); // 1

console.log(numbers.next().value); // 2

// NOTE: if we use return instead of yeild, it will execute once and return 1 as output. when we call again, it will return undefined in value because done will be true.

- Example:
  - Function to generate random string in a while(1) loop.
- Example:
  - getting object keys individually (one by one)
- Example:
  - find a book in the library. After finding the required book, no need to iterate remainings.
- Another use of generator functions, is that we can (sort of) use them as observer functions.
- Advantages:
  - Lazy Evaluation
  - Memory Efficient
- Caveats (conditions & limitations):
  - Generator objects are one-time access only;
  - Once you’ve exhausted all the values, you can’t iterate over it again. To generate the values again, you need to make a new generator object.
  - Generator objects do not allow random access as possible with arrays.
  - Arrow-function can not be used as generators
  - We can't use generator function as constructor

</expand>

<expand title="Inline-functions VS Arrow-functions">
## Inline-functions VS Arrow-functions

- Arrow-functions:
  - also known as arrow function expression.
  - shorter syntax
  - does not bind its own this, arguments, super, or new.target).
  - Arrow functions are always anonymous.
  - Arrow-function can not be used as generators because yeild is not allowed in it.
  - Arrow functions bind "this" lexically. bind "return" in the Block. The Identifier primary expression "arguments" may not be used in an arrow function's body
  - Example (when outer and inner both are inline functions Or outer is inline and inner is arrow):

function outer() {

var b = 10;

function inner() {

var a = 20;

console.log(a+b);

}

return inner;

}

var X = outer();

console.dir(X); //use console.dir() instead of console.log()

// NOTE: it has three scopes. local, closure(outer) (means outer variables), global(window).

  - Example (when outer is arrow function where inner is inline or arrow):

function outer() {

var b = 10;

function inner() {

var a = 20;

console.log(a+b);

}

return inner;

}

var X = outer();

console.dir(X); //use console.dir() instead of console.log()

// NOTE: it has four scopes. local, closure(outer) (means outer variables), Script(outer) (means details outer function including arguments, bind, constructor, etc), global(window).

</expand>

<expand title="Strict mode">
## Strict mode

- "this" is pointing to undefined here.
- 
- 
- 

</expand>

<expand title="Function Factory">
## Function Factory

- A fucntion that returns another function.
- Example:

function makeAdder(x) {

return function(y) {

return x + y;

};

}

</expand>

<expand title="var VS let">
## var VS let

- Example:

g = () =>{

var a = b = 3;

}

g();

console.log(a); // error

console.log(b); // 3

</expand>

<expand title="Hoisting">
## Hoisting

- Are let and const variables not hoisted?
  - The answer is a bit more complicated than that.
  - All declarations (function, var, let, const and class) are hoisted in JavaScript, while the var declarations are initialized with undefined ,

but let and const declarations remain uninitialized.

  - Actually "var" hoisted to global env and "let & const" hoisted to temporal dead zone.

</expand>

<expand title=""new" keyword">
## "new" keyword

- creates a new empty object.
- binds "this" automatically.
- Example(regular fucntion declaration):

function Car(make, model, year) {

this.make = make;

this.model = model;

this.year = year;

}

NOTE: above function is a constructor function

const car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);

// expected output: "Eagle"

</expand>

<expand title="Fucntions">
## Fucntions

  - Regular
  - Arrow
  - Constructor fucntions:
  - Example:

function Video(title){

this.title = title;

console.log(this);

}

const video = new Video('a');

</expand>

<expand title=""this" keyword">
## "this" keyword

- refers to the object that is currently executing or it belongs to.
- alone it refers to the global object.
- in regular functions, it again refers to the global object.
- in a method, it refers to the owner object.
- in a function, in strict mode, this is undefined
- window = in browsers (global object in Node.js)
- console.log(this)  in a function // show global object without strict mode. will show undefined in strict mode.
- 
- 
- Example (in object):

const video = {

title: 'a',

play() {

console.log(this);

}

}

video.play(); // Output: {title: "a", play: ƒ}

- Example (in regular function):

fucntion playVideo(){

console.log(this);

}

playVideo(); // Output: will show global object without "strict mode". It will be indefined in the strict mode.

- Example:

function Video(title){

this.title = title;

console.log(this);

}

const video = new Video('a'); // Output: {title: "a"}

- Example:

const video = {

title: 'a',

tags: ['aa', 'bb'],

showTags(){ // can also write this line as "showTags: function()"

console.log(this.title); // will show "a" as expected.

this.tags.forEach(function(tag){

console.log(this); // window object will be shown

console.log(tag); // will show "aa" and "bb"

consoel.log(this.title); // will show undefined because this is in the block of a regular function not a method in the video object.

})

}

}

console.log(video.showTags());

// below is with arrow fucntion

const video = {

title: 'a',

tags: ['aa', 'bb'],

showTags: () => {

console.log(this.title); // undefine

this.tags.forEach(function(tag){

// will not enter in the looop because of undefined this.tags

})

}

};

console.log(video.showTags());

- Example (solution of above example issue that points to the global object):

const video = {

title: 'a',

tags: ['aa', 'bb'],

showTags(){

consoel.log(this.title); // will show "a" as expected.

this.tags.forEach(function(tag){

console.log(this); // window object will be shown

console.log(tag); will show "aa" and "bb"

consoel.log(this.title); // will show "a" as expected.

}, this); // Actually "this" inside the above regular function will point the second object. I have passed "this" here that points to the above mehtod attr, this will

start pointing to the this "this".

}

}

</expand>

<expand title="Bind method">
## Bind method

- Example:

fucntion showFace() {

return this.face; // will be global without bind below used

}

const obj = { face: 'my face' };

const obj2 = showFace.bind(obj);

obj2(); // output will be "my face" because of bind.

showFace.call(obj) // ??

showFace.apply(obj) // ??

</expand>

<expand title="Method VS Function">
## Method VS Function

- Example:

const video = {

tags: ['aa', 'bb'],

showTags(){

// this is the space of the method "showTags".

this.tags.forEach(function(tag){

// this is the space of the above anonymous function

})

}

}

</expand>

<expand title="Regular Expression">
## Regular Expression

- Used to:
  - validate text like phone no, etc.
  - search through text like matching patterns

</expand>

<expand title="nanoid">
## nanoid

- like uuid

</expand>

<expand title="Dependencies VS devDependencies">
## Dependencies VS devDependencies

- 
- 

</expand>

<expand title="return using new key word">
## return using new key word

- 

</expand>

<expand title="Session VS Token">
## Session VS Token

- Session id can be stored in the cookies(not good), db and server.

</expand>

<expand title="Moralis">
## Moralis

- middleware
- 
- 

</expand>

<expand title="Memory Storage">
## Memory Storage

- Stack: Static Memory Allocation
  - static data, i.e., data whose size is known at compile time.
  - In JavaScript, this includes primitive values (string, number, boolean, undefined, and null) and references to functions and objects.
  - The process of allocating memory right before execution is called static.
- Heap: Dynamic Memory Allocation
  - A heap (memory heap) is used to store data such as objects and functions.
  - Unlike with the stack, the engine does not know how much memory will be needed for certain objects, and therefore allocates memory as needed.

</expand>

<expand title="Garbage Collector">
## Garbage Collector

- High-level languages have a built-in subsystem called the garbage collector.
- The role of this subsystem is to track memory allocation operations and use it to find out when a piece of allocated memory is no longer needed.
- Unfortunately, this process is not absolutely accurate, since the general problem of finding out whether a certain memory fragment is needed or not is

unsolvable (it cannot be solved algorithmically).

- GC collects:
  - Unused variable
  - when we declare a string(primitive), the string value is coerced to a string object in order to access the property length.

The string object is only used for a fraction of second after which it is sacrificed to the Gods of garbage collection.

  - Unused libraries // hv to confirm it.

- Garbage collection in Javascript uses the Mark and sweep algorithm; when a reference to a variable is removed, its deleted

</expand>

<expand title="Object Oriented JS (OOJS)">
## Object Oriented JS (OOJS)

- 
- 

</expand>

<expand title="First Class Functions">
## First Class Functions

- If any programming language has the ability to treat functions as values, to pass them as arguments and to return a function from another function then it is said

that programming language has First Class Functions and the functions are called as First Class Citizens in that programming language

</expand>

<expand title="JISON">
## JISON

- 
- 

</expand>

<expand title=""string" VS "String"">
## "string" VS "String"

- as "String" is a function and anything that is not a primitive is an object in js.
- "string" is nothing just a pointer pointing to some random position of the memory containing the value.
- "String" has built-in fucntions. This is why it is slower than "string".
- auto-box: ????
- Example:
  - let s = 'ali'; // type = string
  - let ss = new String('ali'); // type = object

</expand>

<expand title="Job & Job Queue">
## Job & Job Queue

- introduced in ES6.
- 
- 
- 

</expand>

<expand title="window">
## window

- window.performance:
  - 
  - 
  - 

</expand>

<expand title="Synchronous VS Asynchronous VS Multi-threading VS Multi-processing: (https://www.youtube.com/watch?v=0vFgKr5bjWI)">
## Synchronous VS Asynchronous VS Multi-threading VS Multi-processing: (https://www.youtube.com/watch?v=0vFgKr5bjWI)

- Synchronous:
  - Network call
  - Request to the printer
- Asynchronous:
  - Reading from disk
  - AJAX calls
  - Fetch requests
- Multi-threading:
  - CPU extensive tasks like calculations, etc.
  - can cause problems like in db. like locking, etc.
- Multi-processing:
  - every process has its own resources like memory, etc sharing a centralized db.
  - run on separate port.
  - can scale on multiple machine.
  - Ways to communicate between the processes:
  - Socket
  - 

</expand>

<expand title="Concurrency VS Parallelism: (https://www.youtube.com/watch?v=8Je1W82vwYM)">
## Concurrency VS Parallelism: (https://www.youtube.com/watch?v=8Je1W82vwYM)

- Concurrency:
  - Single core (context switching occurs using time slicing).
  - Goal:
  - To achieve non-blocking application.
  - Not to make the application faster or improve performance.
- Parallelism:
  - Multiple hardware (hardware = core, machine, etc).
  - Goal:
  - Make the application faster or enhance the application performance using multiple hardwares, etc.

</expand>

<expand title="Does Async use Threads in the background? (https://www.youtube.com/watch?v=G3tz9rxts8E)">
## Does Async use Threads in the background? (https://www.youtube.com/watch?v=G3tz9rxts8E)

- "NO". They does not spawn any thread in the background.
- Asynchronous:
  - Making application usable.
  - Non-blocking main thread.
  - Not About improving performance.
  - Not about creating new thread.

</expand>

<expand title="Static VS Singleton">
## Static VS Singleton

- Differences:
  - Singleton can implement interfaces but static cannot.
  - Singleton inherit from other classes and allow inheritance.
  - Singleton is more flexible than static classes and can maintain state.
  - Singleton Objects stored on heap while static class stored in stack.
  - Singleton Objects can have constructor while Static Class cannot.
  - Singleton Objects can dispose but not static class.
  - Singleton Objects can clone but not with static class.
- Similarities:
  - Both can be invoked without instantiation.
  - both provide only one "Instance".
  - neither of them is thread-safe.

</expand>

<expand title="Field VS Property">
## Field VS Property

- 
- 

Queries

Question:

1. Var is a global scope but when declare inside the function, cannot be accessed outside the function.

2. why there is no 'arguments', "this", etc in arrow function?

3.

</expand>

<expand title="Terms">
## Terms

- Thread safe programming *
- Network programming *
- Web programming *
- Network programming *
- Locking *
- Containerization *
- Orchestration/Kubernetes *
- API Gateway *
- API Management *
- Backup planning *
- data farming

</expand>

<expand title="Links">
## Links

- https://mindmajix.com/top-aws-services
- https://www.youtube.com/watch?v=Sh6lK57Cuk4&list=PL0vfts4VzfNixzfaQWwDUg3W5TRbE7CyI&index=1
- https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5 (Event Loop)
- https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf
- https://exploringjs.com/
- Lydia Hallie:
  - https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
  - 

----------------- Un arranged concepts ----------------------------------------------------------------

</expand>

<expand title="heap = storage of variables, non-primitive data values, alive till application, classes,">
## heap = storage of variables, non-primitive data values, alive till application, classes,

stack = keep track where we are in the application, primitive values.

</expand>

<expand title="JavaScript doesn't have a stack or a heap. It's a dynamic language and all the variables in JavaScript are dynamic. All the values (primitives and objects) in JavaScript are allocated from the heap. (NOTE: Need to confirm it)">
## JavaScript doesn't have a stack or a heap. It's a dynamic language and all the variables in JavaScript are dynamic. All the values (primitives and objects) in JavaScript are allocated from the heap. (NOTE: Need to confirm it)

heap = dynamic memory allocation (no limit per object) where stack allocates fixed amount of memory.

</expand>

<expand title="muatable variables where stores">
## muatable variables where stores

</expand>

<expand title="singleton pattern">
## singleton pattern

</expand>

<expand title="static">
## static

</expand>

<expand title="file having large text. str = str + current_line // heap, overflow">
## file having large text. str = str + current_line // heap, overflow

</expand>

<expand title=".?">
## .?

</expand>

<expand title="??">
## ??

</expand>

<expand title="?">
## ?

</expand>

<expand title="It is managed by two concepts: Garbage collection and "young-generation, old-generation" (prioritize objects for garbage collection).">
## It is managed by two concepts: Garbage collection and "young-generation, old-generation" (prioritize objects for garbage collection).

</expand>

<expand title="file = data, inside file = metadata">
## file = data, inside file = metadata

</expand>

<expand title="service in angular = narrow purpose class. different from module to increase modularity.">
## service in angular = narrow purpose class. different from module to increase modularity.

</expand>

<expand title="we get updated value got from settimeout of a variable, but got old value in state in reactJS.">
## we get updated value got from settimeout of a variable, but got old value in state in reactJS.

</expand>

<expand title="settimeout also deals with closure.">
## settimeout also deals with closure.

</expand>

<expand title="const obj1 = { name: "Intrinsic" };">
## const obj1 = { name: "Intrinsic" };

const obj2 = { name: "Intrinsic" };

console.log(obj1 === obj2); // false

// Though, their .name properties ARE primitives:

console.log(obj1.name === obj2.name); // true

</expand>

<expand title="let arr = [1,2,3];">
## let arr = [1,2,3];

console.log(1 in arr); // true

</expand>

<expand title="let time0 = performance.now(); // can measure the time taken by set of statements by measureing the time difference before and after those statements.">
## let time0 = performance.now(); // can measure the time taken by set of statements by measureing the time difference before and after those statements.

</expand>

<expand title="Memory usage in MBs">
## Memory usage in MBs

- Empty Fields 7.63
- Booleans	9.27
- Numbers	9.27
- Identical Strings	9.27
- Arrays	39.79
- Empty Objects	62.68

</expand>

<expand title="get byte size of a string">
## get byte size of a string

const byteSize = str => new Blob([str]).size;

const result = byteSize("Hello World");

console.log(result); // 11

</expand>

<expand title="Get current thread id">
## Get current thread id

- Thread.getID();//in java
- ??? // in JS

</expand>

<expand title="Browser can only understand JS, CSS and HTML. Other languages converted into it through buldling.">
## Browser can only understand JS, CSS and HTML. Other languages converted into it through buldling.

</expand>

<expand title="All JavaScript identifiers are case sensitive.">
## All JavaScript identifiers are case sensitive.

</expand>

<expand title="worker thread = child thread =">
## worker thread = child thread =

</expand>

<expand title="d3 for maps">
## d3 for maps

</expand>

<expand title="one thread = one call stack">
## one thread = one call stack

</expand>

<expand title="closures are bad for memory usage. The Garbage Collector has a difficult time to free memory used by closures.">
## closures are bad for memory usage. The Garbage Collector has a difficult time to free memory used by closures.

</expand>

<expand title="await Promise is indeed creating implicit closures.">
## await Promise is indeed creating implicit closures.

</expand>

<expand title="await only blocks the code execution within the async function (the world outside the function can continue executing while the function is waiting for the asynchronous operations to finish.).">
## await only blocks the code execution within the async function (the world outside the function can continue executing while the function is waiting for the asynchronous operations to finish.).

</expand>

<expand title="Async methods are intended to be non-blocking operations.">
## Async methods are intended to be non-blocking operations.

</expand>

<expand title="Async/Await enables us to write asynchronous code in a synchronous fashion, which produces cleaner and easier-to-understand logic. Under the hood, it’s just syntactic sugar using generators and yield statements to “pause” execution.">
## Async/Await enables us to write asynchronous code in a synchronous fashion, which produces cleaner and easier-to-understand logic. Under the hood, it’s just syntactic sugar using generators and yield statements to “pause” execution.

</expand>

<expand title="In fact, generators and even Promises themselves are also “syntactic sugars”! — clever designs to help us avoid writing callback hell.">
## In fact, generators and even Promises themselves are also “syntactic sugars”! — clever designs to help us avoid writing callback hell.

</expand>

<expand title="Browser APIs: setTimeOut, setInterval, fetch, console, HTTP requests, ?????">
## Browser APIs: setTimeOut, setInterval, fetch, console, HTTP requests, ?????

</expand>

<expand title="string VS String(), etc etc in Js">
## string VS String(), etc etc in Js

</expand>

<expand title="JS is single threaded. Its user of kernal thread?">
## JS is single threaded. Its user of kernal thread?

</expand>

<expand title="Server waits for network requests, db waits for queries and mutations, client waits for user events.">
## Server waits for network requests, db waits for queries and mutations, client waits for user events.

</expand>

<expand title="Non-Blocking events: promises, cb, async/await.">
## Non-Blocking events: promises, cb, async/await.

Blocking events: ?????????

hv to confirm both of it........

</expand>

<expand title=""does promise act similar to a callback" - In a general sense, a callback may be called asynchronously or synchronously depending on the context. But the whole point of promises is to allow async (non-blocking) operations. There is no "stack" in the sense that you appear to be using it in.">
## "does promise act similar to a callback" - In a general sense, a callback may be called asynchronously or synchronously depending on the context. But the whole point of promises is to allow async (non-blocking) operations. There is no "stack" in the sense that you appear to be using it in.

</expand>

<expand title="Javascript is always a synchronous(blocking) single thread language but we can make Javascript act Asynchronous through programming">
## Javascript is always a synchronous(blocking) single thread language but we can make Javascript act Asynchronous through programming

</expand>

<expand title="We can see the caller function of a function without 'strict' mode. but how?">
## We can see the caller function of a function without 'strict' mode. but how?

</expand>

<expand title="Generator Function Example: generation of random number in a while(1) loop in a function.">
## Generator Function Example: generation of random number in a while(1) loop in a function.

</expand>

<expand title="We use to say it returns clousures. what does closure object contains in it?">
## We use to say it returns clousures. what does closure object contains in it?

</expand>

<expand title="Generator = state-machine in a loop">
## Generator = state-machine in a loop

</expand>

<expand title="WebAPIs only handles async events. like console will not enter in the webAPIs.">
## WebAPIs only handles async events. like console will not enter in the webAPIs.

</expand>

<expand title="call stack vs stack">
## call stack vs stack

</expand>

<expand title="They are the same thing. It is also called the execution stack. This "callstack" is not to be confused with the general concept of "stack" data structure.">
## They are the same thing. It is also called the execution stack. This "callstack" is not to be confused with the general concept of "stack" data structure.

</expand>

<expand title="static mememory VS Dynamic in JS: The size of a primitive value is fixed, therefore, JavaScript stores the primitive value on the stack. On the other hand, the size of a reference value is dynamic so JavaScript stores the reference value on the heap.">
## static mememory VS Dynamic in JS: The size of a primitive value is fixed, therefore, JavaScript stores the primitive value on the stack. On the other hand, the size of a reference value is dynamic so JavaScript stores the reference value on the heap.

</expand>

<expand title="Low-level languages like C, have manual memory management primitives such as malloc() and free().">
## Low-level languages like C, have manual memory management primitives such as malloc() and free().

</expand>

<expand title="stack, call stack, execution stack, stack frame = purpose of each one?">
## stack, call stack, execution stack, stack frame = purpose of each one?

</expand>

<expand title="function VS resursive function in memory?">
## function VS resursive function in memory?

</expand>

<expand title="Objects are aggregations of properties. A property can reference an object or a primitive. Primitives are values, they have no properties.">
## Objects are aggregations of properties. A property can reference an object or a primitive. Primitives are values, they have no properties.

</expand>

<expand title="boolean, string and number  can be wrapped by their object counterparts. These objects are instances of the Boolean, String and Number constructors respectively.">
## boolean, string and number  can be wrapped by their object counterparts. These objects are instances of the Boolean, String and Number constructors respectively.

Example:

  - typeof true; //"boolean"
  - typeof Boolean(true); //"boolean"
  - typeof new Boolean(true); //"object"
  - typeof (new Boolean(true)).valueOf(); //"boolean"

</expand>

<expand title="__proto__ vs prototype">
## __proto__ vs prototype

- __proto__ is the actual object that is used in the lookup chain to resolve methods, etc.
- The prototype property is only present for functions and is a property that's set only if you're using the 'new' keyword when creating objects with this (constructor) function.
- Example:
  - var house = {color: "brown"},
  - house.prototype // undefined
  - house.__proto__ // {constructor: ƒ, __defineGetter__: ƒ, __defineSet... (__pro...
  - function add (a,b) { return a + b },
  - add.prototype // {constructor: ƒ}
  - add.__proto__ // ƒ () { [native code] }
- Functions have prototype, objects have __proto__ (also the objects using "new" keyword), primitves (string, let, etc) have __proto__
- Built-in methods came from the protope chain.

</expand>

<expand title="Closures Applications">
## Closures Applications

- General Applications: Generators, Iterators (maps), ????????
- Frequent Applications: object data privacy, in event handlers and callback functions.
- Partial Applications: currying, and other functional programming patterns

</expand>

<expand title="map(function(object) { // do something }); That function that you pass in becomes a closure because it gains access to the scope that was present when array.">
## map(function(object) { // do something }); That function that you pass in becomes a closure because it gains access to the scope that was present when array.

</expand>

<expand title="To create a closure we define a function that also returns a function, and this inner function will remember the values of the variables created in the outer function.">
## To create a closure we define a function that also returns a function, and this inner function will remember the values of the variables created in the outer function.

</expand>

<expand title="Objects and Private Data">
## Objects and Private Data

- One problem that arises from using objects in JavaScript is the lack of privacy.
- Since objects are collections of properties that can be accessed with dot or bracket notation.

</expand>

<expand title="Parasitic Inheritance">
## Parasitic Inheritance

- To achieve encapsulation and inheritance at the same time.
- In JavaScript, developers can replicate this parasitic behavior by invoking one function inside of another. In this way, one function can use the resources and effort of another function invocation.
- The combination of a closure and getter methods (getting properties name from getters like getName(), getAge(), etc. Object will not contains the properties directly into it) has created encapsulation for the Person object.

</expand>

<expand title="Closures actually maintains the reference.">
## Closures actually maintains the reference.

</expand>

<expand title="All fucntions in the JS creates a closures during its declaration.">
## All fucntions in the JS creates a closures during its declaration.

</expand>

<expand title="Map VS Filter">
## Map VS Filter

- The map method is used to convert each item of an array, while the filter method is used to select certain items of an array.
- The map() method creates a new array with the results of calling a provided function on every element in the calling array.
- map() calls a function once for each element in an array.

</expand>

<expand title="Closure Scoping">
## Closure Scoping

- Local Scope (Own scope)
- Outer Functions Scope (Lexical)
- Global Scope

</expand>

<expand title="Closure Consist of">
## Closure Consist of

- combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment)

</expand>

<expand title="Things works on the worker thread: fetch, axios, ??????">
## Things works on the worker thread: fetch, axios, ??????

</expand>

<expand title="Primitives = value (having no properties like non-primitives).">
## Primitives = value (having no properties like non-primitives).

- If primitives have no properties, why does "abc".length return a value?
  - Because JavaScript will readily coerce between primitives and objects. In this case the string value is coerced to a string object in order to access the property length.
  - The string object is only used for a fraction of second after which it is sacrificed to the Gods of garbage collection.
  - String Object:
  - The String object (String) lets you work with a series of characters; it wraps Javascript's string primitive data type with a number of helper methods.
  - Example:
    - String s=“Welcome”;
    - String s=new String(“Welcome”);
- Does coercion allow me to assign values to primitives?
  - No.
  - Example:
  - var primitive = "september";

primitive.vowels = 3;

primitive.vowels; //undefined;

</expand>

<expand title="prototype method">
## prototype method

- The prototype property allows you to add properties and methods to an object.
- 

</expand>

<expand title="Call-Stack and Call-FrameWork">
## Call-Stack and Call-FrameWork

- A call stack is composed of 1 or many several stack frames. Each stack frame corresponds to a call to a function or procedure which has not yet terminated with a return.
- To use a stack frame, a thread keeps two pointers, one is called the Stack Pointer (SP), and the other is called the Frame Pointer (FP). SP always points to the "top" of the stack,

and FP always points to the "top" of the frame. Additionally, the thread also maintains a program counter (PC) which points to the next instruction to be executed.

- The following are stored on the stack: local variables and temporaries, actual parameters of the current instruction (procedure, function, etc.)

</expand>

<expand title="Memory heap = Storage , call stack = track of what's happening to our code line by line.">
## Memory heap = Storage , call stack = track of what's happening to our code line by line.

</expand>

<expand title="3 common memory Leaks">
## 3 common memory Leaks

- Global Variables
- Event Listeners:
  - var element = document.getElementById(‘button’); element.addeventListener(‘click’, onClick) // we use to add event listener but we usually
- setInterval():
  - If we put objects inside a setInterval(), they will never be garbage collected unless we remove the setInterval itself. (setInterval( () => { //referencing objects }))

</expand>

<expand title="Optimizations in JS">
## Optimizations in JS

- NOTE: The key is to write code that is predictable for humans as well as machines.
- eval() //can be problematic for optimizations
- arguments() // best to use parameter destructuring instead.
- for in() //when looping over objects. Instead, use object.keys to iterate over object keys.
- with //problematic
- delete //problematic
- The inline caching // implemented by default. increases the speed.
  - Example:
  - let we have a function that takes an object of "fullName" and return firstName and lastName from it. When we call this function multiple times with the same data, despite getting

firstName and lastName each time, it will start returning these two attributes directly using inline caching.

- Hidden Classes
  - Something like the delete keyword will interfere with hidden classes.
- Engine compiles and optimized the code (code like a function returning same thing and being calling multiple times). No dynamic lookup is required, and it can just re-use the

optimized machine code. As JS is dynamically typed, it can happen that the same piece of code suddenly returns a different type of data. If that happens, the machine code gets

de-optimized, and the engine falls back to interpreting the generated byte code.

</expand>

<expand title="Babel is a Javascript compiler that takes your modern JS code and returns browser compatible JS (older JS code).">
## Babel is a Javascript compiler that takes your modern JS code and returns browser compatible JS (older JS code).

</expand>

<expand title="Interpreter converts code to ByteCode and then Compiler converts that code to "Machine Code (probably assembly lang)"">
## Interpreter converts code to ByteCode and then Compiler converts that code to "Machine Code (probably assembly lang)"

</expand>

<expand title="Interpreters VS Compilers">
## Interpreters VS Compilers

- Interpreters:
  - PROS:
  - Easy to get up and running because we don't have to convert our code into another language like how we saw language x.
  - CONS:
  - When you are running the same code over and over, for example, when you are in a loop, things get really slow.
- Compiler:
  - Because a compiler doesn't need to repeat the translation for each pass through in a loop, for example, the code generated is faster. These edits compilers do are called optimizations.
  - The compiler takes a little more time to start because it has to go through that compilation step at the beginning but when it sees repeated code or loops, it will simplify the code.

</expand>

<expand title="JS Engine = A Program">
## JS Engine = A Program

</expand>

<expand title="Once the code is in this AST form, it goes through something called an interpreter=>profiler=>compiler=> (more on this process later)">
## Once the code is in this AST form, it goes through something called an interpreter=>profiler=>compiler=> (more on this process later)

</expand>

<expand title="How to prevent callback clashes? // it's eventloop or queue's job?">
## How to prevent callback clashes? // it's eventloop or queue's job?

</expand>

<expand title="What happens when 2 requests came exaclty at the same time?">
## What happens when 2 requests came exaclty at the same time?

</expand>

<expand title="Which event occurs when callback finishes its time?">
## Which event occurs when callback finishes its time?

</expand>

<expand title="How can we stop string interpolation?">
## How can we stop string interpolation?

</expand>

<expand title="When we send an image to an api, it gets fail. why? (NOTE: question needs to proper)">
## When we send an image to an api, it gets fail. why? (NOTE: question needs to proper)

</expand>

<expand title="The call stack is part of the JS engine, this isn’t browser specific.">
## The call stack is part of the JS engine, this isn’t browser specific.

</expand>

<expand title="1 sec in settimeout means that it will enter in the queue after 1 second. Will be executed when the call stack gets empty.">
## 1 sec in settimeout means that it will enter in the queue after 1 second. Will be executed when the call stack gets empty.

</expand>

<expand title="When the JS engine gets our script, the first thing it does is setting up memory for the data in our code.">
## When the JS engine gets our script, the first thing it does is setting up memory for the data in our code.

</expand>

<expand title="In the creation phase, even if we have intialized "let" and "const", it will be saved with "<uninitilaized>" tag in the memory and "var" with "undefined". Value will be assigned in execution phase.">
## In the creation phase, even if we have intialized "let" and "const", it will be saved with "<uninitilaized>" tag in the memory and "var" with "undefined". Value will be assigned in execution phase.

</expand>

<expand title="Global context VS Local context">
## Global context VS Local context

</expand>

<expand title="Scope Chain = chain of references to values that we can access in the current context. If variable is not defined in the same scope, will go down the scope chain (means upper lexical scopes).">
## Scope Chain = chain of references to values that we can access in the current context. If variable is not defined in the same scope, will go down the scope chain (means upper lexical scopes).

</expand>

<expand title="Global object VS Activation object">
## Global object VS Activation object

</expand>

<expand title="Execution context creates on runtime.">
## Execution context creates on runtime.

</expand>

<expand title="Normal fucntion hoisted to global scope and contains the whole body, where "arrow" or "fucntion statement (normal fucntion storing in a variable)" fucntions hoisted and contains undefined like "var" variable.">
## Normal fucntion hoisted to global scope and contains the whole body, where "arrow" or "fucntion statement (normal fucntion storing in a variable)" fucntions hoisted and contains undefined like "var" variable.

</expand>

<expand title="Disable copy functionality in html = <input oncopy="return false">">
## Disable copy functionality in html = <input oncopy="return false">

</expand>

<expand title="Disable right click web = <body oncontextmenu="retun false"> ... </body>">
## Disable right click web = <body oncontextmenu="retun false"> ... </body>

</expand>

<expand title="Variable used first checks the declaration in its scope and going for outer lexical scope (means to go down scope. NOTE: not UP.) for finding ites declaration till global scope.">
## Variable used first checks the declaration in its scope and going for outer lexical scope (means to go down scope. NOTE: not UP.) for finding ites declaration till global scope.

</expand>

<expand title="Queues">
## Queues

- Quesues/Phases: Timers(settimeout, setInterval), Pending CBs(I/O opeartions), idle/prepare, poll, check(setImmediate), close CBs.
- Micro VS Macro:
  - Micro = process.nextTick(), Promise, cb, queueMicrotask
  - Macro = setTimeOut, setInterval, setImmediate

</expand>

<expand title="Parsers in Engine">
## Parsers in Engine

- In order to reduce the time it takes to load up a website, the engine tries to avoid parsing code that's not necessary right away.
- Pre-Parser:
  - The preparser handles code that may be used later on.
  - Example:
  - If a certain function will only get invoked after a user clicks a button, it's not necessary that this code is compiled immediately just to load up a website.
- Parser:
  - The parser handles the code that’s needed immediately

</expand>

<expand title="Constructor Functions">
## Constructor Functions

- 
- 

</expand>

<expand title="Classes VS Constructor Function">
## Classes VS Constructor Function

- Classes (ES6) is a syntactical sugar for the constructor fucntions.
- Example of contructor fucntions:
  - fucntion dog(name, breed, color) {

this.name = name,

this.breed = breed,

this.color = color

}

Dog.prototype.bark = fucntion() {retun "Wooooof!"}; // just adding a method in the prototype

let dogObj = new Dog('Daisy', 'Labrador', 'black');

- Example of Class (alternate of above example):
  - class Dog {

constructor(name, breed, color) {this.name = name, this.breed = breed, this.color = color}

bark() {

retur "Wooooof!";

} // NOTE: all the funtions we were adding in the prototype of constructor function will be simply added in the body of the class.

}

- Another great thing about classes, is that we can easily extend other classes.

</expand>

<expand title="Normal functions follow something called a run-to-completion model">
## Normal functions follow something called a run-to-completion model

</expand>

<expand title="Singleton Design Pattern">
## Singleton Design Pattern

- Also called anti-pattern. should be avoided in JS because JS is not like Object oriented programming. We do not create objects in JS like in OO programming languages using "new" keyword.
- Example:

let instance;

let counter = 0;

class Counter {

constructor() {

if (instance) {

throw new Error("You can only create one instance!");

}

instance = this;

}

}

const counter = new Counter();

const counter2 = new Counter(); // error

- Advantage:
  - Memory saving. Each new object takes memory.

</expand>

<expand title="Prototype Design Pattern">
## Prototype Design Pattern

- The prototype pattern is very powerful when working with objects that should have access to the same properties. Instead of creating a duplicate of the property each time,

we can simply add the property to the prototype, since all instances have access to the prototype object.

- Example:
  - class Dog {

constructor(name, breed, color) {this.name = name, this.breed = breed, this.color = color}

bark() {

retur "Wooooof!";

} // NOTE: all the funtions we were adding in the prototype of constructor function will be simply added in the body of the class.

}

</expand>

<expand title="Modular Design Pattern">
## Modular Design Pattern

- The module pattern allows you to split up your code into smaller, reusable pieces.
- Very Benifial in large apps.
- Example:
  - user.js, etc.

</expand>

<expand title="Factory Design Pattern">
## Factory Design Pattern

- we can use factory functions in order to create new objects.
- A function is a factory function when it returns a new object without the use of the new keyword!
- Example:

const createUser = ({ firstName, lastName, email }) => ({

firstName,

lastName,

email,

fullName() {

return `${this.firstName} ${this.lastName}`;

}

});

- Pros:
  - useful when we have to create multiple smaller objects that share the same properties.
- Cons:
  - In JavaScript, the factory pattern isn't much more than a function that returns an object without using the new keyword.

</expand>

<expand title="Design Patterns in jQuery">
## Design Patterns in jQuery

- Composite, Adapter, Facade, Observer, Iterator, Proxy, Builder.

</expand>

<expand title="Scopes">
## Scopes

- Local
- Lexical
- Modular
- Global
- Block

</expand>

<expand title="JavaScript Legends: Lydia Hallie (Linkedin, Dev), Akshay Sainy (Youtube), Thapa Technical (Youtube), Fireship (Youtube),">
## JavaScript Legends: Lydia Hallie (Linkedin, Dev), Akshay Sainy (Youtube), Thapa Technical (Youtube), Fireship (Youtube),

</expand>

<expand title="Remote jobs: Toptal, Turing,">
## Remote jobs: Toptal, Turing,

---------------------------------------------   Reference ---------------------------------------------

https://rabisiddique.medium.com/maximizing-node-js-performance-with-thread-pools-912bacbe529a#:~:text=By%20default%2C%20libuv%20uses%20a,the%20requirements%20of%20your%20application

</expand>

