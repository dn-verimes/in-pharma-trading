'use client'
import Image from 'next/image'
import { motion as m } from 'framer-motion'
import { fx } from '@/components/fx'
import { useNavigation } from '@/components/NavigationContext'

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageHero({ title, subtitle, backgroundImage = "/images/hero.jpg" }: PageHeroProps) {
  const { direction } = useNavigation()

  // Fallback if no title provided
  if (!title) {
    return null
  }

  // Create directional animation variants
  const getDirectionalVariants = () => {
    const baseVariants = {
      hidden: { 
        opacity: 0, 
        x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
        y: direction ? 0 : 8
      },
      show: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { 
          duration: 0.4, 
          ease: [0.2, 0.65, 0.3, 0.9] as any,
          staggerChildren: 0.1
        }
      },
      exit: {
        opacity: 0,
        x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        y: direction ? 0 : -8,
        transition: { duration: 0.25 }
      }
    }
    return baseVariants
  }

  const childVariants = {
    hidden: { 
      opacity: 0, 
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      y: direction ? 0 : 6
    },
    show: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] as any }
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-inpharma-gradFrom to-inpharma-gradTo text-slate-900">
      <div className="absolute inset-0 opacity-10">
        <Image src={backgroundImage} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="relative safe-px mx-auto max-w-7xl py-16 md:py-24 cq-section">
        <m.div 
          className="max-w-2xl" 
          initial="hidden" 
          animate="show"
          variants={getDirectionalVariants()}
        >
          <m.h1 
            className="text-white font-semibold leading-tight" 
            style={{fontSize:'var(--step-3)'}}
            variants={childVariants}
          >
            {title}
          </m.h1>
          {subtitle && (
            <m.p 
              className="mt-4 text-slate-100/95" 
              style={{fontSize:'var(--step-0)'}}
              variants={childVariants}
            >
              {subtitle}
            </m.p>
          )}
        </m.div>
      </div>
    </section>
  )
}
