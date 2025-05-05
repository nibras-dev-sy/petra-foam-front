import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/services/media";

interface StrapiImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  fill = false,
  sizes,
  priority = false,
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMediaUrl(src);
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt || ""}
      height={!fill ? height : undefined}
      width={!fill ? width : undefined}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
    />
  );
} 