"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"
import { Globe } from "lucide-react"

export default function LanguageSwitcher({
  currentLang,
  switchLabel,
  isScrolled = false,
}: {
  currentLang: string
  switchLabel: string
  isScrolled?: boolean
}) {
  const pathName = usePathname()
  const router = useRouter()

  const redirectedPathName = useCallback(
    (locale: string) => {
      if (!pathName) return "/"

      const segments = pathName.split("/")
      segments[1] = locale

      return segments.join("/")
    },
    [pathName],
  )

  const otherLang = currentLang === "en" ? "ar" : "en"
  const otherLangName = currentLang === "en" ? "العربية" : "English"

  return (
    <Button
      variant="outline"
      onClick={() => router.push(redirectedPathName(otherLang))}
      className={`rounded-full border-none ${
        isScrolled
          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
          : "bg-white/10 text-white hover:bg-white hover:text-blue-700"
      }`}
      size="sm"
    >
      <Globe className="w-4 h-4 mr-2" />
      {otherLangName}
    </Button>
  )
}
