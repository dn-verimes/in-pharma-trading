'use client'
import Reveal from '@/components/Reveal'

export default function About(){
  return (
    <div className="safe-px mx-auto max-w-7xl py-8 cq-section">
      <Reveal>
        <h1 className="text-slate-900 font-semibold mb-6" style={{fontSize:'var(--step-2)'}}>
          About In Pharma Trading
        </h1>
        <p className="text-slate-700 max-w-prose text-lg leading-relaxed mb-8">
          In Pharma Trading is an international wholesaler and manufacturer (under license) of high-quality pharmaceutical machinery. For many years we have been associated with companies specialized in the production and packaging of nutritional supplements. As a consequence, we know exactly which specifications, quality, and service levels our machines and services should have. Together with you, we determine which machines best fit your specific situation. We also offer flexible financing so the purchase can match your budget.
        </p>
      </Reveal>
      
      <Reveal>
        <div className="mt-12 grid gap-6 grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          <div className="rounded-xl border border-slate-200 p-6 bg-white shadow-sm">
            <div className="font-medium text-slate-900 mb-2">International focus</div>
            <p className="text-sm text-slate-600">We source across the EU and beyond with CE documentation and full compliance support.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-white shadow-sm">
            <div className="font-medium text-slate-900 mb-2">Lifecycle services</div>
            <p className="text-sm text-slate-600">From FAT/SAT validation to operator training and ongoing spare parts supply.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-white shadow-sm">
            <div className="font-medium text-slate-900 mb-2">Flexible financing</div>
            <p className="text-sm text-slate-600">Leasing and staged payment options tailored to match your budget and cash flow.</p>
          </div>
        </div>
      </Reveal>
    </div>
  )
}