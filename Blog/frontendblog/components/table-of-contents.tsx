"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  toc: TocItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      toc.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [toc])

  return (
    <div className="mb-8 rounded-lg border p-4">
      <h2 className="mb-2 text-lg font-semibold">Table of Contents</h2>
      <nav>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li
              key={item.id}
              className={cn(
                "text-sm",
                item.level === 2 && "ml-0",
                item.level === 3 && "ml-4",
                item.level === 4 && "ml-8",
              )}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  "hover:underline",
                  activeId === item.id ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
