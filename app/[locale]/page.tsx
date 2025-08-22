'use client'
import Hero from '@/components/Hero'
import WhySection from '@/components/WhySection'
import FeaturedMachinery from '@/components/FeaturedMachinery'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Home({ params }: { params: { locale: string } }){
  const { t } = useTranslation()
  return (
    <div>
      <Hero locale={params.locale} />
      <Reveal>
        <FeaturedMachinery locale={params.locale} />
      </Reveal>
      <Reveal>
        <WhySection />
      </Reveal>
      <Reveal>
        <section className="safe-px mx-auto max-w-7xl py-12 md:py-16 cq-section btf">
          <div className="rounded-xl p-6 bg-gradient-to-br from-inpharma-gradFrom to-inpharma-gradTo text-slate-900">
            <div className="font-semibold mb-1">Financing options tailored to you</div>
            <p className="text-sm opacity-90 mb-3 max-w-prose">Leasing and staged payments so your purchase matches your budget.</p>
            <Link href={`/${params.locale}/contact`} className="inline-flex bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 text-sm text-white btn-press">Talk to sales</Link>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="safe-px mx-auto max-w-7xl py-12 md:py-16 cq-section btf">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-slate-900 font-semibold mb-2" style={{fontSize:'var(--step-2)'}}>About</h3>
              <p className="text-slate-600 max-w-prose">Our supplement-production background means we understand your constraints and validation needs.</p>
            </div>
            <div className="md:justify-self-end">
              <Link href={`/${params.locale}/about`} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Learn more</Link>
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="safe-px mx-auto max-w-7xl py-12 md:py-16 cq-section btf">
          <div className="rounded-xl border border-slate-200 p-6 text-center">
            <h3 className="font-semibold mb-2" style={{fontSize:'var(--step-2)'}}>Ready to discuss your project?</h3>
            <Link href={`/${params.locale}/contact`} className="inline-flex rounded-lg bg-inpharma-blue text-white px-4 py-2 btn-press">Contact us</Link>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
