import React, { ReactNode } from 'react'

type LabelType = { children: ReactNode; className?: string }

export default function Label({ children, className }: LabelType) {
  if (!children) return null

  return (
    <h3
      className={`text-left text-black font-medium text-base mb-1 ${className}`}
    >
      {children}
    </h3>
  )
}
