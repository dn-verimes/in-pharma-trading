'use client'
import Image from 'next/image'
import { ReactNode } from 'react'

interface HeroSectionProps {
  children?: ReactNode
}

export default function HeroSection({ children }: HeroSectionProps) {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-inpharma-gradFrom to-inpharma-gradTo text-slate-900" 
      style={{ height: '400px' }}
    >
      <div className="absolute inset-0 opacity-10">
        <Image 
          src="/images/hero.jpg" 
          alt="" 
          fill 
          priority 
          sizes="100vw" 
          className="object-cover" 
        />
      </div>
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 20 }}>
        <div className="safe-px mx-auto max-w-7xl w-full py-16 md:py-24">
          {children}
        </div>
      </div>
    </section>
  )
}

