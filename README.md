# Opata

Opata is a web application built with Next.js, React, and TypeScript. It follows best practices for modern web development, including dependency injection, environment variable management, and comprehensive test coverage.

## Features

- **Next.js**: Utilizes the powerful features of Next.js for server-side rendering and static site generation.
- **React**: Built with React for a dynamic and responsive user interface.
- **TypeScript**: Ensures type safety and code quality.
- **Dependency Injection**: Uses `tsyringe` for dependency injection.
- **Validation**: Implements schema validation with `zod`.
- **Testing**: Comprehensive test coverage using `vitest` and `@testing-library/react`.
- **CI/CD**: Automated workflows with GitHub Actions for testing, building, and deploying the application.
- **Deployment**: Deployed on Vercel for both preview and production environments.

## Getting Started

### Prerequisites

- Node.js (version specified in `.tool-versions`)
- npm

### Installation

#### Clone the repository

```sh
git clone https://github.com/yourusername/opata.git
cd opata
```

#### Install dependencies

```bash
npm i
```

#### Set up environment variables

Copy .env.example to .env.development and fill in the required values.

#### Running the Application

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

Lint:

```bash
npm run lint
```

Test:

```bash
npm test
```

Coverage:

```bash
npm run coverage
```

#### Task Management

Task management for this project is handled through the [TODO.md](TODO.md) file. This file contains a list of tasks, their statuses, and any relevant notes. Please refer to this file for an overview of ongoing and completed tasks.

#### Deployment

The application is deployed using Vercel. The deployment process is automated with GitHub Actions, which runs tests, builds the project, and deploys it to the specified environment.

#### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

#### License

This project is licensed under the MIT License.
