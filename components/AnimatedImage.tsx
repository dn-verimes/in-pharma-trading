'use client'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { motion as m } from 'framer-motion'

export default function AnimatedImage(props: ImageProps) {
  const [ready, setReady] = useState(false)
  return (
    <m.div 
      className="w-full h-full" 
      initial={{ opacity: 0.0001 }} 
      animate={{ opacity: ready ? 1 : 0.0001, transition: { duration: 0.25 } }}
    >
      <Image {...props} onLoad={() => setReady(true)} />
    </m.div>
  )
}
