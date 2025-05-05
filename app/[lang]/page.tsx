import { getDictionary } from "@/lib/dictionary"
import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n-config"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Shield, Star, Clock } from "lucide-react"
import PlaceholderImage from "@/components/placeholder-image"
import { getHeroData, getProductsData, getProjectsData } from "@/lib/strapi-page-api"
import { Suspense } from "react"

// Add at the top of the file near the other imports and exports
export const dynamic = 'force-dynamic';

// Generate metadata for the homepage
export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.homePage || {}
  
  const isArabic = lang === "ar"
  
  return {
    title: isArabic ? 'الرئيسية' : 'Home',
    description: t.hero?.description || (isArabic 
      ? "بترا فوم توفر أفضل منتجات العزل الحراري لتحسين كفاءة الطاقة وتوفير التكاليف في مشاريع البناء"
      : "Petra Foam provides the best thermal insulation products to improve energy efficiency and reduce costs in construction projects"),
  }
}

export default async function Home({
  params,
}: {
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.homePage || {}
  
  // Fetch hero data from Strapi
  const heroData = await getHeroData(lang, dictionary);
  
  // Fetch products data from Strapi
  const productsData = await getProductsData(lang, dictionary);
  
  // Fetch projects data from Strapi
  const projectsData = await getProjectsData(lang, dictionary);

  // Check if images exist
  const useRealImages = false // Set to true when real images are available

  // Determine the grid layout class based on the number of items
  const getGridClass = (itemCount: number) => {
    // For 1 item: center it
    if (itemCount === 1) return "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto";
    // For 2 items: show 2 columns centered
    if (itemCount === 2) return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto";
    // For 3 or more items: use the regular 3-column grid
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  // Calculate grid classes
  const productsGridClass = getGridClass(productsData.length || 2); // Use 2 as fallback for static content
  const projectsGridClass = getGridClass(projectsData.length || 3); // Use 3 as fallback for static content

  return (
    <div className={`w-full`}>
      {/* Section 1: Hero Header with Modern Design */}
      <section className="relative w-full min-h-[600px] flex items-center bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900 opacity-20 rounded-full scale-150 blur-3xl"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="container relative mx-auto px-4 z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`text-white`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {heroData.title}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                {heroData.description}
              </p>
              <div className={`flex flex-wrap gap-4`}>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-6"
                  asChild
                >
                  <Link href={`/${lang}/products`}>
                    {t.hero?.exploreButton}
                  </Link>
                </Button>
                <Button
                  size="lg" 
                  className="text-white border-white hover:bg-white/10 font-medium px-6"
                  asChild
                >
                  <Link href={`/${lang}/contact-us`}>
                    {t.hero?.contactButton}
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className={`relative flex justify-center`}>
              <div className="w-full h-80 md:h-96 lg:h-[450px] relative">
                <div className="absolute inset-0 bg-blue-700/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transform">
                  {heroData.headerImage ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent z-10"></div>
                      <Image 
                        src={heroData.headerImage}
                        alt={heroData.headerImageAlt}
                        fill
                        priority
                        className="object-cover mix-blend-normal"
                      />
                    </>
                  ) : useRealImages ? (
                    <Image 
                      src="/images/hero-building.jpg" 
                      alt="Modern building with thermal insulation"
                      fill
                      priority
                      className="object-cover opacity-90 mix-blend-overlay"
                    />
                  ) : (
                    <div className="w-full h-full relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-600/50"></div>
                      <div className="relative z-10 text-white text-center px-6">
                        <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                          <Shield className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold">{t.hero?.imageAlt || "Thermal Insulation Solutions"}</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Products Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12`}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              {t.products?.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.products?.description}
            </p>
          </div>
          
          <div className={`${productsGridClass} gap-8 mb-8`}>
            {/* Dynamic Product Cards */}
            {productsData.length > 0 ? (
              productsData.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:translate-y-[-8px]"
                >
                  <div className="relative h-64">
                    {product.image?.url ? (
                      <Image 
                        src={product.image.url}
                        alt={product.image.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform hover:scale-105"
                      />
                    ) : (
                      <PlaceholderImage 
                        text={product.title}
                        bgColor="bg-blue-600"
                      />
                    )}
                  </div>
                  <div className={`p-6`}>
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    <Button 
                      variant="default" 
                      className={`mt-2`}
                      asChild
                    >
                      <Link href={`/${lang}/products/${product.id}`}>
                        {t.products?.viewDetailsButton}
                        <ArrowRight className={`w-4 h-4`} />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              // Fallback to static product cards if no data from Strapi
              <></>
            )}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="mt-4"
              asChild
            >
              <Link href={`/${lang}/products`}>
                {t.products?.viewAllButton}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 3: Quality Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12`}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              {t.features?.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.features?.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`bg-white p-8 rounded-xl shadow-md`}>
              <div className={`flex items-center mb-4`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className={`ml-4 text-xl font-bold text-gray-900`}>
                  {t.features?.quality?.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {t.features?.quality?.description}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className={`bg-white p-8 rounded-xl shadow-md`}>
              <div className={`flex items-center mb-4`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className={`ml-4 text-xl font-bold text-gray-900`}>
                  {t.features?.performance?.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {t.features?.performance?.description}
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className={`bg-white p-8 rounded-xl shadow-md`}>
              <div className={`flex items-center mb-4`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className={`ml-4 text-xl font-bold text-gray-900`}>
                  {t.features?.service?.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {t.features?.service?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Projects */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12`}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              {t.projects?.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.projects?.description}
            </p>
          </div>
          
          <div className={`${projectsGridClass} gap-8 mb-8`}>
            {/* Dynamic Project Cards */}
            {projectsData.length > 0 ? (
              projectsData.map((project) => (
                <div key={project.id} className="group bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    {project.image?.url ? (
                      <Image 
                        src={project.image.url}
                        alt={project.image.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="relative h-full">
                        <PlaceholderImage 
                          text={project.title}
                          bgColor="bg-blue-600"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}
                    <div className={`absolute bottom-0 p-4 w-full z-10`}>
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`p-4`}>
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <Link 
                      href={`/${lang}/projects/${project.slug || project.id}`}
                      className={`text-blue-700 font-medium inline-flex items-center `}
                    >
                      {t.projects?.viewProjectButton}
                      <ArrowRight className={`w-4 h-4`} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              // Fallback to static project cards if no data from Strapi
              <></>
            )}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="mt-4"
              asChild
            >
              <Link href={`/${lang}/projects`}>
                {t.projects?.viewAllButton}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
