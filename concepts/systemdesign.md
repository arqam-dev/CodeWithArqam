# System Design

## Primary Concepts

<expand title="Architectures (how responsibilities are divided, whether in code, servers, or data)">
## Architectures (how responsibilities are divided, whether in code, servers, or data)

### Types:

#### 1. Backend System Architecture - System Shape (how the system is split) -- BE/Server

##### 1.1 Client–Server (A-Architecture):
- Client–Server is a foundational interaction model.
- It coexists with: Monolith, Microservices, SOA, Serverless like Client–Server + Microservices, Client–Server + Monolith, etc..
- **When to use it (good fit):**
  - Centralized data & control
  - Web & mobile applications
  - CRUD systems
  - Early-stage or simple systems
- **When Client–Server is NOT the right model (KEY INSIGHT):**
  - Peer-to-peer systems (file sharing) - IDM Example
  - Blockchain networks (no central owner)
  - Gossip-based systems
  - Some distributed databases
  - Offline-first, device-to-device systems

##### 1.2 Monolith / Modular Monolith (A):
- A monolithic architecture is where the entire backend application is built, deployed, and scaled as a single unit.
- Backend: Auth, Users, Orders, Payments, etc
- Works inside Client–Server Architecture
- **NOTE:** It does NOT mean frontend + backend + database are one thing. It is specifically about backend business logic. It can be colocated and cannot be.
- **Modular Monolith (clean upgrade):**
  - A Modular Monolith is a monolithic backend where the codebase is strictly divided into independent modules
  - Backend: Auth Module, Users, etc
- **When to use Monolith / Modular Monolith:**
  - Startups, MVPs, Internal enterprise systems, etc
- **When it stops working well:**
  - Independent scaling is needed
  - Deployments become risky
  - Domains become tightly coupled, etc.

##### 1.3 Service-Oriented Architecture (SOA) (A):
- SOA is an architecture where the backend is split into reusable services that communicate over a network and are shared across multiple applications.
- Sits between Monolith and Microservices. Predecessor of Microservices.
- Works inside Client–Server Architecture
- Services are: Independent, Reusable, Centrally governed
- **Example:** Same Customer Service used by - Web, Mobile, Partner systems, internal tools, etc
- **SOA vs Microservices:**
  - **SOA:** shared services, centralized control. Usually has same DB. services are deployed separately, but centrally governed.
  - **Microservices:** independent services, decentralized control. Usually has separate DBs. services are deployed separately, but not centrally governed.

##### 1.4 Microservices (A):
- Microservices is an architecture where the backend is split into small, independent services, each owning its own business logic and data, and deployed separately.
- Works inside Client–Server
- Evolution of SOA
- **Each service:** Runs independently, Deploys independently, Scales independently, Owns its database
- **Applications:** Same as SOA. Netflix, Uber, etc

##### 1.5 Event-Driven Architecture (EDA) (A):
- Event-Driven Architecture is a model where services communicate by producing and reacting to events instead of calling each other directly.
- Works inside Client–Server
- Commonly used with Microservices. Can coexist with Monolith or SOA
- **Example:** E-commerce system (Order processing), Notifications
- **Key characteristics:**
  - Loose coupling
  - Asynchronous communication
  - High scalability
  - Eventual consistency
- **Trade-offs:**
  - Harder debugging
  - Duplicate event handling
  - Complex failure scenarios

##### 1.6 Serverless Architecture (A):
- Serverless architecture is a model where you run backend code without managing servers, and the cloud provider handles provisioning, scaling, and infrastructure.
- Works inside Client–Server
- **When Serverless is a good fit:**
  - Variable or spiky traffic
  - Event-driven workloads
  - APIs with unpredictable load
  - Background jobs
- **AWS Serverless services:**
  - Lambda functions
  - S3
  - DynamoDB, Aurora serverless
  - API gateway
  - SNS, SQS
  - EventBridge
  - Step Functions
- **NOTE:** EC2, ECS, EKS, RDS, etc are NOT Serverless
- **When Serverless is NOT a good fit:**
  - Long-running processes
  - Heavy in-memory workloads
- **NOTE:** for this situation, Containers or VMs are better.

#### 2. Backend Application Architecture - Inside a Service (how code is written in above System) -- BE Coding Patterns

##### 2.1 Layered (N-tier) (A):
- Organizes code into horizontal layers (Presentation, Business Logic, Data Access)
- Each layer depends only on layers below it
- **Example:** Controller → Service → Repository → Database
- **When to use:** Traditional applications, clear separation of concerns
- **Limitation:** Can lead to anemic domain models

##### 2.2 MVC / MVVM (A):
- **MVC (Model-View-Controller):**
  - Model: Data and business logic
  - View: User interface
  - Controller: Handles user input and coordinates
- **MVVM (Model-View-ViewModel):**
  - ViewModel: Mediates between View and Model
  - Two-way data binding
  - Better for complex UIs
- **When to use:** UI-heavy applications, clear separation between presentation and logic

##### 2.3 Clean Architecture (A):
- Dependency rule: Dependencies point inward (toward business logic)
- Business logic is independent of frameworks, UI, and databases. Angular Example- Business logic is written in the same language (TypeScript), but NOT in the Angular framework (decorators, DI, components, lifecycle, RxJS-heavy APIs, etc).
- **Layers:** Entities (innermost) → Use Cases → Interface Adapters → Frameworks (outermost)
- **When to use:** Long-term projects, need for testability and independence
- **Benefit:** Easy to change frameworks without affecting business logic

##### 2.4 Hexagonal (Ports & Adapters) (A):
- Application core is isolated from external concerns
- **Ports:** Interfaces that define how application communicates
- **Adapters:** Implementations that connect to external systems (DB, APIs, UI)
- **When to use:** Applications with multiple external integrations
- **Benefit:** Core business logic remains unchanged when external systems change

##### 2.5 DDD (Domain-Driven Design) (C-Concept):
- Focuses on modeling business domain
- **Key concepts:** Entities, Value Objects, Aggregates, Domain Services
- Ubiquitous language shared between developers and domain experts
- **When to use:** Complex business domains, need for rich domain models
- **Benefit:** Code reflects business reality

##### 2.6 BFF (Backend for Frontend) (A):
- Separate backend service tailored for specific frontend (web, mobile, etc.)
- Aggregates data from multiple microservices
- Optimizes data for specific client needs
- **When to use:** Multiple frontend clients with different data requirements
- **Benefit:** Reduces over-fetching, improves performance for each client

#### 3. Frontend Architecture (UI app)

##### 3.1 Component-based (A):
- UI built from reusable, independent components
- Each component encapsulates its own structure, style, and behavior
- **Examples:** React, Vue, Angular components
- **When to use:** Modern web applications, need for reusability
- **Benefit:** Easier maintenance, better code organization

##### 3.2 MVC / MVVM (frontend) (A):
- **MVC:** Traditional pattern (AngularJS, Backbone.js)
- **MVVM:** Two-way data binding (Angular, Vue)
- Separates presentation from business logic
- **When to use:** Complex UIs with data binding needs

##### 3.3 Micro-frontends (A):
- Frontend application split into smaller, independently deployable applications
- Each team owns a part of the UI
- **When to use:** Large teams, independent deployments needed
- **Benefit:** Team autonomy, technology diversity
- **Challenge:** Coordination, shared dependencies

##### 3.4 Rendering models: CSR / SSR / SSG / ISR (C):
- **CSR (Client-Side Rendering):** Rendered in browser, poor SEO, fast interactions
- **SSR (Server-Side Rendering):** Rendered on server, better SEO, slower initial load
- **SSG (Static Site Generation):** Pre-rendered at build time, fastest, best SEO
- **ISR (Incremental Static Regeneration):** Hybrid, revalidates on demand
- **When to use:** Choose based on SEO needs, update frequency, performance requirements

##### 3.5 State management: Flux / Redux (C):
- **Flux:** Unidirectional data flow pattern
- **Redux:** Implementation of Flux with single source of truth
- **When to use:** Complex state management, need for predictable updates
- **Benefit:** Easier debugging, time-travel debugging

#### 4. Data

##### 4.1 Data modeling (RDBMS / NoSQL / Graph) (C):
- **RDBMS:** Structured data, relationships via foreign keys, ACID compliance
- **NoSQL:** Flexible schema, horizontal scaling, eventual consistency
- **Graph:** Relationship-focused, nodes and edges, complex queries
- **When to use:** Choose based on data structure, consistency needs, scale requirements

##### 4.2 Partitioning / Sharding (C):
- **Partitioning:** Divides table within one database (by date, region, etc.)
- **Sharding:** Splits data across multiple databases/servers
- **When to use:** Large datasets, need for performance and scalability
- **Benefit:** Faster queries, better distribution of load

##### 4.3 Replication (C):
- Copies data to multiple servers for availability and read scaling
- **Master-Slave:** One master for writes, multiple slaves for reads
- **Master-Master:** Multiple masters, more complex but better availability
- **When to use:** High availability requirements, read-heavy workloads
- **Benefit:** Fault tolerance, improved read performance

##### 4.4 Indexing (C):
- Data structure that speeds up data retrieval
- **Types:** B-tree, Hash, Bitmap indexes
- **Trade-off:** Faster reads, slower writes, additional storage
- **When to use:** Frequently queried columns, large tables
- **Best practice:** Index foreign keys, frequently filtered columns

##### 4.5 Caching (C):
- Stores frequently accessed data in fast storage (memory)
- **Layers:** Application cache, database cache, CDN cache
- **Strategies:** Cache-aside, Read-through, Write-through, Write-behind
- **When to use:** Read-heavy workloads, expensive computations
- **Challenge:** Cache invalidation, consistency

##### 4.6 Consistency models (C):
- **Strong consistency:** All nodes see same data immediately
- **Eventual consistency:** Data becomes consistent over time
- **When to use:** Choose based on CAP theorem trade-offs
- **Impact:** Affects user experience and system design

##### 4.7 CAP theorem (C):
- Distributed systems can guarantee at most 2 of 3: Consistency, Availability, Partition tolerance
- **CP systems:** Strong consistency, partition tolerance (traditional databases)
- **AP systems:** High availability, partition tolerance (NoSQL, distributed systems)
- **When to use:** Choose based on business requirements

##### 4.8 Backups / DR / Multi-region (C):
- **Backups:** Regular copies of data for recovery
- **DR (Disaster Recovery):** Plan to restore operations after disaster
- **Multi-region:** Deploy across geographic regions for availability
- **When to use:** Critical systems, compliance requirements
- **Benefit:** Data protection, business continuity

##### 4.9 OLTP vs OLAP, ETL/ELT/CDC (C):
- **OLTP (Online Transaction Processing):** Real-time transactions, normalized data
- **OLAP (Online Analytical Processing):** Analytics, denormalized data, data warehouses
- **ETL (Extract, Transform, Load):** Traditional data pipeline
- **ELT (Extract, Load, Transform):** Modern approach, transform in destination
- **CDC (Change Data Capture):** Real-time data synchronization
- **When to use:** OLTP for operations, OLAP for analytics

#### 5. Communication

##### 5.1 REST / GraphQL / gRPC (C):
- **REST:** Stateless, resource-based, HTTP methods, multiple endpoints
- **GraphQL:** Single endpoint, query language, fetch exactly what you need
- **gRPC:** Binary protocol, high performance, streaming support
- **When to use:** REST for simplicity, GraphQL for flexible queries, gRPC for performance

##### 5.2 Sync vs Async (C):
- **Synchronous:** Request waits for response, blocking
- **Asynchronous:** Non-blocking, uses callbacks/promises/events
- **When to use:** Sync for simple operations, Async for I/O-bound tasks
- **Benefit:** Async improves throughput and resource utilization

##### 5.3 Queues / Pub-Sub / Streams (C):
- **Queues:** Point-to-point messaging, one consumer per message
- **Pub-Sub:** Broadcast messaging, multiple subscribers
- **Streams:** Continuous data flow, real-time processing
- **When to use:** Queues for task processing, Pub-Sub for events, Streams for real-time data
- **Benefit:** Decoupling, scalability, reliability

##### 5.4 API Gateway (A):
- Single entry point for all client requests
- **Functions:** Routing, authentication, rate limiting, load balancing, caching
- **When to use:** Microservices architecture, multiple clients
- **Benefit:** Centralized cross-cutting concerns, simplified client interactions

##### 5.5 Schema contracts (OpenAPI / Protobuf / AsyncAPI) (C):
- **OpenAPI:** REST API documentation standard (Swagger)
- **Protobuf:** Binary serialization format, used by gRPC
- **AsyncAPI:** Event-driven API documentation
- **When to use:** Define API contracts for consistency and documentation
- **Benefit:** Type safety, documentation, code generation

#### 6. Security (how trust is enforced)

##### 6.1 Authentication vs Authorization (C):
- **Authentication:** Verifies identity ("Who are you?")
- **Authorization:** Verifies permissions ("What can you do?")
- **When to use:** Both required for secure systems
- **Example:** Login (auth) → Check permissions (authorization)

##### 6.2 RBAC / ABAC (C):
- **RBAC (Role-Based Access Control):** Permissions based on roles
- **ABAC (Attribute-Based Access Control):** Permissions based on attributes (user, resource, environment)
- **When to use:** RBAC for simple scenarios, ABAC for fine-grained control
- **Benefit:** Centralized access management

##### 6.3 OAuth2 / OIDC (C):
- **OAuth2:** Authorization framework, access tokens
- **OIDC (OpenID Connect):** Identity layer on OAuth2, ID tokens
- **When to use:** Third-party authentication, single sign-on (SSO)
- **Benefit:** Delegated access, user doesn't share credentials

##### 6.4 JWT (C):
- Self-contained token with user claims
- Stateless authentication
- **Structure:** Header.Payload.Signature
- **When to use:** Stateless APIs, microservices
- **Security:** Must be signed, consider expiration and refresh tokens

##### 6.5 Zero Trust (C):
- Security model: "Never trust, always verify"
- No implicit trust based on network location
- **Principles:** Verify explicitly, least privilege, assume breach
- **When to use:** Modern distributed systems, cloud environments
- **Benefit:** Enhanced security posture

##### 6.6 Encryption (in transit / at rest) (C):
- **In transit:** TLS/SSL for data moving over network
- **At rest:** Encrypt stored data (databases, files)
- **When to use:** Always for sensitive data
- **Benefit:** Protection against interception and data breaches

##### 6.7 Secrets & key management (C):
- Store sensitive data (API keys, passwords, certificates) securely
- **Tools:** AWS Secrets Manager, HashiCorp Vault, environment variables
- **When to use:** Any application with sensitive credentials
- **Best practice:** Never hardcode secrets, rotate regularly

##### 6.8 Network security (WAF, segmentation) (C):
- **WAF (Web Application Firewall):** Protects against web attacks
- **Network segmentation:** Isolates network zones
- **When to use:** Public-facing applications, multi-tenant systems
- **Benefit:** Defense in depth, reduced attack surface

##### 6.9 Audit logging / compliance (C):
- Log all security-relevant events
- **Compliance:** GDPR, HIPAA, PCI-DSS, SOC 2
- **When to use:** Required for compliance, security monitoring
- **Benefit:** Accountability, forensic analysis, compliance

#### 7. Delivery & Operations (how it runs in production)

##### 7.1 VM / Containers / Serverless (A):
- **VM (Virtual Machines):** Full OS virtualization, more overhead
- **Containers:** Lightweight, share host OS, faster startup
- **Serverless:** No infrastructure management, pay per execution
- **When to use:** VMs for legacy, Containers for portability, Serverless for event-driven
- **Benefit:** Different levels of abstraction and management

##### 7.2 CI/CD (C):
- **CI (Continuous Integration):** Automatically test and merge code
- **CD (Continuous Deployment/Delivery):** Automatically deploy to production
- **When to use:** Any software project for faster delivery
- **Benefit:** Faster feedback, reduced manual errors, frequent releases

##### 7.3 Release strategies (Blue/Green, Canary) (C):
- **Blue/Green:** Two identical environments, instant switch
- **Canary:** Gradual rollout to small percentage, monitor, then expand
- **When to use:** Blue/Green for zero downtime, Canary for risk reduction
- **Benefit:** Safe deployments, easy rollback

##### 7.4 IaC (Infrastructure as Code) (C):
- Manage infrastructure using code (Terraform, CloudFormation, etc.)
- **When to use:** Cloud deployments, repeatable infrastructure
- **Benefit:** Version control, consistency, automation
- **Best practice:** Treat infrastructure like application code

##### 7.5 Observability (logs/metrics/traces) (C):
- **Logs:** Event records, debugging, audit trails
- **Metrics:** Numerical measurements, performance monitoring
- **Traces:** Request flow across services, distributed tracing
- **When to use:** All three for complete visibility
- **Benefit:** Faster troubleshooting, performance optimization

##### 7.6 Scaling (horizontal/autoscaling) (C):
- **Horizontal scaling:** Add more servers (scale out)
- **Vertical scaling:** Add more resources to existing server (scale up)
- **Autoscaling:** Automatically adjust resources based on demand
- **When to use:** Horizontal for cloud, vertical for quick fixes
- **Benefit:** Handle traffic spikes, cost optimization

#### 8. Development Practices / Engineering Discipline (NOT ARCHITECTURE):

##### 8.1 TAD - Test After Development:
- Write tests after writing code
- **Approach:** Code first, then test
- **When to use:** Quick prototypes, learning projects
- **Limitation:** May miss edge cases, harder to achieve high coverage

##### 8.2 TDD - Test-Driven Development:
- Write tests before writing code
- **Cycle:** Red (write failing test) → Green (write code) → Refactor
- **When to use:** Complex logic, need for high test coverage
- **Benefit:** Better design, comprehensive tests, confidence in refactoring

##### 8.3 BDD - Behavior-Driven Development:
- Tests written in natural language (Given-When-Then)
- Focuses on user behavior and business requirements
- **When to use:** Collaboration with non-technical stakeholders
- **Benefit:** Clear requirements, shared understanding

##### 8.4 Code Reviews:
- Peer review of code before merging
- **When to use:** All code changes
- **Benefit:** Knowledge sharing, bug detection, consistency
- **Best practice:** Constructive feedback, automated checks

##### 8.5 CI (Continuous Integration):
- Automatically test and merge code on every commit
- **When to use:** Team development, shared codebase
- **Benefit:** Early bug detection, integration issues caught quickly
- **Note:** Part of CI/CD pipeline

</expand>

<expand title="Cache - Overall Application">
## Cache - Overall Application

### 1. Browser:
- **NOTE:** Saves images/js/css and sometimes API responses using HTTP headers.
- HTTP caching: Cache-Control, ETag, Last-Modified
- Service Worker cache (offline / stale-while-revalidate)
- Storage caches: LocalStorage, Session Storage, IndexedDB
- Asset caching via CDN behavior (browser respects headers)

### 2. Frontend:
- **NOTE:** Don't call the API again if I already have the data.
- **React:**
  - React Query
  - SWR
  - Redux (store as cache)
  - Redux Toolkit Query (RTK Query)
- **Angular:**
  - NgRX store
  - NgRx Entity
  - NgRX component store
  - RxJS "shareReplay" based cache

### 3. Backend:
- **NOTE:** Don't hit the database every time for the same read
- **In-memory cache:**
  - Node process memory
  - JVM heap cache
- **Distributed cache:**
  - Redis
  - Memcached
- HTTP response cache (API Gateway / Reverse Proxy)

### 4. Database:
- **NOTE:** Databases also avoid disk reads by caching in memory.
- **Relational DB:**
  - DB buffer cache (automatic) - DB keeps data pages/rows in RAM. MySQL: InnoDB Buffer Pool. Postgres: Shared Buffers
  - Query cache - before MySQL8, it cached entire query results.
  - Materialized views - Caching like feature
  - Read replicas (read-scale cache-like behavior)
- **NoSQL-Search DB:**
  - (To be added)

</expand>

<expand title="Security / Reliability - Overall Application">
## Security / Reliability - Overall Application

### 1. Browser:
- **Purpose:** protect user session, data in browser. session + injection protection
- Secure cookies (HttpOnly, Secure, SameSite)
- Token storage rules (avoid localStorage for sensitive tokens)
- Browser storage controls (localStorage / IndexedDB usage discipline)
- CSRF protection (same-site cookies, CSRF tokens)
- Content Security Policy (CSP)
- XSS protection (escaping, sanitization)

### 2. Frontend:
- **Purpose:** enforce UI-level access & safe data handling
- Route guards (Angular Guards, React Protected Routes)
- Role/permission-based UI rendering
- Token handling (access vs refresh tokens)
- API request signing (auth headers)
- Input validation (client-side)
- Secure state management (Redux / NgRx store hygiene)

### 3. Backend:
- **Purpose:** REAL security enforcement
- Authentication (OAuth2 / OIDC)
- Authorization (RBAC / ABAC)
- API authentication (JWT, opaque tokens)
- Token validation & rotation
- Rate limiting & throttling
- Input validation & sanitization
- Output filtering (no overexposure)
- Audit logs
- Secrets management (env, vault)
- Idempotency keys (abuse protection)

### 4. Communication / Network Layer:
- **Purpose:** protect data in transit & service boundaries. secure pipes
- TLS / HTTPS everywhere
- mTLS (service-to-service)
- API Gateway security -> auth, rate limiting, IP allow/deny
- WAF (Web Application Firewall)
- Network segmentation (VPC, subnets, security groups)

### 5. Database:
- **Purpose:** protect stored data. least privilege + encryption
- Encryption at rest
- DB user roles & permissions
- Row/column-level security
- Parameterized queries (SQL injection protection)
- Audit logging
- Backup encryption

### 6. Deployment / Infrastructure:
- **Purpose:** protect runtime & secrets
- IAM roles (no hardcoded creds)
- Secrets manager (Vault, AWS Secrets Manager)
- Image scanning (containers)
- OS hardening
- Patch management
- Infrastructure-as-Code security
- Environment isolation (dev/stage/prod)

### 7. Compliances:
- **Tech-Cloud:** ISO 27001, SOC 2
- **Health:** HIPAA
- **Finance:** PCI DSS
- **ECommerce-Retail:** PCI DSS, GDPR
- **Govt:** NIST

### 8. Cross-cutting Security Concepts (apply everywhere):
- Zero Trust (never trust, always verify)
- Principle of Least Privilege
- Defense in Depth
- Secure defaults
- Auditability & compliance

</expand>

<expand title="Performance / Scalability - Overall Application:">
## Performance / Scalability - Overall Application:

### 1. Browser:
- CDN-delivered static assets (reduce origin load)
- Lazy loading (images/routes) to reduce payload
- Pagination / infinite scroll (don't load everything)
- Client-side caching (avoid repeat calls)

### 2. Frontend:
- Server-state libraries to reduce refetch (React Query / SWR, NgRx patterns)
- Debouncing/throttling (search, filters)
- Virtualized lists (large tables/lists)
- Prefetching critical data only
- Split bundles (route-level)

### 3. Backend:
- Stateless services (enable horizontal scaling)
- Load balancing (spread traffic)
- Autoscaling (scale-out on CPU/RPS/latency)
- Caching hot reads (Redis)
- Async processing for heavy work (queues/workers)
- Rate limiting (protect capacity)
- Read/write separation (route reads differently than writes)

### 4. Communication:
- Queue-based buffering (smooth traffic spikes)
- Pub-Sub for fanout (avoid N sync calls)
- Backpressure (don't overload downstream)
- Timeouts/retries tuned for scale (avoid retry storms)
- API Gateway for throttling + routing

### 5. Database:
- **Relational:**
  - Indexing + query optimization (first)
  - Connection pooling
  - Read replicas
  - Partitioning (by tenant/date)
  - Sharding (when partitioning isn't enough)
  - Avoid hot rows (counters, leaderboards)
- **NoSQL:**
  - Partition key design (avoid hot partitions)
  - Denormalization for read scale
  - TTL + precomputed views

### 6. Storage/Files:
- Object storage (S3-style) for files
- CDN in front of object storage
- Pre-signed uploads (client uploads directly, bypass backend)

### 7. Deployment / Infrastructure:
- Multi-AZ deployment (capacity + resilience)
- Horizontal scaling policies
- Blue/Green or Canary (safe growth)
- Capacity planning + load testing
- Observability for scale signals (RPS, p95 latency, saturation)

</expand>

<expand title="Testing - Overall Application">
## Testing - Overall Application

### 1. Browser (usually not required explicitly):
- Does the app work in different browsers?
- Does localStorage/session behave as expected on different browsers

### 2. Frontend:
- **Unit tests** → small UI logic
- **Component tests** → UI + logic together
- **E2E tests** → full user journey

### 3. Backend:
- **Unit tests** → pure logic
- **API tests** → request/response
- **Integration tests** → API + DB

### 4. Communication:
- Contract testing (API contracts, schemas)
- Backward compatibility testing
- Error-handling testing (timeouts, retries)
- Message format testing (events, queues)
- Idempotency testing

### 5. Database (usually not required explicitly. done in integration testing in BE):
- Migration tests
- Data integrity checks

### 6. Deployment / Infrastructure:
- Smoke tests
- Post-deploy checks

### 7. Notes:
- **WHO** is testing (developer vs QA)
- **WHAT** is being tested (unit, integration, E2E, etc)
- **HOW** it is tested (black box, white box, etc)
- **Production Monitoring** - Sentry

</expand>

<expand title="System/Application Characteristics - Overall Application">
## System/Application Characteristics - Overall Application

**NOTE:** while designing a system we should consider following attributes:

1. Scalability
2. Maintainability
3. Load balancing
4. Caching
5. ACID
6. BASE
7. Low Latency
8. High Throughput
9. CAP Theorem
10. Fault Tolerance - Achieved by:
    - Multiple instances
    - Automatic failover
    - Retries with timeouts
    - Circuit breakers
    - Data replication
    - Graceful degradation
    - etc.

</expand>

<expand title="Logical Sequence">
## Logical Sequence

- Frontend (Presentation Layer) -> Frontend Logic / Controller -> Backend (API Layer)
  - Backend Service / Business Logic -> Data Access Layer (DAL / Repository) -> DB
- 1-line memory hook = UI talks to logic, logic talks to logic, logic talks to data.

</expand>

<expand title="Key Design Principles (10 Major)">
## Key Design Principles (10 Major)

- Divide and Conquer, Increase Cohesion, Reducing Coupling
- Increase Abstraction (interfaces and abstract classes)
- Increase Reusability (DRY - Don't Repeat Yourself)
- Design for Flexibility, Portability, Testability
- Anticipate Obsolescence, Design Defensively

</expand>

<expand title="Software Development Strategy / Repository Strategy">
## Software Development Strategy / Repository Strategy

- Monorepo: Multiple projects in single repository (Facebook, Microsoft)
- Polyrepo: Separate repository per project (Netflix)

</expand>

<expand title="Design Patterns (23 Standard - GOF)">
## Design Patterns (23 Standard - GOF)

- Solution to common recurring problems in software design
- Template that can be applied to real-life problems

### Categories:

#### 1. Creational Patterns (5): Object instantiation

##### 1.1 Singleton Pattern:
- **What it is:** A pattern that ensures only one instance of a class can ever exist in your application. No matter how many times you try to create it, you always get the same single instance.
- **Why use it:** Prevents multiple instances when you only need one, saving memory and ensuring consistent state across your application.
- **When to use:** 
  - When you need exactly one instance shared across the entire application
  - When creating multiple instances would cause problems or waste resources
  - For services that manage shared resources
- **Examples:**
  1. **Database Connection Manager:** Only one connection pool manager should exist to efficiently manage all database connections. Creating multiple managers would waste resources and cause conflicts.
  2. **Application Logger:** One logger instance that all parts of your app use to write logs. Multiple loggers would create duplicate log files or inconsistent logging behavior.
  3. **Configuration Manager:** One place to store and access application settings. Multiple config managers could lead to inconsistent settings.

##### 1.2 Factory Pattern:
- **What it is:** A pattern that creates objects for you without you needing to know the exact class name. You tell the factory what you want, and it creates the right object for you.
- **Why use it:** Simplifies object creation, especially when you don't know ahead of time which specific type you'll need. Makes your code more flexible and easier to maintain.
- **When to use:**
  - When you need to create objects but don't know the exact type until runtime
  - When object creation logic is complex and you want to centralize it
  - When you want to decouple object creation from object usage
- **Examples:**
  1. **UI Button Factory:** Instead of writing `new PrimaryButton()` or `new SecondaryButton()`, you call `factory.createButton('primary')` and the factory decides which button type to create based on the parameter.
  2. **Notification Factory:** Create different notification types (Email, SMS, Push) based on user preferences. The factory handles the complexity of choosing the right notification class.
  3. **Vehicle Factory:** Create different vehicles (Car, Truck, Motorcycle) based on user selection. Your code doesn't need to know the specific vehicle class, just the type name.

##### 1.3 Abstract Factory Pattern:
- **What it is:** A pattern that creates families of related objects that work together. Instead of creating individual objects, you create a whole set of compatible objects at once.
- **Why use it:** Ensures that objects you create are compatible with each other and belong to the same "family" or theme. Prevents mixing incompatible objects.
- **When to use:**
  - When you need to create groups of related objects that must work together
  - When you want to ensure objects are compatible (same theme, same platform, etc.)
  - When you might need to switch between different families of objects
- **Examples:**
  1. **UI Theme Factory:** Create a LightThemeFactory that produces LightButton, LightInput, LightModal - all matching light theme. Or DarkThemeFactory for dark theme components. Ensures all UI components match the selected theme.
  2. **Cross-Platform Factory:** Create WindowsFactory that produces WindowsButton, WindowsMenu, WindowsDialog - all for Windows. Or MacFactory for Mac-specific components. Ensures all components are for the same platform.
  3. **Database Factory:** Create MySQLFactory that produces MySQLConnection, MySQLQuery, MySQLTransaction - all MySQL-specific. Or PostgreSQLFactory for PostgreSQL components. Ensures all database operations use the same database system.

##### 1.4 Builder Pattern:
- **What it is:** A pattern that builds complex objects step by step, letting you set different properties one at a time. You can build the same object in different ways by choosing which steps to include.
- **Why use it:** Makes it easy to create objects with many optional parts. Instead of a constructor with 10 parameters, you set what you need step by step.
- **When to use:**
  - When an object has many optional parameters or configurations
  - When you want to build objects in different ways
  - When object construction is complex and you want to make it clearer
- **Examples:**
  1. **SQL Query Builder:** Build a database query step by step - add WHERE clauses, ORDER BY, LIMIT, etc. You can build simple or complex queries using the same builder. Example: `query.select('users').where('age > 18').orderBy('name').limit(10).build()`
  2. **Email Builder:** Build an email by adding recipient, subject, body, attachments one by one. You can create simple or complex emails using the same process. Example: `email.to('user@example.com').subject('Hello').body('Message').attach(file).build()`
  3. **HTTP Request Builder:** Build HTTP requests by adding method, URL, headers, body separately. Makes it easy to create different types of requests. Example: `request.get('/api/users').header('Authorization', 'token').body(data).build()`

##### 1.5 Prototype Pattern:
- **What it is:** A pattern that creates new objects by copying an existing object (the prototype) instead of building from scratch. Like making a photocopy of a document.
- **Why use it:** Faster than creating objects from scratch, especially when object creation is expensive. You clone a ready-made object and modify only what's different.
- **When to use:**
  - When creating objects is expensive (takes time or resources)
  - When you need many similar objects with slight variations
  - When you want to avoid the cost of initializing objects
- **Examples:**
  1. **Game Character Cloning:** Instead of creating each enemy from scratch (loading graphics, setting stats), clone a base enemy prototype and just change the position. Much faster when creating 100 enemies.
  2. **Document Templates:** Clone a document template (with formatting, structure) and just fill in the content. Faster than creating a new document with all formatting from scratch.
  3. **Database Record Cloning:** Clone a user record template with default permissions and settings, then modify only the name and email. Avoids setting up all default values repeatedly.

#### 2. Structural Patterns (7): Class/object composition and relationships

##### 2.1 Adapter Pattern:
- **What it is:** A pattern that acts like a translator between two incompatible interfaces. It wraps one object so it can work with code that expects a different interface - like a power adapter that lets you use a US plug in a European socket.
- **Why use it:** Allows you to use existing code or libraries that don't match your current interface without rewriting everything.
- **When to use:**
  - When you need to use a class/library that doesn't match your code's expected interface
  - When integrating third-party code that has different method names or parameters
  - When you want to make old code work with new code
- **Examples:**
  1. **Payment Gateway Adapter:** Your code expects a `pay(amount)` method, but Stripe uses `charge(amountInCents)`. An adapter wraps Stripe and converts your interface to Stripe's interface, so your code works with Stripe, PayPal, or any payment provider.
  2. **Legacy System Adapter:** Your new system expects modern API calls, but you need to connect to an old system with different method names. An adapter translates your modern calls into the old system's format.
  3. **Data Format Adapter:** Your application expects JSON, but a service returns XML. An adapter converts XML to JSON so your code doesn't need to change.

##### 2.2 Bridge Pattern:
- **What it is:** A pattern that separates what something does (abstraction) from how it does it (implementation). They can change independently - like separating a remote control from the TV it controls. You can have different remotes controlling the same TV, or the same remote controlling different TVs.
- **Why use it:** Prevents a permanent connection between interface and implementation, making your code more flexible. You can swap implementations without changing the abstraction.
- **When to use:**
  - When you want to avoid permanent binding between abstraction and implementation
  - When both abstraction and implementation need to vary independently
  - When you want to hide implementation details from clients
- **Examples:**
  1. **Remote Control and Devices:** A universal remote (abstraction) can control different devices (TV, DVD, Sound System - implementations). You can add new devices without changing the remote, or create new remotes for the same devices.
  2. **Drawing Shapes:** Shape abstraction (Circle, Square) separated from rendering implementation (Vector, Raster). You can draw shapes in different ways (vector graphics, raster images) without changing the shape classes.
  3. **Database Drivers:** Database abstraction (Connection, Query) separated from database implementation (MySQL, PostgreSQL, MongoDB). Your code uses the same interface, but can work with different databases by swapping the implementation.

##### 2.3 Composite Pattern:
- **What it is:** A pattern that lets you treat individual objects and groups of objects the same way. Like how a single file and a folder full of files can both be treated as "file system items" - you can get size, delete, or move either one.
- **Why use it:** Simplifies working with tree structures. You don't need different code for handling single items vs. groups of items.
- **When to use:**
  - When you need to represent part-whole hierarchies (tree structures)
  - When you want to treat individual objects and compositions uniformly
  - When you have recursive structures
- **Examples:**
  1. **File System:** Both files and folders are "FileSystemItem". You can get size of a file or a folder (which sums sizes of all files inside). You can delete a file or a folder (which deletes everything inside). Same operations work on both.
  2. **Organization Chart:** Both employees and departments are "OrganizationUnit". You can get total salary of an employee or a department (sums all employees). You can move an employee or an entire department.
  3. **UI Components:** Both simple buttons and complex panels (containing multiple buttons) are "Component". You can render, resize, or hide either one. A panel renders itself by rendering all its child components.

##### 2.4 Decorator Pattern:
- **What it is:** A pattern that lets you add new features to objects by wrapping them with decorators, one on top of another. Like adding layers - start with basic coffee, wrap it with milk decorator, then sugar decorator, then whipped cream decorator.
- **Why use it:** Adds functionality dynamically without modifying the original class. You can mix and match features at runtime.
- **When to use:**
  - When you want to add features to objects at runtime
  - When you need many combinations of features
  - When you can't modify the original class but need to extend it
- **Examples:**
  1. **Coffee Shop Ordering:** Start with basic Coffee ($5). Add MilkDecorator (+$2) = $7. Add SugarDecorator (+$1) = $8. Add WhippedCreamDecorator (+$3) = $11. Each decorator wraps the previous one and adds its cost.
  2. **Text Formatting:** Start with plain Text. Add BoldDecorator = bold text. Add ItalicDecorator = bold and italic. Add ColorDecorator = bold, italic, and colored. Each decorator adds formatting without changing the base text class.
  3. **Web Request Middleware:** Start with basic HTTP request. Add AuthenticationDecorator (adds auth header). Add LoggingDecorator (logs the request). Add CachingDecorator (caches response). Each decorator adds functionality to the request.

##### 2.5 Facade Pattern:
- **What it is:** A pattern that provides a simple, easy-to-use interface that hides the complexity of a larger system behind it. Like a restaurant menu that simplifies ordering - you just say "I want the combo meal" instead of ordering each item separately from different departments.
- **Why use it:** Makes complex systems easier to use by providing a simple interface. Users don't need to understand all the internal complexity.
- **When to use:**
  - When you have a complex subsystem with many classes
  - When you want to provide a simple interface for common tasks
  - When you want to hide implementation details from clients
- **Examples:**
  1. **Home Theater System:** Instead of manually turning on TV, DVD player, sound system, and dimming lights, a Facade provides one method `watchMovie()` that does all of this. The user doesn't need to know about all the individual components.
  2. **E-commerce Checkout:** Instead of calling payment service, inventory service, shipping service, and email service separately, a CheckoutFacade provides one `placeOrder()` method that coordinates all these services behind the scenes.
  3. **Database Operations:** Instead of manually opening connection, creating transaction, executing query, committing, and closing connection, a DatabaseFacade provides `executeQuery()` that handles all these steps internally.

##### 2.6 Flyweight Pattern:
- **What it is:** A pattern that shares common data between many objects to save memory. Instead of each object storing all its data, objects share common parts and only store what's unique to them.
- **Why use it:** Saves memory when you have many similar objects. Like having 1000 trees in a game - they all share the same texture and model, but each has its own position.
- **When to use:**
  - When you need to create many similar objects
  - When memory usage is a concern
  - When objects have both shared (intrinsic) and unique (extrinsic) state
- **Examples:**
  1. **Text Editor Characters:** Instead of each character storing its font, size, and style (wasting memory), all 'A' characters share the same formatting data. Each character only stores its position and the shared formatting reference.
  2. **Game Trees:** Instead of each tree storing its 3D model, texture, and animation data, all trees of the same type share this data. Each tree only stores its position, rotation, and health - the unique parts.
  3. **Web Browser Tabs:** Multiple tabs showing the same website share the same HTML, CSS, and JavaScript. Each tab only stores its scroll position and form data - the unique state.

##### 2.7 Proxy Pattern:
- **What it is:** A pattern that provides a placeholder or stand-in for another object. The proxy controls access to the real object and can add extra functionality like lazy loading, security checks, or caching.
- **Why use it:** Controls how and when the real object is accessed. Can add functionality without changing the real object.
- **When to use:**
  - When you need to control access to an object
  - When you want to add lazy loading (load only when needed)
  - When you need to add security, caching, or logging
- **Examples:**
  1. **Image Lazy Loading:** Instead of loading a large image immediately, an ImageProxy shows a placeholder. Only when the user scrolls to it does the proxy load the actual image. Saves bandwidth and improves page load time.
  2. **Access Control Proxy:** A SecureProxy checks if a user has permission before allowing access to sensitive data. The real object doesn't need to know about security - the proxy handles it.
  3. **API Caching Proxy:** A CachingProxy stores API responses. If the same request is made again, the proxy returns cached data instead of calling the real API, making responses faster.

#### 3. Behavioral Patterns (11): Communication between objects

##### 3.1 Chain of Responsibility Pattern:
- **What it is:** A pattern where a request is passed through a chain of handlers. Each handler decides if it can process the request or should pass it to the next handler. Like a customer service system where your request goes through different departments until someone can help.
- **Why use it:** Decouples the sender from receivers. You don't need to know which handler will process the request. Handlers can be added or removed easily.
- **When to use:**
  - When multiple objects might handle a request and you don't know which one
  - When you want to decouple the sender from receivers
  - When you want to add or remove handlers dynamically
- **Examples:**
  1. **Request Validation Chain:** An HTTP request goes through AuthenticationHandler (checks if user is logged in), then AuthorizationHandler (checks if user has permission), then RateLimitHandler (checks if too many requests), then finally to the actual handler. Each handler either processes or passes to next.
  2. **Customer Support System:** A support ticket goes through Level1Support (handles simple issues), then Level2Support (handles complex issues), then Level3Support (handles critical issues). Each level either solves it or escalates.
  3. **Error Handling Chain:** An error goes through ConsoleLogger (logs to console), then FileLogger (logs to file), then EmailLogger (sends email for critical errors). Each logger either handles it or passes to next.

##### 3.2 Command Pattern:
- **What it is:** A pattern that turns a request into an object. This object contains all the information needed to execute the request. Like writing down instructions on a piece of paper that can be executed now, later, or undone.
- **Why use it:** Allows you to parameterize objects with operations, queue requests, log operations, and support undo/redo functionality.
- **When to use:**
  - When you need to queue operations or execute them at different times
  - When you need undo/redo functionality
  - When you want to log or audit operations
- **Examples:**
  1. **Text Editor Undo/Redo:** Each action (type text, delete, format) becomes a command object. Commands are stored in a history. Undo executes the reverse command, redo executes the command again. You can undo multiple steps.
  2. **Remote Control:** Each button press creates a command object (TurnOnCommand, VolumeUpCommand). Commands can be executed immediately, scheduled for later, or stored in a macro. The remote doesn't need to know what device it controls.
  3. **Task Queue System:** User actions become command objects that are queued. Commands can be executed immediately, scheduled, or retried if they fail. Commands can be logged for audit purposes.

##### 3.3 Interpreter Pattern:
- **What it is:** A pattern that defines how to evaluate sentences in a language. It interprets expressions according to grammar rules. Like a calculator that understands mathematical expressions and evaluates them.
- **Why use it:** Useful for implementing domain-specific languages or when you need to interpret expressions or queries.
- **When to use:**
  - When you need to interpret a language or expression
  - When you have a grammar that can be represented as a syntax tree
  - When the grammar is simple (complex grammars need parser generators)
- **Examples:**
  1. **SQL Query Interpreter:** Interprets SQL syntax like "SELECT * FROM users WHERE age > 18". The interpreter understands SELECT, FROM, WHERE clauses and executes them against a database.
  2. **Mathematical Expression Evaluator:** Interprets expressions like "2 + 3 * 4" or "(10 - 5) / 2". The interpreter understands operators, precedence, and parentheses, then calculates the result.
  3. **Search Query Parser:** Interprets search queries like "title:javascript AND (author:john OR author:jane)". The interpreter understands keywords, operators, and parentheses, then searches accordingly.

##### 3.4 Iterator Pattern:
- **What it is:** A pattern that provides a way to access elements of a collection one by one without knowing how the collection is stored internally. Like a universal remote that can navigate through any playlist, whether it's an array, linked list, or tree.
- **Why use it:** Provides a uniform way to traverse different data structures. Your code doesn't need to know if it's iterating an array, tree, or database result.
- **When to use:**
  - When you want to traverse different data structures uniformly
  - When you want to hide the internal structure of a collection
  - When you need multiple ways to traverse the same collection
- **Examples:**
  1. **Collection Iteration:** Whether you have an array, linked list, or tree, you use the same iterator interface (hasNext(), next()). Your code works the same way regardless of the underlying data structure.
  2. **Database Result Iteration:** Database query results can be iterated the same way as arrays. You don't need to know if results are in memory, streaming from database, or paginated.
  3. **File System Traversal:** Iterate through files in a directory, subdirectories, or entire file system using the same interface. The iterator handles the complexity of navigating the file system structure.

##### 3.5 Mediator Pattern:
- **What it is:** A pattern where objects don't talk directly to each other. Instead, they communicate through a mediator. Like an air traffic controller - planes don't talk to each other, they all talk to the controller who coordinates everything.
- **Why use it:** Reduces dependencies between objects. Objects don't need to know about each other, only about the mediator. Makes the system easier to understand and maintain.
- **When to use:**
  - When communication between objects is complex
  - When you want to reduce coupling between objects
  - When you want to centralize communication logic
- **Examples:**
  1. **Chat Room System:** Users don't send messages directly to each other. They send messages to a ChatMediator, which then broadcasts to all users. The mediator handles adding/removing users and message routing.
  2. **Airport Control Tower:** Airplanes don't communicate directly. They all communicate with the control tower (mediator), which coordinates takeoffs, landings, and runway assignments to prevent conflicts.
  3. **Form Validation:** Form fields don't validate each other directly. A FormMediator coordinates validation - when one field changes, the mediator checks related fields and updates the form state accordingly.

##### 3.6 Observer Pattern:
- **What it is:** A pattern where an object (subject) notifies multiple dependent objects (observers) when its state changes. Like a newsletter - when a new article is published, all subscribers are automatically notified.
- **Why use it:** Establishes a one-to-many dependency. When the subject changes, all observers are automatically updated. Keeps objects loosely coupled.
- **When to use:**
  - When changes to one object require updating multiple other objects
  - When you want to decouple the subject from its observers
  - When you need a publish-subscribe mechanism
- **Examples:**
  1. **Newsletter Subscription:** When a blog publishes a new article, all subscribers (observers) are automatically notified via email. Subscribers can subscribe or unsubscribe without affecting the blog.
  2. **Stock Price Updates:** When a stock price changes, all investors watching that stock (observers) are notified. Investors can start or stop watching without affecting the stock price system.
  3. **UI State Management:** When application data changes, all UI components displaying that data (observers) are automatically updated. Components can be added or removed without modifying the data model.

##### 3.7 State Pattern:
- **What it is:** A pattern where an object's behavior changes based on its internal state. Instead of using many if-else statements, each state is a separate object with its own behavior. Like a traffic light that behaves differently in red, yellow, and green states.
- **Why use it:** Makes state-specific behavior explicit and organized. Each state is a class, making it easy to add new states or modify existing ones.
- **When to use:**
  - When an object's behavior depends on its state
  - When you have many conditional statements based on state
  - When state transitions are well-defined
- **Examples:**
  1. **Vending Machine:** Different states (NoMoney, HasMoney, Dispensing, OutOfStock) with different behaviors. In NoMoney state, inserting coin transitions to HasMoney. In HasMoney, pressing button transitions to Dispensing. Each state knows what to do.
  2. **Document Workflow:** Document has states (Draft, Review, Approved, Published). In Draft state, you can edit. In Review, you can only comment. In Approved, you can publish. Each state has different allowed actions.
  3. **Media Player:** Player has states (Stopped, Playing, Paused). In Stopped, play() starts playing. In Playing, pause() pauses. In Paused, play() resumes. Each state handles buttons differently.

##### 3.8 Strategy Pattern:
- **What it is:** A pattern that defines a family of algorithms and makes them interchangeable. You can switch between different ways of doing something at runtime. Like choosing a navigation strategy - fastest route, shortest route, or scenic route.
- **Why use it:** Lets you choose an algorithm at runtime. Makes algorithms interchangeable and easy to add new ones without changing existing code.
- **When to use:**
  - When you have multiple ways of doing something
  - When you want to choose the algorithm at runtime
  - When you want to isolate algorithm implementation
- **Examples:**
  1. **Payment Processing:** At checkout, choose payment strategy - CreditCardStrategy, PayPalStrategy, or BankTransferStrategy. The checkout process remains the same, only the payment method changes.
  2. **Sorting Algorithms:** Choose sorting strategy - QuickSortStrategy for speed, MergeSortStrategy for stability, or BubbleSortStrategy for simplicity. The code using sorting doesn't change, only the strategy.
  3. **Compression Algorithms:** Choose compression strategy - ZipStrategy, RarStrategy, or GzipStrategy. The file compression interface stays the same, but the compression method can be swapped.

##### 3.9 Template Method Pattern:
- **What it is:** A pattern that defines the skeleton of an algorithm in a base class, but lets subclasses override specific steps. Like a recipe template - the steps are the same, but you can customize ingredients.
- **Why use it:** Ensures the algorithm structure stays the same while allowing customization of specific steps. Prevents code duplication.
- **When to use:**
  - When you have an algorithm with steps that are mostly the same
  - When you want to enforce the algorithm structure
  - When you want to allow subclasses to customize specific steps
- **Examples:**
  1. **Data Processing Pipeline:** Base class defines steps: fetchData(), processData(), saveData(). Subclasses override processData() - CSVProcessor processes CSV, JSONProcessor processes JSON, but both follow the same pipeline structure.
  2. **Beverage Making:** Base class defines steps: boilWater(), brew(), pourInCup(), addCondiments(). Tea subclass overrides brew() and addCondiments() differently than Coffee, but both follow the same template.
  3. **Report Generation:** Base class defines steps: gatherData(), formatData(), generateReport(), sendReport(). Different report types (PDF, Excel, HTML) override formatData() but follow the same generation process.

##### 3.10 Visitor Pattern:
- **What it is:** A pattern that lets you add new operations to object structures without modifying the objects themselves. The operation is separated into a visitor object that "visits" each element. Like an inspector visiting different parts of a building to check them.
- **Why use it:** Allows adding new operations without changing the object structure. Useful when you have a stable object structure but frequently need new operations.
- **When to use:**
  - When you need to perform operations on object structures
  - When the object structure is stable but operations change frequently
  - When you want to separate algorithms from object structure
- **Examples:**
  1. **Code Analyzer:** A code structure has classes, methods, and variables. A Visitor (like CodeMetricsVisitor) visits each element to collect metrics. You can add new visitors (SecurityVisitor, PerformanceVisitor) without changing the code structure.
  2. **File System Operations:** File system has files and folders. A Visitor (like FileSizeVisitor) visits each element to calculate total size. You can add new visitors (SearchVisitor, DeleteVisitor) without modifying file/folder classes.
  3. **AST (Abstract Syntax Tree) Processing:** A program's AST has nodes (expressions, statements). A Visitor (like CompilerVisitor) visits each node to generate code. You can add new visitors (OptimizerVisitor, DebugVisitor) without changing AST node classes.

##### 3.11 Memento Pattern:
- **What it is:** A pattern that saves an object's state so you can restore it later. Like a save point in a game - you can save your progress and load it back later.
- **Why use it:** Enables undo/redo functionality, checkpoints, and state restoration without violating encapsulation.
- **When to use:**
  - When you need to save and restore object states
  - When you need undo/redo functionality
  - When you need checkpoints or snapshots
- **Examples:**
  1. **Text Editor Undo:** Each edit operation saves the document state (Memento) before making changes. Undo restores the previous Memento. You can undo multiple steps by restoring previous states.
  2. **Game Save System:** Game state (player position, health, inventory) is saved as a Memento. When player loads the game, the Memento is restored, bringing back the exact saved state.
  3. **Configuration Management:** Application settings are saved as Mementos. Users can revert to previous configurations by restoring a Memento. Useful for testing different configurations.

</expand>

<expand title="Microservices Architecture (10 Key Components)">
## Microservices Architecture (10 Key Components)

- Client, CDN, Load Balancer, API Gateway
- Microservices (independent services, own databases)
- Message Broker (RabbitMQ, Kafka, AWS SQS)
- Identity Provider (Authentication/Authorization)
- Service Registry and Discovery
- Service Coordination (Zookeeper)

</expand>

<expand title="Idempotent">
## Idempotent

Making the same request multiple times will produce the same result as making the request once. Like submission of form multiple times immediately should not insert the same data multiple times.

### Examples by HTTP Method:

1. **GET Requests:**
   - Inherently idempotent. Doesn't have any effect on server state.

2. **PUT and DELETE Requests:**
   - These methods are typically designed to be idempotent.
   - If you repeat the same PUT or DELETE request, the end result should still be the same, either the resource is updated to the same state or it is deleted.

3. **POST Requests:**
   - POST requests are not inherently idempotent.
   - **Ways to make POST idempotent:**
     - **Use Unique Identifiers:** Generate and include a unique identifier (e.g., a UUID) in the request payload or headers for each POST request.
     - **Idempotent Tokens:** Provide clients with idempotent tokens that can be included in the request headers.
     - **Conditional Requests:** Use conditional headers such as If-Match or If-None-Match to prevent unintended duplication. These headers allow the server to compare the current state of a resource with a previous state.
     - **Response Headers**
     - **Transaction IDs**
     - **Retries and Idempotence**
     - **Conflict Resolution**

</expand>

<expand title="CAP Theorem">
## CAP Theorem

Distributed systems can provide at most 2 of 3 guarantees:

1. **Consistency:** All clients see same data at same time
2. **Availability:** System responds even if some nodes are down
3. **Partition Tolerance:** The system continues to operate despite network failures that split nodes into isolated groups.

### Common combinations:
- **CP (Consistency + Partition):** Prioritizes consistency and partition tolerance
- **AP (Availability + Partition):** Prioritizes availability and partition tolerance

</expand>

<expand title="ACID vs BASE Properties">
## ACID vs BASE Properties

### ACID:

1. **A = Atomicity**
   - Transaction is all or nothing. Partial updates are not allowed.
   - **Example:** Money deducted and added — or neither

2. **C = Consistency**
   - Database moves from one valid state to another. All rules, constraints, and validations are preserved.
   - **Example:** Balance can't become negative if rule forbids it.

3. **I = Isolation**
   - Concurrent transactions don't interfere. Each behaves as if it runs alone.
   - **Example:** Two users editing data won't corrupt it.

4. **D = Durability**
   - Once committed, data is permanently saved. Survives crashes and restarts.
   - **Example:** Committed transfer remains after power failure.

### BASE:

1. **BA = Basically Available**
   - System always responds, even during failures. May return stale or partial data, but not an error
   - **Example:** Social media feed loads even if some likes/comments are missing

2. **S = Soft state**
   - Data may change over time without new input. State is not immediately consistent across all nodes
   - **Example:** Cache value updates asynchronously across servers

3. **E = Eventual consistency**
   - If no new updates occur, all replicas will eventually become consistent. No guarantee of immediate consistency
   - **Example:** Like count differs across regions but becomes same after some time

### Summary:
- In CAP theorem, ACID systems → CP, BASE systems → AP
- BASE = eventual consistency. NOT bad consistency.

</expand>

<expand title="General Points">
## General Points

- Event deplexer = event loop
- Avoid running of CPU intensive task on the main thread like finding a number is a prime or not using brute force approach. Number is a 7 or 8 digit number.
- DNS translates domain names to IP addresses so browsers can load Internet resources.
- Subscription:
  - For the same user like in angular RxJS subscription.
  - Real time = among different users
- SQLite Database is an open-source database provided in Android which is used to store data inside the user's device in the form of a Text file.
- KV = key value
- Networking operations always run on the main thread except for the DNS

</expand>

<expand title="Design Pattern VS Design Principal">
## Design Pattern VS Design Principal

- Principles are best practices to follow to allow scalable architecture and software craftmanship.
- Design patterns are techniques about how to do the design and architect your code.
- Design Principals Example in UX:
  - Contrast, Balance, Emphasis, Movement, White Space, Proportion, Hierarchy, Repetition, Rhythm, Pattern, Unity, and Variety.

</expand>

<expand title="Real-time database">
## Real-time database

  - Data changes → everyone connected sees it immediately
  - No polling, no refresh button
  - Works using persistent connections (WebSockets)
  - Example:
  - Firebase realtime db, firestore, supabase

</expand>

<expand title="Static Variable">
## Static Variable

  - Static variables have a property of preserving their value even after they are out of their scope.
  - Hence, static variables preserve their previous value in their previous scope and are not initialized again in the new scope.
  - So, This shows that variable defined in the angular services are static by default.

</expand>

<expand title="Single Table Architecture VS Multi-Table Architecture in NoSQL Databases?">
## Single Table Architecture VS Multi-Table Architecture in NoSQL Databases?

1. Single table doesn't mean that the whole application will have the single table.

2. This means the set of tables through which we have to get the data frequently, will be combined to a single table. This means we will denormalize the database.

3. **Example:**
   - Whenever we need to get a customer, we need to get the records as well. So, we will combine this table to avoid the join (RDBMS) or extra call for the second table (NoSQL).

</expand>

<expand title="Scenario: Two Requests hit a DB at the same time">
## Scenario: Two Requests hit a DB at the same time

**NOTE:** Requests can never hit the database at the exact same instant, even at microsecond or nanosecond level.

Internally, the DB schedules work across CPU cores and uses below techniques to keep data consistent.

### DBMS Techniques:

1. **Isolation levels:**
   - Isolation levels include "Read Uncommitted," "Read Committed," "Repeatable Read," and "Serializable."

2. **Locking:**
   - Locks can be placed on rows, tables, or even at a finer granularity.
   - Locking helps avoid conflicts but can also lead to potential deadlocks.

3. **Concurrency Control Algorithms:**
   - Techniques like two-phase locking, timestamp ordering, and optimistic concurrency control are used to manage concurrent updates.

4. **Timestamps and Versioning**
5. **Rollback and Redo**
6. **Conflict Resolution**
7. **Transaction Isolation and Durability**

</expand>

<expand title="JWT">
## JWT

- It is often used for authentication and authorization purposes in web applications and APIs.
- A JWT consists of three main parts:
  - Header
  - Payload
  - Signature

</expand>

<expand title="Scenario: If we get the token of one ecommerce web and utilize it for the other ecommerce, how they get to know that this token doesn't belongs to their web?">
## Scenario: If we get the token of one ecommerce web and utilize it for the other ecommerce, how they get to know that this token doesn't belongs to their web?

1. When a platform generates a token (JWT), it includes various pieces of information in the token's payload, such as user ID, email, and potentially other claims.

2. The platform uses its **private key**, which is kept securely and known only to that platform, to create a digital signature based on the token's payload.

3. When another platform receives the token, it cannot verify the signature because it doesn't have the original platform's private key, thus rejecting the token as invalid.

</expand>

<expand title="JSON vs JSONB">
## JSON vs JSONB

### Differences:

1. **JSON:**
   - Data type that stores JSON data as plain text
   - Preserves the original formatting and structure of the JSON data

2. **JSONB:**
   - Data is stored in a binary format optimized for fast read and write operations
   - Doesn't retain the original formatting
   - Usually more compact in terms of storage space

### Indexing:

- **SQL:** Supports JSON
  - We can do indexing over it and can do indexing on a single attribute known as Generated Column
  - Generated columns are of two types:
    - Stored Generated Columns
    - Virtual Generated Columns
- **PostgreSQL:** Supports JSONB

</expand>

<expand title="Database Types">
## Database Types

- SQL: MySQL, PostgreSQL, Microsoft SQL Server, and Oracle Database, etc.
- NoSQL:
  - Document Stores: MongoDB
  - Key-Value: Redis
  - Column-Family: Apache Cassandra
  - Graph: Neo4j

</expand>

<expand title="Core OOP Concepts">
## Core OOP Concepts

- Encapsulation: Make variables private, use getters/setters
- Abstraction: Hide implementation details, show only required methods
- Polymorphism: Ability of an object to take many forms
- Interfaces: Make code loosely coupled

</expand>

<expand title="Important Patterns">
## Important Patterns

- Singleton: Ensure only one instance exists (DB connections, logging, caching)
- Factory: Create objects without exposing creation logic
- Observer: One-to-many relationship, notify dependent objects automatically
- Adapter: Bridge between incompatible interfaces
- Facade: Simplify complex system interactions

</expand>

<expand title="Scaling Strategies">
## Scaling Strategies

- Vertical Scaling (Scale Up):
  - Add more power (CPU, RAM) to existing servers
  - Simple approach, good for low traffic
  - Limitations: Hard limits, no failover/redundancy
- Horizontal Scaling (Scale Out):
  - Add more servers to pool of resources
  - Preferred for large-scale applications
  - Better availability and fault tolerance

</expand>

<expand title="Database Scaling">
## Database Scaling

- Database Replication:
  - Master-slave setup: Master handles writes, slaves handle reads
  - Ensures data redundancy and high availability
  - Example: MySQL master-slave replication
- Sharding:
  - Splits large database into smaller shards across multiple servers
  - Distributes load by user ID or other key
  - Splitting data across multiple databases/servers LIKE Users split by region across DBs
- Partitioning:
  - Divides single table into smaller pieces (e.g., by month)
  - Improves query performance and manageability
  - Splitting data within one database LIKE Orders split by date in one DB
- Note: SQL databases favor vertical scaling, NoSQL favor horizontal scaling

</expand>

<expand title="Load Balancing">
## Load Balancing

- Distributes incoming traffic evenly across multiple servers
- Users connect to public IP of load balancer, which routes to private IPs of servers
- Private IPs: Reachable only between servers in same network, not over internet
- Improves availability and prevents single point of failure
- Types: Round Robin, Weighted Round Robin, Least Connection, IP Hash, Least Response Time

</expand>

<expand title="Caching Strategies">
## Caching Strategies

- Cache: Temporary storage for frequently accessed data to serve requests faster
  - Types:
  - DB Cache: Query cache (MySQL built-in), stores SELECT query results
  - Backend Cache: In-memory (Redis/Memcached), Application-level, Cache-Control headers
  - CDN Cache: Offloads traffic from backend, reduces latency
  - Client-side: Browser cache
- Read-through cache: Server checks cache first, queries DB if not found
- When to use: Data read frequently but modified infrequently
- Considerations:
  - Expiration policy (TTL)
  - Cache consistency with data store
  - Eviction policies: LRU (Least Recently Used), LFU (Least Frequently Used), FIFO
  - Mitigate failures (avoid single point of failure)
- CDN (Content Delivery Network):
  - Architecture: Origin Server, Edge Servers (geographically distributed), CDN Provider
  - Geographically dispersed servers for static content (images, videos, CSS, JS)
  - Server closest to user delivers content, reducing latency
  - Push CDN vs Pull CDN

</expand>

<expand title="Stateless vs Stateful Architecture">
## Stateless vs Stateful Architecture

- Stateless: Server keeps no state information
  - Session data stored in shared storage (DB/NoSQL)
  - Any server can handle any request
  - Simpler, more robust, scalable
- Stateful: Server remembers client data between requests
  - Requires sticky sessions (same client to same server)
  - Harder to scale, add/remove servers
  - Challenging to handle server failures

</expand>

<expand title="Message Queues">
## Message Queues

- Durable component supporting asynchronous communication
- Enables decoupling between services
- Examples: RabbitMQ, AWS SQS, Kafka

</expand>

<expand title="API Gateway">
## API Gateway

- Single entry point for all client requests to backend
- Core Functions: Routing, Authentication/Authorization, Rate Limiting, Load Balancing, Caching, Logging, Transformation
- Popular Solutions: AWS API Gateway, Nginx, Kong, Zuul

</expand>

<expand title="Rate Limiting">
## Rate Limiting

- Controls rate of traffic from client/service
- Blocks excess calls beyond threshold
- Types: Client-side, Server-side
- Common algorithms: Token bucket, Sliding window

</expand>

<expand title="Network Protocols">
## Network Protocols

- TCP: Two-way handshake, slower, secure, used for file transfer
- UDP: Direct data sending, faster, less secure, used in gaming (low latency needed)
- HTTP vs HTTPS: HTTPS encrypts data in transit
- URL vs URI vs URN: URI identifies resource, URL is location, URN is name

</expand>

<expand title="SQL vs NoSQL (Selection Parameters)">
## SQL vs NoSQL (Selection Parameters)

- Caching: SQL relies on external cache (Redis), NoSQL may have built-in (DynamoDB DAX)
- Sharding: SQL requires manual setup, NoSQL has automatic sharding (MongoDB, Cassandra)
- Consistency: SQL offers strong consistency, NoSQL configurable (eventual to strong)
- Indexing: SQL has robust indexing (B-tree, hash), NoSQL varies (MongoDB rich, Cassandra low)
- Transactions: SQL enforces ACID, NoSQL generally lacks foreign keys/constraints (MongoDB supports multi-document transactions)
- Schema: SQL has pre-defined schemas, NoSQL has flexible schemas
- Scaling: SQL favors vertical, NoSQL favors horizontal
- Use Cases:
  - SQL: Financial systems, enterprise apps, strong consistency needs
  - NoSQL: High scalability, flexible schema, real-time analytics, IoT, social media

</expand>

<expand title="Database Selection (Additional Types)">
## Database Selection (Additional Types)

- Time-Series Databases: Sequential updates, timestamp-based queries (InfluxDB, OpenTSDB)
- Graph Databases: Relationship-focused (Neo4j)
- Reporting/BigData: Data warehouses, offline reporting (Hadoop)

</expand>

<expand title="Three-Tier Architecture">
## Three-Tier Architecture

- Presentation Tier (Frontend) -> Application Tier (Backend) -> Data Tier (Database)
- Frontend connects to Load Balancer DNS (not hardcoded IP)
- Database: Multi-AZ for High Availability, Read Replicas for optimization, Caching Layer

</expand>

<expand title="CI/CD">
## CI/CD

- Continuous Integration: Automatically test and merge code
- Continuous Deployment: Automatically deploy to production

</expand>

<expand title="Key System Design Patterns & Insights">
## Key System Design Patterns & Insights

- Video Streaming (YouTube/Netflix):
  - Pre-encode multiple resolutions (720p, 1080p, 4k) instead of real-time conversion
  - Use CDN for global delivery, S3 for storage
  - Use ElasticSearch for text search (not relational DB)
  - HLS (HTTP Live Streaming) format for chunked delivery
- Social Media (Twitter):
  - Pre-calculate timelines for active users, fetch on-demand for passive users
  - Use NoSQL (Redis/DynamoDB) for scalable storage, avoid relational DB for spikes
  - Message queues (SQS) for decoupling, auto-scaling based on queue size
- Chat Systems (WhatsApp):
  - WebSockets for real-time communication
  - Message queues for reliability and scaling
  - Health checks for connection monitoring
  - Offline message storage in device DB (SQLite)
- E-commerce (Amazon):
  - Serviceability check: Filter products by delivery feasibility
  - Inventory locking for concurrent purchases
  - Cache frequently accessed products (Redis)
  - Event-driven architecture for recommendations

</expand>

<expand title="Guidelines">
## Guidelines

- Never use relational DB for sudden traffic spikes (cost ineffective scaling)
- Use object storage (S3) for large files instead of block storage
- Pre-calculate expensive operations, cache results
- Use message queues for async processing and decoupling
- Implement health checks and monitoring
- Multi-AZ deployment for high availability
- Encryption at rest and in transit
- Use CDN for static content, reduce backend load

</expand>

<expand title="Logging">
## Logging

1. **AWS CloudWatch**
2. **Graylog** - Management tool for logging. Collects, stores, indexes, and visualizes the logs.
   - **Winston (Node.js)** → creates and formats the logs.

</expand>

<expand title="Testing">
## Testing

### Testing Types:
1. **Unit Testing** - Test individual functions/components in isolation
2. **Functional Testing** - Test complete features/functionality
3. **Integration Testing** - Test component interactions and API integrations

### Popular Testing Libraries by Framework:

#### Angular Testing:

- **Jasmine:**
  - **Purpose:** Testing framework for writing test cases
  - **Use Case:** Main testing library for Angular, provides syntax (describe, it, expect)
  - **Example:**
    ```typescript
    describe('UserService', () => {
      it('should create user', () => {
        expect(service.createUser({name: 'John'})).toBeTruthy();
      });
    });
    ```

- **Karma:**
  - **Purpose:** Test runner that executes tests in browsers
  - **Use Case:** Runs Jasmine tests, provides test execution environment
  - **Example:** Configured in `karma.conf.js`, runs tests automatically

- **TestBed:**
  - **Purpose:** Angular's testing utility for configuring testing modules
  - **Use Case:** Set up Angular testing environment, create component instances
  - **Example:**
    ```typescript
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MyComponent],
        providers: [MyService]
      });
    });
    ```

#### React Testing:

- **Jest:**
  - **Purpose:** JavaScript testing framework with built-in test runner
  - **Use Case:** Unit testing, mocking, snapshot testing
  - **Example:**
    ```javascript
    test('renders button', () => {
      render(<Button>Click</Button>);
      expect(screen.getByText('Click')).toBeInTheDocument();
    });
    ```

- **React Testing Library:**
  - **Purpose:** Testing utility for testing React components from user perspective
  - **Use Case:** Component testing, user interaction testing
  - **Example:**
    ```javascript
    import { render, screen } from '@testing-library/react';
    test('user can click button', () => {
      render(<MyComponent />);
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByText('Clicked')).toBeInTheDocument();
    });
    ```

#### Next.js Testing:

- **Jest:**
  - **Purpose:** Default testing framework for Next.js
  - **Use Case:** Unit and integration testing
  - **Example:** Same as React, works with Next.js components

- **React Testing Library:**
  - **Purpose:** Test Next.js pages and components
  - **Use Case:** Component testing, page rendering tests
  - **Example:** Works same as React, tests Next.js pages/components

- **Playwright / Cypress:**
  - **Purpose:** E2E testing for Next.js applications
  - **Use Case:** Full application flow testing, SSR/SSG testing
  - **Example:** Test complete user journeys across pages

#### Node.js Testing:

- **Jest:**
  - **Purpose:** Popular testing framework for Node.js
  - **Use Case:** Unit testing, API testing, mocking
  - **Example:**
    ```javascript
    describe('User API', () => {
      test('should create user', async () => {
        const user = await createUser({name: 'John'});
        expect(user.name).toBe('John');
      });
    });
    ```

- **Mocha:**
  - **Purpose:** Flexible test framework, requires assertion library
  - **Use Case:** Unit and integration testing
  - **Example:**
    ```javascript
    describe('User Service', () => {
      it('should return user', () => {
        const user = getUser(1);
        assert.equal(user.id, 1);
      });
    });
    ```

- **Chai:**
  - **Purpose:** Assertion library (used with Mocha)
  - **Use Case:** Provides readable assertions
  - **Example:**
    ```javascript
    expect(user).to.have.property('name');
    assert.equal(user.age, 30);
    ```

- **Jasmine:**
  - **Purpose:** Behavior-driven testing framework
  - **Use Case:** Node.js unit testing with BDD syntax
  - **Example:**
    ```javascript
    describe('User Service', () => {
      it('should create user', () => {
        const user = createUser({name: 'John'});
        expect(user).toBeDefined();
      });
    });
    ```

- **Supertest:**
  - **Purpose:** HTTP assertion library for API testing
  - **Use Case:** Testing Express/Node.js API endpoints
  - **Example:**
    ```javascript
    request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);
    ```

</expand>

<expand title="Search Engines">
## Search Engines

### 1. Elasticsearch:
- Elasticsearch is a document oriented database.
- We also call it a search engine.
- Elasticsearch is a standalone database. Its main use case is for searching text and text/number related queries such as aggregations.
- Generally, it's not recommended to use Elasticsearch as the main database, as some operations such as indexing (inserting values) are more expensive compared to other databases.
- You can use Elasticsearch along with any other database such as MongoDB or MySQL, where the other databases can act as the primary database, and you can sync Elasticsearch with your primary database for the "searchable" parts of the data.
- **Example:** Best suited for Log analysis case

### 2. Solr:
- Solr has more advantages when it comes to the static data, because of its caches and the ability to use an uninverted reader for faceting and sorting
- **Example:** Best suited for e-commerce

</expand>

<expand title="Security">
## Security

### 1. Auditability

### 2. Legality:
- **Compliances:**
  - AWS supports more security standards and compliance certifications than any other offering, including PCI-DSS, HIPAA/HITECH, FedRAMP, GDPR, FIPS 140-2, and NIST 800-171, helping customers satisfy compliance requirements for virtually every regulatory agency around the globe.
- **Privacy**
- **Certification**

### 3. Authentication & Authorization:
- MFA (Multi-Factor Authentication)

</expand>

<expand title="GraphQL">
## GraphQL

Pick specific data. Make the query smarter. Avoid over fetching. Use in case of millions of users.

**NOTE:** There are a lot of ways to implement GraphQL.

### Installation:
```bash
npm i express graphql express-graphql nanoid
```

### Parts:

1. **Main parts:**
   - Schema
   - Resolvers

2. **Other parts:**
   - Pagination
   - Authorization
   - Caching
   - etc.

### Key Concepts:

- **Resolver:** Accepts the query and sends the response based on the logic used.
- **Query:** Keyword used to get data from the schema (or db)
- **Mutation:** Keyword used to enter or fill data in the schema (or db)
- **GraphQL tools:** Ways how we persist the data in postgres, etc db.

**NOTE:** We should use REST APIs as well, not only GraphQL.

### How it avoids over-fetching and under-fetching:
(https://www.programmersinc.com/over-fetching-and-under-fetching-rest-apis-exhaustion-signs/)

**Example:**
- We want to show data for web and mobiles. We usually require less data in the mobile device.
- Suppose an endpoint "users/1" shows the complete user profile with all friends. On mobile, you do not need friends. In that case, this will be the over-fetching for mobile. Otherwise, you need to create another endpoint for it.
- Creating excess endpoints will make the code unorganized and hard to manage.

### Technical Details:
- Uses the HTTP request behind the scene similar to REST APIs.

### Limitations:
- As we have a single endpoint, we have a cache issue.

</expand>

## Secondary Concepts

<expand title="Application Performance Monitoring & Profiling Tools">
## Application Performance Monitoring & Profiling Tools

### Overview
Performance monitoring and profiling tools are essential for identifying bottlenecks, optimizing applications, and ensuring optimal user experience across frontend, backend, database, and mobile applications. These tools help developers and system architects understand system behavior, identify performance issues, and make data-driven optimization decisions.

### Purpose
- **Identify Bottlenecks:** Find slow operations, memory leaks, and performance issues
- **Optimize Performance:** Make data-driven decisions to improve application speed
- **Monitor Production:** Track real-time performance metrics in production environments
- **Debug Issues:** Investigate performance problems reported by users
- **Capacity Planning:** Understand resource usage for scaling decisions
- **User Experience:** Ensure applications meet performance expectations

### When to Use

**During Development:**
- Profiling code to identify slow functions
- Testing performance before production deployment
- Optimizing critical user flows
- Identifying memory leaks early

**Performance Optimization:**
- When applications are slow or unresponsive
- Before major releases or deployments
- When optimizing existing systems
- When scaling applications

**Production Monitoring:**
- Continuous monitoring of application health
- Alerting on performance degradation
- Tracking performance trends over time
- Investigating user-reported performance issues

**Capacity Planning:**
- Understanding resource usage patterns
- Planning for traffic spikes
- Right-sizing infrastructure
- Cost optimization

### Frontend Profiling

**Tools:**
- **Chrome DevTools Performance Panel:** Built-in browser tool for runtime performance analysis
- **Lighthouse:** Automated audits for performance, accessibility, SEO
- **WebPageTest:** Real-world performance testing from multiple locations
- **React DevTools Profiler:** Component-level performance analysis for React apps
- **Bundle Analyzers:** Webpack Bundle Analyzer, Source Map Explorer

**What to Profile:**
- **JavaScript Execution:** Identify slow functions and long tasks
- **Rendering Performance:** Frame rates, layout thrashing, paint operations
- **Network Performance:** Resource loading times, API call performance
- **Memory Usage:** Memory leaks, heap snapshots, garbage collection
- **Core Web Vitals:** FCP, LCP, CLS, TBT, TTI, INP

**How to Use:**
1. Open Chrome DevTools → Performance panel
2. Click Record button
3. Interact with your application
4. Stop recording
5. Analyze the timeline for:
   - Long tasks (red bars)
   - Layout shifts
   - Memory usage over time
   - JavaScript execution time
   - Network requests

**Common Issues Found:**
- **Long JavaScript tasks:** Break up into smaller chunks
- **Memory leaks:** Objects not being garbage collected
- **Layout thrashing:** Multiple forced reflows
- **Large bundle sizes:** Code splitting needed
- **Render-blocking resources:** Optimize CSS/JS loading

**Best Practices:**
- Profile in production-like environment
- Use throttling to simulate slow devices/networks
- Compare before and after optimizations
- Monitor Core Web Vitals continuously
- Use Real User Monitoring (RUM) for production insights

### Backend Profiling

**Tools:**
- **APM Tools:** New Relic, Datadog, AppDynamics, Dynatrace
- **Application Profilers:** Py-Spy (Python), JProfiler (Java), dotTrace (.NET)
- **Logging & Tracing:** OpenTelemetry, Jaeger, Zipkin
- **Database Profilers:** Query analyzers, slow query logs
- **System Monitoring:** Prometheus, Grafana, CloudWatch

**What to Profile:**
- **API Response Times:** Endpoint performance, p50, p95, p99 latencies
- **Database Queries:** Slow queries, query execution plans, connection pool usage
- **CPU Usage:** High CPU operations, CPU-bound tasks
- **Memory Usage:** Memory leaks, heap analysis, garbage collection
- **I/O Operations:** Disk I/O, network I/O, file operations
- **Concurrent Requests:** Thread pool usage, request queuing

**How to Use:**
1. **APM Setup:**
   - Install APM agent in your application
   - Configure sampling rate and data retention
   - Set up dashboards and alerts

2. **Code Profiling:**
   - Add instrumentation to critical paths
   - Use distributed tracing for microservices
   - Enable slow query logging in databases
   - Monitor application metrics (request rate, error rate, latency)

3. **Analysis:**
   - Identify slow endpoints
   - Find N+1 query problems
   - Detect memory leaks
   - Analyze CPU hotspots

**Common Issues Found:**
- **N+1 Queries:** Multiple database queries in loops
- **Slow Database Queries:** Missing indexes, inefficient joins
- **Memory Leaks:** Objects not being released
- **CPU Spikes:** Inefficient algorithms, tight loops
- **Blocking Operations:** Synchronous I/O in async contexts

**Best Practices:**
- Profile in production-like environments
- Use distributed tracing for microservices
- Set up alerts for performance degradation
- Monitor p95 and p99 latencies, not just averages
- Profile during peak traffic times
- Use flame graphs for CPU profiling

### Database Profiling

**Tools:**
- **Query Analyzers:** EXPLAIN plans, query profilers
- **Slow Query Logs:** MySQL slow query log, PostgreSQL log_min_duration_statement
- **Database Monitoring:** pg_stat_statements, MySQL Performance Schema
- **APM Database Monitoring:** Database-specific monitoring in APM tools

**What to Profile:**
- **Query Performance:** Execution time, rows examined, indexes used
- **Connection Pool Usage:** Active connections, connection wait time
- **Lock Contention:** Deadlocks, lock waits
- **Table Scans:** Full table scans vs index scans
- **Cache Hit Rates:** Query cache, buffer pool hit rates
- **Replication Lag:** Master-slave replication delays

**How to Use:**
1. **Enable Slow Query Logging:**
   - MySQL: `SET GLOBAL slow_query_log = 'ON'; SET GLOBAL long_query_time = 1;`
   - PostgreSQL: `log_min_duration_statement = 1000` (log queries > 1s)

2. **Analyze Query Plans:**
   - Use EXPLAIN to see execution plan
   - Look for full table scans
   - Check index usage
   - Identify missing indexes

3. **Monitor Database Metrics:**
   - Connection pool utilization
   - Query throughput
   - Cache hit rates
   - Lock contention

**Common Issues Found:**
- **Missing Indexes:** Full table scans on large tables
- **Inefficient Queries:** Cartesian products, unnecessary joins
- **Connection Pool Exhaustion:** Too many connections, connection leaks
- **Lock Contention:** Long-running transactions blocking others
- **Poor Index Usage:** Indexes not being used, wrong indexes

**Best Practices:**
- Profile queries in production (with sampling)
- Use EXPLAIN plans to understand query execution
- Monitor slow query logs regularly
- Set up alerts for query performance degradation
- Review and optimize top N slowest queries
- Use connection pooling appropriately
- Monitor replication lag in read replicas

### Mobile App Profiling

**Tools:**
- **Android:** Android Studio Profiler, Systrace, Perfetto
- **iOS:** Instruments (Time Profiler, Allocations, Leaks), Xcode Profiler
- **Cross-platform:** React Native Profiler, Flutter DevTools
- **APM Tools:** Firebase Performance Monitoring, New Relic Mobile

**What to Profile:**
- **App Launch Time:** Cold start, warm start performance
- **Frame Rendering:** FPS, frame drops, jank
- **Memory Usage:** Heap size, memory leaks, OOM crashes
- **Network Performance:** API call latency, data usage
- **Battery Usage:** CPU wake locks, background activity
- **Native Performance:** Native code execution time

**How to Use:**
1. **Android Studio Profiler:**
   - Connect device or emulator
   - Select app process
   - Monitor CPU, Memory, Network, Energy
   - Record method traces

2. **Xcode Instruments:**
   - Attach to running app
   - Select profiling template (Time Profiler, Allocations, etc.)
   - Record and analyze
   - Identify hotspots

3. **React Native/Flutter:**
   - Use framework-specific profilers
   - Monitor JavaScript bridge performance
   - Profile native module calls

**Common Issues Found:**
- **Memory Leaks:** Retained objects, circular references
- **Frame Drops:** Main thread blocking, heavy computations
- **Slow App Launch:** Too many operations on startup
- **High Battery Usage:** Background tasks, wake locks
- **Large App Size:** Unoptimized assets, unused code

**Best Practices:**
- Profile on real devices, not just emulators
- Test on low-end devices
- Monitor production performance with APM tools
- Profile during typical user flows
- Use memory profiling to find leaks
- Optimize app startup time
- Monitor frame rates during animations

### Performance Monitoring Tools

**Chrome DevTools & Lighthouse:**
- **What it is:** Built-in browser tools for performance analysis and auditing
- **Purpose:** Debug, optimize, and audit web application performance
- **Key Features:**
  - Performance panel for runtime analysis
  - Network panel for request monitoring
  - Memory panel for leak detection
  - Lighthouse for automated audits
  - Core Web Vitals measurement

**When to Use:**
- During development for debugging
- Before production deployment
- When optimizing existing applications
- Investigating performance issues
- Continuous performance monitoring

**How to Use:**
1. **Performance Analysis:**
   - Open DevTools → Performance panel
   - Record user interactions
   - Analyze timeline for bottlenecks
   - Identify long tasks and memory issues

2. **Lighthouse Audits:**
   - Open DevTools → Lighthouse panel
   - Select categories (Performance, Accessibility, SEO, Best Practices)
   - Run audit
   - Review scores and recommendations
   - Implement suggested optimizations

3. **Network Analysis:**
   - Monitor all network requests
   - Analyze loading times
   - Identify slow resources
   - Check request/response sizes

**Benefits:**
- Free and built-in (no additional tools needed)
- Real-time performance insights
- Actionable recommendations
- Core Web Vitals measurement
- Comprehensive debugging capabilities

**Limitations:**
- Browser-specific (Chrome)
- Development environment focus
- May differ from real user experience
- Requires manual testing

### Pros of Performance Profiling

**Development Benefits:**
- **Identify Issues Early:** Find problems before production
- **Data-Driven Optimization:** Make decisions based on metrics, not guesses
- **Better User Experience:** Faster, more responsive applications
- **Cost Optimization:** Right-size infrastructure based on actual usage
- **Team Alignment:** Shared understanding of performance characteristics

**Production Benefits:**
- **Proactive Monitoring:** Detect issues before users complain
- **Alerting:** Get notified of performance degradation
- **Trend Analysis:** Understand performance over time
- **Capacity Planning:** Plan for growth based on metrics
- **Debugging:** Quickly identify root causes of issues

### Cons and Challenges

**Challenges:**
- **Learning Curve:** Tools can be complex and overwhelming
- **Time Investment:** Profiling and optimization takes time
- **False Positives:** Some warnings may not be actual problems
- **Overhead:** Profiling tools can impact performance
- **Cost:** APM tools can be expensive for large applications

**Limitations:**
- **Not Always Accurate:** Profiling may differ from real user experience
- **Environment Differences:** Development vs production differences
- **Sampling:** May miss short-lived issues
- **Tool-Specific:** Different tools may show different results

### Best Practices

**General:**
- Profile regularly, not just when there are issues
- Use multiple tools for comprehensive analysis
- Profile in production-like environments
- Monitor continuously in production
- Set up alerts for performance degradation

**Frontend:**
- Monitor Core Web Vitals continuously
- Use Real User Monitoring (RUM) for production
- Profile on real devices, not just desktop
- Test on slow networks and devices
- Optimize critical rendering path

**Backend:**
- Use distributed tracing for microservices
- Monitor p95 and p99 latencies
- Set up APM with appropriate sampling
- Profile during peak traffic
- Use flame graphs for CPU analysis

**Database:**
- Enable slow query logging
- Regularly review and optimize slow queries
- Monitor connection pool usage
- Use EXPLAIN plans for query optimization
- Set up alerts for query performance

**Mobile:**
- Profile on real devices
- Test on low-end devices
- Monitor production with APM tools
- Optimize app startup time
- Profile during typical user flows

### Summary

Performance profiling and monitoring are essential for building and maintaining high-performance applications. Whether you're working on frontend, backend, database, or mobile applications, understanding how to profile and optimize performance is crucial for:

- **User Experience:** Fast, responsive applications
- **Business Success:** Better performance = better user engagement
- **Cost Optimization:** Right-size infrastructure
- **Debugging:** Quickly identify and fix issues
- **Scalability:** Understand system limits and plan for growth

Mastering profiling tools and techniques is a valuable skill that helps you build better applications and solve performance problems effectively.

</expand>

<expand title="Web Performance Optimization Tools (Chrome DevTools & Lighthouse)">
## Web Performance Optimization Tools (Chrome DevTools & Lighthouse)

### Overview
Chrome DevTools and Lighthouse are essential browser-based tools for optimizing web application performance. These tools help developers identify bottlenecks, measure Core Web Vitals, and get actionable recommendations to improve application speed, user experience, and search engine rankings.

### Purpose
- **Performance Analysis:** Measure and optimize application speed and efficiency
- **Core Web Vitals:** Track FCP, LCP, CLS, TBT, TTI, and other critical metrics
- **Debugging:** Identify performance bottlenecks and issues
- **Optimization Recommendations:** Get specific, actionable suggestions
- **Accessibility Auditing:** Ensure applications are accessible
- **SEO Optimization:** Improve search engine visibility

### When to Use

**During Development:**
- Before committing code changes
- When optimizing specific features
- Testing performance of new components
- Identifying slow operations early

**Before Production:**
- Running comprehensive audits
- Verifying performance targets are met
- Checking Core Web Vitals scores
- Ensuring accessibility compliance

**Performance Optimization:**
- When applications are slow
- When optimizing existing systems
- Before major releases
- When addressing user complaints about speed

**Continuous Monitoring:**
- Regular performance reviews
- Tracking performance trends
- Monitoring Core Web Vitals over time
- Comparing performance before/after changes

### Chrome DevTools Performance Tools

**Performance Panel:**
- **Purpose:** Record and analyze runtime performance
- **What it measures:** JavaScript execution, rendering, memory usage, frame rates
- **How to use:**
  1. Open DevTools → Performance panel
  2. Click Record button
  3. Interact with your application
  4. Stop recording
  5. Analyze timeline for bottlenecks
- **Key metrics:** Long tasks, frame drops, memory usage, JavaScript execution time
- **When to use:** Debugging slow interactions, identifying performance bottlenecks
- **Pros:** Detailed analysis, real-time insights, free and built-in
- **Cons:** Can be complex, requires manual testing, development environment focus

**Network Panel:**
- **Purpose:** Monitor and analyze network requests
- **What it measures:** Request/response times, payload sizes, loading sequence
- **How to use:**
  1. Open DevTools → Network panel
  2. Reload page or interact with app
  3. Analyze waterfall chart
  4. Filter by type, status, or domain
- **Key metrics:** Request count, total size, load time, blocking requests
- **When to use:** Optimizing resource loading, debugging API calls, analyzing bundle sizes
- **Pros:** Visual waterfall, detailed request info, throttling support
- **Cons:** Shows development environment, may differ from production

**Memory Panel:**
- **Purpose:** Analyze memory usage and detect leaks
- **What it measures:** Heap size, object counts, memory allocation
- **How to use:**
  1. Open DevTools → Memory panel
  2. Take heap snapshot
  3. Interact with application
  4. Take another snapshot
  5. Compare to find memory growth
- **Key metrics:** Heap size, object counts, retained size
- **When to use:** Debugging memory leaks, optimizing memory usage
- **Pros:** Detailed memory analysis, leak detection, comparison tools
- **Cons:** Can be complex, requires understanding of memory management

**Lighthouse Panel:**
- **Purpose:** Automated audits for performance, accessibility, SEO, best practices
- **What it measures:** Core Web Vitals, accessibility score, SEO score, best practices
- **How to use:**
  1. Open DevTools → Lighthouse panel
  2. Select categories (Performance, Accessibility, SEO, Best Practices)
  3. Choose device type (Mobile/Desktop)
  4. Click "Analyze page load"
  5. Review scores and recommendations
- **Key metrics:** Performance score (0-100), Core Web Vitals, accessibility score, SEO score
- **When to use:** Before production, performance reviews, optimization projects
- **Pros:** Automated, comprehensive, actionable recommendations, Core Web Vitals
- **Cons:** Lab data (not real user), may differ from production, requires manual interpretation

### Lighthouse 13 Features

**Unified Performance Insights:**
- **What it is:** Integration of performance insights across DevTools and Lighthouse
- **Purpose:** Consistent performance metrics and recommendations
- **Benefit:** Single source of truth for performance data
- **Use case:** When you need consistent performance metrics across tools

**Enhanced Auditing:**
- **What it is:** Improved audit accuracy and new checks
- **Purpose:** Better detection of performance issues
- **Benefit:** More accurate recommendations
- **Use case:** Comprehensive performance audits

**Core Web Vitals Focus:**
- **What it is:** Emphasis on Core Web Vitals metrics
- **Purpose:** Ensure applications meet user experience standards
- **Benefit:** Better user experience, improved SEO
- **Use case:** Optimizing for user experience and search rankings

### Website Performance Metrics Explained

**Core Web Vitals (Critical User Experience Metrics):**

**1. First Contentful Paint (FCP) – Target: < 1.8s (Good), < 3.0s (Needs Improvement)**
- **Definition:** Time from page load start until first text or image is rendered
- **What it measures:** How quickly users see any content
- **Why it matters:** Users judge loading speed by when content appears
- **How to measure:** Chrome DevTools Performance panel, Lighthouse, WebPageTest
- **How to improve:**
  - Minimize render-blocking CSS and JavaScript
  - Optimize critical rendering path
  - Use server-side rendering (SSR) or static site generation (SSG)
  - Reduce server response time (TTFB)
  - Preload critical resources
- **Interview tip:** Mention that FCP is the first visual feedback users get, so it's crucial for perceived performance

**2. Largest Contentful Paint (LCP) – Target: < 2.5s (Good), < 4.0s (Needs Improvement)**
- **Definition:** Time until the largest visible element (main image, heading, or text block) is rendered
- **What it measures:** Perceived loading speed of main content
- **Why it matters:** Users judge page load speed by when main content appears
- **How to measure:** Lighthouse, Chrome DevTools Performance panel, Real User Monitoring (RUM)
- **How to improve:**
  - Optimize images (compress, use WebP/AVIF, lazy loading)
  - Preload LCP element (image, font, etc.)
  - Optimize server response time
  - Remove render-blocking JavaScript and CSS
  - Use CDN for static assets
  - Optimize critical CSS (inline or preload)
- **Interview tip:** LCP is a Google ranking factor and directly impacts user experience

**3. Total Blocking Time (TBT) – Target: < 200ms (Good), < 600ms (Needs Improvement)**
- **Definition:** Sum of all time periods when main thread was blocked for more than 50ms
- **What it measures:** How long the page is unresponsive to user input
- **Why it matters:** Affects interactivity and user experience
- **How to measure:** Lighthouse, Chrome DevTools Performance panel
- **How to improve:**
  - Code splitting and lazy loading
  - Minimize JavaScript execution time
  - Break up long tasks into smaller chunks (< 50ms)
  - Use Web Workers for heavy computations
  - Optimize third-party scripts
  - Defer non-critical JavaScript
- **Interview tip:** TBT is a lab metric that correlates with First Input Delay (FID) in production

**4. Cumulative Layout Shift (CLS) – Target: < 0.1 (Good), < 0.25 (Needs Improvement)**
- **Definition:** Measures unexpected movement of visible elements during page load
- **What it measures:** Visual stability of the page
- **Why it matters:** Layout shifts frustrate users and can cause accidental clicks
- **How to measure:** Lighthouse, Chrome DevTools Performance panel, Layout Shift events
- **How to improve:**
  - Set size attributes on images and videos (width, height)
  - Reserve space for ads, embeds, and iframes
  - Avoid inserting content above existing content
  - Use CSS aspect-ratio for responsive images
  - Preload fonts or use font-display: swap
  - Avoid animating properties that trigger layout (use transform/opacity)
- **Interview tip:** CLS is especially important for e-commerce sites where accidental clicks can be costly

**5. Speed Index – Target: < 3.4s (Good), < 5.8s (Needs Improvement)**
- **Definition:** Measures how quickly page contents are visually populated
- **What it measures:** Perceived loading speed (how fast the page looks complete)
- **Why it matters:** Users judge loading speed by visual completeness
- **How to measure:** Lighthouse, WebPageTest
- **How to improve:**
  - Optimize above-the-fold content
  - Minimize render-blocking resources
  - Use progressive rendering
  - Optimize critical CSS (inline or preload)
  - Reduce server response time
  - Optimize images in viewport
- **Interview tip:** Speed Index complements LCP by measuring overall visual progress

**Additional Important Metrics:**

**6. Time to Interactive (TTI) – Target: < 3.8s (Good), < 7.3s (Needs Improvement)**
- **Definition:** Time until page is fully interactive (all resources loaded, main thread idle)
- **What it measures:** When users can actually interact with the page
- **Why it matters:** Users expect pages to be interactive quickly
- **How to improve:**
  - Minimize JavaScript execution time
  - Reduce main thread work
  - Code splitting and lazy loading
  - Optimize third-party scripts
  - Use efficient JavaScript frameworks

**7. First Input Delay (FID) / Interaction to Next Paint (INP)**
- **Definition:** Time from first user interaction until browser responds
- **What it measures:** Responsiveness to user input
- **Why it matters:** Users expect immediate feedback from interactions
- **How to improve:**
  - Minimize JavaScript execution time
  - Break up long tasks
  - Optimize event handlers
  - Use passive event listeners
  - Defer non-critical JavaScript

**8. Time to First Byte (TTFB) – Target: < 800ms**
- **Definition:** Time from request until first byte of response
- **What it measures:** Server response speed
- **Why it matters:** Affects all other metrics, first step in page load
- **How to improve:**
  - Optimize server response time
  - Use CDN for static assets
  - Enable caching
  - Optimize database queries
  - Use edge computing

### How to Use These Tools

**Performance Optimization Workflow:**

1. **Initial Assessment:**
   - Run Lighthouse audit
   - Review performance score and Core Web Vitals
   - Identify critical issues

2. **Detailed Analysis:**
   - Use Performance panel to record user interactions
   - Analyze timeline for bottlenecks
   - Check Network panel for slow resources

3. **Optimization:**
   - Implement recommendations from Lighthouse
   - Optimize identified bottlenecks
   - Test changes

4. **Verification:**
   - Run Lighthouse again
   - Compare before/after metrics
   - Verify improvements

5. **Production Monitoring:**
   - Use Real User Monitoring (RUM) tools
   - Monitor Core Web Vitals in production
   - Set up alerts for performance degradation

### Pros of Using Chrome DevTools & Lighthouse

**Development Benefits:**
- **Free and Built-in:** No additional tools or subscriptions needed
- **Comprehensive:** Covers performance, accessibility, SEO, best practices
- **Actionable Recommendations:** Specific suggestions for improvements
- **Real-time Analysis:** See changes immediately
- **Core Web Vitals:** Measure critical user experience metrics

**Performance Benefits:**
- **Identify Bottlenecks:** Pinpoint exactly what's slowing down your app
- **Data-Driven Optimization:** Make decisions based on metrics
- **Before/After Comparison:** Track improvements over time
- **Automated Auditing:** Consistent, repeatable performance checks

**Business Benefits:**
- **Better User Experience:** Faster applications = better engagement
- **SEO Improvement:** Core Web Vitals are ranking factors
- **Cost Optimization:** Optimize infrastructure usage
- **Competitive Advantage:** Faster apps outperform competitors

### Cons and Limitations

**Limitations:**
- **Lab Data:** Lighthouse uses lab conditions, not real user data
- **Browser-Specific:** Chrome DevTools may differ from other browsers
- **Development Environment:** Some metrics may differ from production
- **Learning Curve:** Can be complex for beginners
- **Manual Testing:** Requires active testing, not automatic

**Challenges:**
- **False Positives:** Some warnings may not be actual problems
- **Overwhelming Data:** Too much information can be hard to parse
- **Time Investment:** Comprehensive analysis takes time
- **Tool Differences:** Different tools may show different results

### Best Practices

**General:**
- Run Lighthouse audits regularly (before major releases)
- Use Performance panel for detailed runtime analysis
- Monitor Core Web Vitals continuously in production
- Compare before/after metrics to track improvements
- Use multiple tools for comprehensive analysis

**Performance:**
- Focus on Core Web Vitals first (LCP, FID/INP, CLS)
- Optimize critical rendering path
- Minimize JavaScript execution time
- Optimize images and assets
- Use code splitting and lazy loading

**Production:**
- Use Real User Monitoring (RUM) alongside Lighthouse
- Monitor Core Web Vitals in production
- Set up alerts for performance degradation
- Test on real devices, not just desktop
- Profile during peak traffic times

### Interview Preparation

**Common Interview Questions:**
- "How do you optimize web application performance?"
- "What tools do you use for performance analysis?"
- "Explain Core Web Vitals and how to improve them."
- "How do you measure and improve LCP?"
- "What's the difference between FCP and LCP?"
- "How would you optimize a page with poor CLS score?"
- "How do you debug performance issues in production?"

**How to Answer:**
1. **Start with Tools:** Mention Chrome DevTools and Lighthouse as primary tools
2. **Explain Process:** Walk through your optimization workflow
3. **Mention Metrics:** Discuss Core Web Vitals and other key metrics
4. **Give Examples:** Provide specific examples of optimizations you've done
5. **Discuss Trade-offs:** Mention pros and cons of different approaches
6. **Production Focus:** Explain how you monitor performance in production

### Summary

Chrome DevTools and Lighthouse are essential tools for web performance optimization. They provide comprehensive analysis, actionable recommendations, and critical metrics like Core Web Vitals that directly impact user experience and business success. Understanding how to use these tools effectively is crucial for:

- **Building Fast Applications:** Optimize for speed and efficiency
- **User Experience:** Ensure applications meet performance standards
- **SEO:** Improve search engine rankings through Core Web Vitals
- **Business Success:** Better performance = better user engagement
- **Interview Success:** Demonstrate performance optimization expertise

Mastering these tools and understanding performance metrics is a valuable skill that sets you apart as a developer who cares about user experience and application quality.

</expand>

<expand title="HTM vs HTML">
## HTM vs HTML

- There is no such big difference between HTML and HTM. The only difference between HTML and HTM is one letter only, or we can say the spelling of the words (the letter 'L').
- Earlier operating systems were not so powerful and capable of taking a four-letter word as an extension, so HTM found its existence.

</expand>

<expand title="Web Servers">
## Web Servers

- NgInx
- Apache
- Caddy
- MS IIS

</expand>

<expand title="Node.js relies on various dependencies under the hood for providing various features">
## Node.js relies on various dependencies under the hood for providing various features

- V8
- libuv
- llhttp
- c-ares
- OpenSSL

</expand>

<expand title="LibUV">
## LibUV

- Full-featured event loop backed by epoll (Linux), kqueue (OSX), IOCP (Windows), event ports (SunOS).
- Asynchronous TCP (net module) and UDP (dgram module)
- Asynchronous DNS resolution (used partly for the dns module)
- Asynchronous file, file system operations & events (fs module)
- ANSI escape code controlled TTY
- Thread pool and Signal handling
- Child processes
- High-resolution clock
- Threading and synchronization primitives.
- Inter-Process Communication using sockets and Unix domain sockets (Windows)
- Example:
  - If a program is querying the database, the CPU sits idle until the query is processed and the program stays at a halt, thereby causing wastage of system resources. To prevent this, libuv is used in Node.js which facilitates a non-blocking I/O.

</expand>

<expand title="Agile vs. Waterfall">
## Agile vs. Waterfall

- Agile is an iterative and adaptive approach to project management.
- Waterfall is linear in nature and doesn’t allow for revisiting previous steps and phases.
- Waterfall works well for small projects with clear end goals, while Agile is best for large projects that require more flexibility.
- In Waterfall, clients aren’t typically involved, whereas in Agile, client feedback is crucial.

</expand>

<expand title="Agile vs. Kanban">
## Agile vs. Kanban

- Kanban project management is a type of Agile methodology that seeks to improve the project management process through workflow visualization using a tool called a Kanban board.
- Kanban board is like the Jira board.

</expand>

<expand title="Agile VS Scrum">
## Agile VS Scrum

- Both rely on an iterative process, frequent client interaction, and collaborative decision making
- Agile is a philosophy, whereas Scrum is a type of Agile methodology.
- You should choose either we should apply agile or not. Then either we should choose the scrum as a agile methodology or not.

</expand>

<expand title="Indexing: (https://chartio.com/learn/databases/how-does-indexing-work/)">
## Indexing: (https://chartio.com/learn/databases/how-does-indexing-work/)

### Algorithms:

1. **Relational DB:** B-Tree, B+ Tree, Hash Index, etc.
2. **NoSQL DB:** LSM Tree, Bloom filter, etc.

### How Indexing Works:

1. Indexing adds a data structure with columns for the search conditions and a pointer
2. The pointer is the address on the memory disk of the row with the rest of the information
3. The index data structure is sorted to optimize query efficiency
4. The query looks for the specific row in the index; the index refers to the pointer which will find the rest of the information
5. **Example:** The index reduces the number of rows the query has to search through from 17 to 4.

</expand>

<expand title="Bootstrap">
## Bootstrap

- a technique of loading a program into a computer by means of a few initial instructions which enable the introduction of the rest of the program from an input device.

</expand>

<expand title="Monolithic Architecture vs Monorepo">
## Monolithic Architecture vs Monorepo

- Monolithic Architecture:
  - Single codebase, tightly coupled, deployed as one unit
  - Single technology stack, harder to scale horizontally
  - Changes require redeploying entire application
  - Complex maintenance (changes affect entire app)
- Monorepo (Monolithic Repository):
  - Multiple projects in single repository, each with own structure/dependencies
  - Modular development, centralized dependency management
  - Independent build/deployment per project
  - Better code sharing, collaboration, and testing across projects
  - Examples: Facebook, Microsoft (monorepo), Netflix (polyrepo)

</expand>

<expand title="SQLLite vs IndexedDB">
## SQLLite vs IndexedDB

- 

</expand>

<expand title="Databases (Inside any DB / Behind the scene)">
## Databases (Inside any DB / Behind the scene)

1. **Query Parser + Query Optimizer**
2. **Execution Engine**
3. **Cache**
4. **Authentication Backup Metrics (Utilities)**
5. **Managers:**
   - Transaction Manager
   - Lock Manager
   - Recovery Manager (Maintain logs using "Append only" data structure)
   - etc.
6. **Data File / Index File (Meta data)**
7. **Storage Engine (SQL or NoSQL)**

</expand>

<expand title="GitHub Codespace">
## GitHub Codespace

### Introduction:

1. GitHub Codespaces is an instant, cloud-based development environment that uses a container to provide you with common languages, tools, and utilities for development.

2. GitHub Codespaces is also configurable, allowing you to create a customized development environment for your project.

3. It actually uses the Microsoft container images in which we have the pre-defined dependencies like we can use the image of nodeJS, node with mongo, etc. **NOTE:** These are not the GitHub or Docker images.

4. **Any (docker, microsoft, etc) Container Image:**
   - A Docker image is a standalone, executable package that includes everything needed to run a piece of software, including the application code, runtime, system libraries, and dependencies
   - It is used to create and run containers, which are isolated environments where the application can run consistently across different platforms and environments.

### Steps for looking for the images:

1. `cmd+shift+p` (or `ctrl+shift+p`)
2. Type "Add Dev configuration File"
3. Then modify or create a new configuration
4. In the end, rebuild the image. Always do it after making the changes. (type "rebuild" in the cmd+shift+p)

### Applications:

- **Major Advantage:** Pre-configured env (through Microsoft container images)
- Contributing to Open Source Projects
- Reviewing Pull Requests
- Collaborative Coding
- Education and Onboarding
- Working on Multiple Devices
- Continuous Integration and Deployment (CI/CD)

### Forward a Port:

- Process of exposing a specific network port from the cloud-hosted development environment to the local machine or to the internet.
- This allows you to access services or applications running inside the Codespace from your local computer or other devices.

</expand>

<expand title="System Design Interview Preparation">
## System Design Interview Preparation

### Key Concepts:
Scalability, Fault tolerance, Load balancing, Caching, Availability, Consistency, Latency, Throughput, Partition Tolerance, CAP Theorem, ACID

### Common Patterns:
Microservices, Sharding, Event sourcing, Circuit Breaker, Reverse proxy, CQRS

### Database Types:
Relational, NoSQL, Distributed key-value, Document, Graph, Time-series

### Distributed Algorithms:
Merkle Tree, Consistent Hashing, Read Repair, Gossip Protocol, Bloom Filter, Heartbeat

### Interview Steps:

1. Requirements clarification
2. Back-of-the-envelope estimation
3. System interface definition
4. Data model definition
5. High-level design
6. Detailed design
7. Identify and resolve bottlenecks

### Common System Design Questions:
Design: Messenger, Youtube, Newsfeed, Rate Limiter, Twitter, Dropbox/Drive, Web Crawler, URL Shortener, Instagram, Uber

</expand>

