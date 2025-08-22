import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { initI18n, type Locale } from '@/lib/i18n'
import I18nProvider from '@/components/I18nProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata>{
  const i18n = await initI18n(params.locale)
  return {
    title: i18n.t('meta.title'),
    description: i18n.t('meta.description'),
    metadataBase: new URL('https://inpharmatrading.nl'),
    openGraph: {
      title: i18n.t('meta.title'),
      description: i18n.t('meta.description'),
      url: `https://inpharmatrading.nl/${params.locale}`,
      siteName: 'In Pharma Trading',
      images: [{ url: '/og.jpg', width: 1200, height: 630 }]
    },
    twitter: { card: 'summary_large_image', title: i18n.t('meta.title'), description: i18n.t('meta.description') }
  }
}

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { locale: Locale } }){
  return (
    <html lang={params.locale}>
      <body className={`${inter.variable} antialiased text-slate-900 bg-white`}>
        <I18nProvider locale={params.locale}>
          <Header locale={params.locale} />
          <main>{children}</main>
          <Footer locale={params.locale} />
        </I18nProvider>
      </body>
    </html>
  )
}
