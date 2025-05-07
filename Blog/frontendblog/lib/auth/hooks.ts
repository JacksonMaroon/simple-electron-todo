"use client"

import { useEffect, useState } from "react"
import { trpc } from "@/lib/trpc/client"
import { refreshToken } from "@/lib/auth/token"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const {
    data: userData,
    error,
    refetch,
  } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const handleTokenRefresh = async () => {
      if (error) {
        try {
          // Try to refresh the token
          await refreshToken()
          // Refetch user data with new token
          refetch()
        } catch (refreshError) {
          // Token refresh failed, user is not authenticated
          console.error("Token refresh failed:", refreshError)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    handleTokenRefresh()
  }, [error, refetch])

  return {
    user: userData?.user,
    isLoading,
    refetch,
  }
}
