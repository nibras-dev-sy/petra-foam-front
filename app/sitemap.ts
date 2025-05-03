import { MetadataRoute } from 'next'
import { i18n } from '@/lib/i18n-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://petra-foam.com'
  
  // Define routes - add more as your site grows
  const routes = [
    '',              // home
    '/products',     // products
    '/about-us',     // about us
    '/contact-us',   // contact us
  ]
  
  // For each language, create a sitemap entry for each route
  const sitemap: MetadataRoute.Sitemap = i18n.locales.flatMap(locale => {
    return routes.map(route => {
      const path = route ? `/${locale}${route}` : `/${locale}`
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8, // Home page gets highest priority
      }
    })
  })
  
  return sitemap
} 