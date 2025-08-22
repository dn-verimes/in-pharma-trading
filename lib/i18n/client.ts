'use client'

import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en/common.json'
import de from '@/locales/de/common.json'
import nl from '@/locales/nl/common.json'

export const locales = ['en','de','nl'] as const
export type Locale = typeof locales[number]

export const resources = { en: { translation: en }, de: { translation: de }, nl: { translation: nl } } as const

export async function initClientI18n(lng: Locale) {
  const i18n = createInstance()
  await i18n
    .use(initReactI18next)
    .init({
      lng,
      fallbackLng: 'en',
      resources,
      interpolation: { escapeValue: false }
    })
  return i18n
}
