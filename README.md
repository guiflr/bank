# Guifler Bank

This repository contains a simple full-stack app with a NestJS backend, a Next.js frontend, and a Postgres database.

## Requirements

- Docker and Docker Compose

## Quick Start (Docker)

1. Build and start the stack:

```bash
docker compose up --build
```

2. Access the apps:

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- Postgres: localhost:5432
- Login: `username`:`admin` and `password`:`admin` 

The compose file will:

- Run database migrations
- Seed initial data
- Start the backend and frontend

## Stop the stack

```bash
docker compose down
```

## Environment notes

- The frontend uses `API_BASE_URL` to reach the backend in Docker (`http://backend:3000`).
- The backend uses `DATABASE_URL` to connect to Postgres.

## Optional: Run locally without Docker

If you prefer to run locally, start the services manually in separate terminals.

Backend:

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run start
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3001.
