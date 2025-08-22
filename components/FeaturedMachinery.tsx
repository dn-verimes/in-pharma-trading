'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import Link from 'next/link'
import MachineryCard from '@/components/MachineryCard'
import { catalog, categories } from '@/lib/machines'

export default function FeaturedMachinery({ locale }: { locale: string }) {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  // Get category items from translations
  const items = t('categories.items', { returnObjects: true }) as string[]
  
  // Filter machines based on selected category
  const filteredMachines = selectedCategory 
    ? catalog.filter(machine => machine.category === selectedCategory)
    : catalog.slice(0, 6) // Show first 6 when no filter selected
  
  // Limit to 6 machines even when filtered
  const displayMachines = filteredMachines.slice(0, 6)

  return (
    <section className="safe-px mx-auto max-w-7xl py-12 md:py-16 cq-section btf">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-900 font-semibold" style={{fontSize:'var(--step-2)'}}>
          Featured Machinery
        </h2>
        <Link href={`/${locale}/machinery`} className="text-sm underline">
          All machinery
        </Link>
      </div>
      
      {/* Category Chips */}
      <div className="py-6">
        <m.div
          className="chips overflow-x-auto flex gap-2"
          initial={{ x: 10, opacity: 0.95 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.3, delay: 0.15 } }}
        >
          {/* "All" chip */}
          <m.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`inline-flex shrink-0 items-center rounded-full border px-3 py-2 text-sm transition-colors ${
              selectedCategory === null
                ? 'border-inpharma-blue bg-inpharma-blue text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            All
          </m.button>
          
          {/* Category chips */}
          {items.map((categoryName, i) => {
            const isSelected = selectedCategory === categories[i]
            return (
              <m.button
                key={i}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(categories[i])}
                className={`inline-flex shrink-0 items-center rounded-full border px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? 'border-inpharma-blue bg-inpharma-blue text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {categoryName}
              </m.button>
            )
          })}
        </m.div>
      </div>
      
      {/* Machinery Grid */}
      <div className="grid gap-4 mt-6 grid-cols-[repeat(auto-fill,minmax(18rem,24rem))]">
        {displayMachines.map(machine => (
          <MachineryCard key={machine.id} m={machine} locale={locale} />
        ))}
      </div>
      
      {/* Show message if no machines found */}
      {filteredMachines.length === 0 && selectedCategory && (
        <div className="text-center py-8 text-slate-600">
          No machines found in this category.
        </div>
      )}
    </section>
  )
}
