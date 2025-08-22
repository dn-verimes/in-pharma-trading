'use client'
import { useTranslation } from 'react-i18next'

export default function About(){
  const { t } = useTranslation()
  return (
    <div className="safe-px mx-auto max-w-7xl py-8 cq-section">
      <h1 className="text-slate-900 font-semibold mb-4" style={{fontSize:'var(--step-2)'}}>About</h1>
      <p className="text-slate-700 max-w-prose">{t('hero.subtitle')}</p>
      <div className="mt-8 grid gap-4 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-1">International focus</div>
          <p className="text-sm text-slate-600">We source across the EU and beyond with CE documentation.</p>
        </div>
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-1">Lifecycle services</div>
          <p className="text-sm text-slate-600">From FAT/SAT to operator training and spare parts.</p>
        </div>
        <div className="rounded-xl border p-4">
          <div className="font-medium mb-1">Financing</div>
          <p className="text-sm text-slate-600">Leasing and staged payments tailored to your plan.</p>
        </div>
      </div>
    </div>
  )
}
