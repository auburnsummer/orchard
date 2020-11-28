const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  experimental: {
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true,
    applyComplexClasses: true
  },
  purge: {
    layers: ['base', 'components', 'utilities'],
    content: [
      './src/**/*.js',
      './src/**/*.jsx'
    ]
  },
  theme: {
    extend: {
      borderWidth: {
        '1r' : '0.25rem'
      },
      colors: {
        gray: colors.warmGray,
        orange: colors.orange,
        teal: colors.teal
      },
      spacing: {
        '1/2'  : '50%',
        '9/16' : '56.25%',
        '1/1'  : '100%'
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      scale: {
        '102': '1.02'
      },
      maxWidth: {
        'screen-2xl' : '1440px'
      }
    },
    fontFamily: {
      'sans': ['"Public Sans"', 'sans-serif']
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    visibility: ['responsive', 'hover', 'group-hover', 'motion-safe'],
    display: ['responsive', 'motion-safe', 'motion-reduce'],
    cursor: ['responsive', 'hover', 'focus'],
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    padding: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'hover', 'focus'],
    margin: ['responsive', 'first'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'motion-safe', 'motion-reduce'],
    scale: ['responsive', 'hover', 'motion-reduce'],
    translate: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'motion-safe', 'motion-reduce'],
    duration: ['responsive', 'motion-safe']
  },
  plugins: [
    require('tailwindcss-gap')({
      prefix: 'c-',   // defaults to 'c-'
      legacy: false,  // defaults to false, set to true to output IE-compatible CSS (no custom properties, but much larger CSS for the same functionality)
    }),
    require('@tailwindcss/typography')
  ],
}
