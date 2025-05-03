"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCallback } from "react"
import { Globe } from "lucide-react"

export default function LanguageSwitcher({
  currentLang,
  switchLabel,
}: {
  currentLang: string
  switchLabel: string
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
      className="rounded-full bg-white/10 text-white hover:bg-white hover:text-blue-700 border-none"
      size="sm"
    >
      <Globe className="w-4 h-4 mr-2" />
      {switchLabel ? `${switchLabel} ` : ""}
      {otherLangName}
    </Button>
  )
}
