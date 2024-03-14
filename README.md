# Sir Andry Chow's Levelling System

# Prerequisites

Please install the following before starting the dev server:

- Node.js
- pnpm
- Docker (you need to enable virtualization first)

# Starting the dev server for the first time

- Run `pnpm install` to install all dependencies
- Run `docker compose up -d` to start the database
- Run `npx prisma generate` to generate the prisma client
- Run `pnpm db:push` to push changes to the database
- Run `pnpm db:seed` to seed the database
- Run `pnpm dev` to start the development server

# Dev Database Commands

Run `pnpm db:start` to start the database
Run `pnpm db:migrate` every time the schema is updated to update the intellisense
Run `pnpm db:stop` to stop the database
Run `pnpm db:seed` to reset and seed the database
Run `pnpm db:reset` to reset the database
Run `pnpm db:push` to push changes to the database

# Workflows

## Starting the dev server

- `pnpm db:start`

## Clearing the database entries

- `pnpm db:reset`

## Changing `seed.ts`

- `pnpm db:seed`

## Changing `schema.prisma`

- `pnpm db:migrate`
