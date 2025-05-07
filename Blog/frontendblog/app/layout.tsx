import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"
import { TrpcProvider } from "@/lib/trpc/provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CommandMenu } from "@/components/command-menu"
import { Analytics } from "@/components/analytics"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Blog", "Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.author,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TrpcProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <Suspense>
                <div className="flex-1">{children}</div>
              </Suspense>
              <SiteFooter />
            </div>
            <CommandMenu />
            <Toaster />
            <Analytics />
          </TrpcProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
