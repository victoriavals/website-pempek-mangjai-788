import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Backgrounds
          bg: '#F4ECD8',          // oat cream — warm body bg
          'bg-soft': '#FAF5E6',   // softer cream for alternate sections
          surface: '#FFFFFF',     // pure white for cards
          // Brand identity
          primary: '#2D4A2F',     // deep forest green — CTAs, links
          'primary-hover': '#243A26',
          secondary: '#A8302E',   // brick red — accents, badges
          accent: '#C9A85B',      // champagne gold — premium accent
          'accent-soft': '#E5D5A8',
          // Text
          text: '#1A1815',        // warm charcoal
          'text-muted': '#7A6F60',// warm gray-brown
          'text-soft': '#A89C8A', // softest caption
          // Borders
          border: '#E0D5BD',      // warm border
          'border-soft': '#EEE6D2',
          // External
          wa: '#25D366',
          'wa-hover': '#1FB855',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          md: '2rem',
          lg: '3rem',
        },
        screens: {
          '2xl': '1240px',
        },
      },
      letterSpacing: {
        'wide-display': '-0.02em',
        'tight-display': '-0.04em',
      },
      animation: {
        'subtle-float': 'subtle-float 6s ease-in-out infinite',
      },
      keyframes: {
        'subtle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
