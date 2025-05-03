import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '@/lib/i18n-config';
import { env } from '@/lib/utils';

const API_URL = env.STRAPI_API_URL;
const API_TOKEN = env.STRAPI_API_TOKEN;

/**
 * API Route handler for Strapi requests
 * This acts as a proxy between client-side components and Strapi API
 */
export async function GET(request: NextRequest) {
  try {
    // Get the request parameters
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const locale = (searchParams.get('locale') || 'en') as Locale;
    
    // Validate endpoint
    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
    }

    // Build the URL with locale parameter if not already included
    let url = endpoint;
    if (!url.includes('locale=')) {
      url += url.includes('?') ? `&locale=${locale}` : `?locale=${locale}`;
    }
    
    // Fetch from Strapi
    const response = await fetch(`${API_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from Strapi: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Strapi API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 