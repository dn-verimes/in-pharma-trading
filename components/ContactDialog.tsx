'use client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useForm as useFormspree } from '@formspree/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion as m, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const createSchema = (t: any) => z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  category: z.string().optional(),
  message: z.string().min(10),
  consent: z.literal(true, { errorMap: () => ({ message: t('contact.consentRequired') }) })
})
type FormData = z.infer<ReturnType<typeof createSchema>>

interface ContactDialogProps {
  isOpen: boolean
  onClose: () => void
  prefilledMachine?: string // Optional machine name to prefill
}

export default function ContactDialog({ isOpen, onClose, prefilledMachine }: ContactDialogProps) {
  const { t } = useTranslation()
  const schema = createSchema(t)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  const [state, submitToFormspree] = useFormspree("mnnbqzdq")

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

  // Prefill message with machine information when provided
  useEffect(() => {
    if (prefilledMachine && isOpen) {
      setValue('message', `I am interested in the ${prefilledMachine}. Please provide more information about availability, pricing, and technical specifications.`)
    }
  }, [prefilledMachine, isOpen, setValue])

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  async function onSubmit(values: FormData) {
    // Create form data for Formspree
    const formData = new FormData()
    
    // Add all form fields
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })
    
    // Add machine information if provided
    if (prefilledMachine) {
      formData.append('machine_interest', prefilledMachine)
    }
    
    // Add file if present
    const fileEl = (document.getElementById('contact-file') as HTMLInputElement)
    if (fileEl?.files?.[0]) {
      formData.append('file', fileEl.files[0])
    }
    
    // Submit to Formspree
    await submitToFormspree(formData)
    
    if (state.succeeded) {
      reset()
      // Auto-close dialog after successful submission
      setTimeout(() => onClose(), 2000)
    }
  }

  if (!isOpen) return null

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
          
          {/* Dialog Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 shrink-0">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">{t('contact.title')}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-6">
                  {/* Success Message */}
                  {state.succeeded && (
                    <div role="status" aria-live="polite" className="mb-6 rounded-lg bg-green-50 text-green-800 px-4 py-3 text-sm">
                      {t('contact.success')}
                    </div>
                  )}
                  
                  {/* Error Message */}
                  {state.errors && (
                    <div role="alert" aria-live="polite" className="mb-6 rounded-lg bg-red-50 text-red-800 px-4 py-3 text-sm">
                      {t('contact.error')}
                    </div>
                  )}

                  {/* Subtitle */}
                  <p className="text-slate-600 mb-6 text-sm">{t('contact.subtitle')}</p>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name and Company Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t('contact.name')} <span className="text-red-500">*</span>
                        </label>
                        <input 
                          {...register('name')} 
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.company')}</label>
                        <input 
                          {...register('company')} 
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t('contact.email')} <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          inputMode="email" 
                          {...register('email')} 
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.phone')}</label>
                        <input 
                          type="tel" 
                          inputMode="tel" 
                          {...register('phone')} 
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                    </div>

                    {/* Country and Category Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.country')}</label>
                        <input 
                          {...register('country')} 
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.category')}</label>
                        <select 
                          {...register('category')} 
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select…</option>
                          <option>Blister</option>
                          <option>Capsule Filling</option>
                          <option>Tablet Press</option>
                          <option>Mixing</option>
                          <option>Filling/Sealing</option>
                          <option>Counting</option>
                          <option>Induction</option>
                          <option>Deblistering</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t('contact.message')} <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        {...register('message')} 
                        rows={5} 
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical" 
                      />
                      {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.file')}</label>
                      <input 
                        id="contact-file" 
                        type="file" 
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      />
                    </div>

                    {/* Consent */}
                    <div>
                      <label className="flex items-start gap-3 text-sm">
                        <input 
                          type="checkbox" 
                          {...register('consent')} 
                          className="h-4 w-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="text-slate-700">
                          {t('contact.consent')} <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.consent && <p className="text-xs text-red-600 mt-1">{errors.consent.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={state.submitting} 
                        className="w-full sm:w-auto rounded-lg bg-inpharma-blue text-white px-6 py-2.5 font-medium text-sm disabled:opacity-60 hover:bg-blue-700 transition-colors"
                      >
                        {state.submitting ? 'Sending…' : t('contact.submit')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </m.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
