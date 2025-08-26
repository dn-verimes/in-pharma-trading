'use client'
import type { Machine } from '@/lib/machines'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import AnimatedImage from '@/components/AnimatedImage'

interface MachineryCardProps {
  m: Machine
  locale: string
  onClick: (machine: Machine) => void
  updateRoute?: boolean // Optional flag to control route updating
}

export default function MachineryCard({ m: item, locale, onClick, updateRoute = false }: MachineryCardProps){
  const { t } = useTranslation()
  
  const handleClick = () => {
    onClick(item)
    // Only update URL if it's different to prevent unnecessary re-renders
    if (updateRoute && typeof window !== 'undefined') {
      const newUrl = `/${locale}/machinery#${item.id}`
      if (window.location.pathname + window.location.hash !== newUrl) {
        window.history.replaceState(null, '', newUrl)
      }
    }
  }

  return (
    <m.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.15 }}
      onClick={handleClick}
      className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative aspect-[4/3]">
        <AnimatedImage src={item.images[0]} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" loading="lazy" />
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="font-medium text-slate-900">{item.name}</div>
        <div className="text-sm text-slate-600">{item.shortDescription}</div>
        <div className="mt-auto flex items-center text-xs text-slate-600">
          <span>
            {item.status === 'In stock' ? 'In stock' : 'On request'}
          </span>
        </div>
      </div>
    </m.div>
  )
}
