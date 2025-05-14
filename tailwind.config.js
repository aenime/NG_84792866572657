/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        'site': '500px',
      },
      colors: {
        'brand-primary': '#4a90e2',
        'brand-secondary': '#50b768',
        'brand-accent': '#f5a623',
        'blue': {
          '500': '#3b82f6',
          '600': '#2563eb',
          '700': '#1d4ed8',
        },
        'green': {
          '600': '#16a34a',
        },
      },
    },
  },
  plugins: [],
}