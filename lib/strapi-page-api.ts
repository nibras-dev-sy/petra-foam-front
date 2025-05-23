import { Locale } from './i18n-config';
import { getHomePageData, getProductsData as fetchProductsData, getProjectsData as fetchProjectsData, getAboutUsData, getContactInfoData } from './services/strapi';
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
        title: homepageData.data.title || "",
        description: homepageData.data.description || "",
        headerImage: headerImage || 'Petra Foam Header Image',
        headerImageAlt: homepageData.data.header_image?.alternativeText || 'Petra Foam Header Image'
      };
    }
    
    // Fallback to dictionary
    return {
      title: "",
      description: "",
      headerImage: null,
      headerImageAlt: 'Petra Foam Header Image'
    };
  } catch (error) {
    console.error('Error getting hero data:', error);
    // Fallback to dictionary
    return {
      title: "",
      description: "",
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
      // Process image if it exists
      const imageData = aboutUsData.data.image 
        ? {
            url: getStrapiMediaUrl(aboutUsData.data.image.formats?.medium?.url || aboutUsData.data.image.url),
            alt: aboutUsData.data.image.alternativeText || '',
            width: aboutUsData.data.image.formats?.medium?.width || aboutUsData.data.image.width,
            height: aboutUsData.data.image.formats?.medium?.height || aboutUsData.data.image.height,
          }
        : {
            url: '',
            alt: '',
            width: 0,
            height: 0
          };
      
      return {
        description: aboutUsData.data.description || "",
        image: imageData
      };
    }
    
    // Return empty values if no data
    return {
      description: "",
      image: {
        url: '',
        alt: '',
        width: 0,
        height: 0
      }
    };
  } catch (error) {
    console.error('Error getting about us data:', error);
    // Return empty values
    return {
      description: "",
      image: {
        url: '',
        alt: '',
        width: 0,
        height: 0
      }
    };
  }
}

// Function to get contact info from Strapi API
export async function getContactInfo(lang: Locale, dictionary: any) {
  try {
    const contactData = await getContactInfoData(lang);
    
    if (!contactData?.data) {
      throw new Error('Failed to fetch contact info');
    }

    return contactData.data;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    
    // Return empty strings instead of fallback data
    return {
      email1: '',
      email2: '',
      phone1: '',
      phone2: '',
      address: ''
    };
  }
}

