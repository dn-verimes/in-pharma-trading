import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'de', 'nl']
const defaultLocale = 'en'

function getLocale(req: NextRequest){
  const cookie = req.cookies.get('NEXT_LOCALE')?.value
  if (cookie && locales.includes(cookie)) return cookie

  const header = req.headers.get('accept-language') || ''
  const preferred = header.split(',').map(p => p.split(';')[0].trim().toLowerCase())
  for (const lang of preferred){
    const base = lang.split('-')[0]
    if (locales.includes(base)) return base
  }
  return defaultLocale
}

export function middleware(req: NextRequest){
  // Skip middleware for static export
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true') {
    return NextResponse.next()
  }

  const { pathname } = req.nextUrl
  const isAsset = pathname.startsWith('/_next') || pathname.includes('.') || pathname.startsWith('/api')
  if (isAsset) return NextResponse.next()

  const pathLocale = pathname.split('/').filter(Boolean)[0]
  if (!locales.includes(pathLocale || '')){
    const locale = getLocale(req)
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\..*).*)']
}
