import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#1a1a1a',
        link: '#2563eb', // Blue-600
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '680px',
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#1a1a1a',
            a: {
              color: '#0066CC',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}
export default config

