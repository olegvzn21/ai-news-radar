/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 24px 80px rgba(56, 189, 248, 0.18)'
      }
    }
  },
  plugins: []
};

export default config;
