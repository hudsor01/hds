import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#A7E7D9',
          foreground: '#1F2937',
        },
        secondary: {
          DEFAULT: '#C7A7E7',
          foreground: '#1F2937',
        },
        tertiary: {
          DEFAULT: '#A7C7E7',
          foreground: '#1F2937',
        },
        // Aliases for easier reference
        'teal-soft': '#A7E7D9',
        'lavender': '#C7A7E7',
        'blue-soft': '#A7C7E7',
        // System colors
        background: '#FFFFFF',
        foreground: '#1F2937',
        border: '#E5E7EB',
        ring: '#A7E7D9',
      },
      'pastel-blue': {
        50: '#F0F8FF',
        100: '#E1F0FF',
        200: '#B9DCFF',
        300: '#91C8FF',
        400: '#69B4FF',
        500: '#41A0FF',
        600: '#1A8CFF',
        700: '#0078FF',
        800: '#0064D6',
        900: '#0050AD',
      },
      'teal-soft': '#A7E7D9',
      'lavender': '#C7A7E7',
    }
  },
  plugins: [
    typography,
    aspectRatio,
    forms,
    animate,
  ],
}

export default config
