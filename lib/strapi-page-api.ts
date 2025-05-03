import { Locale } from './i18n-config';
import { getHomePageData, getProductsData as fetchProductsData } from './services/strapi';
import { getStrapiMediaUrl } from './services/media';

/**
 * Get hero section data from Strapi or use fallback dictionary
 */
export async function getHeroData(lang: Locale, dictionary: any) {
  try {
    const homepageData = await getHomePageData(lang);
    
    // If data exists, return it
    if (homepageData?.data) {
      return {
        title: homepageData.data.title || dictionary.homePage?.hero?.title,
        description: homepageData.data.description || dictionary.homePage?.hero?.description,
      };
    }
    
    // Fallback to dictionary
    return {
      title: dictionary.homePage?.hero?.title,
      description: dictionary.homePage?.hero?.description,
    };
  } catch (error) {
    console.error('Error getting hero data:', error);
    // Fallback to dictionary
    return {
      title: dictionary.homePage?.hero?.title,
      description: dictionary.homePage?.hero?.description,
    };
  }
}

/**
 * Get products data from Strapi or use fallback dictionary
 */
export async function getProductsData(lang: Locale, dictionary: any): Promise<any[]> {
  try {
    const productsData = await fetchProductsData(lang);
    
    // If data exists, process it
    if (productsData?.data && productsData.data.length > 0) {
      // Map products to a simpler format
      return productsData.data.map((product: any) => {
        // Get the first image if available
        const firstImage = product.images && product.images.length > 0 
          ? product.images[0] 
          : null;
        
        // Get medium format if available, otherwise use the original
        const imageUrl = firstImage 
          ? getStrapiMediaUrl(firstImage.formats?.medium?.url || firstImage.url)
          : null;
          
        return {
          id: product.id,
          title: product.title,
          description: product.short_description || product.description,
          image: {
            url: imageUrl,
            alt: product.title,
            width: firstImage?.formats?.medium?.width || firstImage?.width,
            height: firstImage?.formats?.medium?.height || firstImage?.height,
          }
        };
      });
    }
    
    // Fallback to empty array if no data
    return [];
  } catch (error) {
    console.error('Error getting products data:', error);
    // Fallback to empty array
    return [];
  }
} 