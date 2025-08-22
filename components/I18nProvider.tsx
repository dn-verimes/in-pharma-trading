'use client'
import { I18nextProvider } from 'react-i18next'
import { useMemo } from 'react'
import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { Locale } from '@/lib/i18n/client'
import { resources } from '@/lib/i18n/client'

export default function I18nProvider({ locale, children }: { locale: Locale, children: React.ReactNode }){
  const i18nInstance = useMemo(() => {
    const i18n = createInstance()
    i18n
      .use(initReactI18next)
      .init({
        lng: locale,
        fallbackLng: 'en',
        resources,
        interpolation: { escapeValue: false }
      })
    return i18n
  }, [locale])

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
