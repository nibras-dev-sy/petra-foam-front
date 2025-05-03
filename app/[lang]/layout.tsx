//import "./globals.css"
import type { Metadata } from "next"
import { i18n, type Locale } from "@/lib/i18n-config"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/lib/dictionary"
import { Inter, Cairo } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

// Define metadata generators for better SEO
export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  const { lang } = await params
  // Get dictionary
  const dictionary = await getDictionary(lang)
  
  const isArabic = lang === "ar"
  
  // Define metadata based on language
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://petra-foam.com"),
    title: {
      template: `%s | ${isArabic ? "بترا فوم" : "Petra Foam"}`,
      default: isArabic ? "بترا فوم - حلول العزل الحراري المتطورة" : "Petra Foam - Advanced Thermal Insulation Solutions",
    },
    description: isArabic 
      ? "بترا فوم هي الشركة الرائدة في الأردن في مجال تصنيع حلول العزل الصناعية، توفر أفضل منتجات العزل الحراري لتحسين كفاءة الطاقة"
      : "Petra Foam is Jordan's premier manufacturer of industrial insulation solutions, providing the best thermal insulation products to improve energy efficiency",
    keywords: isArabic
      ? "العزل الحراري, بترا فوم, XPS, EPS, عزل الأسطح, عزل الجدران, كفاءة الطاقة, الأردن"
      : "thermal insulation, Petra Foam, XPS, EPS, roof insulation, wall insulation, energy efficiency, Jordan",
    openGraph: {
      type: "website",
      locale: lang,
      alternateLocale: lang === "en" ? "ar" : "en",
      siteName: isArabic ? "بترا فوم" : "Petra Foam",
      images: [
        {
          url: "/images/og-image.jpg", // Create this image
          width: 1200,
          height: 630,
          alt: isArabic ? "بترا فوم - حلول العزل الحراري" : "Petra Foam - Thermal Insulation Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isArabic ? "بترا فوم - حلول العزل الحراري المتطورة" : "Petra Foam - Advanced Thermal Insulation Solutions",
      description: isArabic 
        ? "بترا فوم هي الشركة الرائدة في الأردن في مجال تصنيع حلول العزل الصناعية"
        : "Petra Foam is Jordan's premier manufacturer of industrial insulation solutions",
      images: ["/images/og-image.jpg"], // Same as OpenGraph image
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const dir = lang === "ar" ? "rtl" : "ltr"

  // Update HTML attributes
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }

  return (
    <html lang={lang} dir={dir} className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Add structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": lang === "ar" ? "بترا فوم" : "Petra Foam",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://petra-foam.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://petra-foam.com"}/images/logo1.png`,
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+962 6 4711780",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic"]
              },
              "sameAs": [
                "https://www.facebook.com/petrafoam/",
                "https://www.instagram.com/petrafoam/"
              ]
            })
          }}
        />
      </head>
      <body className={`min-h-screen flex flex-col ${lang === "ar" ? "font-arabic" : "font-sans"}`}>
        <Header lang={lang} dictionary={dictionary} />
        <main className="flex-grow">{children}</main>
        <Footer lang={lang} dictionary={dictionary} />
      </body>
    </html>
  )
}
