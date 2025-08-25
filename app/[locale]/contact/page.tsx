'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import HeroSection from '@/components/HeroSection'
import { useTranslation } from 'react-i18next'
import { motion as m } from 'framer-motion'
import { useNavigation } from '@/components/NavigationContext'
import Image from 'next/image'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  category: z.string().optional(),
  message: z.string().min(10),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent required' }) })
})
type FormData = z.infer<typeof schema>

export default function Contact({ params }: { params: { locale: string } }){
  const { t } = useTranslation()
  const { direction } = useNavigation()
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  async function onSubmit(values: FormData){
    const fd = new FormData()
    Object.entries(values).forEach(([k,v])=> fd.append(k, String(v)))
    const fileEl = (document.getElementById('file') as HTMLInputElement)
    if (fileEl?.files?.[0]) fd.append('file', fileEl.files[0])
    const res = await fetch('/api/contact', { method: 'POST', body: fd })
    if (res.ok) reset()
    else alert('Error')
  }

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
                {t('contact.title')}
              </m.h1>
              <m.p 
                className="mt-4 text-slate-100/95" 
                style={{fontSize:'var(--step-0)'}}
                variants={childVariants}
              >
                {t('contact.subtitle')}
              </m.p>
            </m.div>
          </div>
        </div>
      </section>
      <div className="safe-px mx-auto max-w-3xl py-8 cq-section">
        {isSubmitSuccessful && <div role="status" aria-live="polite" className="mb-4 rounded-lg bg-green-50 text-green-800 px-3 py-2">{t('contact.success')}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 [container-type:inline-size]">
          <div className="grid gap-4 @container section-[min-width:640px]:grid-cols-2">
            <div>
              <label className="text-sm font-medium">{t('contact.name')}</label>
              <input {...register('name')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">{t('contact.company')}</label>
              <input {...register('company')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </div>
          </div>
          <div className="grid gap-4 @container section-[min-width:640px]:grid-cols-2">
            <div>
              <label className="text-sm font-medium">{t('contact.email')}</label>
              <input type="email" inputMode="email" {...register('email')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">{t('contact.phone')}</label>
              <input type="tel" inputMode="tel" {...register('phone')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </div>
          </div>
          <div className="grid gap-4 @container section-[min-width:640px]:grid-cols-2">
            <div>
              <label className="text-sm font-medium">{t('contact.country')}</label>
              <input {...register('country')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">{t('contact.category')}</label>
              <select {...register('category')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
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
          <div>
            <label className="text-sm font-medium">{t('contact.message')}</label>
            <textarea {...register('message')} rows={6} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">{t('contact.file')}</label>
            <input id="file" type="file" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('consent')} className="h-4 w-4" />
            <span>{t('contact.consent')}</span>
          </label>
          {errors.consent && <p className="text-xs text-red-600 mt-1">{errors.consent.message}</p>}
          <button disabled={isSubmitting} className="rounded-lg bg-inpharma-blue text-white px-4 py-2 disabled:opacity-60">{isSubmitting ? 'Sending…' : t('contact.submit')}</button>
        </form>
      </div>
    </div>
  )
}
