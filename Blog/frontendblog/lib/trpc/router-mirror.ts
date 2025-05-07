// This file creates a mirror of the backend router structure for client use
import { initTRPC } from "@trpc/server"
import superjson from "superjson"

// Create a simple empty router that mirrors the backend structure
const t = initTRPC.create({
  transformer: superjson
})

// Create an empty router with the same structure as the backend
export const appRouter = t.router({
  health: t.router({}),
  auth: t.router({}),
  posts: t.router({
    list: t.procedure
  }),
  comments: t.router({}),
  tags: t.router({}),
  series: t.router({}),
  search: t.router({}),
  feeds: t.router({}),
  links: t.router({}),
  reactions: t.router({})
})

export type Router = typeof appRouter