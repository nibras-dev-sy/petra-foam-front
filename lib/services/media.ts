const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * Get the URL for a Strapi media item
 */
export function getStrapiMediaUrl(url: string | null): string | null {
  if (!url) return null;
  
  // If the URL is a relative URL, append the API URL
  if (url.startsWith('/')) {
    return `${API_URL}${url}`;
  }
  
  // If it's already an absolute URL, return it as is
  return url;
}

/**
 * Format the Strapi media response
 */
export function formatStrapiMedia(media: any) {
  if (!media) return null;
  
  const { url, alternativeText, width, height } = media.data?.attributes || {};
  
  return {
    url: getStrapiMediaUrl(url),
    alt: alternativeText || '',
    width,
    height,
  };
} 