"use server"

import { cookies } from "next/headers"
import { serverClient } from "@/lib/trpc/server"

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to sign in",
      }
    }

    return {
      success: true,
      user: data.user,
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during sign in",
    }
  }
}

export async function signUp({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const result = await serverClient.auth.signup.mutate({
      email,
      password,
    })

    // Set cookies
    const cookieStore = cookies()
    cookieStore.set("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    })

    cookieStore.set("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: result.user,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to sign up",
    }
  }
}

export async function signOut() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth`, {
      method: "DELETE",
    })

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during sign out",
    }
  }
}

export async function resetPassword(email: string) {
  try {
    const result = await serverClient.auth.forgotPassword.mutate({
      email,
    })

    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to send reset email",
    }
  }
}
