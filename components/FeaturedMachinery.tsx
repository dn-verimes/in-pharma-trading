'use client'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import Link from 'next/link'
import MachineryCard from '@/components/MachineryCard'
import MachineDialog from '@/components/MachineDialog'
import { catalog, categories, type Machine } from '@/lib/machines'

export default function FeaturedMachinery({ locale }: { locale: string }) {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAllOnMobile, setShowAllOnMobile] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  // Get category items from translations
  const items = t('categories.items', { returnObjects: true }) as string[]
  
  // Filter machines based on selected category
  const filteredMachines = selectedCategory 
    ? catalog.filter(machine => machine.category === selectedCategory)
    : catalog.slice(0, 6) // Show first 6 when no filter selected
  
  // Limit to 6 machines even when filtered
  const allDisplayMachines = filteredMachines.slice(0, 6)
  
  // For mobile: show only 2 initially, unless "show all" is clicked
  const displayMachines = showAllOnMobile ? allDisplayMachines : allDisplayMachines.slice(0, 2)
  
  // Reset mobile state when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setShowAllOnMobile(false)
  }

  // Handle machine card click
  const handleMachineClick = (machine: Machine) => {
    // Prevent multiple rapid clicks
    if (isDialogOpen) return
    
    setSelectedMachine(machine)
    setIsDialogOpen(true)
    
    // Update URL silently without triggering navigation
    if (typeof window !== 'undefined') {
      const newUrl = `/${locale}/machinery#${machine.id}`
      window.history.replaceState({ ...window.history.state, skipRouteChange: true }, '', newUrl)
    }
  }

  // Close dialog
  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedMachine(null)
    // Update URL silently without triggering navigation
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState({ ...window.history.state, skipRouteChange: true }, '', `/${locale}/`)
    }
  }

  // Check for hash on mount to open dialog if needed (copied from machinery page)
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

  return (
    <>
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
            onClick={() => handleCategoryChange(null)}
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
                onClick={() => handleCategoryChange(categories[i])}
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
      {/* Desktop: Show all machines in grid */}
      <div className="hidden md:grid gap-4 mt-6 grid-cols-[repeat(auto-fill,minmax(18rem,24rem))]">
        {allDisplayMachines.map(machine => (
          <MachineryCard key={machine.id} m={machine} locale={locale} onClick={handleMachineClick} updateRoute={false} />
        ))}
      </div>
      
      {/* Mobile: Show limited machines with Load more button */}
      <div className="md:hidden">
        <div className="grid gap-4 mt-6 grid-cols-1">
          {displayMachines.map(machine => (
            <MachineryCard key={machine.id} m={machine} locale={locale} onClick={handleMachineClick} updateRoute={false} />
          ))}
        </div>
        
        {/* Load More Button for Mobile */}
        {!showAllOnMobile && allDisplayMachines.length > 2 && (
          <div className="flex justify-center mt-6">
            <m.button
              onClick={() => setShowAllOnMobile(true)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors font-medium text-sm"
            >
              Load more ({allDisplayMachines.length - 2} more)
            </m.button>
          </div>
        )}
      </div>
      
      {/* Show message if no machines found */}
      {filteredMachines.length === 0 && selectedCategory && (
        <div className="text-center py-8 text-slate-600">
          No machines found in this category.
        </div>
      )}
    </section>

    {/* Machine Details Dialog - Outside section to avoid stacking context issues */}
    <MachineDialog
      machine={selectedMachine}
      isOpen={isDialogOpen}
      onClose={handleDialogClose}
      locale={locale}
    />
  </>
  )
}
