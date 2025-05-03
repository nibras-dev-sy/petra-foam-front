"use client"

interface PlaceholderImageProps {
  text: string
  className?: string
  width?: number
  height?: number
  bgColor?: string
  textColor?: string
}

export default function PlaceholderImage({
  text,
  className = "",
  width = 800,
  height = 600,
  bgColor = "bg-blue-700",
  textColor = "text-white"
}: PlaceholderImageProps) {
  return (
    <div
      className={`flex items-center justify-center ${bgColor} ${textColor} ${className}`}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
      }}
    >
      <p className="text-lg font-medium text-center p-4">{text}</p>
    </div>
  )
} 