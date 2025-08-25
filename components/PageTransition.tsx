// components/PageTransition.tsx
'use client'
import { AnimatePresence, motion as m } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="sync">
      <m.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
