'use client'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

export default function Footer({ locale }: { locale: string }){
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  return (
    <footer className="safe-pb safe-px border-t border-slate-200 bg-slate-50 mt-16">
      <div className="mx-auto max-w-7xl py-10 cq-section grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-slate-600 max-w-prose">{t('meta.description')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold mb-2">Links</div>
            <ul className="space-y-1 text-sm">
              <li><Link href={`/${locale}`} prefetch> {t('nav.home')} </Link></li>
              <li><Link href={`/${locale}/machinery`} prefetch> {t('nav.machinery')} </Link></li>
              <li><Link href={`/${locale}/impression`} prefetch> {t('nav.impression')} </Link></li>
              <li><Link href={`/${locale}/about`} prefetch> {t('nav.about')} </Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">{t('nav.contact')}</div>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>info@inpharmatrading.nl</li>
              <li>+31 000 000 000</li>
              <li>Netherlands</li>
            </ul>
          </div>
        </div>
        <div className="rounded-xl p-4 bg-gradient-to-br from-inpharma-gradFrom to-inpharma-gradTo text-white">
          <div className="font-semibold mb-1">{t('financing.title')}</div>
          <p className="text-sm opacity-90 mb-3">Leasing and staged payments designed to fit your cash flow.</p>
          <Link href={`/${locale}/contact`} className="inline-flex bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 text-sm">
            {t('financing.cta')}
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl py-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <span>© {year} In Pharma Trading. {t('footer.rights')}</span>
      </div>
    </footer>
  )
}
