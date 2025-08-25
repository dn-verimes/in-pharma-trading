import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'In Pharma Trading',
  description: 'International wholesaler and licensed manufacturer of high-quality pharmaceutical machinery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased text-slate-900 bg-white`}>
        {children}
      </body>
    </html>
  )
}
