FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY app ./app
COPY public ./public
COPY components ./components
COPY lib ./lib
COPY next.config.ts .
COPY prisma ./prisma
COPY components.json .
COPY tailwind.config.ts .
COPY tsconfig.json .
COPY postcss.config.mjs .
COPY auth.ts .
COPY middleware.ts .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG POSTGRES_DB_URL
ENV POSTGRES_DB_URL=${POSTGRES_DB_URL}

# Authentication environment variables
ARG AUTH_GITHUB_ID
ENV AUTH_GITHUB_ID=${AUTH_GITHUB_ID}
ARG AUTH_GITHUB_SECRET
ENV AUTH_GITHUB_SECRET=${AUTH_GITHUB_SECRET}

ARG AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID}
ARG AUTH_GOOGLE_SECRET
ENV AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET}

# Other environment variables
ARG BASIC_AUTH_USER
ENV BASIC_AUTH_USER=${BASIC_AUTH_USER}
ARG BASIC_AUTH_PASSWORD
ENV BASIC_AUTH_PASSWORD=${BASIC_AUTH_PASSWORD}


# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else npm run build; \
    fi

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

RUN apk --no-cache add curl

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG BASIC_AUTH_USER
ENV BASIC_AUTH_USER=${BASIC_AUTH_USER}
ARG BASIC_AUTH_PASSWORD
ENV BASIC_AUTH_PASSWORD=${BASIC_AUTH_PASSWORD}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME=0.0.0.0 node server.js