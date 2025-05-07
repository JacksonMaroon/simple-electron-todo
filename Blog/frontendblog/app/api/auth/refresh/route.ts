import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const refreshCookie = cookieStore.get("refreshToken")
    const refreshToken = refreshCookie?.value

    if (!refreshToken) {
      return NextResponse.json({ message: "No refresh token found" }, { status: 401 })
    }

    // Call the backend API to refresh the token
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      return NextResponse.json({ message: "Failed to refresh token" }, { status: response.status })
    }

    const data = await response.json()

    // Set the new tokens as cookies
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    })

    if (data.refreshToken) {
      cookieStore.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error refreshing token:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
