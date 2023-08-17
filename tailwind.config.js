/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': {'min': '320px', 'max': '639px'},
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        code: [
          'source-code-pro',
          'Menlo',
          'Monaco',
          'Consolas',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
