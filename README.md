# Sir Andry Chow's Levelling System

## Prerequisites

Please install the following before starting the dev server:

- Node.js
- pnpm
- Docker

## Starting the dev server for the first time

- Run `pnpm install` to install all dependencies
- Run `docker compose up -d` to start the database
- Run `npx prisma generate` to generate the prisma client
- Run `pnpm db:migrate` to migrate the database
- Run `pnpm run dev` to start the development server

## Dev Database

Run `pnpm db:start` to start the database
Run `pnpm db:migrate` every time the schema is updated to update the intellisense
Run `pnpm db:stop` to stop the database
Run `pnpm db:seed` to seed the database
Run `pnpm db:reset` to reset the database
