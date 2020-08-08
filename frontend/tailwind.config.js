module.exports = {
  purge: {
    mode: 'all',
    content: [
      './src/**/*.js',
      './src/**/*.jsx'
    ]
  },
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
      'sans': ['"Public Sans"', 'sans-serif']
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    visibility: ['group-hover']
  },
  plugins: [
    require('tailwindcss-gap')({
      prefix: 'c-',   // defaults to 'c-'
      legacy: false,  // defaults to false, set to true to output IE-compatible CSS (no custom properties, but much larger CSS for the same functionality)
    }),
  ],
}
