# Primary Concepts

<expand title="Architectures (how responsibilities are divided, whether in code, servers, or data)">
## Architectures (how responsibilities are divided, whether in code, servers, or data)

### Types:

#### 1. Backend System Architecture - System Shape (how the system is split) -- BE/Server

##### 1.1 Client–Server (A-Architecture):
- Client–Server is a foundational interaction model.
- It coexists with: Monolith, Microservices, SOA, Serverless like Client–Server + Microservices, Client–Server + Monolith, etc.
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
- Business logic is independent of frameworks, UI, and databases
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
- Categories:
  - Creational (5): Object instantiation (Singleton, Factory, Abstract Factory, Builder, Prototype)
  - Structural (7): Class/object composition and relationships (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy)
  - Behavioral (11): Communication between objects (Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Observer, State, Strategy, Template Method, Visitor, Memento)

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

1. **Unit Testing**
2. **Functional Testing**
3. **Integration Testing**

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

</expand></expand>

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

