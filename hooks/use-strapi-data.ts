import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n-config';

interface UseDataOptions {
  endpoint: string;
  locale?: Locale;
  enabled?: boolean;
}

export function useStrapiData<T>(options: UseDataOptions) {
  const { endpoint, locale = 'en', enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!enabled) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/strapi?endpoint=${encodeURIComponent(endpoint)}&locale=${locale}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching Strapi data:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [endpoint, locale, enabled]);

  return { data, isLoading, error };
} 