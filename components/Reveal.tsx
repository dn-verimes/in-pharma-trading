'use client'
import { motion as m } from 'framer-motion'
import { fx } from '@/components/fx'

export default function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <m.div 
      initial="hidden" 
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }} 
      variants={fx.fadeUp}
    >
      {children}
    </m.div>
  )
}
