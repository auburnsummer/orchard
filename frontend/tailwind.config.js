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
    enabled: false
  },
  // purge: {
  //   mode: 'all',
  //   content: [
  //     './src/**/*.js',
  //     './src/**/*.jsx',
  //     './src/**/*.css'
  //   ]
  // },
  theme: {
    extend: {
      borderWidth: {
        '1r' : '0.25rem'
      },
      colors: {
        ...require('./palette.json')
      },
      spacing: {
        '9/16' : '56.25%'
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
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'active', 'group-hover', 'motion-safe']
  },
  plugins: [
    require('tailwindcss-gap')({
      prefix: 'c-',   // defaults to 'c-'
      legacy: false,  // defaults to false, set to true to output IE-compatible CSS (no custom properties, but much larger CSS for the same functionality)
    }),
  ],
}
