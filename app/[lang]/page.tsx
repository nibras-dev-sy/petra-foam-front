import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"
import Image from "next/image"

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  stars: number;
}

export default async function Home({
  params,
}: {
  params: any
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8">
        Petra Foam
      </h1>
      <p className="text-center text-lg max-w-2xl mx-auto">
        {lang === "en" 
          ? "Welcome to Petra Foam - Your Thermal Insulation Specialists" 
          : "مرحبًا بكم في بترا فوم - متخصصون في العزل الحراري"}
      </p>
    </div>
  )
}
