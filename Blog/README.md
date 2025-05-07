# Blog Platform

A modern blog platform built with a Fastify backend API and Next.js frontend.

## Project Structure

- `backend-blog/` - Fastify + tRPC API server
- `frontendblog/` - Next.js frontend application

## Setup and Run

### Quick Start

Use the start script to run both services:

```bash
./start-services.sh
```

This will:
1. Start the backend on port 3000
2. Start the frontend on port 3001

### Backend

```bash
cd backend-blog

# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Run database migrations and seed
pnpm db:push
pnpm db:seed

# Run the backend server
pnpm dev
```

The backend server will run on http://localhost:3000

### Frontend

```bash
cd frontendblog

# Install dependencies
pnpm install

# Create .env.local with required settings
echo "NEXT_PUBLIC_API_URL=http://localhost:3000\nPORT=3001" > .env.local

# Run the frontend development server
pnpm dev
```

The frontend will run on http://localhost:3001

## Features

- Backend API built with Fastify and tRPC
- Server-side rendered frontend with Next.js
- Full-text search
- Admin dashboard
- Markdown/MDX support
- Integration with third-party services

## Integration

The frontend communicates with the backend using tRPC over HTTP. The backend runs on port 3000, and the frontend runs on port 3001 to avoid port conflicts.

## tRPC Integration Details

The frontend connects to the backend API using tRPC, providing type-safe API calls:

1. **Server-Side Requests**: 
   - Uses `server-client.ts` with `createTRPCProxyClient` to call the backend API directly
   - Alternatively uses `server.ts` with a mock router for local development

2. **Client-Side Requests**: 
   - Uses the tRPC React Query provider with superjson transformer

## Troubleshooting

### Common Issues

1. **Unable to transform response from server**:
   - Make sure both frontend and backend are using the same transformer (superjson)
   - Check that the backend API is running and accessible

2. **appRouter is not exported from '@/lib/trpc/routers'**:
   - The frontend only imports the type definition from the backend
   - For server-side use, it should use createTRPCProxyClient from server-client.ts

3. **Cannot read properties of undefined (reading 'createCaller')**:
   - The server.ts file is trying to use appRouter.createCaller but there is no router object
   - Either use mock-router.ts or switch to server-client.ts approach

### Environment Configuration

The frontend expects these environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
PORT=3001
```

## Development Notes

- Run both services simultaneously during development
- The frontend expects the backend to be available at http://localhost:3000