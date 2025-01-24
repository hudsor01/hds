import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Pastel Blue Color Scale
        'pastel-blue': {
          DEFAULT: '#A7C7E7',
          50: '#F0F8FF',
          100: '#E0F0FF',
          200: '#C6E2FF',
          300: '#A7C7E7',
          400: '#87B3D9',
          500: '#679ECB',
          600: '#478ABD',
          700: '#2F6B9E',
          800: '#1E4A7F',
          900: '#0D2A60',
        },
        // Semantic Colors using Pastel Blue
        border: 'hsl(var(--pastel-blue-200))',
        input: 'hsl(var(--pastel-blue-200))',
        ring: 'hsl(var(--pastel-blue-300))',
        background: 'hsl(var(--pastel-blue-50))',
        foreground: 'hsl(var(--pastel-blue-900))',
        primary: {
          DEFAULT: 'hsl(var(--pastel-blue-300))',
          foreground: 'hsl(var(--pastel-blue-900))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--pastel-blue-100))',
          foreground: 'hsl(var(--pastel-blue-900))',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#F8FAFC',
        },
        muted: {
          DEFAULT: 'hsl(var(--pastel-blue-100))',
          foreground: 'hsl(var(--pastel-blue-500))',
        },
        accent: {
          DEFAULT: 'hsl(var(--pastel-blue-100))',
          foreground: 'hsl(var(--pastel-blue-900))',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: 'hsl(var(--pastel-blue-900))',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: 'hsl(var(--pastel-blue-900))',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};

export default config;
