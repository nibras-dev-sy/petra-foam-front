"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "@/components/placeholder-image";

type ImageType = {
  id: number;
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

interface ImageCarouselProps {
  images: ImageType[];
  productTitle: string;
  isRTL?: boolean;
  imageText?: {
    previous?: string;
    next?: string;
    counterFormat?: string;
  };
}

export function ImageCarousel({ 
  images, 
  productTitle, 
  isRTL = false,
  imageText = {
    previous: "Previous image",
    next: "Next image",
    counterFormat: "{current} / {total}"
  }
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no images, render placeholder
  if (!images.length) {
    return (
      <div className="w-full max-w-xl h-80 md:h-96 mx-auto">
        <PlaceholderImage 
          text={productTitle}
          bgColor="bg-blue-600"
          className="rounded-lg shadow-xl h-full"
        />
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Format the counter text
  const counterText = imageText.counterFormat
    ?.replace("{current}", String(currentIndex + 1))
    .replace("{total}", String(images.length)) || `${currentIndex + 1} / ${images.length}`;

  return (
    <div className="relative w-full max-w-xl h-80 md:h-96 mx-auto group">
      {/* Current Image */}
      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl">
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={currentIndex === 0} // Prioritize loading the first image
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transform transition opacity-70 hover:opacity-100"
            aria-label={imageText.previous}
          >
            <ChevronLeft className={`w-5 h-5 text-blue-900 ${isRTL ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow-md transform transition opacity-70 hover:opacity-100"
            aria-label={imageText.next}
          >
            <ChevronRight className={`w-5 h-5 text-blue-900 ${isRTL ? "rotate-180" : ""}`} />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium">
          {counterText}
        </div>
      )}
    </div>
  );
} 