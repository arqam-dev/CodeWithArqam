# NodeJS

## Primary Concepts

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- Node.js 0.1.14 - 2009
- Node.js 0.12.0 - 2015
- Node.js 4.0.0 - 2015 (LTS)
- Node.js 6.0.0 - 2016 (LTS)
- Node.js 8.0.0 - 2017 (LTS)
- Node.js 10.0.0 - 2018 (LTS)
- Node.js 12.0.0 - 2019 (LTS)
- Node.js 14.0.0 - 2020 (LTS)
- Node.js 16.0.0 - 2021 (LTS)
- Node.js 18.0.0 - 2022 (LTS)
- Node.js 20.0.0 - 2023 (LTS)
- Node.js 22.0.0 - 2024 (LTS)

</expand>

<expand title="Node.js Execution Cycle">
## Node.js Execution Cycle

### Application Startup Flow:

1. **Entry Point (app.js / server.js / index.js)**
   - Node.js starts execution from the entry file specified in `package.json` (`"main"` field) or default `index.js`
   - If using frameworks like Express, the entry point initializes the application

2. **Module Loading Phase**
   - Node.js loads and executes all `require()` statements synchronously
   - Core modules are loaded first (http, fs, path, etc.)
   - Local modules are loaded in dependency order
   - Third-party modules from `node_modules` are resolved and loaded
   - Each module is wrapped in a function wrapper and cached after first load

3. **Application Initialization**
   - Configuration files are loaded (environment variables, config files)
   - Database connections are established
   - Middleware is registered (Express, body-parser, cors, etc.)
   - Routes are registered
   - Event listeners are set up

4. **Server Startup**
   - HTTP/HTTPS server is created
   - Server listens on specified port
   - Event loop starts running
   - Application is ready to handle requests

5. **Request Handling Cycle**
   - Incoming request arrives at server
   - Request is parsed and routed to appropriate handler
   - Middleware functions execute in sequence
   - Controller/Handler processes the request
   - Database queries or external API calls are made (async operations)
   - Response is sent back to client
   - Event loop continues processing other requests

6. **Shutdown Phase**
   - Graceful shutdown handlers execute
   - Database connections are closed
   - Server stops accepting new requests
   - Process exits

### Example Flow:
```
app.js (entry point)
  ↓
require('express')
  ↓
require('./config/database')
  ↓
require('./routes')
  ↓
app.listen(3000)
  ↓
Event Loop Running
  ↓
Request → Middleware → Controller → Service → Database
  ↓
Response → Client
```

</expand>

<expand title="Node.js Project Directory Structure">
## Node.js Project Directory Structure

### Standard MVC/Service-Oriented Structure:

```
project-root/
├── src/                          # Source code directory
│   ├── app.js                    # Entry point / Main application file
│   ├── server.js                 # Server configuration
│   │
│   ├── config/                   # Configuration files
│   │   ├── database.js           # Database connection config
│   │   ├── env.js                # Environment variables
│   │   ├── constants.js          # Application constants
│   │   └── logger.js             # Logger configuration
│   │
│   ├── controllers/              # Request handlers (MVC Controllers)
│   │   ├── userController.js
│   │   ├── authController.js
│   │   └── productController.js
│   │
│   ├── services/                 # Business logic layer
│   │   ├── userService.js
│   │   ├── authService.js
│   │   └── emailService.js
│   │
│   ├── models/                   # Data models / Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/                   # Route definitions
│   │   ├── index.js              # Main router (combines all routes)
│   │   ├── userRoutes.js
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── middleware/               # Custom middleware functions
│   │   ├── auth.js               # Authentication middleware
│   │   ├── validation.js         # Request validation
│   │   ├── errorHandler.js       # Error handling middleware
│   │   └── logger.js             # Request logging
│   │
│   ├── utils/                    # Utility functions
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── formatters.js
│   │
│   ├── validators/               # Input validation schemas
│   │   ├── userValidator.js
│   │   └── authValidator.js
│   │
│   ├── repositories/             # Data access layer (if using Repository pattern)
│   │   ├── userRepository.js
│   │   └── productRepository.js
│   │
│   ├── types/                    # TypeScript type definitions (if using TS)
│   │   └── index.d.ts
│   │
│   └── workers/                  # Background workers / Jobs
│       ├── emailWorker.js
│       └── scheduler.js
│
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── public/                       # Static files (if serving static content)
│   ├── images/
│   └── uploads/
│
├── uploads/                      # User uploaded files
│
├── logs/                         # Application logs
│
├── node_modules/                 # Dependencies (auto-generated)
│
├── .env                          # Environment variables (not in git)
├── .env.example                  # Example environment file
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Lock file for dependencies
├── README.md                     # Project documentation
└── .eslintrc.js                  # ESLint configuration (if using)

```

### Alternative Structure (Feature-based / Domain-driven):

```
project-root/
├── src/
│   ├── app.js
│   ├── config/
│   │
│   ├── features/                 # Feature-based organization
│   │   ├── users/
│   │   │   ├── userController.js
│   │   │   ├── userService.js
│   │   │   ├── userModel.js
│   │   │   ├── userRoutes.js
│   │   │   └── userValidator.js
│   │   │
│   │   ├── products/
│   │   │   ├── productController.js
│   │   │   ├── productService.js
│   │   │   ├── productModel.js
│   │   │   ├── productRoutes.js
│   │   │   └── productValidator.js
│   │   │
│   │   └── orders/
│   │
│   ├── shared/                   # Shared utilities across features
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── constants/
│   │
│   └── infrastructure/           # Infrastructure concerns
│       ├── database/
│       ├── cache/
│       └── queue/
```

</expand>

<expand title="General Points">
## General Points

- Node 6 and 7 are no longer supported
- Although Node.js is single-threaded, V8 engine is multi-threaded
- `window` = in browsers, `global` = in Node.js
- Node.js automatically offloads expensive operations to LibUV thread pool (see "LibUV Thread Pool" section for details)

</expand>

<expand title="Crypto Module">
## Crypto Module

- **Purpose:** Provides cryptographic functionality to secure Node.js applications
- **Built-in:** Crypto module is built into Node.js (no installation needed)
- **What it is:** Set of wrappers for OpenSSL's cryptographic functions
- **Key Concepts:**
  - **Hashing vs Encryption:** Hashed data cannot be decrypted with a key (one-way function), unlike encrypted data
  - **Random Number Generator:** Access to cryptographically strong random number generator
  - **Cryptographic Primitives:** Hash, HMAC, cipher, decipher, sign, and verify functions
- **Hash Functions:**
  - `crypto.createHash('sha256')` - Create hash
  - Algorithms: sha256, sha512, md5 (deprecated)
- **HMAC (Hash-based Message Authentication Code):**
  - `crypto.createHmac('sha256', secret)` - Create HMAC with secret key
- **Cipher/Decipher:**
  - `crypto.createCipheriv()` - Encrypt data
  - `crypto.createDecipheriv()` - Decrypt data
- **Random:**
  - `crypto.randomBytes()` - Generate random bytes
  - `crypto.randomInt()` - Generate random integer
- **Sign/Verify:**
  - `crypto.createSign()` - Create digital signature
  - `crypto.createVerify()` - Verify signature

</expand>

<expand title="Concurrency model in nodeJS">
## Concurrency model in nodeJS

- **Async behavior:** Node.js uses asynchronous, non-blocking I/O operations
- **Concurrency vs Parallelism:**
  - **Concurrency:** A program is able to run more than one task at a time (not simultaneously, but interleaved)
  - **Parallelism:** Multiple tasks run simultaneously on different CPU cores
  - Node.js is concurrent but not parallel (single-threaded event loop)
- **Event Loop:** Manages concurrency through event-driven architecture
- **Non-blocking I/O:** Operations don't block the main thread
- **Callback Queue:** Pending callbacks are queued and executed when call stack is empty
- **Worker Threads:** For CPU-intensive tasks, Node.js provides worker threads for true parallelism
- **LibUV Thread Pool:** Handles file I/O, DNS, crypto operations on separate threads

</expand>

<expand title="LibUV Thread Pool">
## LibUV Thread Pool

- **Purpose:** Node.js automatically offloads expensive I/O operations to LibUV thread pool to prevent blocking the main event loop
- **Why needed:** These operations are expensive even when async, so they run on separate threads managed by LibUV
- **Tasks automatically offloaded to thread pool:**
  - File reading/writing (`fs` operations)
  - Crypto operations (async versions only, e.g., `crypto.pbkdf2()`)
  - Compression/decompression (zlib operations)
  - DNS lookups
  - Some system I/O operations (not networking)
- **Tasks NOT offloaded (run on main thread):**
  - CPU-intensive JavaScript code
  - Networking operations (HTTP/TCP/UDP) - always run on main thread
  - Package imports (`require()`)
  - Crypto synchronous functions (blocking operations)
- **Thread Pool Configuration:**
  - Default: 4 threads
  - Can be increased using `UV_THREADPOOL_SIZE` environment variable
  - Cannot exceed number of logical CPU cores
  - Example: `UV_THREADPOOL_SIZE=8 node app.js`
- **Note:** DNS lookups are the only networking-related operations that use thread pool; all other networking runs on main thread

</expand>

<expand title="REPL">
## REPL

- Read-Eval-Print-Loop.
- It is a quick and easy way to test simple Node.js/JavaScript code.
- Virtual Environment
- Steps to open:
  - open cmd
  - type node
- Commands:
  - ctrl + c = terminate the current command
  - ctrL + c(twice) = ctrl + d = exit from repl
  - etc.

</expand>

<expand title="Traditional Web Server Models VS NodeJS Web Server Model">
## Traditional Web Server Models VS NodeJS Web Server Model

- Traditional Web Server Model:
  - In the traditional web server model, each request is handled by a dedicated thread from the thread pool.
  - If no thread is available in the thread pool at any point of time then the request waits till the next available thread.
  - Dedicated thread executes a particular request and does not return to thread pool until it completes the execution and returns a response.
- Node.js Process Model:
  - Node.js runs in a single process and the application code runs in a single thread and thereby needs less resources than other platforms.
  - Node.js is not fit for an application which performs CPU-intensive operations like image processing or other heavy computation work because it takes time to process a request and thereby blocks the single thread.

</expand>

<expand title="Node.js Module Types">
## Node.js Module Types

### Core Modules:
- The core modules include bare minimum functionalities of Node.js
- These core modules are compiled into its binary distribution and load automatically when Node.js process starts
- However, you need to import the core module first in order to use it in your application
- **Types:**
  - `http`, `https` - HTTP server and client
  - `fs` - File system operations
  - `path` - Path utilities
  - `url` - URL parsing
  - `querystring` - Query string parsing
  - `crypto` - Cryptographic functionality
  - `stream` - Stream interface
  - `events` - Event emitter
  - `util` - Utility functions
  - `os` - Operating system utilities
  - `buffer` - Binary data handling
  - `zlib` - Compression
  - `net` - Network operations
  - `dns` - DNS operations
- **Loading Core Modules:**
  - Example: `const http = require('http');`
  - No path needed, just module name

### Local Modules:
- These modules include different functionalities of your application in separate files and folders
- Created by developers for application-specific functionality
- **Loading Local Modules:**
  - Example: `const myLogModule = require('./Log.js');`
  - Example: `const utils = require('./utils/helpers');`
  - Use relative or absolute paths
  - Can omit `.js` extension: `require('./Log')`

### Third Party Modules:
- Modules installed via npm or yarn from npm registry
- Stored in `node_modules` directory
- **Loading Third Party Modules:**
  - Example: `const express = require('express');`
  - Example: `const mongoose = require('mongoose');`
  - No path needed, Node.js searches in `node_modules`
- **Installation:**
  - `npm install express` - installs to `node_modules`
  - Listed in `package.json` dependencies
- **Module Resolution:**
  1. Checks core modules first
  2. Checks `node_modules` in current directory
  3. Moves up directory tree checking parent `node_modules`
  4. Continues until root or finds module

### Module System (CommonJS vs ES Modules):
- **CommonJS (require/module.exports):**
  - Traditional Node.js module system
  - Synchronous loading
  - Example: `module.exports = { function }` and `require('./module')`
- **ES Modules (import/export):**
  - Modern JavaScript module system
  - Asynchronous loading
  - Use `"type": "module"` in package.json or `.mjs` extension
  - Example: `export function` and `import { function } from './module'`

</expand>

<expand title="Node Inspector">
## Node Inspector

- **Purpose:** Debugging tool for Node.js applications
- **What it is:** Chrome DevTools protocol implementation for Node.js
- **Usage:**
  - Start with: `node --inspect app.js` or `node --inspect-brk app.js`
  - `--inspect`: Starts inspector, app runs immediately
  - `--inspect-brk`: Starts inspector, pauses at first line
- **Access:**
  - Open Chrome browser
  - Navigate to `chrome://inspect`
  - Click "inspect" under your Node.js process
- **Features:**
  - Breakpoints
  - Step through code
  - Watch variables
  - Call stack inspection
  - Console for debugging
- **Alternative:** Built-in debugger using `node inspect app.js`
- **VS Code Integration:** Can attach debugger directly from VS Code

</expand>

<expand title="Event Emitter">
## Event Emitter

- **What it is:** Core Node.js class that enables event-driven programming
- **Purpose:** Allows objects to emit named events and register listeners
- **Core Pattern:** Foundation of Node.js event-driven architecture
- **Usage:**
  ```javascript
  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  
  // Listen to event
  emitter.on('event', (data) => {
    console.log('Event received:', data);
  });
  
  // Emit event
  emitter.emit('event', { message: 'Hello' });
  ```
- **Key Methods:**
  - `emitter.on(event, listener)` - Register listener
  - `emitter.once(event, listener)` - Listen once then auto-remove
  - `emitter.emit(event, ...args)` - Trigger event
  - `emitter.removeListener(event, listener)` - Remove specific listener
  - `emitter.removeAllListeners(event)` - Remove all listeners for event
  - `emitter.listeners(event)` - Get all listeners for event
  - `emitter.setMaxListeners(n)` - Set max listeners (default: 10)
- **Inheritance:**
  ```javascript
  class MyClass extends EventEmitter {
    doSomething() {
      this.emit('done', { result: 'success' });
    }
  }
  ```
- **Built-in Event Emitters:**
  - HTTP server (request, connection events)
  - File streams (data, end, error events)
  - Process (exit, uncaughtException events)
  - Custom classes extending EventEmitter
- **Error Handling:**
  - Always handle 'error' events (unhandled errors crash Node.js)
  - Example:
    ```javascript
    emitter.on('error', (err) => {
      console.error('Error:', err);
    });
    ```
- **Event-driven Architecture:** Foundation of Node.js non-blocking I/O

</expand>

<expand title="Profiling in nodeJS">
## Profiling in nodeJS

- **Purpose:** Analyze application performance to identify bottlenecks and optimize code execution
- **What is a Profiler:**
  - Monitors code execution and tracks performance metrics
  - Records how many times code is executed
  - Identifies hot paths (frequently executed code)
  - Works with V8's JIT compiler: when same code runs multiple times, profiler passes it to JIT compiler for optimization
  - JIT compiler replaces bytecode with optimized machine code for better performance
- **Methods:**
  1. **CPU Profiling:**
     - `node --prof app.js` - Generates `isolate-*.log` file
     - `node --prof-process isolate-*.log` - Processes log file
  2. **Memory Profiling:**
     - `node --inspect app.js` - Use Chrome DevTools Memory tab
     - `heapdump` package for heap snapshots
  3. **Built-in V8 Profiler:**
     - V8 profiler integrated in Node.js
     - Tracks function execution time
     - Automatically optimizes frequently executed code
  4. **Third-party Tools:**
     - `clinic.js` - Comprehensive profiling suite
     - `0x` - Flame graph generator
     - `autocannon` / `wrk` - Load testing
- **Performance Monitoring:**
  - `process.memoryUsage()` - Memory statistics
  - `process.cpuUsage()` - CPU usage
  - `process.hrtime()` - High-resolution time
- **Best Practices:**
  - Profile in production-like environment
  - Focus on hot paths (frequently executed code)
  - Use sampling profilers for minimal overhead
  - Monitor both CPU and memory usage

</expand>

<expand title="NPM vs Yarn">
## NPM vs Yarn

### NPM (Node Package Manager):
- **Default:** Comes bundled with Node.js
- **Lock file:** `package-lock.json`
- **Registry:** npmjs.com
- **Commands:**
  - `npm install` - Install dependencies
  - `npm install <package>` - Install package
  - `npm run <script>` - Run script
  - `npm publish` - Publish package
- **Features:**
  - Slower installation (sequential)
  - Less secure (older versions had vulnerabilities)
  - Built-in support, no extra installation

### Yarn:
- **Installation:** Separate installation required
- **Lock file:** `yarn.lock`
- **Registry:** Can use npm registry or custom
- **Commands:**
  - `yarn install` - Install dependencies
  - `yarn add <package>` - Install package
  - `yarn run <script>` - Run script
  - `yarn publish` - Publish package
- **Features:**
  - Faster installation (parallel downloads)
  - Better security (checksum verification)
  - Workspaces support (monorepo)
  - Offline mode
  - Better dependency resolution

### Yarn vs NPM (Modern):
- **Yarn 1.x:** Classic Yarn (being phased out)
- **Yarn 2+ (Berry):** Modern Yarn with Plug'n'Play (PnP)
- **NPM 7+:** Improved performance, workspaces support
- **PNPM:** Alternative package manager (faster, disk-efficient)

### When to Use:
- **NPM:** Default choice, good for most projects
- **Yarn:** When you need faster installs, workspaces, or better monorepo support
- **PNPM:** When disk space is a concern, strict dependency management

</expand>

<expand title=""D" flag">
## "D" flag

- **Full form:** `--save-dev` or `-D` (shorthand)
- **Purpose:** Installs package as a development dependency
- **Location:** Packages are added to `devDependencies` in `package.json`
- **When to use:**
  - Tools needed only during development
  - Build tools, testing frameworks, linters
  - Not needed in production
- **Examples:**
  - `npm i -D nodemon` - Auto-restart server on file changes
  - `npm i -D jest` - Testing framework
  - `npm i -D eslint` - Code linter
  - `npm i -D typescript` - TypeScript compiler
- **Production vs Development:**
  - `npm install` - Installs both dependencies and devDependencies
  - `npm install --production` - Installs only dependencies (skips devDependencies)
  - `npm install --only=dev` - Installs only devDependencies
- **Benefits:**
  - Smaller production builds
  - Faster production deployments
  - Clear separation of concerns

</expand>

<expand title="Architecture">
## Architecture

### General Points:
- **Server.js (server)** runs directly on OS (not Libuv) using node APIs (like bodyParser, etc)
- **Request Flow** from top to bottom (nested): OS => Server => V8 => LibUV, EventLoop, CallStack, etc
- Node.js uses a **single-threaded event loop** for JavaScript execution
- **Non-blocking I/O** operations handled by LibUV thread pool

### V8 Engine:
- **Purpose:** JavaScript runtime engine (developed by Google)
- **Functionality:**
  - Parses and compiles JavaScript code
  - Executes JavaScript code
  - Manages memory (garbage collection)
  - Optimizes code execution (JIT compilation)
- **Key Features:**
  - Converts JavaScript to optimized machine code
  - Handles call stack, heap memory
  - Provides JavaScript APIs to Node.js

### LibUV:
- **Purpose:** Cross-platform asynchronous I/O library written in C
- **Functionality:**
  - Communication with CPU/OS
  - Manages blocking events like:
    - File reading/writing
    - Database operations
    - Network calls
    - Timers (setTimeout, setInterval)
    - DNS lookups
- **Thread Pool:**
  - Default: 4 threads
  - Can be upgraded using `UV_THREADPOOL_SIZE` environment variable
  - Cannot exceed the number of logical CPU cores
  - Example: `UV_THREADPOOL_SIZE=8 node app.js`
- **Architecture:**
  - Event loop (main thread)
  - Thread pool (worker threads for blocking operations)
  - Handles async operations that can't be done on main thread

### Event Loop:
- **Purpose:** Manages asynchronous operations and callbacks
- **Execution Priorities of Queues with Sequence in NODE JS:**

1. **Events (.on)** - Stays in call stack, not in any queue
2. **Stack => Next Tick** - Checks/executes after every queue switch
3. **Micro Tasks Queue** - Promises, process.nextTick callbacks
4. **Stack => Next Tick** - Checks/executes after every queue switch
5. **Macro Task Queue** - Timers (setTimeout, setInterval)
6. **Stack => Next Tick** - Checks/executes after every queue switch
7. **Pending Callbacks** - I/O Queue (pending connections, etc)
8. **Stack => Next Tick** - Checks/executes after every queue switch
9. **Immediate Queue** - Check Queue (setImmediate callbacks)
10. **Stack => Next Tick** - Checks/executes after every queue switch
11. **Close Callbacks** - Close event handlers (socket.on('close'))

- **process.nextTick()** has highest priority (runs before any other async operation)
- **setImmediate()** runs after I/O events
- **setTimeout(fn, 0)** runs after setImmediate in some cases

</expand>

<expand title="Async Programming">
## Async Programming

### Callbacks:
- **Traditional approach** for handling async operations
- **Example:**
  ```javascript
  fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  ```
- **Callback Hell:** Nested callbacks become hard to read and maintain
- **Error Handling:** First parameter is error (error-first callback pattern)

### Promises:
- **Modern approach** for async operations
- **States:** Pending, Fulfilled, Rejected
- **Example:**
  ```javascript
  fs.promises.readFile('file.txt')
    .then(data => console.log(data))
    .catch(err => console.error(err));
  ```
- **Benefits:** Better error handling, chainable, avoids callback hell

### Async/Await:
- **Syntactic sugar** over Promises
- **Example:**
  ```javascript
  async function readFile() {
    try {
      const data = await fs.promises.readFile('file.txt');
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  ```
- **Benefits:** Synchronous-looking code, easier to read and debug

### Promise Methods:
- `Promise.all()` - Waits for all promises, fails if any fails
- `Promise.allSettled()` - Waits for all, returns all results
- `Promise.race()` - Returns first settled promise
- `Promise.any()` - Returns first fulfilled promise

</expand>

<expand title="File System (fs)">
## File System (fs)

### Operations:
- **Open:** `fs.open()` - Open file for reading/writing
- **Close:** `fs.close()` - Close file descriptor
- **Read:** `fs.readFile()`, `fs.readFileSync()` - Read entire file
- **Create:** `fs.writeFile()`, `fs.appendFile()` - Create/write file
- **Delete:** `fs.unlink()` - Delete file
- **Stats:** `fs.stat()`, `fs.lstat()` - Get file/directory information
- **Access:** `fs.access()` - Check file permissions
- **Writing:** `fs.writeFile()`, `fs.writeFileSync()` - Write to file
- **Read & Write:** `fs.readWriteFile()` - Read and write operations
- **Copy:** `fs.copyFile()` - Copy file
- **Move/Rename:** `fs.rename()` - Move or rename file

### Synchronous vs Asynchronous:
- **Sync methods:** Block event loop (use sparingly)
  - Example: `fs.readFileSync()`
- **Async methods:** Non-blocking (preferred)
  - Example: `fs.readFile()`, `fs.promises.readFile()`

### Directory Operations:
- `fs.mkdir()` - Create directory
- `fs.rmdir()` - Remove directory
- `fs.readdir()` - Read directory contents
- `fs.stat()` - Get directory stats

</expand>


<expand title="HTTP & Web Server">
## HTTP & Web Server

### HTTP Module:
- **Create Server:**
  ```javascript
  const http = require('http');
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  });
  server.listen(3000);
  ```
- **Request Object (req):**
  - `req.url` - Request URL
  - `req.method` - HTTP method (GET, POST, etc)
  - `req.headers` - Request headers
  - `req.on('data')` - Stream request body
- **Response Object (res):**
  - `res.writeHead(status, headers)` - Set status and headers
  - `res.write(data)` - Write response data
  - `res.end(data)` - End response
  - `res.statusCode` - Set status code

### HTTPS Module:
- Similar to HTTP but for secure connections
- Requires SSL/TLS certificates
- Example:
  ```javascript
  const https = require('https');
  const fs = require('fs');
  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
  const server = https.createServer(options, handler);
  ```

### Express.js (Popular Framework):
- Built on top of HTTP module
- Provides routing, middleware, templating
- Simplifies web server creation

</expand>

<expand title="Streams and Buffer">
## Streams and Buffer

### Buffer:
- **Purpose:** Handle binary data in Node.js
- **What it is:** Fixed-size chunk of memory (array of bytes)
- **Use Cases:**
  - Reading binary files
  - Network data
  - Image processing
  - Crypto operations
- **Example:**
  ```javascript
  const buf = Buffer.from('Hello', 'utf8');
  const buf2 = Buffer.alloc(10);
  ```

### Streams:
- **Fundamental concept** for handling data efficiently
- **Why Streams:**
  - Handle large files without loading entire file into memory
  - Process data as it arrives (real-time)
  - Memory efficient
  - Pipelining operations

### Stream Types:
1. **Readable Stream:** Data can be read (fs.createReadStream)
2. **Writable Stream:** Data can be written (fs.createWriteStream)
3. **Duplex Stream:** Both readable and writable (net.Socket)
4. **Transform Stream:** Duplex stream that transforms data (zlib.createGzip)

### Stream Events:
- `data` - Data available to read
- `end` - No more data
- `error` - Error occurred
- `finish` - All data flushed
- `close` - Stream closed

### Piping:
- Connect streams together
- Example:
  ```javascript
  fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('output.txt.gz'));
  ```

</expand>

<expand title="Child Process, Worker Threads, and Clusters">
## Child Process, Worker Threads, and Clusters

### Overview:
Node.js is single-threaded, but provides three mechanisms to achieve parallelism:
1. **Child Process** - Separate processes (complete isolation)
2. **Worker Threads** - Threads within same process (shared memory)
3. **Clusters** - Multiple Node.js instances (load balancing)

---

### 1. Child Process

**What it is:**
- Spawns completely separate Node.js processes or external programs
- Each child process has its own memory space, V8 instance, and event loop
- Processes communicate via IPC (Inter-Process Communication) - messages, not shared memory

**Methods:**
- **exec():** Execute shell command, buffers output (good for short commands)
- **spawn():** Spawn new process, streams I/O (good for long-running processes)
  - **fork():** Special spawn for Node.js scripts, enables IPC
  - **execFile():** Execute file directly, more secure than exec

**Real-World Use Cases:**
- Running ImageMagick or FFmpeg to resize/convert images
- Running Python/R scripts for data analysis
- Executing OS commands (file operations, system info)
- Running separate Node.js services as child processes
- Running build scripts, compilers, linters

**Characteristics:**
- ✅ Complete process isolation (crash doesn't affect parent)
- ✅ Can run any executable (not just Node.js)
- ❌ Heavy memory overhead (each process has full V8 instance)
- ❌ Slower startup time
- ❌ Communication via IPC (serialization overhead)

---

### 2. Worker Threads

**What it is:**
- Creates threads within the same Node.js process
- Each thread has its own V8 instance and event loop
- Threads share memory space (can use SharedArrayBuffer)
- True parallelism on multiple CPU cores

**Real-World Use Cases:**
- CPU-intensive calculations and data transformations
- Image processing (pixel manipulation, canvas operations)
- Video encoding/decoding
- Cryptographic operations (hashing, encryption/decryption)
- Data compression/decompression
- Machine learning model inference
- Processing massive datasets and large arrays

**Characteristics:**
- ✅ Lightweight (shares process memory)
- ✅ Fast startup (no new process creation)
- ✅ Shared memory via SharedArrayBuffer (efficient data sharing)
- ✅ True parallelism (uses multiple CPU cores)
- ✅ Lower memory overhead than child processes
- ❌ Still within same process (one crash can affect all)
- ❌ Can only run JavaScript (not external programs)
- ❌ More complex memory management

---

### 3. Clusters

**What it is:**
- Creates multiple Node.js processes (workers) that share server ports
- Master process (primary) manages worker processes
- Workers handle incoming requests (load balancing)
- Each worker is a separate process with its own event loop

**Real-World Use Cases:**
- Scaling Express/Fastify apps across CPU cores
- Handling high traffic REST/GraphQL APIs
- WebSocket servers and chat applications
- Distributing incoming requests across workers
- High availability (one worker crash doesn't bring down entire server)
- Production deployments maximizing server resource utilization

**Characteristics:**
- ✅ Process isolation (worker crash doesn't affect others)
- ✅ Automatic load balancing (OS distributes connections)
- ✅ Better CPU utilization (uses all cores)
- ✅ High availability (can restart dead workers)
- ✅ Simple to implement
- ❌ Higher memory usage (multiple Node.js instances)
- ❌ No shared memory (each process has separate memory)
- ❌ Communication via IPC (slower than shared memory)

---

### Comparison Summary

**Isolation Level:**
- **Child Process:** Complete (separate process)
- **Worker Threads:** Partial (same process, separate threads)
- **Clusters:** Complete (separate processes)

**Memory Space:**
- **Child Process:** Separate memory
- **Worker Threads:** Shared memory (via SharedArrayBuffer)
- **Clusters:** Separate memory

**Communication:**
- **Child Process:** IPC (messages)
- **Worker Threads:** Messages + SharedArrayBuffer
- **Clusters:** IPC (messages)

**Startup Time:**
- **Child Process:** Slow (new process)
- **Worker Threads:** Fast (new thread)
- **Clusters:** Slow (new processes)

**Memory Overhead:**
- **Child Process:** High (full V8 per process)
- **Worker Threads:** Low (shared process memory)
- **Clusters:** High (full V8 per worker)

**Can Run External Programs:**
- **Child Process:** ✅ Yes
- **Worker Threads:** ❌ No (JS only)
- **Clusters:** ❌ No (Node.js only)

**Crash Impact:**
- **Child Process:** Isolated (doesn't affect parent)
- **Worker Threads:** Can affect process
- **Clusters:** Isolated (doesn't affect others)

**Best For:**
- **Child Process:** External programs, system commands
- **Worker Threads:** CPU-intensive JS tasks
- **Clusters:** Scaling web servers

**Use Case Example:**
- **Child Process:** Running ImageMagick, Python scripts
- **Worker Threads:** Image processing, calculations
- **Clusters:** Express server, API server

**Performance:**
- **Child Process:** Good for I/O, slower for CPU
- **Worker Threads:** Excellent for CPU tasks
- **Clusters:** Excellent for I/O and requests

---

### When to Use What?

**Use Child Process when:**
- Need to run external programs (ImageMagick, FFmpeg, Python scripts)
- Need complete isolation (one crash shouldn't affect others)
- Running system commands or shell scripts
- Building microservices architecture
- Need to execute non-JavaScript code

**Use Worker Threads when:**
- CPU-intensive JavaScript tasks (calculations, data processing)
- Need shared memory for efficient data access
- Processing large arrays or datasets
- Image/video processing in JavaScript
- Cryptographic operations
- Want lightweight parallelism

**Use Clusters when:**
- Scaling web servers/APIs across CPU cores
- Need load balancing for incoming requests
- High availability requirements
- Maximizing server resource utilization
- Production deployments
- Simple horizontal scaling solution

---

### Key Differences:

1. **Child Process:** Separate processes = Complete isolation, can run any executable, heavy but safe
2. **Worker Threads:** Same process, different threads = Shared memory, JavaScript only but very fast, lightweight but less isolated
3. **Clusters:** Multiple Node.js processes = Load balancing, perfect for web servers, simple scaling solution

</expand>

<expand title="Path Module">
## Path Module

- **Purpose:** Handle and transform file paths
- **Key Methods:**
  - `path.join()` - Join path segments (handles separators)
  - `path.resolve()` - Resolve absolute path
  - `path.dirname()` - Get directory name
  - `path.basename()` - Get filename
  - `path.extname()` - Get file extension
  - `path.parse()` - Parse path into object
  - `path.normalize()` - Normalize path (remove redundant separators)
- **Cross-platform:** Handles Windows/Unix path differences
- **Example:**
  ```javascript
  const path = require('path');
  const fullPath = path.join(__dirname, 'public', 'index.html');
  ```

</expand>

<expand title="URL Module">
## URL Module

- **Purpose:** Parse and format URLs
- **Key Methods:**
  - `url.parse()` - Parse URL string into object
  - `url.format()` - Format URL object into string
  - `new URL()` - Modern URL constructor
- **Example:**
  ```javascript
  const url = require('url');
  const myUrl = new URL('https://example.com/path?query=value');
  console.log(myUrl.searchParams.get('query')); // 'value'
  ```

</expand>

<expand title="Process Module">
## Process Module

- **Purpose:** Interact with current Node.js process
- **Key Properties:**
  - `process.env` - Environment variables
  - `process.argv` - Command line arguments
  - `process.cwd()` - Current working directory
  - `process.exit()` - Exit process
  - `process.memoryUsage()` - Memory statistics
  - `process.cpuUsage()` - CPU usage
- **Events:**
  - `process.on('exit')` - Before process exits
  - `process.on('uncaughtException')` - Unhandled exceptions
  - `process.on('SIGTERM')` - Termination signal

</expand>


<expand title="WebSockets & Socket.io">
## WebSockets & Socket.io

### WebSockets:
- **Purpose:** Full-duplex communication over TCP
- **Use Case:** Real-time applications (chat, gaming, live updates)
- **Protocol:** ws:// or wss:// (secure)
- **Benefits:** Low latency, persistent connection

### Socket.io:
- **Library:** Built on WebSockets with fallbacks
- **Features:**
  - Automatic reconnection
  - Room support
  - Broadcasting
  - Fallback to polling if WebSocket unavailable

### Socket.io Core Concepts:
- **`io`:** Represents the server (all connected clients)
- **`socket`:** Represents a single connected client

### Socket.io Methods:

- **`io.on('connection', callback)`**
  - **Purpose:** Listen for new client connections
  - **Use Case:** User connects to server
  - **Example:** `io.on('connection', (socket) => { ... })`

- **`socket.on(event, callback)`**
  - **Purpose:** Listen for incoming messages from client
  - **Use Case:** Receive message from client
  - **Example:** `socket.on('chat-message', (data) => { ... })`

- **`socket.emit(event, data)`**
  - **Purpose:** Send message to the current client only
  - **Use Case:** Send to self (reply/acknowledgment)
  - **Example:** `socket.emit('welcome', { message: 'Hello' })`

- **`io.to(socketId).emit(event, data)`**
  - **Purpose:** Send message to a specific client by socket ID
  - **Use Case:** Private message to specific user
  - **Example:** `io.to(socket.id).emit('private-message', data)`

- **`socket.join(room)`**
  - **Purpose:** Add client to a specific room (group)
  - **Use Case:** Join group/room
  - **Example:** `socket.join('room-123')`

- **`socket.leave(room)`**
  - **Purpose:** Remove client from a specific room
  - **Use Case:** Leave group/room
  - **Example:** `socket.leave('room-123')`

- **`socket.to(room).emit(event, data)`**
  - **Purpose:** Send message to all clients in room EXCEPT the sender
  - **Use Case:** Group chat messages (sender doesn't receive their own message)
  - **Example:** `socket.to('room-123').emit('group-message', data)`

- **`socket.disconnect()`**
  - **Purpose:** Disconnect the current client
  - **Use Case:** User leaves/disconnects
  - **Example:** `socket.disconnect()`

### Important Difference: `socket.to()` vs `io.to()`

- **`io.to(room).emit()`**
  - **Includes sender:** Yes (sender receives the message)
  - **Use Case:** System messages, announcements to entire room
  - **Example:** Server sends "User joined" message to all including the joiner

- **`socket.to(room).emit()`**
  - **Includes sender:** No (sender does NOT receive the message)
  - **Use Case:** Group chat messages (you don't want to see your own message echoed back)
  - **Example:** User sends message, others in room receive it, but sender doesn't

- **`io.emit()`**
  - **Includes sender:** Everyone (all connected clients)
  - **Use Case:** Global broadcast to all clients
  - **Example:** Server announcement to everyone

- **`socket.broadcast.emit()`**
  - **Includes sender:** No (everyone except sender)
  - **Use Case:** Broadcast to all other clients
  - **Example:** User action notification to all others

### Rule of Thumb:
- Use `io` when sending from server to anyone (global/server context)
- Use `socket` when sender context matters (exclude sender, client-specific actions)

</expand>

<expand title="Error Handling">
## Error Handling

### Error Types:
- **Standard Error:** `new Error('message')`
- **Custom Errors:** Extend Error class
- **Async Errors:** Handle in promises/callbacks

### Best Practices:
- Always handle errors in async operations
- Use try-catch for async/await
- Handle 'error' events on streams/emitters
- Use error-first callback pattern
- Log errors appropriately
- Don't ignore errors silently

### Global Error Handlers:
- `process.on('uncaughtException')` - Catch unhandled exceptions
- `process.on('unhandledRejection')` - Catch unhandled promise rejections

</expand>

<expand title="Middleware Concepts">
## Middleware Concepts

- **Purpose:** Functions that execute in request-response cycle
- **Types:**
  - **Application-level:** `app.use(middleware)`
  - **Router-level:** `router.use(middleware)`
  - **Error-handling:** `app.use((err, req, res, next) => {})`
- **Common Middleware:**
  - Authentication
  - Logging
  - Body parsing
  - CORS
  - Error handling
- **Execution Order:** Middleware executes in order of definition

</expand>

<expand title="Body Parser">
## Body Parser

- **Purpose:** Parse incoming request bodies in Express.js applications
- **Main Purpose:** Converts raw HTTP request body data into a usable JavaScript object accessible via `req.body`
- **Why it's needed:**
  - HTTP requests send data in the body as raw strings/buffers
  - Express doesn't parse request bodies by default
  - Body parser middleware extracts and parses the body based on Content-Type header
  - Makes form data, JSON, and other payloads easily accessible in route handlers

### Content Types Handled:
1. **JSON (`application/json`):**
   - Parses JSON strings into JavaScript objects
   - Example: `{ "name": "John", "age": 30 }` → `req.body = { name: "John", age: 30 }`

2. **URL-encoded (`application/x-www-form-urlencoded`):**
   - Parses form data (like HTML forms)
   - Example: `name=John&age=30` → `req.body = { name: "John", age: "30" }`

3. **Text (`text/plain`):**
   - Parses plain text bodies
   - Example: `"Hello World"` → `req.body = "Hello World"`

4. **Raw (`application/octet-stream`):**
   - Handles binary data as Buffer
   - Useful for file uploads or binary data

### Usage:

**Express 4.16+ (Built-in):**
- Body parser is now built into Express
- No need to install separate package
- Example:
  ```javascript
  const express = require('express');
  const app = express();
  
  // Parse JSON bodies
  app.use(express.json());
  
  // Parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));
  
  // Access parsed data in routes
  app.post('/api/users', (req, res) => {
    console.log(req.body); // Parsed object
    res.json({ success: true });
  });
  ```

**Express < 4.16 (body-parser package):**
- Need to install: `npm install body-parser`
- Example:
  ```javascript
  const express = require('express');
  const bodyParser = require('body-parser');
  const app = express();
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  ```

### Configuration Options:

**JSON Parser:**
- `express.json(options)`
- Options:
  - `limit`: Maximum request body size (default: '100kb')
  - `strict`: Only parse arrays and objects (default: true)
  - `type`: Content-Type to parse (default: 'application/json')

**URL-encoded Parser:**
- `express.urlencoded(options)`
- Options:
  - `extended`: Use `qs` library (true) or `querystring` (false)
    - `true`: Supports nested objects (recommended)
    - `false`: Only supports flat key-value pairs
  - `limit`: Maximum request body size
  - `parameterLimit`: Maximum number of parameters (default: 1000)

### Common Use Cases:
- **API endpoints:** Receiving JSON data from frontend
- **Form submissions:** Processing HTML form data
- **File uploads:** Handling multipart/form-data (requires `multer` middleware)
- **Webhooks:** Parsing incoming webhook payloads
- **REST APIs:** Processing POST, PUT, PATCH request bodies

### Example:
```javascript
const express = require('express');
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse form data

// Route handlers
app.post('/api/login', (req, res) => {
  const { email, password } = req.body; // Access parsed data
  // Process login...
});

app.post('/api/users', (req, res) => {
  const userData = req.body; // Already parsed JSON object
  // Create user...
});
```

### Important Notes:
- **Order matters:** Body parser middleware should be registered before routes that need it
- **Size limits:** Set appropriate limits to prevent DoS attacks
- **Security:** Always validate and sanitize parsed data before use
- **File uploads:** Use `multer` middleware for multipart/form-data (file uploads)
- **Built-in vs package:** Express 4.16+ includes body parser, older versions need the package

</expand>

<expand title="Database Integration">
## Database Integration

### MongoDB (Mongoose):
- ODM (Object Document Mapper)
- Schema definition
- Model creation
- Query building

### SQL Databases:
- **Sequelize:** ORM for PostgreSQL, MySQL, SQLite
- **TypeORM:** TypeScript ORM
- **Raw Queries:** Using database drivers directly

### Connection Pooling:
- Reuse database connections
- Improve performance
- Manage connection lifecycle

</expand>

<expand title="Security Best Practices">
## Security Best Practices

- **Helmet.js:** Set security HTTP headers
- **CORS:** Configure Cross-Origin Resource Sharing
- **Rate Limiting:** Prevent abuse
- **Input Validation:** Validate and sanitize user input
- **Authentication:** JWT, OAuth, session-based
- **Password Hashing:** Use bcrypt, never store plain passwords
- **HTTPS:** Use SSL/TLS in production
- **Environment Variables:** Store secrets in .env, never commit
- **SQL Injection:** Use parameterized queries
- **XSS Protection:** Sanitize output

</expand>

<expand title="Testing">
## Testing

### Testing Frameworks:
- **Jest:** Popular testing framework
- **Mocha:** Flexible test framework
- **Chai:** Assertion library
- **Supertest:** HTTP assertion library

### Test Types:
- **Unit Tests:** Test individual functions
- **Integration Tests:** Test component interactions
- **E2E Tests:** Test full application flow

### Example:
```javascript
describe('User Service', () => {
  test('should create user', async () => {
    const user = await createUser({ name: 'John' });
    expect(user.name).toBe('John');
  });
});
```

</expand>

<expand title="Performance Optimization">
## Performance Optimization

- **Caching:** Redis, in-memory caching
- **Compression:** gzip, brotli
- **CDN:** Serve static assets
- **Database Indexing:** Optimize queries
- **Connection Pooling:** Reuse connections
- **Load Balancing:** Distribute traffic
- **Clustering:** Utilize multiple CPU cores
- **Code Optimization:** Avoid blocking operations
- **Monitoring:** Use APM tools (New Relic, DataDog)

</expand>

<expand title="Environment Variables">
## Environment Variables

- **Purpose:** Store configuration and secrets
- **Usage:** `process.env.VARIABLE_NAME`
- **dotenv Package:** Load from .env file
  ```javascript
  require('dotenv').config();
  ```
- **Best Practices:**
  - Never commit .env file
  - Use .env.example as template
  - Different values for dev/staging/production
  - Validate required variables on startup

</expand>

<expand title="Package.json Scripts">
## Package.json Scripts

- **Common Scripts:**
  - `start`: Production start command
  - `dev`: Development start command
  - `test`: Run tests
  - `build`: Build for production
  - `lint`: Run linter
- **Example:**
  ```json
  {
    "scripts": {
      "start": "node app.js",
      "dev": "nodemon app.js",
      "test": "jest"
    }
  }
  ```
- **Run:** `npm run <script-name>`

</expand>

<expand title="Memory Management">
## Memory Management

### Garbage Collection:
- **V8 Garbage Collector:** Automatic memory management
- **Generational GC:** Young generation (new objects) and Old generation (long-lived objects)
- **Mark and Sweep:** Mark unreachable objects, sweep them
- **Memory Leaks:** Objects not garbage collected when they should be

### Common Memory Leaks:
- **Global Variables:** Variables attached to global object
- **Closures:** Holding references to large objects
- **Event Listeners:** Not removing listeners
- **Timers:** Not clearing setInterval/setTimeout
- **Caching:** Unbounded cache growth

### Monitoring:
- `process.memoryUsage()` - Check memory usage
- `--max-old-space-size` - Set max heap size
- Heap snapshots for debugging

</expand>

<expand title="CommonJS vs ES Modules">
## CommonJS vs ES Modules

### CommonJS (require/module.exports):
- **Synchronous loading**
- **Runtime resolution**
- **Example:**
  ```javascript
  // Export
  module.exports = { function };
  // Import
  const { function } = require('./module');
  ```
- **Characteristics:**
  - Dynamic imports
  - Can use require() conditionally
  - Default in Node.js

### ES Modules (import/export):
- **Asynchronous loading**
- **Static analysis**
- **Example:**
  ```javascript
  // Export
  export function myFunction() {}
  // Import
  import { myFunction } from './module.js';
  ```
- **Enable:** Use `"type": "module"` in package.json or `.mjs` extension
- **Characteristics:**
  - Tree-shaking support
  - Better for bundlers
  - Standard JavaScript

</expand>

<expand title="Debugging Techniques">
## Debugging Techniques

### Node Inspector:
- `node --inspect app.js` - Start with inspector
- `node --inspect-brk app.js` - Pause at start
- Chrome DevTools: `chrome://inspect`

### Console Methods:
- `console.log()` - Standard output
- `console.error()` - Error output
- `console.table()` - Tabular data
- `console.time()` / `console.timeEnd()` - Timing
- `console.trace()` - Stack trace

### Debugger Statement:
- `debugger;` - Breakpoint in code
- Works with Node Inspector

### Logging Libraries:
- **Winston:** Feature-rich logger
- **Pino:** Fast JSON logger
- **Morgan:** HTTP request logger

</expand>

<expand title="RESTful API Design">
## RESTful API Design

### Core Principles:
- **Stateless:** Each request contains all needed information, no server-side session state
- **Resource-based URLs:** Use nouns, not verbs (`/users`, `/users/:id`, not `/getUsers`)
- **Uniform Interface:** Consistent HTTP methods and status codes across all resources
- **Client-Server:** Separation of concerns, client and server evolve independently
- **Cacheable:** Responses should indicate if they're cacheable
- **Layered System:** Client doesn't know if connected to end server or intermediary

### HTTP Methods:
- **GET:** Retrieve resource (idempotent, safe, cacheable)
- **POST:** Create resource (not idempotent, not safe)
- **PUT:** Update/replace entire resource (idempotent, not safe)
- **PATCH:** Partial update (idempotent recommended, not safe)
- **DELETE:** Delete resource (idempotent, not safe)
- **HEAD:** Get headers only (idempotent, safe, cacheable)
- **OPTIONS:** Get allowed methods (idempotent, safe)

### HTTP Status Codes:
- **2xx Success:**
  - **200 OK:**
    - Successful GET request returning data
    - Successful PUT/PATCH request (resource updated)
    - Standard success response for most operations
    - Include response body with data
  - **201 Created:**
    - Successful POST request creating new resource
    - Include Location header with URL of created resource
    - Return created resource in response body
    - Example: User registration, order creation
  - **202 Accepted:**
    - Request accepted for async processing
    - Use when operation takes time (image processing, email sending)
    - Include job ID or status endpoint in response
    - Client should poll status endpoint
  - **204 No Content:**
    - Successful DELETE request (resource deleted)
    - Successful PUT/PATCH with no response body needed
    - No response body, only status code
    - Example: Delete user, update settings
- **3xx Redirection:**
  - **301 Moved Permanently:**
    - Resource permanently moved to new URL
    - Include Location header with new URL
    - Search engines update their index
    - Example: API version moved, domain change
  - **304 Not Modified:**
    - Resource not modified since last request (caching)
    - Client sent If-None-Match or If-Modified-Since headers
    - No response body, saves bandwidth
    - Example: Cached API response still valid
- **4xx Client Error:**
  - **400 Bad Request:**
    - Malformed request syntax (invalid JSON, missing required fields)
    - Invalid query parameters format
    - Request body parsing errors
    - Example: Invalid date format, malformed JSON, missing Content-Type
  - **401 Unauthorized:**
    - Missing or invalid authentication credentials
    - Token expired or invalid
    - No authentication token provided
    - Include WWW-Authenticate header
    - Example: Missing JWT token, expired session, invalid API key
  - **403 Forbidden:**
    - Authenticated but not authorized (permission denied)
    - User lacks required permissions/role
    - Resource exists but access denied
    - Example: User trying to access admin-only endpoint, insufficient permissions
  - **404 Not Found:**
    - Resource doesn't exist at specified URL
    - Invalid endpoint path
    - Resource was deleted
    - Example: User ID doesn't exist, invalid API endpoint
  - **409 Conflict:**
    - Resource conflict (duplicate, concurrent modification)
    - Email already registered, username taken
    - Optimistic locking conflict (ETag mismatch)
    - Example: Duplicate email registration, concurrent update conflict
  - **422 Unprocessable Entity:**
    - Valid request syntax but semantic validation failed
    - Business rule violations
    - Field validation errors (email format, required fields)
    - Include detailed validation errors in response
    - Example: Email format invalid, age must be 18+, password too weak
  - **429 Too Many Requests (Rate Limiting/Throttling):**
    - Rate limit exceeded (too many requests in time window)
    - Include Retry-After header (seconds to wait)
    - Include X-RateLimit-* headers (limit, remaining, reset)
    - Different limits: per IP, per user, per endpoint
    - Example: API rate limit exceeded, DDoS protection triggered, request throttling
  - **408 Request Timeout:**
    - Client didn't send complete request in time
    - Server waited too long for request
    - Example: Slow network, client timeout
  - **413 Payload Too Large:**
    - Request body exceeds size limit
    - File upload too large
    - Example: Image upload exceeds 10MB limit, request body too big
  - **415 Unsupported Media Type:**
    - Content-Type not supported
    - Example: Sending XML when API expects JSON, unsupported file format
  - **423 Locked:**
    - Resource is locked (cannot be modified)
    - Example: Resource locked by another process, maintenance mode
- **5xx Server Error:**
  - **500 Internal Server Error:**
    - Generic server error (unexpected condition)
    - Database connection failed, unhandled exception
    - Don't expose internal error details to client
    - Log detailed error server-side
    - Example: Database query failed, null pointer exception, server crash
  - **502 Bad Gateway:**
    - Server acting as gateway received invalid response from upstream
    - Upstream server returned invalid response
    - Example: API Gateway received error from microservice, proxy error
  - **503 Service Unavailable:**
    - Service temporarily unavailable (maintenance, overloaded)
    - Server cannot handle request (too busy)
    - Include Retry-After header if known downtime
    - Example: Server maintenance, high traffic overload, database unavailable
  - **504 Gateway Timeout:**
    - Gateway didn't receive timely response from upstream
    - Upstream server took too long to respond
    - Example: Microservice timeout, database query timeout, external API timeout
  - **507 Insufficient Storage:**
    - Server cannot store representation (disk full)
    - Example: File storage quota exceeded, database storage full

### URL Design Best Practices:
- Use nouns, not verbs (`/users` not `/getUsers`)
- Use plural nouns for collections (`/users` not `/user`)
- Use lowercase with hyphens (`/user-profiles` not `/userProfiles`)
- Avoid deep nesting (max 2-3 levels: `/users/:id/posts/:postId`)
- Use query parameters for filtering, not path parameters
- Keep URLs short and meaningful
- Use forward slashes for hierarchy (`/users/:id/posts`)

### Request Design:
- **Headers:**
  - `Content-Type`: Specify request body format (application/json)
  - `Accept`: Specify expected response format
  - `Authorization`: Bearer token or API key
  - `X-Request-ID`: Request tracking
- **Query Parameters:**
  - Pagination: `?page=1&limit=20` or `?offset=0&limit=20`
  - Filtering: `?status=active&role=admin`
  - Sorting: `?sort=created_at&order=desc`
  - Searching: `?search=keyword`
  - Field selection: `?fields=id,name,email`
- **Request Body:**
  - Use JSON for complex data
  - Validate all input
  - Include only necessary fields
  - Use consistent naming (camelCase or snake_case)

### Response Design:
- **Consistent Structure:**
  - Success: `{ data: {...}, message: "..." }`
  - Error: `{ error: {...}, message: "..." }`
  - List: `{ data: [...], pagination: {...} }`
- **Include Metadata:**
  - Pagination info (total, page, limit, hasMore)
  - Timestamps (created_at, updated_at)
  - Links (self, next, prev for pagination)
- **Field Selection:**
  - Support `?fields=id,name,email` to reduce payload
  - Default to all fields if not specified
- **Content Negotiation:**
  - Support JSON (default)
  - Support XML if needed
  - Use Accept header

### Error Handling:
- **Error Response Format:**
  - Consistent structure: `{ error: { code, message, details }, timestamp }`
  - Include error code for programmatic handling
  - Include human-readable message
  - Include validation errors in details array
- **Error Codes:**
  - Use specific error codes (e.g., `VALIDATION_ERROR`, `RESOURCE_NOT_FOUND`)
  - Map to appropriate HTTP status codes
- **Validation Errors:**
  - Return 422 for validation failures
  - Include field-level errors: `{ field: "email", message: "Invalid format" }`
- **Error Messages:**
  - Don't expose internal errors to clients
  - Log detailed errors server-side
  - Provide actionable error messages

### Security Best Practices:
- **Authentication:**
  - Use JWT tokens or OAuth 2.0
  - Store tokens securely (httpOnly cookies or secure storage)
  - Implement token expiration and refresh
  - Use HTTPS only in production
- **Authorization:**
  - Implement RBAC (Role-Based Access Control)
  - Check permissions on every request
  - Use middleware for route protection
  - Principle of least privilege
- **Input Validation:**
  - Validate all input (query params, body, headers)
  - Sanitize user input to prevent injection attacks
  - Use validation libraries (Joi, express-validator)
  - Whitelist allowed values, don't blacklist
- **Rate Limiting:**
  - Implement rate limiting per IP/user
  - Return 429 with Retry-After header
  - Different limits for different endpoints
  - Use Redis for distributed rate limiting
- **CORS:**
  - Configure CORS properly (allow specific origins)
  - Don't use wildcard (*) in production
  - Set appropriate headers (Access-Control-Allow-*)
- **Data Protection:**
  - Never expose sensitive data (passwords, tokens, keys)
  - Use environment variables for secrets
  - Encrypt sensitive data at rest and in transit
  - Implement data masking for logs
- **Headers Security:**
  - Use Helmet.js for security headers
  - Set X-Content-Type-Options: nosniff
  - Set X-Frame-Options: DENY
  - Set X-XSS-Protection: 1; mode=block
  - Set Strict-Transport-Security for HTTPS

### API Versioning:
- **URL Versioning:** `/api/v1/users`, `/api/v2/users` (most common)
- **Header Versioning:** `Accept: application/vnd.api+json;version=1`
- **Query Parameter:** `/api/users?version=1` (not recommended)
- **Best Practice:** URL versioning is clearest and most widely used
- **Version Strategy:**
  - Maintain backward compatibility when possible
  - Deprecate old versions with warning headers
  - Provide migration guides
  - Set sunset dates for deprecated versions

### Pagination:
- **Offset-based:** `?page=1&limit=20` (simple, allows jumping)
- **Cursor-based:** `?cursor=abc123&limit=20` (better for large datasets, consistent)
- **Response Format:**
  - Include: total count, current page, page size, hasMore
  - Include links: self, next, prev, first, last
- **Default Limits:** Set reasonable defaults (e.g., 20-50 items)
- **Max Limits:** Enforce maximum limit to prevent abuse

### Filtering, Sorting, Searching:
- **Filtering:** `?status=active&role=admin&created_after=2024-01-01`
- **Sorting:** `?sort=created_at&order=desc` or `?sort=-created_at`
- **Searching:** `?q=keyword` or `?search=keyword`
- **Range Queries:** `?price_min=10&price_max=100`
- **Multiple Filters:** Support AND logic, document OR logic if supported

### Caching:
- **Cache-Control Headers:**
  - `Cache-Control: public, max-age=3600` (cacheable, 1 hour)
  - `Cache-Control: private` (user-specific, don't cache)
  - `Cache-Control: no-cache` (revalidate before use)
  - `ETag` for conditional requests (304 Not Modified)
- **Cacheable Methods:** GET and HEAD are cacheable by default
- **Cache Invalidation:** Clear cache on POST/PUT/PATCH/DELETE
- **Vary Header:** `Vary: Accept, Accept-Language` (different cache per header)

### Documentation:
- **OpenAPI/Swagger:** Use for API documentation
- **Include:**
  - Endpoints with methods
  - Request/response schemas
  - Authentication requirements
  - Error responses
  - Examples
  - Rate limits
- **Keep Updated:** Documentation should match implementation
- **Interactive:** Provide try-it-out functionality

### Performance Optimization:
- **Compression:** Use gzip/brotli for responses
- **Field Selection:** Allow clients to request only needed fields
- **Pagination:** Always paginate large datasets
- **Database Optimization:** Use indexes, avoid N+1 queries
- **Caching:** Cache frequently accessed data
- **Connection Pooling:** Reuse database connections
- **Response Time:** Aim for <200ms for simple queries, <1s for complex

### Testing:
- **Unit Tests:** Test individual endpoints and functions
- **Integration Tests:** Test full request-response cycle
- **E2E Tests:** Test complete user flows
- **Test Cases:**
  - Success scenarios (200, 201)
  - Error scenarios (400, 401, 404, 500)
  - Validation errors (422)
  - Authentication/authorization (401, 403)
  - Edge cases (empty results, large datasets)

### Common Interview Points:
- **Idempotency:** PUT, PATCH, DELETE should be idempotent
- **Safe Methods:** GET, HEAD, OPTIONS don't modify resources
- **HATEOAS:** Hypermedia as the Engine of Application State (optional, advanced)
- **REST vs RPC:** REST is resource-oriented, RPC is action-oriented
- **REST vs GraphQL:** REST has multiple endpoints, GraphQL has single endpoint
- **When to use REST:** Standard CRUD operations, simple APIs, caching important
- **When not to use REST:** Real-time updates (use WebSockets), complex queries (consider GraphQL)

</expand>

<expand title="Authentication & Authorization">
## Authentication & Authorization

### Authentication Methods:
- **JWT (JSON Web Tokens):**
  - Stateless authentication
  - Token contains user info
  - Verify signature to validate
- **Session-based:**
  - Server stores session
  - Cookie contains session ID
  - Stateful
- **OAuth:** Third-party authentication
- **Basic Auth:** Username/password in headers

### Authorization:
- **RBAC:** Role-Based Access Control
- **Permissions:** Fine-grained access control
- **Middleware:** Protect routes

### Best Practices:
- Hash passwords (bcrypt)
- Use HTTPS
- Token expiration
- Refresh tokens
- Rate limiting

</expand>

<expand title="API Rate Limiting">
## API Rate Limiting

- **Purpose:** Prevent abuse, ensure fair usage
- **Strategies:**
  - **Fixed Window:** Requests per time window
  - **Sliding Window:** Rolling time window
  - **Token Bucket:** Tokens refill over time
- **Libraries:**
  - `express-rate-limit`
  - `rate-limiter-flexible`
- **Storage:** In-memory or Redis for distributed systems
- **Headers:** Return rate limit info in response headers

</expand>

<expand title="File Upload Handling">
## File Upload Handling

### Multer (Popular Library):
- Handles `multipart/form-data`
- File storage (disk, memory)
- File filtering, size limits
- Example:
  ```javascript
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });
  app.post('/upload', upload.single('file'), handler);
  ```

### Best Practices:
- Validate file types
- Limit file size
- Sanitize filenames
- Store securely
- Scan for viruses (production)

</expand>

<expand title="Caching Strategies">
## Caching Strategies

### Types:
- **In-Memory:** Fast, but lost on restart
- **Redis:** Distributed, persistent
- **CDN:** Static asset caching
- **Database Query Caching:** Cache query results

### Strategies:
- **Cache-Aside:** App checks cache, loads from DB if miss
- **Write-Through:** Write to cache and DB simultaneously
- **Write-Back:** Write to cache, sync to DB later
- **TTL:** Time-to-live for cache entries

### Use Cases:
- Frequently accessed data
- Expensive computations
- API responses
- Session data

</expand>

<expand title="Logging & Monitoring">
## Logging & Monitoring

### Logging Levels:
- **Error:** Errors that need attention
- **Warn:** Warning messages
- **Info:** Informational messages
- **Debug:** Debug information

### Best Practices:
- Structured logging (JSON)
- Include context (user ID, request ID)
- Don't log sensitive data
- Centralized logging (ELK, Splunk)
- Log rotation

### Monitoring:
- **APM Tools:** New Relic, DataDog, AppDynamics
- **Metrics:** Response time, error rate, throughput
- **Alerts:** Set up alerts for critical issues
- **Health Checks:** `/health` endpoint

</expand>

<expand title="Deployment & DevOps">
## Deployment & DevOps

### Process Managers:
- **PM2:** Popular Node.js process manager
  - Auto-restart on crash
  - Load balancing
  - Monitoring
- **Forever:** Simple process manager
- **Systemd:** Linux service manager

### Containerization:
- **Docker:** Containerize application
- **Docker Compose:** Multi-container setup
- **Kubernetes:** Container orchestration

### CI/CD:
- **GitHub Actions:** CI/CD pipelines
- **Jenkins:** Automation server
- **GitLab CI:** Integrated CI/CD

### Environment Setup:
- Development
- Staging
- Production
- Different configs for each

</expand>

## Secondary Concepts

