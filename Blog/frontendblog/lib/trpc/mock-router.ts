import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { z } from "zod"

// This creates a mock tRPC router that mirrors the backend's structure
// It's used for the frontend's API route handler

const t = initTRPC.create({
  transformer: superjson
})

// Create empty procedures with mock implementations
// These are just placeholders for the router structure, the actual implementation
// is handled by the backend

export const appRouter = t.router({
  health: t.router({
    check: t.procedure
      .query(() => ({ status: 'ok', timestamp: Date.now() }))
  }),
  auth: t.router({
    login: t.procedure
      .input(z.object({ email: z.string(), password: z.string() }))
      .mutation(() => ({ status: 'redirect to backend' })),
    register: t.procedure
      .input(z.object({ email: z.string(), password: z.string(), name: z.string() }))
      .mutation(() => ({ status: 'redirect to backend' })),
    me: t.procedure
      .query(() => ({ status: 'redirect to backend' }))
  }),
  posts: t.router({
    list: t.procedure
      .input(z.object({ page: z.number().optional(), limit: z.number().optional() }))
      .query(() => ({ posts: [], total: 0 })),
    byId: t.procedure
      .input(z.object({ id: z.string() }))
      .query(() => null),
    create: t.procedure
      .input(z.object({ title: z.string(), content: z.string() }))
      .mutation(() => ({ status: 'redirect to backend' }))
  }),
  comments: t.router({}),
  tags: t.router({}),
  series: t.router({}),
  search: t.router({}),
  feeds: t.router({}),
  links: t.router({}),
  reactions: t.router({})
})

export type AppRouter = typeof appRouter