import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Shield, Star, Clock } from "lucide-react"
import PlaceholderImage from "@/components/placeholder-image"
import { getHeroData, getProductsData, getProjectsData } from "@/lib/strapi-page-api"

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
    <div className="w-full">
      {/* Section 1: Hero Header with Blue Gradient */}
      <section className="relative w-full py-24 md:py-32 bg-gradient-to-br from-blue-600 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 right-0 h-40 bg-white/20"></div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-blue-500/30"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-blue-400/20"></div>
        </div>
        <div className="container relative mx-auto px-4 z-10">
          <div className={`flex flex-col ${lang === "ar" ? "items-end text-right" : "items-start text-left"} max-w-3xl mx-auto`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {heroData.title}
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl">
              {heroData.description}
            </p>
            <div className={`flex ${lang === "ar" ? "flex-row-reverse" : "flex-row"} gap-4`}>
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50"
                asChild
              >
                <Link href={`/${lang}/products`}>
                  {t.hero?.exploreButton}
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white hover:bg-white/20"
                asChild
              >
                <Link href={`/${lang}/contact-us`}>
                  {t.hero?.contactButton}
                </Link>
              </Button>
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
                  <div className={`p-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    <Button 
                      variant="default" 
                      className={`mt-2 ${lang === "ar" ? "flex flex-row-reverse" : ""}`}
                      asChild
                    >
                      <Link href={`/${lang}/products/${product.id}`}>
                        {t.products?.viewDetailsButton}
                        <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "mr-2 transform rotate-180" : "ml-2"}`} />
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
            <div className={`bg-white p-8 rounded-xl shadow-md ${lang === "ar" ? "text-right" : ""}`}>
              <div className={`flex ${lang === "ar" ? "flex-row-reverse" : ""} items-center mb-4`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold text-gray-900 ${lang === "ar" ? "mr-4" : "ml-4"}`}>
                  {t.features?.quality?.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {t.features?.quality?.description}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className={`bg-white p-8 rounded-xl shadow-md ${lang === "ar" ? "text-right" : ""}`}>
              <div className={`flex ${lang === "ar" ? "flex-row-reverse" : ""} items-center mb-4`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold text-gray-900 ${lang === "ar" ? "mr-4" : "ml-4"}`}>
                  {t.features?.performance?.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {t.features?.performance?.description}
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className={`bg-white p-8 rounded-xl shadow-md ${lang === "ar" ? "text-right" : ""}`}>
              <div className={`flex ${lang === "ar" ? "flex-row-reverse" : ""} items-center mb-4`}>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold text-gray-900 ${lang === "ar" ? "mr-4" : "ml-4"}`}>
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
                    <div className={`absolute bottom-0 ${lang === "ar" ? "right-0" : "left-0"} p-4 w-full z-10`}>
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`p-4 ${lang === "ar" ? "text-right" : ""}`}>
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <Link 
                      href={`/${lang}/projects/${project.slug || project.id}`}
                      className={`text-blue-700 font-medium inline-flex items-center ${lang === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      {t.projects?.viewProjectButton}
                      <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "mr-2 transform rotate-180" : "ml-2"}`} />
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
