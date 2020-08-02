module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      spacing: {
        '9/16' : '56.25%'
      },
      fontSize: {
        '2xs': '0.625rem'
      }
    },
    fontFamily: {
      'sans': '\'Public Sans\', sans-serif'
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss-gap')({
      prefix: 'c-',   // defaults to 'c-'
      legacy: false,  // defaults to false, set to true to output IE-compatible CSS (no custom properties, but much larger CSS for the same functionality)
    }),
  ],
}
