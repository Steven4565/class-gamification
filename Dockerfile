FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
COPY pnpm-lock.yaml .
RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile

COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate 

RUN pnpm run build
RUN pnpm prune --prod

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
COPY start.sh .
EXPOSE 3000

COPY prisma/ ./prisma/

CMD npx --no-install prisma db push && npm run db:seed && node build 