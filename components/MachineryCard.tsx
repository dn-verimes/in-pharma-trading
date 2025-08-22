'use client'
import Link from 'next/link'
import type { Machine } from '@/lib/machines'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import AnimatedImage from '@/components/AnimatedImage'

export default function MachineryCard({ m: item, locale }: { m: Machine, locale: string }){
  const { t } = useTranslation()
  return (
    <m.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.15 }}
      className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3]">
        <AnimatedImage src={item.images[0]} alt={item.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" loading="lazy" />
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="font-medium text-slate-900">{item.name}</div>
        <div className="text-sm text-slate-600">{item.shortDescription}</div>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-600">
          <span>{item.status === 'In stock' ? t('machinery.status.in') : t('machinery.status.req')}</span>
          <Link href={`/${locale}/machinery#${item.id}`} className="underline">{t('machinery.enquire')}</Link>
        </div>
      </div>
    </m.div>
  )
}
