'use client'
import { usePathname, useRouter } from 'next/navigation'
import { locales } from '@/lib/i18n'

export default function LanguageSwitcher({ current }: { current: string }){
  const pathname = usePathname()
  const router = useRouter()
  function go(lng: string){
    if (lng === current) return
    const parts = pathname.split('/')
    parts[1] = lng
    document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=${60*60*24*365}`
    router.push(parts.join('/') as any)
    router.refresh()
  }
  return (
    <div className="flex items-center gap-2 text-sm">
      {locales.map(l => (
        <button
          key={l}
          onClick={()=>go(l)}
          className={`px-2 py-1 rounded-md border ${l===current? 'bg-inpharma-blue text-white border-inpharma-blue':'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
          aria-current={l===current}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
