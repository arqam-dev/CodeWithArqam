# VS Comparisons - Conflicting & Interchangeable Concepts

<expand title="JavaScript">
## JavaScript

### 1. var vs let vs const
- **var:**
  - Function-scoped or globally-scoped
  - Hoisted and initialized with `undefined`
  - Can be redeclared
  - Can be reassigned
- **let:**
  - Block-scoped
  - Hoisted but not initialized (Temporal Dead Zone)
  - Cannot be redeclared in same scope
  - Can be reassigned
- **const:**
  - Block-scoped
  - Hoisted but not initialized (Temporal Dead Zone)
  - Cannot be redeclared
  - Cannot be reassigned (but object/array contents can be modified)

### 2. == vs ===
- **== (Loose Equality):**
  - Performs type coercion
  - `0 == "0"` returns `true`
  - `null == undefined` returns `true`
- **=== (Strict Equality):**
  - No type coercion
  - Compares both type and value
  - `0 === "0"` returns `false`
  - `null === undefined` returns `false`

### 3. null vs undefined
- **null:**
  - Intentional absence of value
  - Assigned by developer
  - Type: `object` (historical bug)
  - `typeof null` returns `"object"`
- **undefined:**
  - Variable declared but not assigned
  - Default value for uninitialized variables
  - Type: `undefined`
  - `typeof undefined` returns `"undefined"`

### 4. function declaration vs function expression vs arrow function
- **Function Declaration:**
  - Hoisted (can be called before declaration)
  - Has its own `this` binding
  - Can be used as constructor
- **Function Expression:**
  - Not hoisted (must be declared before use)
  - Has its own `this` binding
  - Can be used as constructor
- **Arrow Function:**
  - Not hoisted
  - Lexical `this` binding (inherits from parent scope)
  - Cannot be used as constructor
  - No `arguments` object

### 5. Promise vs async/await
- **Promise:**
  - Uses `.then()` and `.catch()` chains
  - Can lead to callback hell
  - Better for parallel operations
- **async/await:**
  - Syntactic sugar over Promises
  - More readable, synchronous-looking code
  - Better error handling with try/catch
  - Sequential execution by default

### 6. forEach vs map vs filter vs reduce
- **forEach:**
  - Iterates and executes callback
  - Returns `undefined`
  - Used for side effects
- **map:**
  - Transforms each element
  - Returns new array of same length
  - Used for transformation
- **filter:**
  - Selects elements based on condition
  - Returns new array (may be shorter)
  - Used for filtering
- **reduce:**
  - Reduces array to single value
  - Returns accumulator value
  - Most flexible, can do map/filter operations

### 7. JSON vs JSONB
- **JSON:**
  - Stores JSON data as plain text
  - Preserves original formatting
  - Slower queries
  - PostgreSQL data type
- **JSONB:**
  - Stores JSON data in binary format
  - Optimized for fast read/write
  - Faster queries, supports indexing
  - PostgreSQL data type

### 8. localStorage vs sessionStorage vs cookies
- **localStorage:**
  - Persists until explicitly cleared
  - ~5-10MB storage limit
  - Same-origin policy
  - Not sent with HTTP requests
- **sessionStorage:**
  - Cleared when tab/window closes
  - ~5-10MB storage limit
  - Same-origin policy
  - Not sent with HTTP requests
- **cookies:**
  - Can set expiration date
  - ~4KB storage limit
  - Sent with every HTTP request
  - Can be accessed by server

### 9. shallow copy vs deep copy
- **Shallow Copy:**
  - Copies top-level properties only
  - Nested objects/arrays share references
  - Faster performance
  - Methods: `Object.assign()`, spread operator `{...obj}`, `Array.slice()`
- **Deep Copy:**
  - Copies all nested properties recursively
  - Creates completely independent copy
  - Slower performance
  - Methods: `JSON.parse(JSON.stringify())`, `structuredClone()`, libraries like Lodash

### 10. call() vs apply() vs bind()
- **call():**
  - Immediately invokes function
  - Arguments passed individually
  - `func.call(thisArg, arg1, arg2)`
- **apply():**
  - Immediately invokes function
  - Arguments passed as array
  - `func.apply(thisArg, [arg1, arg2])`
- **bind():**
  - Returns new function with bound `this`
  - Does not invoke immediately
  - `const boundFunc = func.bind(thisArg)`

</expand>

<expand title="Angular">
## Angular

### 1. Component vs Directive vs Service
- **Component:**
  - Has template and view
  - Can have lifecycle hooks
  - Represents a view
  - Declarable in `@NgModule`
- **Directive:**
  - No template (structural/attribute directives)
  - Modifies DOM behavior
  - Reusable across components
- **Service:**
  - No view/template
  - Contains business logic
  - Injectable, singleton by default
  - Shared across components

### 2. @Input() vs @Output() vs @ViewChild()
- **@Input():**
  - Passes data from parent to child
  - One-way data binding
  - `@Input() propertyName: type`
- **@Output():**
  - Emits events from child to parent
  - Uses EventEmitter
  - `@Output() eventName = new EventEmitter()`
- **@ViewChild():**
  - Accesses child component/directive/element
  - Available after `ngAfterViewInit`
  - `@ViewChild(ChildComponent) child: ChildComponent`

### 3. Template-driven Forms vs Reactive Forms
- **Template-driven Forms:**
  - Form logic in template
  - Uses `ngModel` and directives
  - Easier for simple forms
  - Less testable
  - Two-way data binding
- **Reactive Forms:**
  - Form logic in component
  - Uses `FormBuilder`, `FormGroup`, `FormControl`
  - More testable
  - Better for complex forms
  - Immutable, functional approach

### 4. ngOnInit vs constructor
- **constructor:**
  - Called when class is instantiated
  - Used for dependency injection
  - Should not contain initialization logic
  - Runs before Angular lifecycle hooks
- **ngOnInit:**
  - Angular lifecycle hook
  - Called after first `ngOnChanges`
  - Best place for initialization logic
  - Input properties are available

### 5. Observable vs Promise
- **Observable:**
  - Can emit multiple values over time
  - Lazy (executes when subscribed)
  - Can be cancelled
  - Supports operators (map, filter, etc.)
  - Part of RxJS
- **Promise:**
  - Emits single value
  - Eager (executes immediately)
  - Cannot be cancelled
  - No operators
  - Native JavaScript

### 6. Subject vs BehaviorSubject vs ReplaySubject
- **Subject:**
  - No initial value
  - Subscribers only get values emitted after subscription
  - Multicast (multiple subscribers)
- **BehaviorSubject:**
  - Has initial value
  - New subscribers get current value immediately
  - Stores last emitted value
- **ReplaySubject:**
  - Replays specified number of previous values
  - New subscribers get buffered values
  - Configurable buffer size

</expand>

<expand title="React">
## React

### 1. Functional Components vs Class Components
- **Functional Components:**
  - Modern approach (React 16.8+)
  - Use hooks for state/lifecycle
  - Simpler syntax
  - Better performance
  - Recommended approach
- **Class Components:**
  - Legacy approach
  - Use `this.state` and lifecycle methods
  - More verbose
  - Still supported but not recommended

### 2. useState vs useReducer
- **useState:**
  - Simple state management
  - Single state value
  - Direct state updates
  - Best for simple state
- **useReducer:**
  - Complex state management
  - Multiple related state values
  - State updates via actions
  - Better for complex logic

### 3. useEffect vs useLayoutEffect
- **useEffect:**
  - Runs after render and paint
  - Asynchronous
  - Doesn't block browser painting
  - Best for most side effects
- **useLayoutEffect:**
  - Runs synchronously after render, before paint
  - Blocks browser painting
  - Use when you need to measure DOM or prevent flicker
  - Runs before useEffect

### 4. useMemo vs useCallback
- **useMemo:**
  - Memoizes computed values
  - Returns memoized value
  - Prevents expensive recalculations
  - `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])`
- **useCallback:**
  - Memoizes functions
  - Returns memoized function reference
  - Prevents unnecessary re-renders
  - `const memoizedCallback = useCallback(() => { doSomething(a, b) }, [a, b])`

### 5. Controlled Components vs Uncontrolled Components
- **Controlled Components:**
  - Form data handled by React state
  - Single source of truth
  - Value prop and onChange handler
  - More predictable
- **Uncontrolled Components:**
  - Form data handled by DOM
  - Use refs to access values
  - Less code
  - Less React-like

### 6. React.memo vs useMemo vs useCallback
- **React.memo:**
  - Memoizes entire component
  - Prevents re-render if props haven't changed
  - HOC (Higher Order Component)
- **useMemo:**
  - Memoizes computed values within component
  - Prevents expensive recalculations
- **useCallback:**
  - Memoizes function references
  - Prevents function recreation on each render

### 7. Context API vs Redux vs Zustand
- **Context API:**
  - Built-in React solution
  - Good for simple global state
  - Can cause performance issues if overused
  - No middleware or devtools
- **Redux:**
  - External state management library
  - Predictable state updates
  - Great devtools and middleware
  - More boilerplate
- **Zustand:**
  - Lightweight state management
  - Minimal boilerplate
  - Simple API
  - Good alternative to Redux

</expand>

<expand title="Node.js">
## Node.js

### 1. require() vs import/export
- **require() (CommonJS):**
  - Synchronous loading
  - Can be called anywhere
  - Runtime resolution
  - Default in Node.js
  - `module.exports` and `require()`
- **import/export (ES Modules):**
  - Asynchronous loading
  - Must be at top level
  - Static analysis
  - Requires `"type": "module"` in package.json
  - `export` and `import`

### 2. callbacks vs Promises vs async/await
- **Callbacks:**
  - Traditional Node.js pattern
  - Can lead to callback hell
  - Error handling via first parameter
  - `fs.readFile(path, callback)`
- **Promises:**
  - Better error handling
  - Chainable with `.then()`
  - Can still get complex
  - `fs.promises.readFile(path).then()`
- **async/await:**
  - Most readable
  - Synchronous-looking code
  - Try/catch for errors
  - `const data = await fs.promises.readFile(path)`

### 3. process.nextTick() vs setImmediate() vs setTimeout()
- **process.nextTick():**
  - Highest priority
  - Executes before any I/O
  - Can starve I/O
  - Microtask queue
- **setImmediate():**
  - Executes after I/O callbacks
  - Check phase of event loop
  - Better for I/O operations
- **setTimeout():**
  - Executes after minimum delay
  - Timer phase of event loop
  - Can be delayed by other operations

### 4. cluster vs child_process vs worker_threads
- **cluster:**
  - Spawns multiple Node.js processes
  - Shares server ports
  - Process isolation
  - Good for CPU-intensive tasks
- **child_process:**
  - Spawns separate processes
  - Full process isolation
  - Higher memory overhead
  - Good for running external programs
- **worker_threads:**
  - Lightweight threads
  - Share memory via SharedArrayBuffer
  - Lower overhead than processes
  - Good for CPU-intensive tasks in Node.js

</expand>

<expand title="Database">
## Database

### 1. SQL vs NoSQL
- **SQL (Relational):**
  - Structured schema
  - ACID compliance
  - Vertical scaling preferred
  - Complex queries with JOINs
  - Examples: MySQL, PostgreSQL, Oracle
- **NoSQL:**
  - Flexible schema
  - Eventual consistency (BASE)
  - Horizontal scaling preferred
  - Simple queries, no JOINs
  - Examples: MongoDB, Cassandra, DynamoDB

### 2. MySQL vs PostgreSQL
- **MySQL:**
  - More popular, larger community
  - Faster for read-heavy workloads
  - Simpler replication
  - Owned by Oracle
- **PostgreSQL:**
  - More advanced features
  - Better for complex queries
  - ACID compliant
  - Open source, community-driven
  - Better JSON support

### 3. MongoDB vs Cassandra
- **MongoDB:**
  - Document database
  - Flexible schema
  - Good for rapid development
  - Single master replication
- **Cassandra:**
  - Column-family database
  - Masterless architecture
  - Better for write-heavy workloads
  - Linear scalability

### 4. Sharding vs Partitioning vs Replication
- **Sharding:**
  - Splits data across multiple databases/servers
  - Horizontal scaling
  - Example: Users split by region across DBs
- **Partitioning:**
  - Divides single table into smaller pieces
  - Within one database
  - Example: Orders split by date in one DB
- **Replication:**
  - Copies data to multiple servers
  - For availability and read scaling
  - Master-slave or master-master

### 5. ACID vs BASE
- **ACID:**
  - Atomicity, Consistency, Isolation, Durability
  - Strong consistency
  - Traditional relational databases
  - CP in CAP theorem
- **BASE:**
  - Basically Available, Soft state, Eventual consistency
  - Eventual consistency
  - NoSQL databases
  - AP in CAP theorem

</expand>

<expand title="Architecture & Design">
## Architecture & Design

### 1. Monolithic vs Microservices
- **Monolithic:**
  - Single codebase and deployment
  - Simpler development
  - Easier debugging
  - Tight coupling
  - Single point of failure
- **Microservices:**
  - Multiple independent services
  - Independent scaling
  - Technology diversity
  - Loose coupling
  - Complex deployment and debugging

### 2. SOA vs Microservices
- **SOA (Service-Oriented Architecture):**
  - Shared services across applications
  - Centralized governance
  - Usually same database
  - Services deployed separately but centrally governed
- **Microservices:**
  - Independent services
  - Decentralized governance
  - Separate databases per service
  - Services deployed separately and independently

### 3. REST vs GraphQL vs gRPC
- **REST:**
  - Multiple endpoints
  - HTTP methods (GET, POST, PUT, DELETE)
  - Over-fetching/under-fetching possible
  - Stateless
  - Easy caching
- **GraphQL:**
  - Single endpoint
  - Query language
  - Fetch exactly what you need
  - Strongly typed
  - Cache complexity
- **gRPC:**
  - Protocol buffers
  - Binary format
  - High performance
  - Streaming support
  - HTTP/2 based

### 4. Stateless vs Stateful
- **Stateless:**
  - No server-side session
  - Session in shared storage (DB/Redis)
  - Any server can handle request
  - Horizontally scalable
- **Stateful:**
  - Server remembers client state
  - Sticky sessions required
  - Same client to same server
  - Harder to scale

### 5. Vertical Scaling vs Horizontal Scaling
- **Vertical Scaling (Scale Up):**
  - Add more power to existing server
  - CPU, RAM upgrades
  - Simple approach
  - Hard limits
  - Single point of failure
- **Horizontal Scaling (Scale Out):**
  - Add more servers
  - Load balancing required
  - Better availability
  - No hard limits
  - Preferred for large-scale

### 6. SQL vs NoSQL (Selection Criteria)
- **Choose SQL when:**
  - Strong consistency needed
  - Complex queries with JOINs
  - Financial/transactional systems
  - Structured data
- **Choose NoSQL when:**
  - High scalability needed
  - Flexible schema
  - Simple queries
  - Real-time analytics
  - Unstructured/semi-structured data

</expand>

<expand title="Rendering & Performance">
## Rendering & Performance

### 1. CSR vs SSR vs SSG vs ISR
- **CSR (Client-Side Rendering):**
  - Rendered in browser
  - Fast initial load
  - Poor SEO
  - React, Vue, Angular SPA
- **SSR (Server-Side Rendering):**
  - Rendered on server
  - Better SEO
  - Slower initial load
  - Next.js, Nuxt.js
- **SSG (Static Site Generation):**
  - Pre-rendered at build time
  - Fastest performance
  - Best SEO
  - No server needed
- **ISR (Incremental Static Regeneration):**
  - Hybrid of SSG and SSR
  - Revalidate pages on demand
  - Best of both worlds
  - Next.js feature

### 2. Lazy Loading vs Eager Loading
- **Lazy Loading:**
  - Load resources when needed
  - Better initial performance
  - Code splitting
  - On-demand loading
- **Eager Loading:**
  - Load all resources upfront
  - Faster subsequent interactions
  - Larger initial bundle
  - Traditional approach

</expand>

<expand title="State Management">
## State Management

### 1. Redux vs Context API vs Zustand
- **Redux:**
  - Predictable state container
  - Great devtools
  - Middleware support
  - More boilerplate
  - Industry standard
- **Context API:**
  - Built-in React
  - Simple setup
  - Can cause performance issues
  - No middleware
  - Good for simple state
- **Zustand:**
  - Lightweight
  - Minimal boilerplate
  - Simple API
  - Good alternative to Redux

### 2. Flux vs Redux
- **Flux:**
  - Architecture pattern
  - Multiple stores
  - Facebook's original pattern
- **Redux:**
  - Single store
  - Immutable updates
  - Time-travel debugging
  - Most popular implementation

</expand>

<expand title="Testing">
## Testing

### 1. Unit Testing vs Integration Testing vs E2E Testing
- **Unit Testing:**
  - Tests individual functions/components
  - Fast execution
  - Isolated testing
  - Jest, Mocha
- **Integration Testing:**
  - Tests component interactions
  - Tests API + Database
  - Moderate speed
  - Tests workflows
- **E2E Testing:**
  - Tests full user journey
  - Slowest execution
  - Tests entire application
  - Cypress, Playwright

### 2. TDD vs BDD
- **TDD (Test-Driven Development):**
  - Write tests before code
  - Focus on code functionality
  - Developer-centric
  - Red-Green-Refactor cycle
- **BDD (Behavior-Driven Development):**
  - Write tests in natural language
  - Focus on user behavior
  - Business-centric
  - Given-When-Then format

</expand>

<expand title="Deployment & DevOps">
## Deployment & DevOps

### 1. CI vs CD
- **CI (Continuous Integration):**
  - Automatically test and merge code
  - Runs on every commit
  - Catches bugs early
  - Automated testing
- **CD (Continuous Deployment/Delivery):**
  - Automatically deploy to production
  - Continuous Delivery: Manual approval
  - Continuous Deployment: Automatic
  - Automated deployment

### 2. Docker vs Kubernetes vs Docker Compose
- **Docker:**
  - Containerization platform
  - Package application and dependencies
  - Single container management
- **Kubernetes:**
  - Container orchestration
  - Manages multiple containers
  - Auto-scaling, load balancing
- **Docker Compose:**
  - Multi-container Docker applications
  - Define services in YAML
  - Local development

### 3. Blue/Green vs Canary Deployment
- **Blue/Green:**
  - Two identical environments
  - Switch traffic instantly
  - Zero downtime
  - Requires double infrastructure
- **Canary:**
  - Gradual rollout
  - Small percentage of traffic
  - Monitor before full rollout
  - Lower risk

</expand>

<expand title="Security">
## Security

### 1. Authentication vs Authorization
- **Authentication:**
  - Verifies who you are
  - Login process
  - Credentials validation
  - "Are you who you claim to be?"
- **Authorization:**
  - Verifies what you can do
  - Permission checking
  - Access control
  - "What are you allowed to do?"

### 2. OAuth2 vs OIDC
- **OAuth2:**
  - Authorization framework
  - Access tokens
  - Delegated access
  - "Can this app access my data?"
- **OIDC (OpenID Connect):**
  - Identity layer on OAuth2
  - ID tokens
  - Authentication + Authorization
  - "Who is this user?"

### 3. JWT vs Opaque Tokens
- **JWT (JSON Web Token):**
  - Self-contained
  - Stateless
  - Can be decoded (not encrypted)
  - Contains user info
- **Opaque Tokens:**
  - Random string
  - Server must validate
  - More secure
  - No user info in token

### 4. HTTPS vs HTTP
- **HTTP:**
  - Unencrypted
  - Port 80
  - Vulnerable to attacks
  - Not secure
- **HTTPS:**
  - Encrypted with TLS/SSL
  - Port 443
  - Secure communication
  - Required for sensitive data

</expand>

<expand title="General Web Concepts">
## General Web Concepts

### 1. URL vs URI vs URN
- **URI (Uniform Resource Identifier):**
  - Identifies a resource
  - Generic term
  - Can be URL or URN
- **URL (Uniform Resource Locator):**
  - Location of resource
  - Includes protocol and path
  - `https://example.com/page`
- **URN (Uniform Resource Name):**
  - Name of resource
  - Persistent identifier
  - `urn:isbn:0451450523`

### 2. TCP vs UDP
- **TCP (Transmission Control Protocol):**
  - Connection-oriented
  - Reliable delivery
  - Slower
  - Used for HTTP, HTTPS, FTP
- **UDP (User Datagram Protocol):**
  - Connectionless
  - Faster
  - No guarantee of delivery
  - Used for gaming, streaming

### 3. HTTP vs WebSocket
- **HTTP:**
  - Request-response model
  - Stateless
  - One-way communication
  - Client initiates
- **WebSocket:**
  - Persistent connection
  - Full-duplex communication
  - Server can push data
  - Real-time applications

### 4. Design Pattern vs Design Principle
- **Design Pattern:**
  - Specific solution to recurring problem
  - Template/blueprint
  - Examples: Singleton, Factory, Observer
- **Design Principle:**
  - Best practices and guidelines
  - General rules
  - Examples: SOLID, DRY, KISS

</expand>

