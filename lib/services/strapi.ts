import { Locale } from "../i18n-config";
import { cacheBuster } from "../utils";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Fetch data from Strapi API
 */
async function fetchAPI(endpoint: string, options = {}, bustCache = false) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: 'no-store' as RequestCache,
    next: { revalidate: 0 },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const url = bustCache 
    ? `${API_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}${cacheBuster().substring(1)}`
    : `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      console.error(`Error fetching from Strapi: ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    return null;
  }
}

/**
 * Get data from the home page
 */
export async function getHomePageData(locale: Locale = "en") {
  try {
    const data = await fetchAPI(`/api/home-page?populate[0]=header_image&locale=${locale}`, {}, true);
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
    const data = await fetchAPI(`/api/products?populate[0]=images&populate[1]=catalogue&locale=${locale}`, {}, true);
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
    const data = await fetchAPI(`/api/projects?populate[0]=images&locale=${locale}`, {}, true);
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
    const data = await fetchAPI(`/api/about-us-info?populate=image&locale=${locale}`, {}, true);
    return data;
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
} 

/**
 * Get contact info data from Strapi
 */
export async function getContactInfoData(locale: Locale = "en") {
  try {
    const data = await fetchAPI(`/api/contact-info?locale=${locale}`, {}, true);
    return data;
  } catch (error) {
    console.error("Error fetching contact info data:", error);
    return null;
  }
} 