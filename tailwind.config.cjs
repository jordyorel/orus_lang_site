module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#333333',
        gold: '#d4af37'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        code: ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
};
