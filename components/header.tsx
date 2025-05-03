"use client"

import Link from "next/link"
import Image from "next/image"
import LanguageSwitcher from "./language-switcher"
import type { Locale } from "@/lib/i18n-config"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"

export default function Header({
  lang,
  dictionary,
}: {
  lang: Locale
  dictionary: any
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Get navigation texts from dictionary
  const nav = dictionary.navigation || {}
  const switchLabel = dictionary.languageSwitcher?.switchTo || ""

  // Navigation links
  const navLinks = [
    { href: `/${lang}`, label: nav.home || "Home" },
    { href: `/${lang}/products`, label: nav.products || "Products" },
    { href: `/${lang}/projects`, label: nav.projects || "Projects" },
    { href: `/${lang}/about-us`, label: nav.aboutUs || "About Us" },
    { href: `/${lang}/contact-us`, label: nav.contactUs || "Contact Us" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-700 shadow-md py-2" : "bg-blue-600 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <div className="text-white font-bold text-xl">Petra Foam</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-6 ${lang === "ar" ? "space-x-reverse" : ""}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-blue-100 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4">
              <LanguageSwitcher currentLang={lang} switchLabel={switchLabel} />
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher currentLang={lang} switchLabel={""} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="ml-2 text-white hover:bg-blue-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3">
            <nav className={`flex flex-col space-y-3 ${lang === "ar" ? "items-end text-right" : "items-start"}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-blue-100 transition-colors w-full py-2 block text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
