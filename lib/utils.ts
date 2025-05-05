import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Environment configuration for Strapi API
 */
export const env = {
  STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "",
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN || "",
}

// Check if environment variables are set
if (!env.STRAPI_API_TOKEN) {
  console.warn("Warning: STRAPI_API_TOKEN is not set in environment variables")
}

// Cache busting version for query parameters when needed
export const cacheBuster = () => {
  return `?cacheBust=${Date.now()}`;
}
