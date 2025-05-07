import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { cookies } from "next/headers";
import type { AppRouter } from "@/lib/trpc/routers";
import superjson from "superjson";

// Create a tRPC client for server-side use
export const serverClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/trpc`,
      async headers() {
        const cookieStore = cookies();
        const tokenCookie = cookieStore.get("accessToken");
        const token = tokenCookie?.value;
        return {
          Authorization: token ? `Bearer ${token}` : "",
        };
      },
    }),
  ],
  transformer: superjson,
});