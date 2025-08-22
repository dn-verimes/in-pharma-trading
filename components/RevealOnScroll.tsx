'use client'
import { useEffect } from 'react'

export default function RevealOnScroll(){
  useEffect(()=>{
    const els = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => {
        if (e.isIntersecting){ e.target.classList.add('in') }
      })
    }, { threshold: 0.2 })
    els.forEach(el => io.observe(el))
    return ()=> io.disconnect()
  },[])
  return null
}
