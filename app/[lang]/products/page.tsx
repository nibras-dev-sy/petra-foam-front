import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Download } from "lucide-react"
import PlaceholderImage from "@/components/placeholder-image"
import { ImageCarousel } from "@/components/ui/image-carousel"
import { getProductsData } from "@/lib/strapi-page-api"

export default async function ProductsPage({
  params,
}: {
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.productsPage || {}
  
  // Fetch products data from Strapi
  const productsData = await getProductsData(lang, dictionary)
  
  // Check if the page is in RTL mode
  const isRTL = lang === "ar"

  return (
    <div className={`w-full ${isRTL ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-900 to-blue-700 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]"></div>
        </div>
        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.title || "Our Insulation Products"}
            </h1>
            <p className="text-lg text-blue-100 mb-0 max-w-2xl mx-auto">
              {t.description || "Explore our range of high-quality thermal insulation solutions for your construction projects."}
            </p>
          </div>
        </div>
      </section>

      {/* Products Sections */}
      <div>
        {productsData.length > 0 ? (
          productsData.map((product, index) => (
            <section 
              key={product.id} 
              id={`product-${product.id}`} 
              className={`py-16 ${index !== 0 ? "border-t border-gray-200" : ""} ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content Section */}
                  <div className={`space-y-6 ${index % 2 === 0 ? isRTL ? "lg:order-2" : "lg:order-1" : isRTL ? "lg:order-1" : "lg:order-2"}`}>
                    <h2 className="text-3xl font-bold text-blue-900">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {product.details && Object.keys(product.details).length > 0 && (
                      <div className={`rounded-lg shadow-lg p-6 ${index % 2 === 0 ? "bg-white" : "bg-white"}`}>
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">
                          {t.specificationsTitle || "Technical Specifications"}
                        </h3>
                        <table className="w-full">
                          <tbody className="divide-y divide-gray-200">
                            {Object.entries(product.details).map(([key, value]: [string, any]) => (
                              <tr key={key} className="hover:bg-gray-50">
                                <td className="py-3 font-medium">{key}</td>
                                <td className="py-3">{String(value)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4">
                      {product.catalogue && (
                        <Button 
                          variant="default" 
                          className={`${isRTL ? "flex flex-row-reverse" : ""}`}
                          asChild
                        >
                          <Link 
                            href={product.catalogue.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {t.downloadCatalogueButton || "Download Catalogue"}
                            <Download className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`} />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Image Section */}
                  <div className={`flex justify-center ${index % 2 === 0 ? isRTL ? "lg:order-1" : "lg:order-2" : isRTL ? "lg:order-2" : "lg:order-1"}`}>
                    <ImageCarousel 
                      images={product.images || []} 
                      productTitle={product.title}
                      isRTL={isRTL}
                    />
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <p className="text-gray-500">{t.noProductsFound || "No products found."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 