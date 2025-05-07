"use client"

export async function getAuthToken() {
  try {
    // In a client component, we can't directly access cookies
    // Instead, we'll make a request to an endpoint that returns the token
    // For simplicity, we'll just return the token from localStorage
    // In a real app, you'd use HttpOnly cookies and a proper token management system
    return localStorage.getItem("accessToken")
  } catch (error) {
    console.error("Error getting auth token:", error)
    return null
  }
}

export async function refreshToken() {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    return true
  } catch (error) {
    console.error("Error refreshing token:", error)
    throw error
  }
}
