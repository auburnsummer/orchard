module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-font-magician')({
      foundries: 'bootstrap google',
      protocol: 'https:'
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ]
}