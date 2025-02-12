export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/'
    },
    sitemap: 'https://hudsondigitalsolutions.com/sitemap.xml'
  }
}
