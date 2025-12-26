# DevOps

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- Docker 1.0 - 2014
- Docker 1.12 - 2016 (Swarm mode)
- Docker 17.03 - 2017 (CE/EE split)
- Docker 17.06 - 2017
- Docker 18.09 - 2018
- Docker 19.03 - 2019
- Docker 20.10 - 2020
- Docker 23.0 - 2023
- Docker 24.0 - 2024

Primary Concepts

</expand>

<expand title="Docker Overview">
## Docker Overview

- A program may cause issues on production even if it is working fine on local server
- Same environment in dev, test and prod
- Does not use guest OS, uses host OS
- Applications run in containers
- Architecture: Host OS => Docker Engine => Containers (with applications)

</expand>

<expand title="Workflow">
## Workflow

  - Docker File => Docker Images -> Docker Container => Docker Hub (public/private repo) => Staging/Production server images -> Containers
  - Docker File => Git Repo => Jenkins Server -> deployed on Testing, prod, dev env

- Docker File: Instructions to build Docker images

</expand>

<expand title="Docker Images">
## Docker Images

- Read-only templates used to create containers
- Built by Docker users
- Standalone, executable package including application code, runtime, system libraries, and dependencies
- Stored in Docker Hub or local repository
- Used to create and run containers - isolated environments that run consistently across platforms
- Usually one image per project, but multiple images for:
  - Microservices Architecture
  - Different Environments (dev, staging, prod)
  - Versioning or Staging

</expand>

<expand title="Docker Containers">
## Docker Containers

- Runtime instances of Docker images
- More than one image may be required to create a Docker container

</expand>

<expand title="Docker Registry">
## Docker Registry

- Storage component for Docker images
- Each storage component contains images of a single micro-service
- Docker Hub: Cloud repository (can be private or public)

</expand>

<expand title="Architecture Layers">
## Architecture Layers

- 1st layer (Lowest): Host machine
- 2nd layer: VM (Virtual Machine)
- 3rd layer: Docker containers
- Note: Docker is used above VM because containers are lightweight alternatives to VMs

</expand>

<expand title="Microservices Architecture">
## Microservices Architecture

- Small processes that communicate with each other over a network to fulfill one goal
- Example - Online Shop microservices:
  - user-accounts => Account service => Account DB
  - product-catalog => Product catalog => Product DB
  - order-processing => Cart service => Cart DB
  - shopping carts => Order service => Order DB
- Advantages:
  - Easier to maintain
  - Easily update a module or module stack
  - If any service goes down, rest of project remains unaffected
- Disadvantages:
  - Resource wastage due to virtual machines (RAM, etc.)

Secondary Concepts

</expand>

<expand title="Microservices Communication">
## Microservices Communication

- HTTP
- AMQP (Advanced Message Queuing Protocol) - RabbitMQ, Kafka
- gRPC (Google Remote Procedure Call)

</expand>

