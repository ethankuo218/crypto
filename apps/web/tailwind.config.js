/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00EFDF',
        background: '#18191D',
        text: {
          primary: '#FFFFFF',
          secondary: '#B1B5C3',
          tertiary: '#CFCFCF',
        },
        rise: '#0ECB81',
        fall: '#F6465D',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.truncate-3-lines': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },
      });
    },
  ],
};
