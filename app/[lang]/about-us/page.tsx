import { getDictionary } from "@/lib/dictionary"
import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n-config"
import { getAboutUsInfo } from "@/lib/strapi-page-api"
import Image from "next/image"
import {
  Award,
  Leaf,
  Lightbulb,
  Building,
  BarChart2,
  BadgeCheck,
  Factory,
  Globe,
} from "lucide-react"

// Generate metadata for the about-us page
export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.aboutUsPage || {}
  
  const isArabic = lang === "ar"
  
  return {
    title: isArabic ? 'من نحن' : 'About Us',
    description: isArabic 
      ? "بترا فوم هي الشركة الرائدة في الأردن في مجال تصنيع حلول العزل الصناعية. تعرف على قصتنا وقيمنا ومسيرتنا."
      : "Petra Foam is Jordan's premier manufacturer of industrial insulation solutions. Learn about our story, values, and journey.",
    keywords: isArabic
      ? "بترا فوم, من نحن, تاريخ الشركة, قيم الشركة, الجودة, الابتكار, الاستدامة, الأردن"
      : "Petra Foam, about us, company history, company values, quality, innovation, sustainability, Jordan",
  }
}

export default async function AboutUsPage({
  params,
}: {
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.aboutUsPage || {}
  
  // Fetch about us data from Strapi
  const aboutUsData = await getAboutUsInfo(lang, dictionary)

  // Timeline data from dictionary
  const timeline = t.timeline || {}
  const timelineEvents = timeline.events || []

  // Values data from dictionary
  const values = t.values || {}
  const valueItems = values.items || []

  // Define types for timeline and values items
  type TimelineEvent = {
    year: string;
    title: string;
    description: string;
  }

  type ValueItem = {
    title: string;
    description: string;
  }

  // Icons for values
  const valueIcons = [
    <Award key="quality" className="h-8 w-8 text-blue-600" />,
    <Lightbulb key="innovation" className="h-8 w-8 text-blue-600" />,
    <Leaf key="sustainability" className="h-8 w-8 text-blue-600" />
  ]

  // Icons for timeline
  const timelineIcons = [
    <Building key="foundation" className="h-6 w-6 text-white" />,
    <Factory key="expansion" className="h-6 w-6 text-white" />,
    <BadgeCheck key="certification" className="h-6 w-6 text-white" />,
    <Factory key="eps" className="h-6 w-6 text-white" />,
    <Globe key="regional" className="h-6 w-6 text-white" />
  ]

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
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <div>
              <div className="prose prose-lg max-w-none">
                {aboutUsData.description.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Image */}
            <div>
              <div className="relative rounded-xl overflow-hidden shadow-xl h-80 md:h-96">
                {/* We use a placeholder until we have actual images */}
                <div className="absolute inset-0 bg-blue-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <Factory className="w-16 h-16 mx-auto mb-4 opacity-75" />
                    <h3 className="text-2xl font-bold mb-2">{t.modernFacility || "Our Modern Facility"}</h3>
                    <p className="text-blue-100 max-w-xs mx-auto">
                      {t.facilityDescription || "State-of-the-art manufacturing plant producing high-quality insulation materials"}
                    </p>
                  </div>
                </div>
                {/* Uncomment below when actual image is available */}
                {/* 
                <Image 
                  src="/images/about-factory.jpg" 
                  alt="Petra Foam Factory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
                {timeline.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {timeline.description}
              </p>
            </div>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
              
              {/* Timeline Events */}
              <div className="space-y-20">
                {timelineEvents.map((event: TimelineEvent, index: number) => (
                  <div key={index} className={`relative flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Timeline Point */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center z-10 border-4 border-white">
                      {timelineIcons[index] || <div className="h-3 w-3 bg-white rounded-full"></div>}
                    </div>
                    
                    {/* Content */}
                    <div className={`w-5/12 pr-8 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-bold text-blue-700 mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                    
                    {/* Year */}
                    <div className={`w-5/12 pl-8 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                      <div className="text-4xl font-bold text-blue-800">{event.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              {values.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {values.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {valueItems.map((value: ValueItem, index: number) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 transition-transform hover:translate-y-[-8px] border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50 mx-auto">
                  {valueIcons[index]}
                </div>
                <h3 className="text-xl font-bold text-center text-blue-700 mb-4">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 