'use client'
import { catalog, categories, type Machine } from '@/lib/machines'
import MachineryCard from '@/components/MachineryCard'
import MachineDialog from '@/components/MachineDialog'
import { useMemo, useState, useEffect } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/components/NavigationContext'
import Image from 'next/image'

export default function Machinery({ params }: { params: { locale: string } }){
  const { t } = useTranslation()
  const { direction } = useNavigation()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string[]>([])
  const [cond, setCond] = useState<string>('')
  const [avail, setAvail] = useState<string>('')
  const [cap, setCap] = useState<number>(0)
  const [open, setOpen] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Handle machine card click
  const handleMachineClick = (machine: Machine) => {
    // Prevent multiple rapid clicks
    if (isDialogOpen) return
    
    setSelectedMachine(machine)
    setIsDialogOpen(true)
    
    // Update URL silently without triggering navigation
    if (typeof window !== 'undefined') {
      const newUrl = `/${params.locale}/machinery#${machine.id}`
      window.history.replaceState({ ...window.history.state, skipRouteChange: true }, '', newUrl)
    }
  }

  // Close dialog
  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedMachine(null)
    // Update URL silently without triggering navigation
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState({ ...window.history.state, skipRouteChange: true }, '', `/${params.locale}/machinery`)
    }
  }

  // Check for hash on mount to open dialog if needed
  useEffect(() => {
    // Only run on initial mount, not on re-renders
    const hash = window.location.hash.slice(1) // Remove the #
    if (hash && !isDialogOpen) {
      const machine = catalog.find(m => m.id === hash)
      if (machine) {
        setSelectedMachine(machine)
        setIsDialogOpen(true)
      }
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  const filtered = useMemo(()=>{
    return catalog.filter(m => {
      const matchQ = q ? (m.name.toLowerCase().includes(q.toLowerCase()) || m.shortDescription.toLowerCase().includes(q.toLowerCase())) : true
      const matchC = cat.length ? cat.includes(m.category) : true
      const matchCond = cond ? m.condition === cond : true
      const matchAvail = avail ? (avail==='In stock' ? m.status==='In stock' : m.status==='On request') : true
      const matchCap = cap ? (m.capacity || 0) >= cap : true
      return matchQ && matchC && matchCond && matchAvail && matchCap
    })
  }, [q, cat, cond, avail, cap])

  // Directional animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      y: direction ? 0 : 8
    },
    show: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.2, 0.65, 0.3, 0.9] as any,
        staggerChildren: 0.1
      }
    }
  }

  const childVariants = {
    hidden: { 
      opacity: 0, 
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      y: direction ? 0 : 6
    },
    show: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] as any }
    }
  }

  return (
    <div>
      <section 
        className="relative overflow-hidden bg-gradient-to-b from-inpharma-gradFrom to-inpharma-gradTo text-slate-900" 
        style={{ height: '400px' }}
      >
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/images/hero.jpg" 
            alt="" 
            fill 
            priority 
            sizes="100vw" 
            className="object-cover" 
          />
        </div>
        <div className="absolute inset-0 flex items-center" style={{ zIndex: 20 }}>
          <div className="safe-px mx-auto max-w-7xl w-full py-16 md:py-24">
            <m.div 
              className="max-w-2xl" 
              initial="hidden" 
              animate="show"
              variants={containerVariants}
            >
              <m.h1 
                className="text-white font-semibold leading-tight" 
                style={{fontSize:'var(--step-3)'}}
                variants={childVariants}
              >
                {t('machinery.title')}
              </m.h1>
              <m.p 
                className="mt-4 text-slate-100/95" 
                style={{fontSize:'var(--step-0)'}}
                variants={childVariants}
              >
                {t('machinery.subtitle')}
              </m.p>
            </m.div>
          </div>
        </div>
      </section>
      <div className="safe-px mx-auto max-w-7xl py-8 cq-section">
      <div className="md:hidden mb-3">
        <button onClick={()=>setOpen(v=>!v)} className="rounded-lg border px-3 py-2 text-sm">Filters</button>
      </div>
      
      {/* Mobile filters - collapsible */}
      <AnimatePresence initial={false}>
        {open && (
          <m.aside
            key="mobile-filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.18 } }}
            className="md:hidden overflow-hidden rounded-xl border border-slate-200 p-4 mb-6"
          >
            <div className="mb-3">
              <label className="text-sm font-medium">Keyword</label>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">Category</div>
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button key={c} onClick={()=> setCat(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c])} className={`px-3 py-1 rounded-full border text-sm ${cat.includes(c)?'bg-inpharma-blue text-white border-inpharma-blue':'border-slate-300'}`}>{c}</button>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium">Condition</label>
              <select value={cond} onChange={e=>setCond(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="">Any</option>
                <option>New</option>
                <option>Refurbished</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium">Availability</label>
              <select value={avail} onChange={e=>setAvail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="">Any</option>
                <option>In stock</option>
                <option>On request</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium">Min capacity</label>
              <input type="number" value={cap} onChange={e=>setCap(Number(e.target.value)||0)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <button onClick={()=>{ setQ(''); setCat([]); setCond(''); setAvail(''); setCap(0); }} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">Reset</button>
          </m.aside>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-[18rem,1fr]">
        {/* Desktop filters - always visible */}
        <aside className="hidden md:block rounded-xl border border-slate-200 p-4 md:sticky md:top-20 self-start">
          <div className="mb-3">
            <label className="text-sm font-medium">Keyword</label>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Category</div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={()=> setCat(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c])} className={`px-3 py-1 rounded-full border text-sm ${cat.includes(c)?'bg-inpharma-blue text-white border-inpharma-blue':'border-slate-300'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="text-sm font-medium">Condition</label>
            <select value={cond} onChange={e=>setCond(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="">Any</option>
              <option>New</option>
              <option>Refurbished</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="text-sm font-medium">Availability</label>
            <select value={avail} onChange={e=>setAvail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="">Any</option>
              <option>In stock</option>
              <option>On request</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="text-sm font-medium">Min capacity</label>
            <input type="number" value={cap} onChange={e=>setCap(Number(e.target.value)||0)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <button onClick={()=>{ setQ(''); setCat([]); setCond(''); setAvail(''); setCap(0); }} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">Reset</button>
        </aside>
        <section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
          {filtered.map(m => <div id={m.id} key={m.id}><MachineryCard m={m} locale={params.locale} onClick={handleMachineClick} updateRoute={false} /></div>)}
          {!filtered.length && <div className="text-sm text-slate-600">No results.</div>}
        </section>
      </div>
    </div>
    
    {/* Machine Details Dialog */}
    <MachineDialog
      machine={selectedMachine}
      isOpen={isDialogOpen}
      onClose={handleDialogClose}
      locale={params.locale}
    />
    </div>
  )
}
