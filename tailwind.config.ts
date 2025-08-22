import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        inpharma: {
          blue: '#2C499C',
          light: '#6576B4',
          gradFrom: '#B4BBD6',
          gradTo: '#2C499C'
        },
        slate: {
          900: '#0F172A',
          600: '#475569',
          100: '#F1F5F9'
        },
        state: {
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626'
        }
      },
      container: { center: true, padding: '1rem' }
    }
  },
  plugins: []
}
export default config
