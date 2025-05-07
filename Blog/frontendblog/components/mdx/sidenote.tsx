"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SidenoteProps {
  id: string
  children: React.ReactNode
}

export function Sidenote({ id, children }: SidenoteProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span className="sidenote">
      <sup
        id={`sidenote-marker-${id}`}
        className="sidenote-marker"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        [{id}]
      </sup>
      <span id={`sidenote-${id}`} className={cn("sidenote-content", isHovered ? "opacity-100" : "opacity-50")}>
        {children}
      </span>
    </span>
  )
}
