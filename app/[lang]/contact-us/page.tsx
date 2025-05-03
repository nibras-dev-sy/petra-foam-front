import { getDictionary } from "@/lib/dictionary"
import { getContactInfo } from "@/lib/strapi-page-api"
import type { Locale } from "@/lib/i18n-config"
import ContactCardSection from './components/ContactCardSection'
import ContactForm from './components/ContactForm'
import MapSection from './components/MapSection'

export default async function ContactUsPage({
  params,
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(params.lang)
  const contactData = await getContactInfo(params.lang)
  
  const t = dictionary.contactPage
  const isRTL = params.lang === 'ar'
  
  return (
    <div className={`w-full ${isRTL ? "rtl" : "ltr"}`}>
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
      <ContactCardSection contactData={contactData} dictionary={t} />
      
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