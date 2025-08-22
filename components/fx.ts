// components/fx.ts
export const fx = {
  fadeUp: {
    hidden: { opacity: 1, y: 0 },  // Start visible to ensure content shows
    show:   { opacity: 1, y: 0, transition: { duration: 0.4 } }
  },
  fade: {
    hidden: { opacity: 1 },  // Start visible to ensure content shows
    show:   { opacity: 1, transition: { duration: 0.4 } }
  },
  scaleIn: {
    hidden: { opacity: 1, scale: 1 },  // Start visible to ensure content shows
    show:   { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  }
} as const
