import React from 'react'

export default function Logo({ className = 'h-8 w-auto' }: { className?: string }){
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="In Pharma Trading">
      <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#B4BBD6" />
            <stop offset="100%" stopColor="#2C499C" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#g)" opacity="0.15" />
        <path d="M8 40c8-10 20-10 28 0" stroke="#2C499C" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M28 24c8-10 20-10 28 0" stroke="#2C499C" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".7"/>
      </svg>
      <span className="text-[var(--step-1)] font-semibold tracking-tight text-inpharma-blue">In Pharma Trading</span>
    </div>
  )
}
