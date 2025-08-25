'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type NavigationDirection = 'left' | 'right' | null

interface NavigationContextType {
  direction: NavigationDirection
  setDirection: (direction: NavigationDirection) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

// Define page order for determining direction
const pageOrder = [
  'home',      // /[locale]
  'machinery', // /[locale]/machinery  
  'impression',// /[locale]/impression
  'about',     // /[locale]/about
  'contact'    // /[locale]/contact
]

function getPageFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 1) return 'home' // Just locale
  return segments[1] || 'home'
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<NavigationDirection>(null)
  const [previousPath, setPreviousPath] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    if (previousPath && pathname !== previousPath) {
      const currentPage = getPageFromPath(pathname)
      const previousPage = getPageFromPath(previousPath)
      
      const currentIndex = pageOrder.indexOf(currentPage)
      const previousIndex = pageOrder.indexOf(previousPage)
      
      if (currentIndex > previousIndex) {
        setDirection('left') // Moving forward in the flow
      } else if (currentIndex < previousIndex) {
        setDirection('right') // Moving backward in the flow
      } else {
        setDirection(null) // Same page or unknown
      }
    }
    
    setPreviousPath(pathname)
  }, [pathname, previousPath])

  return (
    <NavigationContext.Provider value={{ direction, setDirection }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    // Return a fallback instead of throwing error to prevent blank screens
    return { direction: null, setDirection: () => {} }
  }
  return context
}

