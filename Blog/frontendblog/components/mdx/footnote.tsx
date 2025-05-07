"use client"

import type React from "react"

import { useState } from "react"

interface FootnoteProps {
  id: string
  children: React.ReactNode
}

export function Footnote({ id, children }: FootnoteProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <sup id={`footnote-marker-${id}`} className="footnote" onClick={() => setIsOpen(!isOpen)}>
        [{id}]
      </sup>
      {isOpen && (
        <div id={`footnote-${id}`} className="footnote-content" onClick={() => setIsOpen(false)}>
          {children}
        </div>
      )}
    </>
  )
}
