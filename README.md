# Crypto Project

A monorepo containing a web application and API service for cryptocurrency-related functionality.

## Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/). The project consists of:

- `apps/web`: Web application
- `apps/api`: Backend API service

## Demo

A live demo of the application is available at: [https://crypto-web-vert-kappa.vercel.app/](https://crypto-web-vert-kappa.vercel.app/)

## Prerequisites

- Node.js >= 18
- pnpm >= 10.11.0

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start the development environment:

```bash
pnpm --filter web dev
pnpm --filter api dev
```

## Available Scripts

- `pnpm build` - Build all applications
- `pnpm dev` - Start development servers
- `pnpm lint` - Run linting
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking

## Development

This project uses:

- TypeScript for type safety
- Turborepo for monorepo management
- pnpm for package management
- Prettier for code formatting

## License
