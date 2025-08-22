'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { motion as m, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion'

export default function Header({ locale }: { locale: string }){
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 80], [0, -6])          // slight lift
  const bg = useTransform(scrollY, [0, 80], [0.6, 0.9])      // more opaque
  const blur = useTransform(scrollY, [0, 80], [8, 12])       // stronger blur
  
  const backdropFilter = useMotionTemplate`blur(${blur}px)`
  const backgroundColor = useMotionTemplate`rgba(255,255,255,${bg})`

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-btn')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [locale])

  return (
    <m.header
      style={{ y, backdropFilter, backgroundColor }}
      className="safe-pt safe-px sticky top-0 z-40 border-b border-slate-200"
    >
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
          <Link href={`/${locale}/impression`} prefetch className="text-slate-700 hover:text-inpharma-blue text-sm">
            {t('nav.impression')}
          </Link>
          <Link href={`/${locale}/about`} prefetch className="text-slate-700 hover:text-inpharma-blue text-sm">
            {t('nav.about')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <Link href={`/${locale}/contact`} prefetch className="hidden sm:inline-flex rounded-lg bg-inpharma-blue text-white px-3 py-2 text-sm font-medium">
            {t('hero.ctaSecondary')}
          </Link>
          
          {/* Mobile Hamburger Menu Button */}
          <m.button
            className="hamburger-btn md:hidden flex flex-col justify-center items-center w-6 h-6 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <m.span
              className="w-5 h-0.5 bg-slate-700 rounded-full"
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className="w-5 h-0.5 bg-slate-700 rounded-full mt-1.5"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className="w-5 h-0.5 bg-slate-700 rounded-full mt-1.5"
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </m.button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            className="mobile-menu md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="safe-px mx-auto max-w-7xl py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href={`/${locale}`} 
                  prefetch 
                  className="text-slate-700 hover:text-inpharma-blue text-base font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link 
                  href={`/${locale}/machinery`} 
                  prefetch 
                  className="text-slate-700 hover:text-inpharma-blue text-base font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.machinery')}
                </Link>
                <Link 
                  href={`/${locale}/impression`} 
                  prefetch 
                  className="text-slate-700 hover:text-inpharma-blue text-base font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.impression')}
                </Link>
                <Link 
                  href={`/${locale}/about`} 
                  prefetch 
                  className="text-slate-700 hover:text-inpharma-blue text-base font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
                <div className="pt-2 border-t border-slate-200 mt-2">
                  <Link 
                    href={`/${locale}/contact`} 
                    prefetch 
                    className="inline-flex rounded-lg bg-inpharma-blue text-white px-4 py-3 text-base font-medium w-full justify-center hover:bg-inpharma-blue/90 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('hero.ctaSecondary')}
                  </Link>
                </div>
              </nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  )
}
