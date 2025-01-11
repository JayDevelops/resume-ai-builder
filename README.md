# Resume AI Builder

## Overview

This application is built using Next.js with Turbopack for development. It supports both local development and production builds. Below are detailed instructions for setting up, building, and running the application.

---

## Prerequisites

- Docker installed ([Download Docker](https://www.docker.com/products/docker-desktop/))
- Node.js version 18+ installed ([Download Node.js](https://nodejs.org/))
- Yarn, npm, or pnpm for package management
- Git (optional but recommended)

---

## Development Setup (Local Use)

Follow these steps to run the application locally for development purposes:

### Step 1: Clone the Repository

```bash
$ git clone <repository-url>
$ cd <repository-folder>
```

### Step 2: Install Dependencies

Install dependencies using your preferred package manager:

```bash
# Using npm
$ npm install

# OR using Yarn
$ yarn install

# OR using pnpm
$ pnpm install
```

### Step 3: Start the Development Server

Run the development server with the following command:

```bash
$ npm run dev
# OR
$ yarn dev
# OR
$ pnpm dev
```

This will start the server on [http://localhost:3000](http://localhost:3000).

The application will watch for changes and automatically reload.

---

## Building for Production

To create a production-ready build of the application:

### Step 1: Build the Application

Run the following command to generate the optimized production build:

```bash
$ npm run build
# OR
$ yarn build
# OR
$ pnpm build
```

This will create a `.next` folder containing the optimized production files.

### Step 2: Run the Production Server

After building the application, you can start the production server with:

```bash
$ npm start
# OR
$ yarn start
# OR
$ pnpm start
```

The production server will be available at [http://localhost:3000](http://localhost:3000).

---

### Step 3: Environment Variables Pre-Requisites

Make sure to configure environment variables in `.env.local` or `.env` files. Example:

```env
AUTH_SECRET="" # Added by `npx auth`. Read more: https://cli.authjs.dev

### ENTER YOUR OWN PROVIDERS THAT YOU HAVE SET UP WITH AUTH.JS
# More information can be found by going to the Auth.js Documentation
# https://authjs.dev/getting-started/authentication/oauth

# GitHub auth sign in
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Google auth sign in
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# Postgres Environment Variables
POSTGRES_DB_URL="data_base_url"
```

---

## Running with Docker

You can run the application using Docker for both local development and production:

### Development Mode (Hot Reload Enabled)

1. Build the Docker image for development:
   ```bash
   $ docker build -t resume-ai-builder-app -f Dockerfile.dev .
   ```
2. Run the Docker container in development mode:

   ```bash
   $ docker run -p 3000:3000 -v $(pwd):/app resume-ai-builder-app
   ```

Alternatively, the `docker-compose.yml` includes the specified development docker file. You can simply run the following command below to get started right away.

```bash
$ docker-compose up --build
```

The application will watch for file changes and reload automatically.

### Production Mode

1. Build the Docker image for production, on the server you wish:
   ```bash
   $ docker build -t resume-ai-builder-app .
   ```
2. Run the Docker container in production mode:

   ```bash
   $ docker run -p 3000:3000 resume-ai-builder-app
   ```

   The application will serve the optimized production build.

---

## Notes

- For faster builds in development, ensure volume mounting (`-v $(pwd):/app`) is enabled when running Docker.
- For production, consider using a multi-stage Docker build to optimize image size.
- To disable Next.js telemetry, set `NEXT_TELEMETRY_DISABLED=1` in your environment.

---

## Troubleshooting

### Common Issues:

1. **Port Conflict:** If port `3000` is already in use, specify a different port using:

   ```bash
   $ docker run -p 4000:3000 resume-ai-builder-app
   ```

   Access the application at [http://localhost:4000](http://localhost:4000).

2. **Permission Issues:** Ensure Docker and Node.js have proper permissions on your system.

For further assistance, consult the official [Next.js documentation](https://nextjs.org/docs) or raise an issue in the repository.
