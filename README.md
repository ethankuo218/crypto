# Crypto News Dashboard

A full-stack application that displays cryptocurrency-related news and articles, featuring real-time updates and a responsive user interface.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `api`: An Express.js application serving as the backend. It scrapes articles from LookOnChain, provides SSE for real-time updates, and offers paginated article fetching.
- `web`: A Next.js application for the frontend. It displays news announcements, allows users to view full articles in a dialog, and features a responsive design with Tailwind CSS.
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo.
- `@repo/ui`: (If still applicable, otherwise remove or update - e.g., "Shared React components used across the frontend.")

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Key Features

- **Real-time Announcements:** Latest article titles are streamed to the frontend via Server-Sent Events (SSE) and displayed in an animated announcement bar.
- **Article Viewing:**
  - Clickable announcements navigate to an article view.
  - An "Articles" dialog allows browsing paginated recent articles.
  - Article content is displayed within the dialog.
- **Interactive UI:**
  - Fixed header for easy navigation.
  - Animated announcement bar for new updates.
  - Smooth loading states with minimum display times for spinners.
- **Backend API:**
  - Scrapes articles from LookOnChain.
  - Endpoints for streaming articles, fetching by ID, and paginated article lists.
  - Centralized Axios instance and error handling.

### Tech Stack

- **Monorepo:** Turborepo
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Font Awesome
- **Backend:** Node.js, Express.js, TypeScript, Axios
- **Linting/Formatting:** ESLint, Prettier

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- pnpm (or your preferred package manager)

### Installation

1.  Clone the repository:
    ```sh
    git clone <your-repo-url>
    cd <your-repo-name>
    ```
2.  Install dependencies from the root of the monorepo:
    ```sh
    pnpm install
    ```
3.  (Optional) Set up any necessary environment variables. Create a `.env` file in the root of the `apps/api` and/or `apps/web` directories if needed, based on `.env.example` files (if provided).

### Build

To build all apps and packages, run the following command from the root of the monorepo:

```sh
pnpm build
```

### Develop

To develop all apps and packages (API and web concurrently), run the following command from the root of the monorepo:

```sh
pnpm dev
```

This will typically start:

- The API server (e.g., on `http://localhost:3001`)
- The Web application (e.g., on `http://localhost:3000`)

Check the terminal output for the exact ports.

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/). Pushing to the main branch on GitHub (once connected to Vercel) should trigger automatic deployments.

## Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands from the root of your monorepo:

```sh
npx turbo login
npx turbo link
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview) and link your project.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
