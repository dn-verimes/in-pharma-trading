'use client'
import Image from 'next/image'
import Link from 'next/link'
import type { Machine } from '@/lib/machines'
import { useTranslation } from 'react-i18next'

export default function MachineryCard({ m, locale }: { m: Machine, locale: string }){
  const { t } = useTranslation()
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3]">
        <Image src={m.images[0]} alt={m.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" loading="lazy" />
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="font-medium text-slate-900">{m.name}</div>
        <div className="text-sm text-slate-600">{m.shortDescription}</div>
        <div className="mt-auto flex items-center justify-between text-xs text-slate-600">
          <span>{m.status === 'In stock' ? t('machinery.status.in') : t('machinery.status.req')}</span>
          <Link href={`/${locale}/machinery#${m.id}`} className="underline">{t('machinery.enquire')}</Link>
        </div>
      </div>
    </div>
  )
}
