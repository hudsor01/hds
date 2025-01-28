import { type Config } from 'tailwindcss';

const config = withMT({
  darkMode: ['class', 'dark'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
  plugins: [],
}) satisfies Config;

export default config;
function withMT(arg0: {
  darkMode: string[];
  content: string[];
  theme: {
    extend: {
      colors: {
        border: string;
        input: string;
        ring: string;
        background: string;
        foreground: string;
        primary: { DEFAULT: string; foreground: string };
        secondary: { DEFAULT: string; foreground: string };
        destructive: { DEFAULT: string; foreground: string };
        muted: { DEFAULT: string; foreground: string };
        accent: { DEFAULT: string; foreground: string };
        popover: { DEFAULT: string; foreground: string };
        card: { DEFAULT: string; foreground: string };
      };
      borderRadius: { lg: string; md: string; sm: string };
    };
  };
  plugins: never[];
}): import('node_modules/tailwindcss/dist/types-BTRmm49E.mjs').U {
  throw new Error('Function not implemented.');
}
