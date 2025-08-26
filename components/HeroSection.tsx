'use client'
import { ReactNode, memo, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface HeroSectionProps {
  children?: ReactNode
}

// Memoized background component that scrolls with the page
const HeroBackground = memo(() => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-inpharma-gradFrom to-inpharma-gradTo"
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  )
})

HeroBackground.displayName = 'HeroBackground'

export default function HeroSection({ children }: HeroSectionProps) {
  const pathname = usePathname()
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Show background on pages that have hero sections
    const heroPages = ['/', '/en', '/en/', '/de', '/de/', '/nl', '/nl/', '/en/about', '/en/about/', '/de/about', '/de/about/', '/nl/about', '/nl/about/', '/en/contact', '/en/contact/', '/de/contact', '/de/contact/', '/nl/contact', '/nl/contact/', '/en/machinery', '/en/machinery/', '/de/machinery', '/de/machinery/', '/nl/machinery', '/nl/machinery/', '/en/impression', '/en/impression/', '/de/impression', '/de/impression/', '/nl/impression', '/nl/impression/']
    const shouldShowBackground = heroPages.includes(pathname)
    setShouldShow(shouldShowBackground)
    // console.log('HeroSection: pathname =', pathname, 'shouldShow =', shouldShowBackground, 'heroPages =', heroPages)
  }, [pathname])

  return (
    <section
      className="relative text-slate-900 overflow-hidden"
      style={{ height: '400px' }}
    >
      {/* Background that scrolls with the page */}
      {shouldShow && <HeroBackground />}

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center" style={{ zIndex: 30 }}>
        <div className="safe-px mx-auto max-w-7xl w-full py-16 md:py-24">
          {children}
        </div>
      </div>
    </section>
  )
}

