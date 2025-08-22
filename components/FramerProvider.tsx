// components/FramerProvider.tsx
'use client'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'

export default function FramerProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {/* Respect prefers-reduced-motion automatically */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
