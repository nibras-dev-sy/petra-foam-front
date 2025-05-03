"use client"

interface PlaceholderLogoProps {
  className?: string
  inverted?: boolean
}

export default function PlaceholderLogo({
  className = "",
  inverted = false
}: PlaceholderLogoProps) {
  const textColor = inverted ? "text-white" : "text-blue-700";
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`w-12 h-12 mr-3 flex items-center justify-center rounded-full border ${inverted ? "border-white" : "border-blue-700"}`}>
        <span className={`font-bold text-xl ${textColor}`}>P</span>
      </div>
      <div className={`font-bold text-xl ${textColor}`}>
        Petra Foam
      </div>
    </div>
  )
} 