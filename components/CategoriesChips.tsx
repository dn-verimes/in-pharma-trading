'use client'
import { useTranslation } from 'react-i18next'

export default function CategoriesChips(){
  const { t } = useTranslation()
  const items = t('categories.items', { returnObjects: true }) as string[]
  return (
    <div className="safe-px mx-auto max-w-7xl py-6 btf">
      <div className="chips overflow-x-auto flex gap-2">
        {items.map((c,i)=>(
          <span key={i} className="inline-flex shrink-0 items-center rounded-full border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-100">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
