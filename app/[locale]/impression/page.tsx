'use client'
import AnimatedImage from '@/components/AnimatedImage'
import HeroSection from '@/components/HeroSection'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import { useNavigation } from '@/components/NavigationContext'
import Image from 'next/image'

export default function Impression({ params }: { params: { locale: string } }){
  const { t } = useTranslation()
  const { direction } = useNavigation()
  const images = Array.from({length:12}).map((_,i)=> `/images/gallery/${(i%6)+1}.jpg`)

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
                {t('impression.title')}
              </m.h1>
              <m.p 
                className="mt-4 text-slate-100/95" 
                style={{fontSize:'var(--step-0)'}}
                variants={childVariants}
              >
                {t('impression.subtitle')}
              </m.p>
            </m.div>
          </div>
        </div>
      </section>
      <div className="safe-px mx-auto max-w-7xl py-8 cq-section">
        <div className="grid gap-4" style={{gridTemplateColumns:'repeat(auto-fit,minmax(14rem,1fr))'}}>
          {images.map((src,i)=>(
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border">
              <AnimatedImage src={src} alt={`Machinery image ${i+1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
