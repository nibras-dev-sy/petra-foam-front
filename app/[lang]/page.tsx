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
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                {t.hero.description}
              </p>
              <div className={`flex flex-wrap gap-4`}>
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-6"
                  asChild
                >
                  <Link href={`/${lang}/products`}>
                    {t.hero.exploreButton}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="text-white border-white hover:bg-white/10 font-medium px-6"
                  asChild
                >
                  <Link href={`/${lang}/contact-us`}>
                    {t.hero.contactButton}
                  </Link>
                </Button>
              </div>
            </div>

            <div className={`relative flex justify-center`}>
              <div className="w-full h-80 md:h-96 lg:h-[450px] relative">
                <div className="absolute inset-0 bg-blue-700/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transform">
                  <Image
                    src="/images/hero_header_img.webp"
                    alt="Modern building with thermal insulation"
                    fill
                    priority
                    className="object-cover opacity-90 mix-blend-overlay"
                  />
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

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto gap-8 mb-8`}>
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:translate-y-[-8px]"
            >
              <div className="relative h-64">
                <Image
                    src="/images/products-extruded-polystyrene-sheets-xps-wa.webp"
                    alt="Extruded Polystyrene Sheets XPS"
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform hover:scale-105"
                  />
              </div>
              <div className={`p-6`}>
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {t.products.xps.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t.products.xps.description}
                </p>
                <Button
                  variant="default"
                  className={`mt-2`}
                  asChild
                >
                  <Link href={`/${lang}/products`}>
                    {t.products?.viewDetailsButton}
                    <ArrowRight className={`w-4 h-4`} />
                  </Link>
                </Button>
              </div>
            </div>

            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:translate-y-[-8px]"
            >
              <div className="relative h-64">
                <Image
                    src="/images/EPS-scaled.jpg"
                    alt="EPS"
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform hover:scale-105"
                  />
              </div>
              <div className={`p-6`}>
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {t.products.eps.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t.products.eps.description}
                </p>
                <Button
                  variant="default"
                  className={`mt-2`}
                  asChild
                >
                  <Link href={`/${lang}/products`}>
                    {t.products?.viewDetailsButton}
                    <ArrowRight className={`w-4 h-4`} />
                  </Link>
                </Button>
              </div>
            </div>
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
