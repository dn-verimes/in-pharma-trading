'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

export default function Contact(){
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

  return (
    <div className="safe-px mx-auto max-w-3xl py-8 cq-section">
      <h1 className="text-slate-900 font-semibold mb-4" style={{fontSize:'var(--step-2)'}}>Contact</h1>
      {isSubmitSuccessful && <div role="status" aria-live="polite" className="mb-4 rounded-lg bg-green-50 text-green-800 px-3 py-2">Thanks — we’ll get back to you shortly.</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 [container-type:inline-size]">
        <div className="grid gap-4 @container section-[min-width:640px]:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input {...register('name')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Company</label>
            <input {...register('company')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
        </div>
        <div className="grid gap-4 @container section-[min-width:640px]:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" inputMode="email" {...register('email')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Phone</label>
            <input type="tel" inputMode="tel" {...register('phone')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
        </div>
        <div className="grid gap-4 @container section-[min-width:640px]:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Country</label>
            <input {...register('country')} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="text-sm font-medium">Category of interest</label>
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
          <label className="text-sm font-medium">Message</label>
          <textarea {...register('message')} rows={6} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium">Attach file (optional)</label>
          <input id="file" type="file" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('consent')} className="h-4 w-4" />
          <span>I consent to be contacted about my inquiry.</span>
        </label>
        {errors.consent && <p className="text-xs text-red-600 mt-1">{errors.consent.message}</p>}
        <button disabled={isSubmitting} className="rounded-lg bg-inpharma-blue text-white px-4 py-2 disabled:opacity-60">{isSubmitting ? 'Sending…' : 'Send request'}</button>
      </form>
    </div>
  )
}
