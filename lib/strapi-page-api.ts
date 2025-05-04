import { Locale } from './i18n-config';
import { getHomePageData, getProductsData as fetchProductsData, getProjectsData as fetchProjectsData, getAboutUsData } from './services/strapi';
import { getStrapiMediaUrl } from './services/media';

/**
 * Get hero section data from Strapi or use fallback dictionary
 */
export async function getHeroData(lang: Locale, dictionary: any) {
  try {
    const homepageData = await getHomePageData(lang);
    
    // If data exists, return it
    if (homepageData?.data) {
      const headerImage = homepageData.data.header_image 
        ? getStrapiMediaUrl(homepageData.data.header_image.url)
        : null;
        
      return {
        title: homepageData.data.title || dictionary.homePage?.hero?.title,
        description: homepageData.data.description || dictionary.homePage?.hero?.description,
        headerImage: headerImage,
        headerImageAlt: homepageData.data.header_image?.alternativeText || 'Petra Foam Header Image'
      };
    }
    
    // Fallback to dictionary
    return {
      title: dictionary.homePage?.hero?.title,
      description: dictionary.homePage?.hero?.description,
      headerImage: null,
      headerImageAlt: 'Petra Foam Header Image'
    };
  } catch (error) {
    console.error('Error getting hero data:', error);
    // Fallback to dictionary
    return {
      title: dictionary.homePage?.hero?.title,
      description: dictionary.homePage?.hero?.description,
      headerImage: null,
      headerImageAlt: 'Petra Foam Header Image'
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
        // Process all images
        const images = product.images && product.images.length > 0 
          ? product.images.map((img: any) => ({
              id: img.id,
              url: getStrapiMediaUrl(img.formats?.medium?.url || img.url),
              alt: product.title,
              width: img.formats?.medium?.width || img.width,
              height: img.formats?.medium?.height || img.height,
            }))
          : [];
          
        // Process catalogue files
        const catalogue = product.catalogue && product.catalogue.length > 0
          ? {
              id: product.catalogue[0].id,
              url: getStrapiMediaUrl(product.catalogue[0].url),
              name: product.catalogue[0].name,
            }
          : null;
          
        return {
          id: product.id,
          title: product.title,
          description: product.short_description || product.description,
          details: product.details || {},
          images: images,
          catalogue: catalogue,
          image: images[0]
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

/**
 * Get projects data from Strapi or use fallback dictionary
 */
export async function getProjectsData(lang: Locale, dictionary: any): Promise<any[]> {
  try {
    const projectsData = await fetchProjectsData(lang);
    
    // If data exists, process it
    if (projectsData?.data && projectsData.data.length > 0) {
      // Map projects to a simpler format
      return projectsData.data.map((project: any) => {
        // Get the first image if available
        const firstImage = project.images && project.images.length > 0 
          ? project.images[0] 
          : null;
        
        // Get medium format if available, otherwise use the original
        const imageUrl = firstImage 
          ? getStrapiMediaUrl(firstImage.formats?.medium?.url || firstImage.url)
          : null;
          
        return {
          id: project.id,
          title: project.title,
          description: project.short_description || project.description,
          slug: project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          image: {
            url: imageUrl,
            alt: project.title,
            width: firstImage?.formats?.medium?.width || firstImage?.width,
            height: firstImage?.formats?.medium?.height || firstImage?.height,
          }
        };
      });
    }
    
    // Fallback to empty array if no data
    return [];
  } catch (error) {
    console.error('Error getting projects data:', error);
    // Fallback to empty array
    return [];
  }
}

/**
 * Get about us data from Strapi or use fallback dictionary
 */
export async function getAboutUsInfo(lang: Locale, dictionary: any) {
  try {
    const aboutUsData = await getAboutUsData(lang);
    
    // If data exists, return it
    if (aboutUsData?.data) {
      return {
        title: aboutUsData.data.title || dictionary.aboutUsPage?.title,
        description: aboutUsData.data.description || dictionary.aboutUsPage?.description,
      };
    }
    
    // Fallback to dictionary
    return {
      title: dictionary.aboutUsPage?.title,
      description: dictionary.aboutUsPage?.description,
    };
  } catch (error) {
    console.error('Error getting about us data:', error);
    // Fallback to dictionary
    return {
      title: dictionary.aboutUsPage?.title,
      description: dictionary.aboutUsPage?.description,
    };
  }
}

// Function to get contact info from Strapi API
export async function getContactInfo(locale: string) {
  try {
    // Skip API call during build to prevent errors
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      return {
        email1: 'info@petra-foam.com',
        email2: 'sales@petra-foam.com',
        phone1: '+962 6 4711780',
        phone2: '+962 796655027',
        address: 'Alqastal Industial Zone, Amman / Jordan'
      };
    }
    
    // Check if API URL is defined
    const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contact-info?locale=${locale}`;
    
    if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
      throw new Error('Strapi API URL is not defined');
    }
    
    // Fetch the data
    const response = await fetch(apiUrl, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    // Parse the response
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error('Failed to fetch contact info');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    
    // Return fallback data if the API request fails
    return {
      email1: 'info@petra-foam.com',
      email2: 'sales@petra-foam.com',
      phone1: '+962 6 4711780',
      phone2: '+962 796655027',
      address: 'Alqastal Industial Zone, Amman / Jordan'
    };
  }
} 