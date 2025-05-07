import { cookies } from "next/headers"
import { serverClient } from "@/lib/trpc/server"

export async function getCurrentUser() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("accessToken")

    if (!token) {
      return null
    }

    const { user } = await serverClient.auth.me.query()
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}
