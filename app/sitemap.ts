import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/machinery', '/about', '/impression', '/contact']
  const locales = ['en','de','nl']
  const base = 'https://inpharmatrading.nl'
  const items: MetadataRoute.Sitemap = []
  for (const l of locales){
    for (const r of routes){
      items.push({ url: `${base}/${l}${r}`, changeFrequency: 'weekly', priority: r===''?1:0.7 })
    }
  }
  return items
}
