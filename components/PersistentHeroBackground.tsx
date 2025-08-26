'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PersistentHeroBackground() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  // Show the background on pages that need it
  useEffect(() => {
    const shouldShow = ['/', '/en', '/en/', '/de', '/de/', '/nl', '/nl/', '/en/about', '/en/about/', '/de/about', '/de/about/', '/nl/about', '/nl/about/', '/en/contact', '/en/contact/', '/de/contact', '/de/contact/', '/nl/contact', '/nl/contact/', '/en/machinery', '/en/machinery/', '/de/machinery', '/de/machinery/', '/nl/machinery', '/nl/machinery/', '/en/impression', '/en/impression/', '/de/impression', '/de/impression/', '/nl/impression', '/nl/impression/'].includes(pathname)
    setIsVisible(shouldShow)
  }, [pathname])

  if (!isVisible) return null

  return (
      <div 
        className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-inpharma-gradFrom to-inpharma-gradTo pointer-events-none"
        style={{ zIndex: 1, position: 'fixed' }}
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
}
