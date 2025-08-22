'use client'
import { useTranslation } from 'react-i18next'

export default function WhySection(){
  const { t } = useTranslation()
  const cards = t('why.cards', { returnObjects: true }) as {title:string; desc:string}[]
  return (
    <section className="safe-px mx-auto max-w-7xl py-12 md:py-16 cq-section btf">
      <h2 className="text-slate-900 font-semibold mb-6" style={{fontSize:'var(--step-2)'}}>{t('why.title')}</h2>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
        {cards.map((c,i)=> (
          <div key={i} className="rounded-xl border border-slate-200 p-4 bg-white">
            <div className="font-medium text-slate-900 mb-1">{c.title}</div>
            <p className="text-sm text-slate-600">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
