'use client'

import Link from "next/link"

export default function MapSection({
  isRTL,
  dictionary
}: {
  isRTL: boolean;
  dictionary: any;
}) {
  // Google Maps URL with the coordinates
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.5!2d35.976338!3d31.761582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ1JzQxLjciTiAzNcKwNTgnMzQuOCJF!5e0!3m2!1sen!2sus!4v1622222222222!5m2!1sen!2sus`
  
  return (
    <div className={isRTL ? "lg:order-2" : ""}>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">{dictionary.map.title}</h2>
      <div className="rounded-xl overflow-hidden shadow-lg h-96">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Petra Foam Location"
        ></iframe>
      </div>
      <div className="mt-3 text-center">
        <Link
          href={`https://www.google.com/maps?q=31.761582,35.976338`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {dictionary.map.viewLarger}
        </Link>
      </div>
    </div>
  )
} 