module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "dorado": "#F8CB3C",
        "amarillo-claro": "#FCF489",
        "amarillo-oscuro": "#FFE763",
        "marron": "#2C110A",
        "marron-claro": "#AF875D",
      },
      fontFamily: {
        'montaga': 'Montaga',
        'cylburn': 'Cylburn'
      },
      screens: {
        'tablet': '600px',
        'desktop_full': '1400px',
      },
      maxWidth: {
        '2xbig': '660px',
        'xbig': '630px',
        'big': '600px',
        'mid': '300px',
        'small': '200px',
        'very-small': '70px'
      }
    },
  },
  plugins: [],
}
