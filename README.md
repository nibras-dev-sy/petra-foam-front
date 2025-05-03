# Petra Foam Website

A bilingual (English/Arabic) Next.js website for Petra Foam, a thermal insulation company.

## Features

- Next.js with App Router
- Bilingual support (English/Arabic) with RTL support
- Responsive design with a modern blue theme
- Strapi CMS integration
- Shadcn UI components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_strapi_api_token
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Strapi CMS Integration

The website is integrated with Strapi CMS for content management. Here's how it works:

### Environment Variables

- `NEXT_PUBLIC_STRAPI_API_URL`: The URL of your Strapi CMS instance.
- `STRAPI_API_TOKEN`: Your Strapi API token for authentication.

### Content Types

The following content types are expected in Strapi:

1. **Home Page** (`/api/home-page`)
   - `title`: The main title for the home page hero section
   - `description`: The description for the home page hero section

2. **Footer** (`/api/footer`)
   - `companyDescription`: The company description shown in the footer
   - `contactPhone`: Contact phone number
   - `contactEmail`: Contact email
   - `contactAddress`: Physical address

### Fetching Data

Data is fetched in two ways:

1. **Server Components**: Using direct API calls with the Strapi service
2. **Client Components**: Using the custom `useStrapiData` hook which connects to a Next.js API route

If Strapi data is unavailable, the system falls back to using the static dictionary values.

## Localization

The website supports both English and Arabic languages. The language is determined by the URL path, e.g., `/en` for English and `/ar` for Arabic.

## Development

This project uses:

- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn UI for UI components
- ESLint for code linting 