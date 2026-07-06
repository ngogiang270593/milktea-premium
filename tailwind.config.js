export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#0D3B2E',
          mint: '#CDEDF6',
          peach: '#F8C3B6',
          gold: '#D3A86A'
        }
      },
      boxShadow: {
        glow: '0 20px 80px rgba(13,59,46,0.12)'
      }
    }
  },
  plugins: []
};
