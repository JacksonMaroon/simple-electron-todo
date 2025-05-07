import { httpBatchLink } from "@trpc/client"
import { cookies } from "next/headers"
import { appRouter } from "@/lib/trpc/routers"
import superjson from "superjson"

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/trpc`,
      headers() {
        const cookieStore = cookies()
        const token = cookieStore.get("accessToken")?.value
        return {
          Authorization: token ? `Bearer ${token}` : "",
        }
      },
    }),
  ],
  transformer: superjson,
})
