'use client'
import { ReactNode } from 'react'
import I18nProvider from '@/components/I18nProvider'
import FramerProvider from '@/components/FramerProvider'
import PageTransition from '@/components/PageTransition'
import { NavigationProvider } from '@/components/NavigationContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import type { Locale } from '@/lib/i18n'

interface ClientProvidersProps {
  children: ReactNode
  locale: Locale
}

export default function ClientProviders({ children, locale }: ClientProvidersProps) {
  return (
    <I18nProvider locale={locale}>
      <FramerProvider>
        <NavigationProvider>
          <Header locale={locale} />
                  <PageTransition>{children}</PageTransition>
          <Footer locale={locale} />
        </NavigationProvider>
      </FramerProvider>
    </I18nProvider>
  )
}
