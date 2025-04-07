FROM node:22-alpine AS node-image


# development stage

FROM node-image AS base
RUN yarn global add bun

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install

FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD [ "bun","run", "start:dev" ]


# production stage

FROM base AS deps-prod
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --no-save --production

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM node-image AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=deps-prod /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]
