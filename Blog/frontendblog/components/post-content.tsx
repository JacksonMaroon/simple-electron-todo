"use client"

import { useMemo } from "react"
import { MDXRemote } from "next-mdx-remote"
import { MDXComponents } from "@/components/mdx/mdx-components"

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  const mdxSource = useMemo(() => {
    try {
      return JSON.parse(content)
    } catch (error) {
      console.error("Failed to parse MDX content:", error)
      return { compiledSource: "" }
    }
  }, [content])

  return (
    <div className="mdx-content">
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </div>
  )
}
