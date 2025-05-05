"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import type { Locale } from "@/lib/i18n-config"
import PlaceholderLogo from "./placeholder-logo"
import { useStrapiData } from "@/hooks/use-strapi-data"

export default function Footer({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [logoExists, setLogoExists] = useState(false)

  // Fetch contact info from Strapi (same API as contact page)
  const { data: contactData } = useStrapiData<any>({
    endpoint: "/api/contact-info",
    locale: lang
  });

  useEffect(() => {
    // Check if logo exists (this will only run on client-side)
    const img = document.createElement('img')
    img.onload = () => setLogoExists(true)
    img.onerror = () => setLogoExists(false)
    img.src = "/images/logo1.png"
  }, [])

  const currentYear = new Date().getFullYear()
  const isRtl = lang === "ar"
  const t = dictionary.footer || {}
  const nav = dictionary.navigation || {}
  
  // Get contact info from the contact API, fallback to footer data if not available, then to dictionary
  const companyDescription = t.company?.description;
  const contactPhone = contactData?.data?.phone1 || t.contactInfo?.phone;
  const contactEmail = contactData?.data?.email1 || t.contactInfo?.email;
  const contactAddress = contactData?.data?.address || t.contactInfo?.address;

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info - Now first in all views */}
          <div>
            <div className="mb-4">
              {logoExists ? (
                <div className="relative w-36 h-12 mb-4 mx-auto md:mx-0">
                  <Image 
                    src="/images/logo1.png" 
                    alt="Petra Foam" 
                    fill
                    style={{ objectFit: "contain" }}
                    className="brightness-0 invert"
                    priority
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
                href="https://www.facebook.com/petrafoam/" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/petrafoam/" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              {t.contactInfo?.title}
            </h3>
            <ul className="space-y-4">
              <li className={`flex items-start`}>
                <Phone className={`text-blue-500 mt-1`} size={18} />
                <span className="text-gray-400">{contactPhone}</span>
              </li>
              <li className={`flex items-start`}>
                <Mail className={`text-blue-500 mt-1`} size={18} />
                <span className="text-gray-400">{contactEmail}</span>
              </li>
              <li className={`flex items-start`}>
                <MapPin className={`text-blue-500 mt-1`} size={18} />
                <span className="text-gray-400">{contactAddress}</span>
              </li>
            </ul>
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
