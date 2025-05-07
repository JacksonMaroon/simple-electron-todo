"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // This is where you would typically send analytics data
      // For example, using Google Analytics, Fathom, Plausible, etc.
      console.log(`Page view: ${pathname}${searchParams ? `?${searchParams}` : ""}`)
    }
  }, [pathname, searchParams])

  return null
}
