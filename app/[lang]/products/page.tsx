import { getDictionary } from "@/lib/dictionary"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Download } from "lucide-react"
import { ImageCarousel } from "@/components/ui/image-carousel"

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  params,
}: {
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.productsPage || {}

  return (
    <div className={`w-full`}>
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
        <section
          className={`py-16 border-t border-gray-200 bg-white`}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Section */}
              <div className={`space-y-6 lg:order-1`}>
                <h2 className="text-3xl font-bold text-blue-900">
                  {t.xps.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t.xps.description}
                </p>

                {t.xps.details && Object.keys(t.xps.details).length > 0 && (
                  <div className={`rounded-lg shadow-lg p-6 bg-white`}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">
                      {t.specificationsTitle || "Technical Specifications"}
                    </h3>
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(t.xps.details).map(([key, value]: [string, any]) => (
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
                  <Button
                    variant="default"
                    asChild
                  >
                    <Link
                      href={`/images/xps_proch_${lang}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.downloadCatalogueButton || "Download Catalogue"}
                      <Download className={`w-4 h-4 "ml-2"`} />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Image Section */}
              <div className={`flex justify-center lg:order-2`}>
                <ImageCarousel
                  images={[]}
                  productTitle={t.xps.title}
                  imageText={{
                    previous: t.previousImage || "Previous image",
                    next: t.nextImage || "Next image",
                    counterFormat: t.imageCounterFormat || "{current} / {total}"
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className={`py-16 bg-gray-100`}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Section */}
              <div className={`space-y-6 lg:order-2`}>
                <h2 className="text-3xl font-bold text-blue-900">
                  {t.eps.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t.eps.description}
                </p>

                {t.eps.details && Object.keys(t.eps.details).length > 0 && (
                  <div className={`rounded-lg shadow-lg p-6 bg-white`}>
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">
                      {t.specificationsTitle || "Technical Specifications"}
                    </h3>
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {Object.entries(t.eps.details).map(([key, value]: [string, any]) => (
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
                  <Button
                    variant="default"
                    asChild
                  >
                    <Link
                      href="/images/eps_proch.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t.downloadCatalogueButton || "Download Catalogue"}
                      <Download className={`w-4 h-4 "ml-2"`} />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Image Section */}
              <div className={`flex justify-center lg:order-1`}>
                <ImageCarousel
                  images={[]}
                  productTitle={t.eps.title}
                  imageText={{
                    previous: t.previousImage || "Previous image",
                    next: t.nextImage || "Next image",
                    counterFormat: t.imageCounterFormat || "{current} / {total}"
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Generate metadata for the products page
export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const t = dictionary.productsPage || {}

  const isArabic = lang === "ar"

  return {
    title: isArabic ? 'المنتجات' : 'Products',
    description: t.description || (isArabic
      ? "استكشف مجموعتنا من حلول العزل الحراري عالية الجودة لمشاريع البناء الخاصة بك"
      : "Explore our range of high-quality thermal insulation solutions for your construction projects"),
    keywords: isArabic
      ? "عزل XPS, عزل EPS, ألواح البوليسترين, العزل الحراري, بترا فوم"
      : "XPS insulation, EPS insulation, polystyrene boards, thermal insulation, Petra Foam",
  }
} 