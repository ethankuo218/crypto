# Crypto Project

A monorepo containing a web application and API service for cryptocurrency-related functionality.

## Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/). The project consists of:

- `apps/web`: Web application
- `apps/api`: Backend API service

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
pnpm -- filter api dev
```

## Development

This project uses:

- TypeScript for type safety
- Turborepo for monorepo management
- pnpm for package management
- Prettier for code formatting

## License
