'use client'
import HeroSection from '@/components/HeroSection'
import WhySection from '@/components/WhySection'
import FeaturedMachinery from '@/components/FeaturedMachinery'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import { useNavigation } from '@/components/NavigationContext'

export default function Home({ params }: { params: { locale: string } }){
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
            {t('hero.title')}
          </m.h1>
          <m.p 
            className="mt-4 text-slate-100/95" 
            style={{fontSize:'var(--step-0)'}}
            variants={childVariants}
          >
            {t('hero.subtitle')}
          </m.p>
          <m.div 
            className="mt-6 flex flex-wrap gap-3"
            variants={childVariants}
          >
            <Link href={`/${params.locale}/machinery`} prefetch className="rounded-lg bg-white text-slate-900 px-4 py-2 font-medium btn-press">{t('hero.ctaPrimary')}</Link>
            <Link href={`/${params.locale}/contact`} prefetch className="rounded-lg bg-inpharma-blue text-white px-4 py-2 font-medium btn-press">{t('hero.ctaSecondary')}</Link>
          </m.div>
        </m.div>
      </HeroSection>
      <Reveal>
        <FeaturedMachinery locale={params.locale} />
      </Reveal>
      <Reveal>
        <WhySection />
      </Reveal>

      <Reveal>
        <section className="safe-px mx-auto max-w-7xl py-12 md:py-16 cq-section btf">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-slate-900 font-semibold mb-2" style={{fontSize:'var(--step-2)'}}>About</h3>
              <p className="text-slate-600 max-w-prose">Our supplement-production background means we understand your constraints and validation needs.</p>
            </div>
            <div className="md:justify-self-end">
              <Link href={`/${params.locale}/about`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Learn more</Link>
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="safe-px mx-auto max-w-7xl py-12 md:py-16 cq-section btf">
          <div className="rounded-xl border border-slate-200 p-6 text-center">
            <h3 className="font-semibold mb-2" style={{fontSize:'var(--step-2)'}}>Ready to discuss your project?</h3>
            <Link href={`/${params.locale}/contact`} className="inline-flex rounded-lg bg-inpharma-blue text-white px-4 py-2 btn-press">Contact us</Link>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
