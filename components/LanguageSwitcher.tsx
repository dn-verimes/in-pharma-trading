'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { locales } from '@/lib/i18n'
import { motion as m, AnimatePresence } from 'framer-motion'

export default function LanguageSwitcher({ current }: { current: string }){
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  function go(lng: string){
    if (lng === current) return
    const parts = pathname.split('/')
    parts[1] = lng
    document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=${60*60*24*365}`
    router.push(parts.join('/') as any)
    router.refresh()
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <m.button
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.08 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-700 hover:bg-slate-100 text-sm"
      >
        <span>{current.toUpperCase()}</span>
        <svg 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </m.button>
      
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 right-0 bg-white rounded-md shadow-lg border border-slate-200 py-1 min-w-[60px] z-50"
          >
            {locales.map(l => (
              <button
                key={l}
                onClick={() => go(l)}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-100 ${
                  l === current ? 'bg-slate-50 text-inpharma-blue font-medium' : 'text-slate-700'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </m.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
