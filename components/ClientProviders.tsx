'use client'
import { ReactNode } from 'react'
import I18nProvider from '@/components/I18nProvider'
import FramerProvider from '@/components/FramerProvider'
import PageTransition from '@/components/PageTransition'
import { NavigationProvider } from '@/components/NavigationContext'
import { ContactProvider, useContact } from '@/components/ContactContext'
import ContactDialog from '@/components/ContactDialog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import type { Locale } from '@/lib/i18n'

interface ClientProvidersProps {
  children: ReactNode
  locale: Locale
}

function ContactDialogWrapper() {
  const { isContactDialogOpen, closeContactDialog, prefilledMachine } = useContact()
  return (
    <ContactDialog 
      isOpen={isContactDialogOpen}
      onClose={closeContactDialog}
      prefilledMachine={prefilledMachine}
    />
  )
}

export default function ClientProviders({ children, locale }: ClientProvidersProps) {
  return (
    <I18nProvider locale={locale}>
      <FramerProvider>
        <NavigationProvider>
          <ContactProvider>
            <Header locale={locale} />
            <PageTransition>{children}</PageTransition>
            <Footer locale={locale} />
            <ContactDialogWrapper />
          </ContactProvider>
        </NavigationProvider>
      </FramerProvider>
    </I18nProvider>
  )
}
