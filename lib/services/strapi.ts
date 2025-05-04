import { Locale } from "../i18n-config";
import { env } from "../utils";

const API_URL = env.STRAPI_API_URL;
const API_TOKEN = env.STRAPI_API_TOKEN;

/**
 * Fetch data from Strapi API
 */
async function fetchAPI(endpoint: string, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);
    
    if (!response.ok) {
      console.error(`Error fetching from Strapi: ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${API_URL}${endpoint}:`, error);
    return null;
  }
}

/**
 * Get data from the home page
 */
export async function getHomePageData(locale: Locale = "en") {
  try {
    const data = await fetchAPI(`/api/home-page?populate[0]=header_image&locale=${locale}`);
    return data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return null;
  }
}

/**
 * Get products data from Strapi
 */
export async function getProductsData(locale: Locale = "en") {
  try {
    const data = await fetchAPI(`/api/products?populate[0]=images&populate[1]=catalogue&locale=${locale}`);
    return data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    return { data: [] };
  }
}

/**
 * Get projects data from Strapi
 */
export async function getProjectsData(locale: Locale = "en") {
  try {
    const data = await fetchAPI(`/api/projects?populate[0]=images&locale=${locale}`);
    return data;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return { data: [] };
  }
}

/**
 * Get about us data from Strapi
 */
export async function getAboutUsData(locale: Locale = "en") {
  try {
    const data = await fetchAPI(`/api/about-us-info?locale=${locale}`);
    return data;
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
} 