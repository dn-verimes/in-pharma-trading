// components/PageTransition.tsx
'use client'
import { AnimatePresence, motion as m } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.2, 0.65, 0.3, 0.9] } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
