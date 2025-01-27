/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-nesting': {
      prefixer: false
    }
  }
}
