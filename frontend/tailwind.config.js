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
      },
      scale: {
        '102': '1.02'
      }
    },
    fontFamily: {
      'sans': ['"Public Sans"', 'sans-serif']
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    visibility: ['responsive', 'group-hover'],
    display: ['responsive', 'motion-safe', 'motion-reduce'],
    cursor: ['responsive', 'hover', 'focus'],
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [
    require('tailwindcss-gap')({
      prefix: 'c-',   // defaults to 'c-'
      legacy: false,  // defaults to false, set to true to output IE-compatible CSS (no custom properties, but much larger CSS for the same functionality)
    }),
  ],
}
