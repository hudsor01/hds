export default async function sitemap(): Promise<{ url: string; lastModified: Date }[]> {
  return [
    {
      url: 'https://hudsondigitalsolutions.com',
      lastModified: new Date()
    },
    {
      url: 'https://hudsondigitalsolutions.com/features',
      lastModified: new Date()
    }
  ]
}
