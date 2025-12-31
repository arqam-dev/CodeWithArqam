# GraphQL

## Primary Concepts

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- GraphQL - 2012 (Internal at Facebook)
- GraphQL - 2015 (Open sourced)
- GraphQL Specification - 2016
- GraphQL Specification - 2018
- GraphQL October 2024 (Latest as of 2025)

Primary Concepts

- GraphQL Interview Preparation Notes (25 Key Questions)

------------------------------------------------------- Core Concepts (Questions 1-10) -------------------------------------------------------

- 1. What is GraphQL and Why We Need It?
- Definition: GraphQL is a query language for APIs and a runtime for executing those queries against your data
- Developed by Facebook in 2012, open-sourced in 2015
- Primary Purpose: Allows clients to request exactly the data they need, nothing more, nothing less
- Why We Need It:
  - Over-fetching: REST APIs often return more data than needed (e.g., getting entire user object when only name is required)
  - Under-fetching: Requires multiple API calls to fetch related data (e.g., user profile, then posts, then comments separately)
  - Versioning Issues: REST requires versioning (v1, v2) for API changes, GraphQL schema evolution is backward compatible
  - Strongly Typed: Schema acts as a contract between client and server, preventing errors
  - Single Endpoint: Unlike REST with multiple endpoints, GraphQL uses single endpoint for all operations
- Example:
  - REST: GET /api/users/1, GET /api/users/1/posts, GET /api/users/1/posts/5/comments (3 calls)
  - GraphQL: Single query requesting user with specific posts and their comments
- 2. GraphQL vs REST - Key Differences
- Data Fetching:
  - REST: Multiple endpoints, fixed data structure returned
  - GraphQL: Single endpoint, client specifies exact data structure needed
- Request Method:
  - REST: Uses HTTP methods (GET, POST, PUT, DELETE) for operations
  - GraphQL: Uses POST for all operations (queries can also use GET with query string)
- Response Format:
  - REST: Returns complete resources (over-fetching common)
  - GraphQL: Returns exactly what was requested in the query shape
- Caching:
  - REST: Leverages HTTP caching (browser, CDN, proxies)
  - GraphQL: More complex caching, typically handled at application level with normalized cache
- Error Handling:
  - REST: Uses HTTP status codes (200, 400, 500)
  - GraphQL: Always returns HTTP 200, errors are in response body errors array
- Learning Curve:
  - REST: Simple, familiar HTTP concepts
  - GraphQL: Requires learning query language and type system
- NOTE: GraphQL is not a replacement for REST, but an alternative that solves specific problems
- 3. Core GraphQL Operations - Query, Mutation, Subscription
- Query:
  - Used for reading/fetching data (similar to GET in REST)
  - Read-only operations, no side effects
  - Can be executed in parallel
  - Example:

query {

user(id: "1") {

name

email

}

}

- Mutation:
  - Used for modifying data (create, update, delete)
  - Executed sequentially in order to avoid race conditions
  - Should return the modified object
  - Example:

mutation {

createUser(name: "John", email: "john@example.com") {

id

name

}

}

- Subscription:
  - Used for real-time data (uses WebSocket connection)
  - Server pushes updates to client when events occur
  - Example:

subscription {

newPost {

id

title

author {

name

}

}

}

- NOTE: All three operations follow the same syntax structure and field selection
- 4. GraphQL Schema and Type System
- Schema Definition:
  - Schema is the contract between client and server
  - Defines all available data types and operations
  - Written in Schema Definition Language (SDL) or code-first approach
- Scalar Types:
  - Built-in types: String, Int, Float, Boolean, ID
  - ID is a special string type, unique identifier, serialized as String
  - Can define custom scalars (Date, JSON, etc.)
- Object Types:
  - Custom types representing domain models
  - Example:

type User {

id: ID!

name: String!

email: String!

age: Int

}

- Type Modifiers:
  - Exclamation mark (!) means required/non-nullable
  - Square brackets [] means array/list
  - Example: friends: [User!]! means array of non-null User objects, array itself is required
- Input Types:
  - Special types for mutations (passing complex data)
  - Cannot be used in queries, only mutations
  - Example:

input CreateUserInput {

name: String!

email: String!

}

- Root Types:
  - Query: Entry point for read operations
  - Mutation: Entry point for write operations
  - Subscription: Entry point for real-time operations
- Example Schema:

type Query {

user(id: ID!): User

users: [User!]!

}

type Mutation {

createUser(input: CreateUserInput!): User!

}

- 5. GraphQL Type System - Interfaces, Unions, and Enums
- Interfaces:
  - Abstract types that define a set of fields that implementing types must include
  - Enables polymorphism in GraphQL
  - Example:

interface Entity {

id: ID!

createdAt: String!

}

type User implements Entity {

id: ID!

createdAt: String!

name: String!

}

  - Can query interface fields, use inline fragments for type-specific fields

- Union Types:
  - Represents a value that can be one of several types
  - No shared fields, must use inline fragments to query
  - Example:

union SearchResult = User | Post | Comment

query {

search {

... on User { name }

... on Post { title }

... on Comment { content }

}

}

- Enums:
  - Special scalar types restricted to specific set of values
  - Useful for status fields, categories, etc.
  - Example:

enum UserRole {

ADMIN

USER

MODERATOR

}

type User {

role: UserRole!

}

- NOTE: Interfaces and Unions are powerful for flexible data modeling
- 6. Resolvers - How GraphQL Executes Queries
- Definition: Resolvers are functions that resolve the value for a field in your schema
- Resolver Function:
  - Takes 4 parameters: parent, args, context, info
  - parent: Result from parent resolver (for nested queries)
  - args: Arguments provided in the query
  - context: Shared object across all resolvers (auth, DB connection, loaders)
  - info: Query metadata, AST, and field selection info
- Resolver Chain:
  - GraphQL executes resolvers in depth-first manner
  - Each field has its own resolver function
  - Execution starts from root Query/Mutation/Subscription type
- Example:

const resolvers = {

Query: {

user: (parent, args, context) => {

return context.db.findUser(args.id);

}

},

User: {

posts: (parent, args, context) => {

return context.db.findPostsByUserId(parent.id);

}

}

};

- Default Resolvers:
  - If field name matches property name on parent, resolver is auto-generated
  - Returns parent[fieldName]
- Field Resolvers:
  - Each type can have field-level resolvers for computed or virtual fields
  - Useful for derived fields, formatting, etc.
- NOTE: Resolvers can return Promises, allowing async operations like DB queries
- 7. GraphQL Fragments and Inline Fragments
- Fragments:
  - Reusable pieces of query logic
  - Purpose: Avoid repeating same field selections
  - Example:

fragment UserInfo on User {

id

name

email

}

query {

user1: user(id: "1") {

...UserInfo

}

user2: user(id: "2") {

...UserInfo

}

}

- Inline Fragments:
  - Used with Interfaces and Unions to query type-specific fields
  - Example:

query {

search {

... on User {

name

email

}

... on Post {

title

content

}

}

}

- NOTE: Fragments must specify the type they apply to (on TypeName)
- 8. Variables, Aliases, and Directives
- Variables:
  - Purpose: Pass dynamic values to queries without string interpolation
  - Syntax: Declare variables with type in query, use $variableName in query
  - Example:

query GetUser($userId: ID!) {

user(id: $userId) {

name

email

}

}

  - Variables sent separately in JSON: { "userId": "123" }
  - Benefits: Reusable queries, type validation, prevents injection attacks

- Aliases:
  - Purpose: Request same field multiple times with different arguments
  - Syntax: aliasName: fieldName(arguments)
  - Example:

query {

user1: user(id: "1") { name }

user2: user(id: "2") { name }

}

  - NOTE: Without aliases, GraphQL would throw error for duplicate field names

- Directives:
  - Purpose: Conditionally include or skip fields based on variables
  - Built-in Directives:
  - @include(if: Boolean): Include field if condition is true
  - @skip(if: Boolean): Skip field if condition is true
  - @deprecated(reason: String): Mark field as deprecated
  - Example:

query ($withEmail: Boolean!) {

user {

name

email @include(if: $withEmail)

}

}

  - Custom Directives:
  - Can create custom directives for authorization (@auth), caching (@cache), etc.
  - Executed at schema definition or query execution phase

- 9. N+1 Query Problem and DataLoader Pattern
- Problem:
  - When resolving list of items, each item triggers separate database query
  - Example: Fetching 100 users, each user triggers query for posts = 101 queries
  - Causes severe performance degradation with large datasets
- Solutions:
  - DataLoader Pattern: Batch and cache database queries
  - DataLoader groups multiple requests, batches them, and caches results
  - Example:

const userLoader = new DataLoader(async (userIds) => {

return db.findUsersByIds(userIds);

});

// In resolver

User: {

posts: (parent, args, context) => {

return context.postLoader.load(parent.id);

}

}

  - DataLoader reduces 100 queries to 1 batch query
  - Benefits: Batching (collects requests), Caching (per-request cache)

- Alternative Solutions:
  - Eager loading with JOIN queries
  - Database views for complex queries
  - GraphQL Dataloader library (Node.js) or similar for other languages
- NOTE: Critical performance consideration in GraphQL applications
- 10. Error Handling in GraphQL
- Error Response Structure:
  - Always returns HTTP 200, even for errors
  - errors array in response contains error details
  - data field contains null for errored fields, partial data if some fields succeed
- Error Types:
  - Syntax Errors: Invalid query syntax
  - Validation Errors: Query doesn't match schema
  - Execution Errors: Runtime errors in resolvers
- GraphQL Errors:
  - Syntax errors, validation errors, execution errors
  - Returned in errors array with message, locations, and path
- Custom Errors:
  - Application-specific errors can be thrown from resolvers
  - Use extensions field for custom error codes
- Example Response:

{

"data": {

"user": null

},

"errors": [

{

"message": "User not found",

"path": ["user"],

"extensions": {

"code": "USER_NOT_FOUND",

"timestamp": "2025-11-01T10:00:00Z"

}

}

]

}

- Partial Results:
  - GraphQL can return partial data if some fields fail
  - Non-nullable fields cause parent to be null if error occurs
  - Useful for aggregating data from multiple sources

Secondary Concepts

------------------------------------------------------- Advanced Concepts (Questions 11-20) -------------------------------------------------------

- 11. GraphQL Introspection and Schema Discovery
- Definition: Querying the GraphQL schema itself
- Purpose: Discover available types, fields, and operations at runtime
- Example:

query {

__schema {

types {

name

fields {

name

type {

name

}

}

}

}

}

- Uses:
  - GraphQL playgrounds and tools (GraphiQL, Apollo Studio)
  - Auto-generated documentation
  - Client code generation
  - API explorer interfaces
- Special Fields:
  - __schema: Root schema type
  - __type(name: String!): Type: Get specific type info
  - __typename: Get type name in query response
- Security:
  - Disable introspection in production for sensitive APIs
  - Rate limit introspection queries
  - Provide documentation through other means
- 12. GraphQL Pagination Strategies
- Offset-based Pagination:
  - Uses limit and offset parameters
  - Simple but inefficient for large datasets
  - Example: users(limit: 10, offset: 20)
  - Issues: Performance degrades with large offsets, duplicates if data changes
- Cursor-based Pagination:
  - Uses cursor (pointer to specific record) for pagination
  - More efficient, handles real-time data better
  - Example: users(first: 10, after: "cursor123")
  - Cursor typically based on ID or timestamp
- Relay Cursor Connections:
  - Standardized pagination pattern from Relay spec
  - Returns edges, nodes, and pageInfo
  - Example:

query {

users(first: 10, after: "cursor") {

edges {

node {

id

name

}

cursor

}

pageInfo {

hasNextPage

hasPreviousPage

startCursor

endCursor

}

}

}

- NOTE: Cursor-based pagination preferred for production applications
- 13. Authentication and Authorization in GraphQL
- Authentication:
  - Handled at transport layer (HTTP headers) or in context
  - JWT tokens commonly passed in Authorization header
  - Context object provides auth info to all resolvers
  - Example: context.user contains authenticated user info
- Authorization:
  - Field-level: Check permissions in resolver
  - Type-level: Middleware or directives
  - Example:

User: {

email: (parent, args, context) => {

if (context.user.id !== parent.id && !context.user.isAdmin) {

throw new Error("Unauthorized");

}

return parent.email;

}

}

- Custom Directives for Auth:
  - @auth: Require authentication
  - @hasRole(role: "ADMIN"): Role-based access
  - @hasPermission(permission: "READ_USER"): Permission-based access
- Best Practices:
  - Centralize auth logic in middleware or directives
  - Fail fast if unauthorized
  - Return appropriate error messages without exposing sensitive info
- 14. GraphQL Subscriptions Implementation
- Transport:
  - Uses WebSocket connection (WS or WSS)
  - Maintains persistent connection for real-time updates
  - Alternative: Server-Sent Events (SSE) for one-way communication
- Pub-Sub Pattern:
  - Server publishes events, subscribed clients receive updates
  - Uses event emitters or message brokers
- Example Flow:
  - Client subscribes to newPost subscription
  - Server publishes event when post created
  - All subscribed clients receive update
- Use Cases:
  - Chat applications
  - Live notifications
  - Real-time dashboards
  - Collaborative editing
- Scalability:
  - Requires message broker (Redis, RabbitMQ, Kafka) for distributed systems
  - Each server instance needs to publish to shared broker
- Implementation:
  - Apollo Server: SubscriptionServer with WebSocket
  - GraphQL Yoga: Built-in subscription support
  - Custom: Use graphql-ws or subscriptions-transport-ws libraries
- 15. GraphQL Schema Stitching and Federation
- Schema Stitching (Legacy):
  - Combining multiple GraphQL schemas into single unified schema
  - Useful for microservices architecture
  - Manual process of merging schemas
- Apollo Federation (Modern Approach):
  - Distributed GraphQL architecture
  - Each service defines its own schema (subgraph)
  - Gateway composes unified schema (supergraph)
  - Services can extend types from other services
- Key Concepts:
  - @key directive: Entity identification (primary key fields)
  - @external: Fields defined in other services
  - @requires: Fields needing data from other services
  - @provides: Fields this service can provide
- Example:

# User Service

type User @key(fields: "id") {

id: ID!

name: String!

}

# Review Service

extend type User @key(fields: "id") {

id: ID! @external

reviews: [Review!]!

}

- Benefits:
  - Teams work independently on their services
  - Schema composition handled automatically
  - Queries can span multiple services transparently
- 16. GraphQL Performance Optimization
- Query Complexity Analysis:
  - Limit query depth (prevent deeply nested queries)
  - Limit field count (prevent selecting too many fields)
  - Assign complexity weights to fields
  - Reject queries exceeding complexity limit
- Query Caching:
  - Cache query results at application level
  - Use normalized cache (Apollo Client) on client side
  - Cache based on query string and variables
- Response Caching:
  - Use HTTP caching headers for static queries
  - Implement field-level caching with directives
- Query Timeout:
  - Set maximum execution time for queries
  - Prevent resource exhaustion
- Database Query Optimization:
  - Use DataLoader for batching (critical)
  - Optimize resolver database queries
  - Use connection pooling
  - Add database indexes for frequently queried fields
- Defer and Stream Directives (Newer Feature):
  - @defer: Defer non-critical fields to stream later
  - @stream: Stream list results incrementally
  - Improves perceived performance for large queries
  - Example:

query {

user { name }

posts @stream(initialCount: 5) { title }

}

- 17. GraphQL Versioning Strategy
- Schema Evolution:
  - Add new fields (non-breaking, optional fields)
  - Add new types (non-breaking)
  - Deprecate fields using @deprecated directive
  - Remove deprecated fields only after clients migrate
- Backward Compatibility:
  - GraphQL allows gradual migration
  - Old queries continue to work
  - Clients query schema to discover deprecated fields
- Deprecation:
  - Mark fields as deprecated with reason
  - Clients can migrate gradually
  - Example:

type User {

oldField: String @deprecated(reason: "Use newField instead")

newField: String!

}

- Breaking Changes to Avoid:
  - Removing fields (deprecate first)
  - Changing field types
  - Making non-null fields nullable (opposite is OK)
  - Removing enum values
- NOTE: GraphQL avoids versioning URLs unlike REST (no /v1, /v2 endpoints)
- 18. GraphQL Code-First vs Schema-First Approaches
- Schema-First:
  - Write SDL schema files first
  - Generate types from schema (code generation)
  - Example: schema.graphql file defines types, resolvers match schema
  - Benefits: Schema is source of truth, clear contract, easy to review
- Code-First:
  - Define schema programmatically in code
  - Schema generated from code definitions
  - Example: Using decorators or classes to define types
  - Benefits: Better IDE support, type safety, single source of truth
- Choosing Approach:
  - Schema-first: Better for team collaboration, API design focus
  - Code-first: Better for type safety, framework integration
- Tools:
  - Schema-first: graphql-tools, Apollo Server
  - Code-first: TypeGraphQL, Nexus, Pothos
- 19. GraphQL Testing Strategies
- Unit Testing Resolvers:
  - Test resolver functions in isolation
  - Mock database and context
  - Test error cases and edge cases
- Integration Testing:
  - Test complete query execution
  - Use test database or in-memory database
  - Test end-to-end flows
- Schema Testing:
  - Validate schema against expected structure
  - Test schema changes don't break existing queries
- Query Testing:
  - Test actual GraphQL queries end-to-end
  - Use snapshot testing for query responses
- Tools:
  - Jest for JavaScript/TypeScript
  - Apollo Server Testing utilities
  - graphql-tag for writing queries in tests
  - Mock Service Worker for mocking HTTP
- 20. GraphQL File Upload and Custom Scalars
- File Upload:
  - GraphQL spec doesn't include file upload natively
  - Common Approach:
  - Upload file to storage (S3, Azure Blob) via separate REST endpoint
  - Return URL in GraphQL mutation
  - Alternative:
  - graphql-upload library for direct uploads
  - Uses multipart/form-data requests
  - Custom scalar type for file handling
  - Example:

scalar Upload

type Mutation {

uploadFile(file: Upload!): String!

}

- Custom Scalars:
  - Define custom scalar types for specialized data
  - Common examples: Date, JSON, Email, URL, Money
  - Implementation requires serialize, parseValue, parseLiteral methods
  - Example:

scalar Date

type User {

createdAt: Date!

}

  - Libraries provide common scalars: graphql-scalars

------------------------------------------------------- Production Considerations (Questions 21-25) -------------------------------------------------------

- 21. GraphQL Security Best Practices
- Query Depth Limiting:
  - Prevent deeply nested queries that could cause DoS
  - Example: Reject queries with depth > 10
  - Attacker could send: { a { b { c { ... } } } } (deep nesting)
- Query Complexity Analysis:
  - Assign weights to fields, limit total complexity
  - Expensive fields (database joins) have higher weight
  - Reject queries exceeding complexity threshold
- Rate Limiting:
  - Limit requests per user/time period
  - Different limits for queries vs mutations
  - Implement at API gateway or middleware level
- Input Validation:
  - Validate all input arguments
  - Use GraphQL type system validation
  - Add business logic validation in resolvers
- Introspection Disabling:
  - Disable schema introspection in production for sensitive APIs
  - Or restrict to authenticated/admin users
- SQL Injection Prevention:
  - Use parameterized queries (never string interpolation)
  - Use ORM libraries with built-in protection
  - Validate and sanitize all user inputs
- Authentication Token Security:
  - Use HTTPS for all requests
  - Implement token refresh mechanism
  - Validate tokens on every request
- 22. GraphQL Monitoring and Logging
- Query Analytics:
  - Track query frequency and performance
  - Identify slow queries and bottlenecks
  - Monitor query patterns and usage
- Error Tracking:
  - Log resolver errors with context
  - Monitor error rates and types
  - Set up alerts for critical errors
- Performance Metrics:
  - Query execution time
  - Resolver execution time
  - Database query time
  - Network request time
- Tools:
  - Apollo Studio: Schema registry, query analytics
  - GraphQL Playground: Development tooling
  - Custom logging middleware
  - APM tools: New Relic, Datadog
- Logging Best Practices:
  - Log queries with variables (sanitize sensitive data)
  - Log resolver execution times
  - Track field-level metrics
  - Monitor subscription connections
- 23. GraphQL over HTTP Specification
- HTTP Methods:
  - POST: Standard method for all GraphQL operations
  - GET: Can be used for queries only (query in query string)
  - Query string format: ?query={user{name}}&variables={...}
  - GET has URL length limitations
- Request Format:
  - Content-Type: application/json
  - Body: { "query": "...", "variables": {...}, "operationName": "..." }
- Response Format:
  - Always HTTP 200 for valid requests
  - Body: { "data": {...}, "errors": [...], "extensions": {...} }
- Multipart Request:
  - Used for file uploads with graphql-upload
  - Content-Type: multipart/form-data
- NOTE: Official GraphQL over HTTP spec standardizes these conventions
- 24. GraphQL with TypeScript
- Type Safety:
  - Generate TypeScript types from GraphQL schema
  - End-to-end type safety from schema to client
- Code Generation:
  - Tools: GraphQL Code Generator, gql-tag-operations
  - Auto-generate types for queries, mutations, and schema
  - Example:

query GetUser($id: ID!) { ... }

// Generates: type GetUserQuery, GetUserQueryVariables

- Benefits:
  - Compile-time type checking
  - Better IDE autocomplete
  - Reduced runtime errors
  - Refactoring safety
- Implementation:
  - Define queries with gql template literals
  - Run codegen to generate types
  - Use generated types in resolvers and clients
- Schema to TypeScript:
  - Tools generate interfaces matching GraphQL types
  - Handles unions, interfaces, enums automatically
- 25. When to Use GraphQL vs REST
- Use GraphQL When:
  - Multiple clients need different data shapes (web, mobile, IoT)
  - Mobile apps need optimized payloads (reduce bandwidth)
  - Building public API for third-party developers
  - Complex relational data requirements
  - Real-time features needed (subscriptions)
  - Rapid iteration on frontend without backend changes
  - Need to aggregate data from multiple sources
- Use REST When:
  - Simple CRUD operations
  - Caching at HTTP level is critical
  - File uploads are primary use case
  - Team unfamiliar with GraphQL
  - Microservices with simple data needs
  - Existing REST infrastructure
  - Need standard HTTP status codes and methods
- Hybrid Approach:
  - Use GraphQL for complex queries and data fetching
  - Use REST for file uploads, simple operations
  - Use REST for webhooks (GraphQL doesn't support webhooks)
- Decision Factors:
  - Team expertise and learning curve
  - Project requirements and complexity
  - Infrastructure and tooling support
  - Client requirements and constraints
- NOTE: Many organizations use both - REST for simple operations, GraphQL for complex queries

</expand>

## Secondary Concepts

