'use client'
import { I18nextProvider } from 'react-i18next'
import { useEffect, useState } from 'react'
import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { Locale } from '@/lib/i18n/client'
import { resources } from '@/lib/i18n/client'

export default function I18nProvider({ locale, children }: { locale: Locale, children: React.ReactNode }){
  const [i18nInstance, setI18nInstance] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initI18n = async () => {
      console.log('Initializing i18next with locale:', locale)
      try {
        const i18n = createInstance()
        console.log('Created i18next instance')
        
        await i18n
          .use(initReactI18next)
          .init({
            lng: locale,
            fallbackLng: 'en',
            resources,
            interpolation: { escapeValue: false },
            react: {
              useSuspense: false
            }
          })
        
        console.log('i18next initialized successfully')
        setI18nInstance(i18n)
        setIsReady(true)
      } catch (error) {
        console.error('Failed to initialize i18next:', error)
        // Fallback to a basic instance
        try {
          const fallbackI18n = createInstance()
          await fallbackI18n
            .use(initReactI18next)
            .init({
              lng: 'en',
              fallbackLng: 'en',
              resources,
              interpolation: { escapeValue: false },
              react: {
                useSuspense: false
              }
            })
          console.log('Fallback i18next initialized successfully')
          setI18nInstance(fallbackI18n)
          setIsReady(true)
        } catch (fallbackError) {
          console.error('Fallback i18next also failed:', fallbackError)
          // Last resort - render children without i18next
          setIsReady(true)
        }
      }
    }

    initI18n()
  }, [locale])

  if (!isReady) {
    return <div>Loading translations...</div>
  }

  if (!i18nInstance) {
    return <div>Failed to load translations, but continuing...</div>
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
