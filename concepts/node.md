# NodeJS

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

### Child Process:
- **Purpose:** Spawn new Node.js processes
- **Methods:**
  - **exec():** Execute shell command, buffers output
    ```javascript
    const { exec } = require('child_process');
    exec('ls -la', (error, stdout, stderr) => {});
    ```
  - **spawn():** Spawn new process, streams I/O
    ```javascript
    const { spawn } = require('child_process');
    const ls = spawn('ls', ['-la']);
    ```
  - **fork():** Special spawn for Node.js scripts, enables IPC
    ```javascript
    const { fork } = require('child_process');
    const child = fork('script.js');
    ```
  - **execFile():** Execute file directly, more secure than exec

### Worker Threads:
- **Purpose:** Run JavaScript in parallel (true parallelism)
- **Use Case:** CPU-intensive tasks
- **Example:**
  ```javascript
  const { Worker } = require('worker_threads');
  const worker = new Worker('./worker.js');
  ```
- **Benefits:**
  - Share memory via SharedArrayBuffer
  - True parallelism (multiple CPU cores)
  - Better than child_process for CPU tasks

### Clusters:
- **Purpose:** Create multiple Node.js processes sharing server ports
- **Use Case:** Scale application across CPU cores
- **Example:**
  ```javascript
  const cluster = require('cluster');
  if (cluster.isPrimary) {  // Note: cluster.isMaster is deprecated, use isPrimary
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    // Worker process
    http.createServer(app).listen(3000);
  }
  ```
- **Benefits:**
  - Better utilization of multi-core systems
  - Process isolation (one crash doesn't affect others)
  - Load distribution

### Comparison:
- **Child Process:** Separate processes, IPC via messages
- **Worker Threads:** Same process, shared memory, true parallelism
- **Clusters:** Multiple Node.js instances, load balancing

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
- **Example:**
  ```javascript
  const io = require('socket.io')(server);
  io.on('connection', (socket) => {
    socket.emit('message', 'Hello');
    socket.on('chat', (data) => {});
  });
  ```

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

### Principles:
- **Stateless:** Each request contains all needed information
- **Resource-based URLs:** `/users`, `/users/:id`
- **HTTP Methods:**
  - GET: Retrieve resource
  - POST: Create resource
  - PUT: Update entire resource
  - PATCH: Partial update
  - DELETE: Delete resource
- **Status Codes:**
  - 200: Success
  - 201: Created
  - 400: Bad Request
  - 401: Unauthorized
  - 404: Not Found
  - 500: Server Error

### Best Practices:
- Use nouns, not verbs in URLs
- Version APIs (`/api/v1/users`)
- Pagination for large datasets
- Filtering, sorting, searching
- Proper error responses

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

