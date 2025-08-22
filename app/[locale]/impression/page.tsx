'use client'
import AnimatedImage from '@/components/AnimatedImage'

export default function Impression(){
  const images = Array.from({length:12}).map((_,i)=> `/images/gallery/${(i%6)+1}.jpg`)
  return (
    <div className="safe-px mx-auto max-w-7xl py-8 cq-section">
      <h1 className="text-slate-900 font-semibold mb-4" style={{fontSize:'var(--step-2)'}}>Impression</h1>
      <div className="grid gap-4" style={{gridTemplateColumns:'repeat(auto-fit,minmax(14rem,1fr))'}}>
        {images.map((src,i)=>(
          <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border">
            <AnimatedImage src={src} alt={`Machinery image ${i+1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}
