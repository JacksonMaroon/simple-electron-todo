"use client"

import type React from "react"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  className?: string
  children: React.ReactNode
}

export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    if (typeof children === "string") {
      await navigator.clipboard.writeText(children)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="relative">
      <pre
        className={cn(
          "mb-4 mt-6 max-h-[650px] overflow-auto rounded-lg border bg-muted p-4 font-mono text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        type="button"
        className="absolute right-2 top-2 rounded-md border bg-background p-1 text-muted-foreground hover:bg-muted"
        onClick={copyToClipboard}
      >
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </button>
    </div>
  )
}
