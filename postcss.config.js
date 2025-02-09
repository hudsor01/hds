module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'postcss-preset-env': {
            features: { 'nesting-rules': false },
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
          },
          cssnano: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }
      : {}),
  },
}
