'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Hero({ locale }: { locale: string }){
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-inpharma-gradFrom to-inpharma-gradTo text-slate-900">
      <div className="absolute inset-0 opacity-10">
        <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="relative safe-px mx-auto max-w-7xl py-16 md:py-24 cq-section">
        <div className="max-w-2xl">
          <h1 className="text-white font-semibold leading-tight" style={{fontSize:'var(--step-3)'}}>{t('hero.title')}</h1>
          <p className="mt-4 text-slate-100/95" style={{fontSize:'var(--step-0)'}}>{t('hero.subtitle')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/${locale}/machinery`} prefetch className="rounded-lg bg-white text-slate-900 px-4 py-2 font-medium">{t('hero.ctaPrimary')}</Link>
            <Link href={`/${locale}/contact`} prefetch className="rounded-lg bg-inpharma-blue text-white px-4 py-2 font-medium">{t('hero.ctaSecondary')}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
