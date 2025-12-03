"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { SanityImageSource } from "@sanity/image-url";

interface LensZoomProps {
  image: SanityImageSource;
}

export default function LensZoom({ image }: LensZoomProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setMagnifierPosition({ x, y });

    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setBackgroundPosition({ x: bgX, y: bgY });
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
    if (imgRef.current) {
      setDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  };

  const imageUrl = urlFor(image).url();

  return (
    <div
      ref={imgRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-neutral-100 rounded-sm overflow-hidden cursor-crosshair group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={imageUrl}
        alt="Artwork"
        fill
        className="object-contain p-4 transition-opacity duration-300 group-hover:opacity-90"
        sizes="100vw"
        priority
      />

      {showMagnifier && (
        <div
          className="absolute pointer-events-none border-2 border-white/50 rounded-full shadow-2xl bg-white bg-no-repeat z-20"
          style={{
            width: "180px",
            height: "180px",
            left: `${magnifierPosition.x - 90}px`,
            top: `${magnifierPosition.y - 90}px`,
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: `${dimensions.width * 2.5}px ${dimensions.height * 2.5}px`,
            backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
          }}
        />
      )}

      {/* Hint Text */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-serif tracking-wider">
        HOVER TO ZOOM
      </div>
    </div>
  );
}
