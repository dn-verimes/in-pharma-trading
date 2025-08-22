'use client'
import { I18nextProvider } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import type { i18n } from 'i18next'
import { initClientI18n, type Locale } from '@/lib/i18n/client'

export default function I18nProvider({ locale, children }: { locale: Locale, children: React.ReactNode }){
  const [i18nInstance, setI18nInstance] = useState<i18n | null>(null)
  const ref = useRef<i18n | null>(null)
  
  useEffect(() => {
    if (!ref.current) {
      initClientI18n(locale).then((instance) => {
        ref.current = instance
        setI18nInstance(instance)
      })
    }
  }, [locale])

  if (!i18nInstance) {
    return <div>Loading...</div> // You might want to use a proper loading component
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
