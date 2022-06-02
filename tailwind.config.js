module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "dorado": "#F8CB3C",
        "amarillo-claro": "#FCF489",
        "amarillo-oscuro": "#FFE763",
        "marron": "#2C110A",
        "marron-claro": "#AF875D"
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
        '2xbig': '645px',
        'xbig': '610px',
        'big': '580px',
        'xmid': '350px',
        'mid': '275px',
        'small': '200px',
        'very-small': '70px'
      }
    },
  },
  plugins: [],
}
