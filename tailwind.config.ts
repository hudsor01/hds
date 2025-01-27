import type { Config } from 'tailwindcss'

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
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0,0,0,0.05)',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Pastel Blue Color Scale
        'pastel-blue': {
          DEFAULT: '#A7C7E7',
          50: '#f5fbff',
    100: '#e6f4fe',
    200: '#c3e6fd',
    300: '#90d2fc',
    400: '#5abcf7',
    500: '#2ea5f0',
    600: '#0d8bd9',
    700: '#0a6cb0',
    800: '#08558a',
    900: '#063c61',
  },
  'accent-teal': {
    100: '#e6faf5',
    200: '#bff2e6',
    300: '#80e4d0',
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
