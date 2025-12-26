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

Primary Concepts

</expand>

<expand title="General Points">
## General Points

- Node 6 and 7 are no longer supported
- Although nodejs is a single threaded but chrome or V8 is a multi-threaded.
- window = in browsers, global = in nodejs
- JS puts following tasks on a separate thread by itself using LibUV library (they are expensive even in async on single thread):
  - file reading
  - Encryption/Decryption (like using Crypto)
  - Compressions of media (like Zipping)
  - Resolving DNS
  - Hashing

</expand>

<expand title="Crypto">
## Crypto

- js crypto module provides cryptographic functions to help you secure your Node.js app.
- It includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
- crypto is built into Node.
- For hashed data, a password cannot be decrypted with a predetermined key, unlike encrypted data.
- It allows access to a cryptographically strong random number generator and to cryptographic primitives.
- crypto property, which is a Crypto object.

</expand>

<expand title="createhmac vs createhash">
## createhmac vs createhash

- 
- 
- 

</expand>

<expand title="Concurrency model in nodeJS">
## Concurrency model in nodeJS

- Async behavior
- Concurrency means that a program is able to run more than one task at a time — this is not to be confused with parallelism.

</expand>

<expand title="JS puts following tasks on a separate thread by itself using LibUV library (they are expensive even in async on single thread)">
## JS puts following tasks on a separate thread by itself using LibUV library (they are expensive even in async on single thread)

- File reading/writing

- Crypto (async versions only)

- Compression (zlib)

- DNS lookup

- Some system I/O (not networking)

Tasks Node.js does NOT offload automatically:

- CPU-intensive JS code

- Networking (HTTP/TCP/UDP)

- Package imports

- Crypto sync functions

NOTE: Networking operations always run on the main thread except for the DNS

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

- Core Modules:
  - The core modules include bare minimum functionalities of Node.js.
  - These core modules are compiled into its binary distribution and load automatically when Node.js process starts.
  - However, you need to import the core module first in order to use it in your application.
  - Types:
  - http, url, querystring, path, fs, util.
  - Loading Core Modules:
  - Example: var http = require('http');
- Local Modules:
  - These modules include different functionalities of your application in separate files and folders.
  - Loading of Local Modules:
  - Example: var myLogModule = require('./Log.js');
- Third Party Modules:
  - 
- 

</expand>

<expand title="Node Inspector">
## Node Inspector

- 
- 

</expand>

<expand title="Event Emitter">
## Event Emitter

- 
- 
- 

</expand>

<expand title="Profiling in nodeJS">
## Profiling in nodeJS

- 

</expand>

<expand title="Profilers in nodeJS">
## Profilers in nodeJS

- This monitor watches our code as it runs and makes notes on how to optimize it.
- Example: It records how many times it is being run.
- By using this Profiler to see how code is being run in the interpreter, if the same lines of code are run a few times, it passes this code off to the JIT Compiler for optimizations.
- The Compiler will then replace sections that can be improved of the byte code with optimized machine code so that optimized machine code is used from that point on instead of the slower byte code.

</expand>

<expand title="NPM vs Yarn">
## NPM vs Yarn

- 
- 

</expand>

<expand title=""D" flag">
## "D" flag

- 
- 
- Example:
  - npm i -D nodemon

Secondary Concepts

Outline:

1. Architecture:

- General Points:
  - Server.js (server) runs directly on OS (not Libuv) using node apis (like bodyParser, etc).
  - Request Flow from top to bottom(nested): OS => Server => V8 => LibUV,EventLoop, CallStack, etc.
- V8 Engine:
  - Convert code to C++
- Libuv:
  - Communication with CPU/OS
  - Manage blocking events like:
  - File reading
  - db fetch
  - network calls
  - Timers
  - It has 4 threads as default. We can upgrade it as well using UV_THREADPOOL_SIZE env variable. cannot exceed to the no of logical cores
  - Architecture:
  - 
  - 
- Event Loop:
  - Execution Priorities of Queues with Sequence in NODE JS:

1. Events (.on) // stays in callstacks not in any queue

2. Stack => Next Tick - checks/execute after every queue switch

3. Micro Tasks Queue - Promises, CBs,

4. Stack => Next Tick - checks/execute after every queue switch

5. Macro Task Queue - Timers (setTimeOut, setInterval)

6. Stack => Next Tick - checks/execute after every queue switch

7. Pending CallBacks - I/O Queue - (pending connections, etc)

8. Stack => Next Tick - checks/execute after every queue switch

9. Immediate Queue - Check Queue - setImmediate

10. Stack => Next Tick - checks/execute after every queue switch

- SB queue
- Event Emitters
- Modules
- NPM
- Single-threaded event loop
- Buffer
- HTTP Module
- C++ Addons

2. Async Programming

3. File System:

- Operations:
  - Open
  - Close
  - Read
  - Create
  - Delete
  - Stats checking
  - Access modification
  - Writing
  - Read&Write
  - Copy & Paste

4. Event Emitter

5. HTTPs & Web Server

6. Streams and Buffer:

- Events (system, custom):
  - singleton
  - streams, LibUV, sockets, etc based on events. This is why node Js has an event-driven architecture.
- Streams:
  - Fundamental concept.
  - They are data-handling method and are used to read or write input into output sequentially.
  - Streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.
  - It is hard to work with it, and even harder to understand, but has bulk of advantages over it.
  - Technical Usage: when working with large amounts of data, for example, a file size can be larger than your free memory

space, making it impossible to read the whole file into the memory in order to process it. That's where streams come to

the rescue!

7. Child Process (exec, fork, spawn, std.io) and Worker Thread and Clusters

8. Puny Code

9. REPL

10. V8, ZLib, TTY, etc

11. Crypto + Multer + Path + Global

12. Sockets

13. Hardwares and Memory Management (OS, Memory, etc).

---------------------------------------------   Reference ---------------------------------------------

https://rabisiddique.medium.com/maximizing-node-js-performance-with-thread-pools-912bacbe529a#:~:text=By%20default%2C%20libuv%20uses%20a,the%20requirements%20of%20your%20application

</expand>

