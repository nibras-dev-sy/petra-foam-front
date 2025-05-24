import { getDictionary } from "@/lib/dictionary"
import type { Metadata } from "next"
import { getContactInfo } from "@/lib/strapi-page-api"
import type { Locale } from "@/lib/i18n-config"
import ContactCardSection from './components/ContactCardSection'
import ContactForm from './components/ContactForm'
import MapSection from './components/MapSection'

// Add at the top of the file near the other imports and exports
export const dynamic = 'force-dynamic';

// Generate metadata for the contact-us page
export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.contactPage || {}
  
  const isArabic = lang === "ar"
  
  return {
    title: isArabic ? 'تواصل معنا' : 'Contact Us',
    description: t.description || (isArabic 
      ? "هل لديك أسئلة أو تحتاج إلى مزيد من المعلومات؟ تواصل معنا وسنرد عليك في أقرب وقت ممكن"
      : "Have questions or need more information? Reach out to us and we'll get back to you as soon as possible"),
    keywords: isArabic
      ? "اتصل بنا, بترا فوم, معلومات الاتصال, الموقع, عمان, الأردن"
      : "contact us, Petra Foam, contact information, location, Amman, Jordan",
  }
}

export default async function ContactUsPage({
  params,
}: {
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  
  const t = dictionary.contactPage
  const isRTL = lang === 'ar'
  
  return (
    <div className={`w-full`}>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-900 to-blue-700 py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
        </div>
        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              {t.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <ContactCardSection dictionary={t} />
      
      {/* Map and Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Map */}
            <MapSection isRTL={isRTL} dictionary={t} />
            
            {/* Contact Form */}
            <ContactForm isRTL={isRTL} dictionary={t} />
          </div>
        </div>
      </section>
    </div>
  );
} 