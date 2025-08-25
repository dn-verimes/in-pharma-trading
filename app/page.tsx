'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Simple redirect to English for now
    router.replace('/en')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">In Pharma Trading</h1>
        <p className="text-slate-600">Redirecting...</p>
      </div>
    </div>
  )
}
