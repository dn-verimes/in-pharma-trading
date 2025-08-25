'use client'
import { useEffect, useState } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Machine } from '@/lib/machines'
import { useTranslation } from 'react-i18next'
import AnimatedImage from '@/components/AnimatedImage'

interface MachineDialogProps {
  machine: Machine | null
  isOpen: boolean
  onClose: () => void
  locale: string
}

export default function MachineDialog({ machine, isOpen, onClose, locale }: MachineDialogProps) {
  const { t } = useTranslation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Reset image index when machine changes
  useEffect(() => {
    if (machine) {
      setCurrentImageIndex(0)
    }
  }, [machine])

  // Image navigation handlers
  const nextImage = () => {
    if (machine && machine.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % machine.images.length)
    }
  }

  const prevImage = () => {
    if (machine && machine.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + machine.images.length) % machine.images.length)
    }
  }

  if (!machine) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />
          
          {/* Dialog Container - Centered with flexbox */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-4xl h-full max-h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">{machine.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-6 space-y-6">
                {/* Image Gallery and Contact Button */}
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {/* Image Gallery */}
                  <div className="relative flex-1">
                    <div className="aspect-[4/3] max-h-64 relative rounded-lg overflow-hidden bg-slate-100">
                      <AnimatedImage
                        src={machine.images[currentImageIndex]}
                        alt={`${machine.name} - Image ${currentImageIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      
                      {/* Image Navigation */}
                      {machine.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                    
                    {/* Image Indicators */}
                    {machine.images.length > 1 && (
                      <div className="flex justify-center mt-3 space-x-2">
                        {machine.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contact CTA - Always visible next to image */}
                  <div className="bg-slate-50 rounded-lg p-4 md:p-6 md:w-80 shrink-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('machinery.interested')}</h3>
                    <p className="text-slate-600 mb-4 text-sm">{t('machinery.contactDescription')}</p>
                    <a
                      href={`/${locale}/contact`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full justify-center"
                    >
                      {t('machinery.contactUs')}
                    </a>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('machinery.details')}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{t('machinery.category')}:</span>
                        <span className="font-medium">{machine.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">{t('machinery.status')}:</span>
                        <span className={`font-medium ${machine.status === 'In stock' ? 'text-green-600' : 'text-orange-600'}`}>
                          {machine.status === 'In stock' ? t('machinery.status.in') : t('machinery.status.req')}
                        </span>
                      </div>
                      {machine.condition && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">{t('machinery.condition')}:</span>
                          <span className="font-medium">{machine.condition}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('machinery.keySpecs')}</h3>
                    <div className="space-y-2">
                      {machine.keySpecs.map((spec, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-slate-600">{spec.label}:</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('machinery.description')}</h3>
                  <p className="text-slate-600 leading-relaxed">{machine.shortDescription}</p>
                </div>
              </div>
            </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
