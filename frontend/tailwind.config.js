module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  experimental: {
    uniformColorPalette: true,
    extendedSpacingScale: true,
    defaultLineHeights: true,
    extendedFontSizeScale: true
  },
  purge: {
    mode: 'all',
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
        gray: {
          '100': 'hsl(40, 23%, 94%)',
          '200': 'hsl(43, 13%, 83%)',
          '300': 'hsl(40,  9%, 72%)',
          '400': 'hsl(39,  6%, 63%)',
          '500': 'hsl(41,  4%, 50%)',
          '600': 'hsl(41,  4%, 37%)',
          '700': 'hsl(41,  4%, 28%)',
          '800': 'hsl(37, 11%, 24%)',
          '900': 'hsl(42, 15%, 13%)'
        }
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
    borderWidth: ['responsive', 'hover', 'focus']
  },
  plugins: [
    require('tailwindcss-gap')({
      prefix: 'c-',   // defaults to 'c-'
      legacy: false,  // defaults to false, set to true to output IE-compatible CSS (no custom properties, but much larger CSS for the same functionality)
    }),
  ],
}
