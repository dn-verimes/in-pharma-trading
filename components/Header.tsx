'use client'
import Link from 'next/link'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function Header({ locale }: { locale: string }){
  const { t } = useTranslation()
  return (
    <header className="safe-pt safe-px sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between py-3 gap-4">
        <Link href={`/${locale}`} prefetch>
          <Logo />
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href={`/${locale}`} prefetch className="text-slate-700 hover:text-inpharma-blue text-sm">
            {t('nav.home')}
          </Link>
          <Link href={`/${locale}/machinery`} prefetch className="text-slate-700 hover:text-inpharma-blue text-sm">
            {t('nav.machinery')}
          </Link>
          <Link href={`/${locale}/about`} prefetch className="text-slate-700 hover:text-inpharma-blue text-sm">
            {t('nav.about')}
          </Link>
          <Link href={`/${locale}/impression`} prefetch className="text-slate-700 hover:text-inpharma-blue text-sm">
            {t('nav.impression')}
          </Link>
          <Link href={`/${locale}/contact`} prefetch className="text-slate-700 hover:text-inpharma-blue text-sm">
            {t('nav.contact')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link href={`/${locale}/contact`} prefetch className="hidden sm:inline-flex rounded-lg bg-inpharma-blue text-white px-3 py-2 text-sm font-medium">
            {t('hero.ctaSecondary')}
          </Link>
        </div>
      </div>
    </header>
  )
}
