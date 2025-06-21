<img src="./assets/logo.png" id="start" align="right" alt="Project logo" width="50" >

# LinkBlink

> LinkBlink

- Fullstack project for link management and analytics.

[![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
[![Redis](https://img.shields.io/badge/Redis-DC382D.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![BullMQ](https://img.shields.io/badge/BullMQ-FFD700.svg?style=for-the-badge&logo=bullmq&logoColor=black)](https://docs.bullmq.io/)
[![Husky](https://img.shields.io/badge/Husky-5D3A00?style=for-the-badge&logo=git&logoColor=white)](https://typicode.github.io/husky/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)

---

[Description](#description) •
[Project setup](#project-setup) •
[Features](#features) •
[How To Use](#how-to-use) •
[Project Status](#project-status) •
[Room for Improvement](#room-for-improvement) •
[License](#license) •
[Contact](#contact)

## Description

LinkBlink is a fullstack project for managing and analyzing links. It provides features for link shortening, redirection, and analytics.

The project utilizes modern web technologies and follows best practices for code quality and maintainability. It follows the principles of Domain-Driven Design (DDD) to ensure a clean and maintainable architecture.

### Technologies:

> - **Node.js** and **NestJS** for server and routing
> - **TypeScript** for type safety and modern JS features
> - **PostgreSQL** with **TypeORM** for relational database management
> - **Redis** for caching and session management
> - **BullMQ** for message queue management
> - **Husky**, **ESLint**, **Prettier**, **Commitlint** for code quality and git hooks

### Architectural Patterns:

> - **Domain-Driven Design (DDD)**: Ensures a clear separation of concerns and a focus on the core domain logic.
> - **Repository Pattern**: Abstracts data access logic and provides a clean API for interacting with the database.
> - **Service Layer**: Contains business logic and coordinates between repositories and controllers.
> - **Controller Layer**: Handles HTTP requests and responses, delegating work to the service layer.
> - **Caching**: Utilizes Redis for caching frequently accessed data, reducing the load on the database and improving performance.
> - **Message Queue**: Utilizes BullMQ for message queue management and handling background tasks.

## Project setup

- Clone this repo to your desktop and run `npm install` to install all the dependencies.
- Create your .env file with required variables:

```
Application environment
NODE_ENV=              # Application environment (e.g., development, production)
API_PORT=              # Server port (e.g., 4000)
API_URL=               # API base URL

Database configuration
TYPEORM_CONNECTION=    # Database type (e.g., postgres)
DATABASE_HOST=         # Database host (e.g., localhost)
DATABASE_PORT=         # Database port (e.g., 5432)
DATABASE_USER=         # Database username
DATABASE_PASSWORD=     # Database password
DATABASE_NAME=         # Database name

# Cash (Redis) configuration
REDIS_URL=       # Redis connection URL
CACHE_TYPE=      # Cache type (e.g., redis, nest)
CACHE_TTL=       # Cache TTL (e.g., 24 hours)
```

- Once the dependencies are installed, you can run `npm run dev` to start the application.
- Enjoy.

### Project structure

```shell
.
├── commitlint.config.ts                    # Configuration for commitlint
├── dev-config                              # Development Docker configuration files
├── .env                                    # Environment variables for the project
├── eslint.config.mjs                       # ESLint configuration
├── .github                                 # GitHub-specific files and assets
│   ├── assets                              # Images and icons for documentation
│   ├── erd.dbml                            # Entity-Relationship Diagram file
│   └── README.md                           # Project documentation
├── .gitignore                              # Git ignore file
├── .husky                                  # Git hooks for linting and commit checks
│   ├── commit-msg                          # Hook for commit message linting
│   ├── pre-commit                          # Pre-commit hooks (lint, format)
│   └── pre-push                            # Pre-push hooks
├── LICENSE.md                              # Project license
├── package.json                            # Project metadata, scripts, dependencies
├── package-lock.json                       # Exact dependency versions
├── .prettierrc.json                        # Prettier code style configuration
├── client                                  # Frontend part of the project
│   ├── src                                 # Source code for the client application
│   ├── public                              # Public assets and static files
│   ├── package.json                        # Project metadata, scripts, dependencies
│   ├── package-lock.json                   # Exact dependency versions
│   └── tsconfig.json                       # TypeScript configuration
└── server                                  # Backend part of the project
    ├── eslint.config.mjs                   # ESLint configuration for the server
    ├── .gitignore                          # Git ignore file for the server
    ├── nest-cli.json                       # NestJS CLI configuration
    ├── package.json                        # Project metadata, scripts, dependencies for the server
    ├── package-lock.json                   # Exact dependency versions for the server
    ├── .prettierrc                         # Prettier code style configuration for the server
    ├── README.md                           # Project documentation
    ├── src                                 # Application source code
    │   ├── app.module.ts                   # Main application module
    │   ├── main.ts                         # Application entry point
    │   ├── common                          # Shared utilities and constants
    │   │   ├── cache                       # Cache configuration and service
    │   │   ├── queue                       # Queue configuration and service
    │   │   ├── decorators                  # Custom decorators
    │   │   └── interfaces                  # Shared interfaces
    │   ├── configs                         # Configuration files
    │   ├── database                        # Database module and configuration
    │   │   ├── database.module.ts
    │   │   └── migrations                  # Database migrations
    │   ├── env                             # Environment variables schema and service
    │   │   ├── env.module.ts               # Module for environment variables
    │   │   ├── env.service.ts              # Service for interacting with environment variables
    │   │   └── env.ts                      # Schema for environment variables
    │   ├── links                           # Link management modules
    │   │   ├── application                 # Application services and commands (Service Layer)
    │   │   │   ├── commands                # Commands for executing business logic
    │   │   │   ├── exception               # Domain-specific exceptions
    │   │   │   ├── ports                   # Interfaces for interacting with repositories
    │   │   │   ├── utils                   # Domain-specific utilities
    │   │   │   └── links.service.ts        # Main service for managing links
    │   │   ├── domain                      # Domain models and factories (Domain Layer)
    │   │   │   ├── factories               # Factories for creating domain objects
    │   │   │   ├── link-click.ts           # Model for link clicks
    │   │   │   └── link.ts                 # Model for links
    │   │   ├── infrastructure              # Infrastructure layer (Repository Pattern)
    │   │   │   └── persistence             # Persistence layer
    │   │   │       ├── exception           # Infrastructure-specific exceptions
    │   │   │       ├── in-memory           # In-memory repositories (for testing)
    │   │   │       ├── mappers             # Mappers for data transformation
    │   │   │       └── orm                 # ORM repositories
    │   │   └── presenters                  # API controllers and DTOs (Controller Layer)
    │   │       └── http
    │   │           ├── decorators          # API-specific decorators
    │   │           ├── dto                 # Data Transfer Objects (DTOs)
    │   │           └── links.controller.ts # Main controller for managing links
    ├── test                                # Test files
    ├── tsconfig.build.json                 # TypeScript build configuration
    ├── tsconfig.json                       # TypeScript configuration
    └── typeOrm.config.ts                   # TypeORM configuration
```

## Features

- Link creation with optional alias
- Link redirection with analytics tracking
- View link analytics and information
- Data validation and error handling
- Caching using Redis
- Queueing using BullMQ
- Code quality enforced by ESLint, Prettier, Husky, and Commitlint

## Project Status

### _The project is under active development._

## Room for Improvement

To do:

- [ ] Add API rate limiting and brute-force protection
- [ ] ...

Improvement:

- [ ] Develop frontend client application
- [ ] Implement advanced analytics features
- [ ] Write unit and integration tests
- [ ] ...

## License

This project is open source and available under the [BSD 3-Clause](../LICENSE.md).

## Contact

Created by [@RimidalU](https://www.linkedin.com/in/uladzimir-stankevich/) - feel free to contact me!

<p align="right"><a href="#start"><img width="45rem" src="./assets/pageUp.svg"></a></p>
