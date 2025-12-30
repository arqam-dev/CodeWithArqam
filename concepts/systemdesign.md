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

#### 4. Data Architecture

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

##### 4.8 ACID vs BASE Properties:
- **ACID:**
  - **A = Atomicity:** Transaction is all or nothing
  - **C = Consistency:** Database moves from one valid state to another
  - **I = Isolation:** Concurrent transactions don't interfere
  - **D = Durability:** Once committed, data is permanently saved
- **BASE:**
  - **BA = Basically Available:** System always responds, even during failures
  - **S = Soft state:** Data may change over time without new input
  - **E = Eventual consistency:** All replicas will eventually become consistent
- **Summary:** In CAP theorem, ACID systems → CP, BASE systems → AP

##### 4.9 Backups / DR / Multi-region (C):
- **Backups:** Regular copies of data for recovery
- **DR (Disaster Recovery):** Plan to restore operations after disaster
- **Multi-region:** Deploy across geographic regions for availability
- **When to use:** Critical systems, compliance requirements
- **Benefit:** Data protection, business continuity

##### 4.10 OLTP vs OLAP, ETL/ELT/CDC (C):
- **OLTP (Online Transaction Processing):** Real-time transactions, normalized data
- **OLAP (Online Analytical Processing):** Analytics, denormalized data, data warehouses
- **ETL (Extract, Transform, Load):** Traditional data pipeline
- **ELT (Extract, Load, Transform):** Modern approach, transform in destination
- **CDC (Change Data Capture):** Real-time data synchronization
- **When to use:** OLTP for operations, OLAP for analytics

#### 5. Communication Patterns

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

#### 6. Security Architecture

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

##### 6.4 Zero Trust (C):
- Security model: "Never trust, always verify"
- No implicit trust based on network location
- **Principles:** Verify explicitly, least privilege, assume breach
- **When to use:** Modern distributed systems, cloud environments
- **Benefit:** Enhanced security posture

##### 6.5 Encryption (in transit / at rest) (C):
- **In transit:** TLS/SSL for data moving over network
- **At rest:** Encrypt stored data (databases, files)
- **When to use:** Always for sensitive data
- **Benefit:** Protection against interception and data breaches

##### 6.6 Network security (WAF, segmentation) (C):
- **WAF (Web Application Firewall):** Protects against web attacks
- **Network segmentation:** Isolates network zones
- **When to use:** Public-facing applications, multi-tenant systems
- **Benefit:** Defense in depth, reduced attack surface

#### 7. Deployment & Operations

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

</expand>

<expand title="Microservices Architecture">
## Microservices Architecture (10 Key Components)

- Client, CDN, Load Balancer, API Gateway
- Microservices (independent services, own databases)
- Message Broker (RabbitMQ, Kafka, AWS SQS)
- Identity Provider (Authentication/Authorization)
- Service Registry and Discovery
- Service Coordination (Zookeeper)

</expand>

<expand title="Load Balancing">
## Load Balancing

- Distributes incoming traffic evenly across multiple servers
- Users connect to public IP of load balancer, which routes to private IPs of servers
- Private IPs: Reachable only between servers in same network, not over internet
- Improves availability and prevents single point of failure
- **Types:** Round Robin, Weighted Round Robin, Least Connection, IP Hash, Least Response Time

</expand>

<expand title="Caching Strategies">
## Caching Strategies

- Cache: Temporary storage for frequently accessed data to serve requests faster
- **Types:**
  - DB Cache: Query cache (MySQL built-in), stores SELECT query results
  - Backend Cache: In-memory (Redis/Memcached), Application-level, Cache-Control headers
  - CDN Cache: Offloads traffic from backend, reduces latency
  - Client-side: Browser cache
- **Strategies:** Cache-aside, Read-through, Write-through, Write-behind
- **When to use:** Data read frequently but modified infrequently
- **Considerations:**
  - Expiration policy (TTL)
  - Cache consistency with data store
  - Eviction policies: LRU (Least Recently Used), LFU (Least Frequently Used), FIFO
  - Mitigate failures (avoid single point of failure)
- **CDN (Content Delivery Network):**
  - Architecture: Origin Server, Edge Servers (geographically distributed), CDN Provider
  - Geographically dispersed servers for static content (images, videos, CSS, JS)
  - Server closest to user delivers content, reducing latency
  - Push CDN vs Pull CDN

</expand>

<expand title="Stateless vs Stateful Architecture">
## Stateless vs Stateful Architecture

- **Stateless:** Server keeps no state information
  - Session data stored in shared storage (DB/NoSQL)
  - Any server can handle any request
  - Simpler, more robust, scalable
- **Stateful:** Server remembers client data between requests
  - Requires sticky sessions (same client to same server)
  - Harder to scale, add/remove servers
  - Challenging to handle server failures

</expand>

<expand title="Message Queues">
## Message Queues

- Durable component supporting asynchronous communication
- Enables decoupling between services
- **Examples:** RabbitMQ, AWS SQS, Kafka
- **Use Cases:**
  - Order processing workflows
  - Email notifications
  - Background job processing
  - Handling traffic spikes

</expand>

<expand title="API Gateway">
## API Gateway

- Single entry point for all client requests to backend
- **Core Functions:** Routing, Authentication/Authorization, Rate Limiting, Load Balancing, Caching, Logging, Transformation
- **Popular Solutions:** AWS API Gateway, Nginx, Kong, Zuul
- **When to use:** Microservices architecture, multiple clients
- **Benefit:** Centralized cross-cutting concerns, simplified client interactions

</expand>

<expand title="Rate Limiting">
## Rate Limiting

- Controls rate of traffic from client/service
- Blocks excess calls beyond threshold
- **Types:** Client-side, Server-side
- **Common algorithms:** Token bucket, Sliding window
- **When to use:** Protect backend services, prevent abuse

</expand>

<expand title="Three-Tier Architecture">
## Three-Tier Architecture

- Presentation Tier (Frontend) → Application Tier (Backend) → Data Tier (Database)
- Frontend connects to Load Balancer DNS (not hardcoded IP)
- Database: Multi-AZ for High Availability, Read Replicas for optimization, Caching Layer

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
     - **Conditional Requests:** Use conditional headers such as If-Match or If-None-Match to prevent unintended duplication.

</expand>

<expand title="Key Design Principles">
## Key Design Principles (10 Major)

- Divide and Conquer, Increase Cohesion, Reducing Coupling
- Increase Abstraction (interfaces and abstract classes)
- Increase Reusability (DRY - Don't Repeat Yourself)
- Design for Flexibility, Portability, Testability
- Anticipate Obsolescence, Design Defensively

</expand>

<expand title="System Design Patterns & Insights">
## Key System Design Patterns & Insights

- **Video Streaming (YouTube/Netflix):**
  - Pre-encode multiple resolutions (720p, 1080p, 4k) instead of real-time conversion
  - Use CDN for global delivery, S3 for storage
  - Use ElasticSearch for text search (not relational DB)
  - HLS (HTTP Live Streaming) format for chunked delivery

- **Social Media (Twitter):**
  - Pre-calculate timelines for active users, fetch on-demand for passive users
  - Use NoSQL (Redis/DynamoDB) for scalable storage, avoid relational DB for spikes
  - Message queues (SQS) for decoupling, auto-scaling based on queue size

- **Chat Systems (WhatsApp):**
  - WebSockets for real-time communication
  - Message queues for reliability and scaling
  - Health checks for connection monitoring
  - Offline message storage in device DB (SQLite)

- **E-commerce (Amazon):**
  - Serviceability check: Filter products by delivery feasibility
  - Inventory locking for concurrent purchases
  - Cache frequently accessed products (Redis)
  - Event-driven architecture for recommendations

</expand>

<expand title="System Design Guidelines">
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

## Secondary Concepts

<expand title="Monolithic Architecture vs Monorepo">
## Monolithic Architecture vs Monorepo

- **Monolithic Architecture:**
  - Single codebase, tightly coupled, deployed as one unit
  - Single technology stack, harder to scale horizontally
  - Changes require redeploying entire application
  - Complex maintenance (changes affect entire app)

- **Monorepo (Monolithic Repository):**
  - Multiple projects in single repository, each with own structure/dependencies
  - Modular development, centralized dependency management
  - Independent build/deployment per project
  - Better code sharing, collaboration, and testing across projects
  - Examples: Facebook, Microsoft (monorepo), Netflix (polyrepo)

</expand>

<expand title="Database Scaling">
## Database Scaling

- **Database Replication:**
  - Master-slave setup: Master handles writes, slaves handle reads
  - Ensures data redundancy and high availability
  - Example: MySQL master-slave replication

- **Sharding:**
  - Splits large database into smaller shards across multiple servers
  - Distributes load by user ID or other key
  - Splitting data across multiple databases/servers LIKE Users split by region across DBs

- **Partitioning:**
  - Divides single table into smaller pieces (e.g., by month)
  - Improves query performance and manageability
  - Splitting data within one database LIKE Orders split by date in one DB

- **Note:** SQL databases favor vertical scaling, NoSQL favor horizontal scaling

</expand>

<expand title="Network Protocols">
## Network Protocols

- **TCP:** Two-way handshake, slower, secure, used for file transfer
- **UDP:** Direct data sending, faster, less secure, used in gaming (low latency needed)
- **HTTP vs HTTPS:** HTTPS encrypts data in transit
- **URL vs URI vs URN:** URI identifies resource, URL is location, URN is name

</expand>

<expand title="SQL vs NoSQL (Selection Parameters)">
## SQL vs NoSQL (Selection Parameters)

- **Caching:** SQL relies on external cache (Redis), NoSQL may have built-in (DynamoDB DAX)
- **Sharding:** SQL requires manual setup, NoSQL has automatic sharding (MongoDB, Cassandra)
- **Consistency:** SQL offers strong consistency, NoSQL configurable (eventual to strong)
- **Indexing:** SQL has robust indexing (B-tree, hash), NoSQL varies (MongoDB rich, Cassandra low)
- **Transactions:** SQL enforces ACID, NoSQL generally lacks foreign keys/constraints (MongoDB supports multi-document transactions)
- **Schema:** SQL has pre-defined schemas, NoSQL has flexible schemas
- **Scaling:** SQL favors vertical, NoSQL favors horizontal
- **Use Cases:**
  - SQL: Financial systems, enterprise apps, strong consistency needs
  - NoSQL: High scalability, flexible schema, real-time analytics, IoT, social media

</expand>

<expand title="Database Selection (Additional Types)">
## Database Selection (Additional Types)

- **Time-Series Databases:** Sequential updates, timestamp-based queries (InfluxDB, OpenTSDB)
- **Graph Databases:** Relationship-focused (Neo4j)
- **Reporting/BigData:** Data warehouses, offline reporting (Hadoop)

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

<expand title="Real-time Database">
## Real-time database

- Data changes → everyone connected sees it immediately
- No polling, no refresh button
- Works using persistent connections (WebSockets)
- **Example:** Firebase realtime db, firestore, supabase

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
