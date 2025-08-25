'use client'
import Reveal from '@/components/Reveal'
import HeroSection from '@/components/HeroSection'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import { useNavigation } from '@/components/NavigationContext'

export default function About({ params }: { params: { locale: string } }){
  const { t } = useTranslation()
  const { direction } = useNavigation()

  // Directional animation variants
  const containerVariants = {
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
    }
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
    <div>
      <HeroSection>
        <m.div 
          className="max-w-2xl" 
          initial="hidden" 
          animate="show"
          variants={containerVariants}
        >
          <m.h1 
            className="text-white font-semibold leading-tight" 
            style={{fontSize:'var(--step-3)'}}
            variants={childVariants}
          >
            {t('about.title')}
          </m.h1>
          <m.p 
            className="mt-4 text-slate-100/95" 
            style={{fontSize:'var(--step-0)'}}
            variants={childVariants}
          >
            {t('about.subtitle')}
          </m.p>
        </m.div>
      </HeroSection>
      <div className="safe-px mx-auto max-w-7xl py-8 cq-section">
        <Reveal>
        <div className="mt-12 grid gap-6 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          {(t('why.cards', { returnObjects: true }) as any[]).slice(0, 3).map((card: any, index: number) => (
            <div key={index} className="rounded-xl border border-slate-200 p-6 bg-white shadow-sm">
              <div className="font-medium text-slate-900 mb-2">{card.title}</div>
              <p className="text-sm text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
    </div>
  )
}