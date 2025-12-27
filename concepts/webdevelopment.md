# Primary Concepts

<expand title="Architectures (how responsibilities are divided, whether in code, servers, or data)">
## Architectures (how responsibilities are divided, whether in code, servers, or data)

Types:

- Backend System Architecture - System Shape (how the system is split) -- BE/Server

- Client–Server (A-Architecture):

- Client–Server is a foundational interaction model.

- It coexists with: Monolith, Microservices, SOA, Serverless like Client–Server + Microservices, Client–Server + Monolith, etc.

- When to use it (good fit):

- Centralized data & control

- Web & mobile applications

- CRUD systems

- Early-stage or simple systems

- When Client–Server is NOT the right model (KEY INSIGHT):

- Peer-to-peer systems (file sharing)

- Blockchain networks (no central owner)

- Gossip-based systems

- Some distributed databases

- Offline-first, device-to-device systems

- Monolith / Modular Monolith (A):

- A monolithic architecture is where the entire backend application is built, deployed, and scaled as a single unit.

- Backend: Auth, Users, Orders, Payments, etc

- Works inside Client–Server Architecture

- NOTE:

- It does NOT mean frontend + backend + database are one thing. It is specifically about backend business logic. It can be colocated and cannot be.

- Modular Monolith (clean upgrade):

- A Modular Monolith is a monolithic backend where the codebase is strictly divided into independent modules Module

- Backend: Auth Module, Users, etc

- When to use Monolith / Modular Monolith:

- Startups, MVPs, Internal enterprise systems, etc

- When it stops working well:

- Independent scaling is needed, Deployments become risky, Domains become tightly coupled, etc.

- Service-Oriented Architecture (SOA) (A):

- SOA is an architecture where the backend is split into reusable services that communicate over a network and are shared across multiple applications.

- Sits between Monolith and Microservices. Predecessor of Microservices.

- Works inside Client–Server Architecture

- Services are: Independent, Reusable, Centrally governed

- Example: Same Customer Service used by - Web, Mobile, Partner systems, internal tools, etc

- SOA vs Microservices:

- SOA: shared services, centralized control. Usually has same DB. services are deployed separately, but centrally governed.

- Microservices: independent services, decentralized control. Usually has seperate DBs. services are deployed separately, but not centrally governed.

- Microservices (A):

- Microservices is an architecture where the backend is split into small, independent services, each owning its own business logic and data, and deployed separately.

- Works inside Client–Server

- Evolution of SOA

- Each service: Runs independently, Deploys independently, Scales independently, Owns its database

- Applications: Same as SOA. Netflix, Uber, etc

- Event-Driven Architecture (EDA) (A):

- Event-Driven Architecture is a model where services communicate by producing and reacting to events instead of calling each other directly.

- Works inside Client–Server

- Commonly used with Microservices. Can coexist with Monolith or SOA

- Example: E-commerce system (Order processing), Notifications

- Key characteristics:

- Loose coupling, Asynchronous communication, High scalability, Eventual consistency.

- Trade-offs:

- Harder debugging, Duplicate event handling, Complex failure scenarios

- Serverless Architecture (A):

- Serverless architecture is a model where you run backend code without managing servers, and the cloud provider handles provisioning, scaling, and infrastructure.

- Works inside Client–Server

- When Serverless is a good fit:

- Variable or spiky traffic

- Event-driven workloads

- APIs with unpredictable load

- Background jobs

- AWS Serverless services:

- Lambda functions

- S3

- DynamoDB, Aurora serverless

- API gateway

- SNS, SQS

- EventBridge

- Step Functions

- NOTE: EC2, ECS, EKS, RDS, etc are NOT Serverless

- When Serverless is NOT a good fit:

- Long-running processes

- Heavy in-memory workloads

- NOTE: for this sistuation, Containers or VMs are better.

- Backend Application Architecture - Inside a Service (how code is written in above System) -- BE Coding Patterns

- Layered (N-tier) (A)

- MVC / MVVM (A)

- Clean Architecture (A)

- Hexagonal (Ports & Adapters) (A)

- DDD (C-Concept)

- BFF (A)

- Frontend Architecture (UI app)

- Component-based (A)

- MVC / MVVM (frontend) (A)

- Micro-frontends (A)

- Rendering models: CSR / SSR / SSG / ISR (C)

- State management: Flux / Redux (C)

- Data

- Data modeling (RDBMS / NoSQL / Graph) (C)

- Partitioning / Sharding (C)

- Replication (C)

- Indexing (C)

- Caching (C)

- Consistency models (C)

- CAP theorem (C)

- Backups / DR / Multi-region (C)

- OLTP vs OLAP, ETL/ELT/CDC (C)

- Communication

- REST / GraphQL / gRPC (C)

- Sync vs Async (C)

- Queues / Pub-Sub / Streams (C)

- API Gateway (A)

- Schema contracts (OpenAPI / Protobuf / AsyncAPI) (C)

- Security (how trust is enforced)

- Authentication vs Authorization (C)

- RBAC / ABAC (C)

- OAuth2 / OIDC (C)

- JWT (C)

- Zero Trust (C)

- Encryption (in transit / at rest) (C)

- Secrets & key management (C)

- Network security (WAF, segmentation) (C)

- Audit logging / compliance (C)

- Delivery & Operations (how it runs in production)

- VM / Containers / Serverless (A)

- CI/CD (C)

- Release strategies (Blue/Green, Canary) (C)

- IaC (C)

- Observability (logs/metrics/traces) (C)

- Scaling (horizontal/autoscaling) (C)

- Development Practices / Engineering Discipline (NOT ARCHITECTURE):

- TAD - Test (unit test) After Development

- TDD - Test (unit test) Driven Development

- BDD - Behavior-Driven Development

- Code Reviews

- CI

</expand>

<expand title="Cache - Overall Application">
## Cache - Overall Application

- Browser:

- NOTE: Saves images/js/css and sometimes API responses using HTTP headers.

- HTTP caching: Cache-Control, ETag, Last-Modified

- Service Worker cache (offline / stale-while-revalidate)

- Storage caches: LocalStorage, Session Storage, IndexedDB

- Asset caching via CDN behavior (browser respects headers)

- Frontend:

- NOTE: Don’t call the API again if I already have the data.

- React:

- React Query

- SWR

- Redux (store as cache)

- Redux Toolkit Query (RTK Query)

- Anguar:

- NgRX store

- NgRx Entity

- NgRX component store

- RxJS "shareReplay" based cache

- Backend:

- NOTE: Don’t hit the database every time for the same read

- In-memory cache:

- Node process memory

- JVM heap cache

- Distributed cache:

- Redis

- Memcached

- HTTP response cache (API Gateway / Reverse Proxy)

- Database:

- NOTE: Databases also avoid disk reads by caching in memory.

- Relational DB:

- DB buffer cache (automatic) - DB keeps data pages/rows in RAM. MySQL: InnoDB Buffer Pool. Postgres: Shared Buffers

- Query cache - before MySQL8, it cached entire query results.

- Materialized views - Caching like feature

- Read replicas (read-scale cache-like behavior)

- NoSQL-Search DB:

-

</expand>

<expand title="Security / Reliability - Overall Application">
## Security / Reliability - Overall Application

- Browser:

- Purpose: protect user session, data in browser. session + injection protection

- Secure cookies (HttpOnly, Secure, SameSite)

- Token storage rules (avoid localStorage for sensitive tokens)

- Browser storage controls (localStorage / IndexedDB usage discipline)

- CSRF protection (same-site cookies, CSRF tokens)

- Content Security Policy (CSP)

- XSS protection (escaping, sanitization)

- Frontend:

- Purpose: enforce UI-level access & safe data handling

- Route guards (Angular Guards, React Protected Routes)

- Role/permission-based UI rendering

- Token handling (access vs refresh tokens)

- API request signing (auth headers)

- Input validation (client-side)

- Secure state management (Redux / NgRx store hygiene)

- Backend:

- Purpose: REAL security enforcement

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

- Communication / Network Layer:

- Purpose: protect data in transit & service boundaries. secure pipes

- TLS / HTTPS everywhere

- mTLS (service-to-service)

- API Gateway security -> auth, rate limiting, IP allow/deny

- WAF (Web Application Firewall)

- Network segmentation (VPC, subnets, security groups)

- Database:

- Purpose: protect stored data. least privilege + encryption

- Encryption at rest

- DB user roles & permissions

- Row/column-level security

- Parameterized queries (SQL injection protection)

- Audit logging

- Backup encryption

- Deployment / Infrastructure:

- Purpose: protect runtime & secrets

- IAM roles (no hardcoded creds)

- Secrets manager (Vault, AWS Secrets Manager)

- Image scanning (containers)

- OS hardening

- Patch management

- Infrastructure-as-Code security

- Environment isolation (dev/stage/prod)

- Compliances:

- Tech-Cloud - ISO 27001, SOC 2

- Health - HIPPA

- Finance - PCI DSS

- ECommerce-Retail - PCI DSS, GDPR

- Govt - NIST

- Cross-cutting Security Concepts (apply everywhere):

- Zero Trust (never trust, always verify)

- Principle of Least Privilege

- Defense in Depth

- Secure defaults

- Auditability & compliance

</expand>

<expand title="Performance / Scalability - Overall Application:">
## Performance / Scalability - Overall Application:

- Browser:

- CDN-delivered static assets (reduce origin load)

- Lazy loading (images/routes) to reduce payload

- Pagination / infinite scroll (don’t load everything)

- Client-side caching (avoid repeat calls)

- Frontend:

- Server-state libraries to reduce refetch (React Query / SWR, NgRx patterns)

- Debouncing/throttling (search, filters)

- Virtualized lists (large tables/lists)

- Prefetching critical data only

- Split bundles (route-level)

- Backend:

- Stateless services (enable horizontal scaling)

- Load balancing (spread traffic)

- Autoscaling (scale-out on CPU/RPS/latency)

- Caching hot reads (Redis)

- Async processing for heavy work (queues/workers)

- Rate limiting (protect capacity)

- Read/write separation (route reads differently than writes)

- Communication:

- Queue-based buffering (smooth traffic spikes)

- Pub-Sub for fanout (avoid N sync calls)

- Backpressure (don’t overload downstream)

- Timeouts/retries tuned for scale (avoid retry storms)

- API Gateway for throttling + routing

- Database:

- Relational:

- Indexing + query optimization (first)

- Connection pooling

- Read replicas

- Partitioning (by tenant/date)

- Sharding (when partitioning isn’t enough)

- Avoid hot rows (counters, leaderboards)

- NoSQL:

- Partition key design (avoid hot partitions)

- Denormalization for read scale

- TTL + precomputed views

- Storage/Files:

- Object storage (S3-style) for files

- CDN in front of object storage

- Pre-signed uploads (client uploads directly, bypass backend)

- Deployment / Infrastructure:

- Multi-AZ deployment (capacity + resilience)

- Horizontal scaling policies

- Blue/Green or Canary (safe growth)

- Capacity planning + load testing

- Observability for scale signals (RPS, p95 latency, saturation)

</expand>

<expand title="Testing - Overall Application">
## Testing - Overall Application

- Browser (usually not required explicitly):

- Does the app work in different browsers?

- Does localStorage/session behave as expected on different browsers

- Frontend:

- Unit tests → small UI logic

- Component tests → UI + logic together

- E2E tests → full user journey

- Backend:

- Unit tests → pure logic

- API tests → request/response

- Integration tests → API + DB

- Communication:

- Contract testing (API contracts, schemas)

- Backward compatibility testing

- Error-handling testing (timeouts, retries)

- Message format testing (events, queues)

- Idempotency testing

- Database (usually not required explicitly. done in integration testing in BE):

- Migration tests

- Data integrity checks

- Deployment / Infrastructure:

- Smoke tests

- Post-deploy checks

- Notes:

- WHO is testing (developer vs QA)

- WHAT is being tested (unit, integration, E2E, etc)

- HOW it is tested (black box, white box, etc)

- Production Monitoring - Sentry

</expand>

<expand title="System/Application Characteristics - Overall Application">
## System/Application Characteristics - Overall Application

- NOTE: while designing a system we should consider following attributes

- Scalability

- Maintainability

- Load balancing

- Caching

- ACID

- BASE

- Low Latency

- High Throughput

- CAP Theorem

- Fault Tolerance - Acheived by multiple instances, Automatic failover, Retries with timeouts, Circuit breakers, Data replication, Graceful degradation, etc.

Primary Concepts

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

- making the same request multiple times will produce the same result as making the request once. like Submission of form multiple time immidiately should not insert the same data multiple times.
- Example:
  - GET Requests:
  - inherently idempotent. Doesn't have any affect on server state.
  - PUT and DELETE Requests:
  - These methods are typically designed to be idempotent.
  - If you repeat the same PUT or DELETE request, the end result should still be the same, either the resource is updated to the same state or it is deleted.
  - POST Requests;
  - POST requests are not inherently idempotent.
  - Ways to avoid it:
    - Use Unique Identifiers - Generate and include a unique identifier (e.g., a UUID) in the request payload or headers for each POST request.
    - Idempotent Tokens:
    - Provide clients with idempotent tokens that can be included in the request headers.
    - Conditional Requests:
    - Use conditional headers such as If-Match or If-None-Match to prevent unintended duplication.
    - These headers allow the server to compare the current state of a resource with a previous state.
    - Response Headers
    - Transaction IDs
    - Retries and Idempotence
    - Conflict Resolution

</expand>

<expand title="CAP Theorem">
## CAP Theorem

- Distributed systems can provide at most 2 of 3 guarantees:
  - Consistency: All clients see same data at same time
  - Availability: System responds even if some nodes are down
  - Partition Tolerance: The system continues to operate despite network failures that split nodes

into isolated groups.

- Common combinations: CP (consistency + partition), AP (availability + partition)

</expand>

<expand title="ACID vs BASE Properties">
## ACID vs BASE Properties

- ACID:

- A = Atomicity

= Transaction is all or nothing. Partial updates are not allowed.

= Example: Money deducted and added — or neither

- C = Consistency

= Database moves from one valid state to another. All rules, constraints, and validations are preserved.

= Example: Balance can’t become negative if rule forbids it.

- I = Isolation

= Concurrent transactions don’t interfere. Each behaves as if it runs alone.

= Example: Two users editing data won’t corrupt it.

- D = Durability

= Once committed, data is permanently saved. Survives crashes and restarts.

= Example: Committed transfer remains after power failure.

- BASE:

- BA = Basically Available

= System always responds, even during failures. May return stale or partial data, but not an error

= Example: Social media feed loads even if some likes/comments are missing

- S = Soft state

= Data may change over time without new input. State is not immediately consistent across all nodes

= Example: Cache value updates asynchronously across servers

- E = Eventual consistency

= If no new updates occur, all replicas will eventually become consistent. No guarantee of immediate consistency

= Example: Like count differs across regions but becomes same after some time

Summary:

- in CAP theorem, ACID systems → CP , BASE systems → AP

- BASE = eventual consistency. NOT bad consitency.

Secondary Concepts

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

- Single table doesn't means that the whole application will have the single table.
- This means the set of tables through which we have to get the data frequently, will be combined to a single table. means

will denormalize the database.

- Example:
  - Whenever we need to get a customer, we need to get the records as well. So, we will combine this table to avoid the join (RDBMS) or extra call for the second table (NoSQL).

</expand>

<expand title="Scenerio: Two Requests hit a DB at the same time">
## Scenerio: Two Requests hit a DB at the same time

NOTE: Requests can never hit the database at the exact same instant, even at microsecond or nanosecond level.

- Internally, the DB schedules work across CPU cores and uses below techniques to keep data consistent.
- DBMS:
  - Isolation levels:
  - Isolation levels include "Read Uncommitted," "Read Committed," "Repeatable Read," and "Serializable."
  - Locking:
  - Locks can be placed on rows, tables, or even at a finer granularity.
  - Locking helps avoid conflicts but can also lead to potential deadlocks.
  - Concurrency Control Algorithms:
  - Techniques like two-phase locking, timestamp ordering, and optimistic concurrency control are used to manage concurrent updates.
  - Timestamps and Versioning
  - Rollback and Redo
  - Conflict Resolution
  - Transaction Isolation and Durability

</expand>

<expand title="JWT">
## JWT

- It is often used for authentication and authorization purposes in web applications and APIs.
- A JWT consists of three main parts:
  - Header
  - Payload
  - Signature

</expand>

<expand title="Scenerio: If we get the token of one ecommerce web and utilize it for the other ecommerce, how they get to know that this token doesn’t belongs to their web?">
## Scenerio: If we get the token of one ecommerce web and utilize it for the other ecommerce, how they get to know that this token doesn’t belongs to their web?

- When a platform generates a token (JWT), it includes various pieces of information in the token's payload, such as user ID, email, and potentially other claims.
- The platform uses its private key, which is kept securely and known only to that platform, to create a digital signature based on the token's payload.

</expand>

<expand title="JSON vs JSONB">
## JSON vs JSONB

- JSON is a data type that stores JSON data as plain text. It preserves the original formatting and structure of the JSON data.
- JSONB data is stored in a binary format that is optimized for fast read and write operations. It doesn't retain the original formatting and is usually more compact in terms of storage space.
- Indexing:
  - SQL supports JSON.
  - We can do indexing over it and can do indexing on a single attribute known as Generated Column.
  - Generated columns are of two types:
    - Stored Generated Columns
    - Virtual Generated Columns
  - PostGres supports JSONB.

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

- AWS Cloud Watch
- Graylog - management tool for logging. collects, stores, indexes, and visualizes the logs.
  - Winston (Node.js) → creates and formats the logs.

Browser Working

</expand>

<expand title="Testing">
## Testing

- Unit
- Funcitonal
- Integration

</expand>

<expand title="Search Engines">
## Search Engines

- Elastic Search:
  - Elasticsearch is a document oriented database.
  - We also call it a search engine.
  - Elasticsearch is a standalone database. Its main use case is for searching text and text and/number related queries such as aggregations.
  - Generally, it's not recommended to use Elasticsearch as the main database, as some operations such as indexing (inserting values) are more expensive compared to other databases.
  - You can use Elasticsearch along with any other database such as MongoDB or MySQL, where the other databases can act as the primary database, and you can sync Elasticsearch with your primary database for the "searchable" parts of the data.
  - Example: best suit for Log analysis case
- Solr:
  - Solr has more advantages when it comes to the static data, because of its caches and the ability to use an uninverted reader for faceting and sorting
  - Example: best suit for e-commerce.

</expand>

<expand title="Security">
## Security

- Auditability
- Legality:
  - Compliances:
  - AWS supports more security standards and compliance certifications than any other offering, including PCI-DSS, HIPAA/HITECH, FedRAMP, GDPR, FIPS 140-2, and NIST 800-171, helping customers satisfy compliance requirements for virtually every regulatory agency around the globe.
  - Privacy
  - Certification
- Authentication  & Authorization:
  - MFA

</expand>

<expand title="GraphQL">
## GraphQL

- pick specific data. make the query smarter. avoid over fetching. use in case of millions of users.
- NOTE: There are a lot of ways to implement graphql.
- Command: npm i express graphql express-graphql nanoid
- Parts:
  - Main parts:
  - Schema
  - Resolvers
  - Other parts:
  - Pagination
  - Authorization
  - Caching
  - etc etc.
- Resolver:
  - Accept the query and sending the response on the base of logic used.
- Query:
  - keyword use to get data from the schema (or db)
- Mutation:
  - keyword use to enter or filling the data in the schema (or db)
- graphql tools:
  - ways how we persist the data in postgres, etc db.
- We should use rest apis as well. not only graphQL.
- How it avoids over-fetching and under-fetching: (https://www.programmersinc.com/over-fetching-and-under-fetching-rest-apis-exhaustion-signs/)
  - Example:
  - We want to show data for web and mobiles. We usually requires less data in the mobile device.
  - So, let supose an endpoint "users/1" shows the complete user profile with all friends. Let suppose on mobile, you do not need friends. So, in that case this will be

the over-fetching for mobile. Otherwise, you need to create another endpoint for it.

  - So, creating excess end points will make the code unorganized that will definitely hard to manage.

- Uses the http request behind the scene similar to the rest APIs.
- Limitations:
  - As we have a single endpoint, we have a cache issue.
- 

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

- Algorithm:

- Relational DB: B-Tree, B+ Tree, Hash Index, etc.

- NoSQL DB: LSM Tree, Bloom filter, etc

- Indexing adds a data structure with columns for the search conditions and a pointer
- The pointer is the address on the memory disk of the row with the rest of the information
- The index data structure is sorted to optimize query efficiency
- The query looks for the specific row in the index; the index refers to the pointer which will find the rest of the information.
- The index reduces the number of rows the query has to search through from 17 to 4.

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

- Query Parser + Query Optimizer
- Execution Engine
- Cache
- Authentication Backup Metrics (Utilities)
- Managers: Transaction Manager, Lock Manager, Recovery Manager (Maintain logs usign "Append only" data structure), etc.
- Data File / Index File (Meta data)
- Storage Engine (SQL or NoSQL)

</expand>

<expand title="GitHub Codespace">
## GitHub Codespace

- Intro:
  - GitHub Codespaces is an instant, cloud-based development environment that uses a container to provide you with common languages, tools, and utilities for development.
  - GitHub Codespaces is also configurable, allowing you to create a customized development environment for your project.
  - It actually uses the microsoft container images in which we have the pre-defined dependencies like we can use the image of nodeJS, node with mongo, etc. NOTE: These are not the github or docker images.
  - Any (docker, microsoft, etc) Container Image:
  - A Docker image is a standalone, executable package that includes everything needed to run a piece of software, including the application code, runtime, system libraries, and dependencies
  - It is used to create and run containers, which are isolated environments where the application can run consistently across different platforms and environments.
- Steps for looking for the images:
  - cmd+shift+p
  - type "Add Dev configuration File".
  - Then modify or create a new configuration.
  - In the end, rebuild the image. Always do it after making the changes. (type "rebuild" in the cmd+shift+p)
- Application:
  - Major Advantage: Pre-configured env (through microsoft container images)
  - Contributing to Open Source Projects
  - Reviewing Pull Requests:
  - Collaborative Coding
  - Education and Onboarding
  - Working on Multiple Devices
  - Continuous Integration and Deployment (CI/CD)
- Forward a Port:
  - Process of exposing a specific network port from the cloud-hosted development environment to the local machine or to the internet.
  - This allows you to access services or applications running inside the Codespace from your local computer or other devices.

</expand>

<expand title="System Design Interview Preparation">
## System Design Interview Preparation

- Key Concepts: Scalability, Fault tolerance, Load balancing, Caching, Availability, Consistency, Latency, Throughput, Partition Tolerance, CAP Theorem, ACID
- Common Patterns: Microservices, Sharding, Event sourcing, Circuit Breaker, Reverse proxy, CQRS
- Database Types: Relational, NoSQL, Distributed key-value, Document, Graph, Time-series
- Distributed Algorithms: Merkle Tree, Consistent Hashing, Read Repair, Gossip Protocol, Bloom Filter, Heartbeat
- Interview Steps:

1. Requirements clarification

2. Back-of-the-envelope estimation

3. System interface definition

4. Data model definition

5. High-level design

6. Detailed design

7. Identify and resolve bottlenecks

- Common System Design Questions:
  - Design: Messenger, Youtube, Newsfeed, Rate Limiter, Twitter, Dropbox/Drive, Web Crawler, URL Shortener, Instagram, Uber

</expand>

