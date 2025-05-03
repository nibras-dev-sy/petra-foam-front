"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Linkedin, Facebook, Instagram, Send, Mail, Phone, MapPin } from "lucide-react"
import type { Locale } from "@/lib/i18n-config"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import PlaceholderLogo from "./placeholder-logo"
import { useStrapiData } from "@/hooks/use-strapi-data"

export default function Footer({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [email, setEmail] = useState("")
  const [logoExists, setLogoExists] = useState(false)
  
  // Fetch footer data from Strapi
  const { data: footerData, isLoading } = useStrapiData<any>({
    endpoint: "/api/footer",
    locale: lang
  });

  useEffect(() => {
    // Check if logo exists (this will only run on client-side)
    const img = document.createElement('img')
    img.onload = () => setLogoExists(true)
    img.onerror = () => setLogoExists(false)
    img.src = "/images/logo1.png"
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
    // Here you would typically send this to your API
  }

  const currentYear = new Date().getFullYear()
  const isRtl = lang === "ar"
  const t = dictionary.footer || {}
  const nav = dictionary.navigation || {}
  
  // Use Strapi data if available, otherwise fallback to dictionary
  const companyDescription = footerData?.data?.companyDescription || t.company?.description;
  const contactPhone = footerData?.data?.contactPhone || t.contactInfo?.phone;
  const contactEmail = footerData?.data?.contactEmail || t.contactInfo?.email;
  const contactAddress = footerData?.data?.contactAddress || t.contactInfo?.address;

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className={isRtl ? "text-right" : "text-left"}>
            <div className="mb-4">
              {logoExists ? (
                <div className="relative w-36 h-12 mb-4 mx-auto md:mx-0">
                  <Image 
                    src="/images/logo1.png" 
                    alt="Petra Foam" 
                    fill
                    style={{ objectFit: "contain" }}
                    className="brightness-0 invert"
                  />
                </div>
              ) : (
                <PlaceholderLogo 
                  className="w-36 h-12 mb-4 mx-auto md:mx-0" 
                  inverted={true}
                />
              )}
              <p className="text-gray-400 mb-6">
                {companyDescription}
              </p>
            </div>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRtl ? "text-right" : "text-left"}>
            <h3 className="text-xl font-bold mb-6 text-white">
              {t.quickLinks?.title}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}`} className="text-gray-400 hover:text-white transition-colors">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products`} className="text-gray-400 hover:text-white transition-colors">
                  {nav.products}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/projects`} className="text-gray-400 hover:text-white transition-colors">
                  {nav.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about-us`} className="text-gray-400 hover:text-white transition-colors">
                  {nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact-us`} className="text-gray-400 hover:text-white transition-colors">
                  {nav.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={isRtl ? "text-right" : "text-left"}>
            <h3 className="text-xl font-bold mb-6 text-white">
              {t.contactInfo?.title}
            </h3>
            <ul className="space-y-4">
              <li className={`flex ${isRtl ? "flex-row-reverse" : ""} items-start`}>
                <Phone className={`${isRtl ? "mr-0 ml-3" : "mr-3"} text-blue-500 mt-1`} size={18} />
                <span className="text-gray-400">{contactPhone}</span>
              </li>
              <li className={`flex ${isRtl ? "flex-row-reverse" : ""} items-start`}>
                <Mail className={`${isRtl ? "mr-0 ml-3" : "mr-3"} text-blue-500 mt-1`} size={18} />
                <span className="text-gray-400">{contactEmail}</span>
              </li>
              <li className={`flex ${isRtl ? "flex-row-reverse" : ""} items-start`}>
                <MapPin className={`${isRtl ? "mr-0 ml-3" : "mr-3"} text-blue-500 mt-1`} size={18} />
                <span className="text-gray-400">{contactAddress}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={isRtl ? "text-right" : "text-left"}>
            <h3 className="text-xl font-bold mb-6 text-white">
              {t.newsletter?.title}
            </h3>
            <p className="text-gray-400 mb-4">
              {t.newsletter?.description}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter?.placeholder}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button type="submit" className="bg-blue-700 hover:bg-blue-600">
                <span className="mr-2">{t.newsletter?.button}</span>
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            {t.copyright?.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  )
}
