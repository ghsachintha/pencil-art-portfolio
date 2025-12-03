"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface MagnifierProps {
  image: any;
}

export default function Magnifier({ image }: MagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setMagnifierPosition({ x, y });

    // const zoomLevel = 2.5;
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setBackgroundPosition({ x: bgX, y: bgY });
  };

  const imageUrl = urlFor(image).url();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleMouseEnter = () => {
    setShowMagnifier(true);
    if (imgRef.current) {
      setDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  };

  return (
    <div
      ref={imgRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-neutral-100 rounded-sm overflow-hidden cursor-crosshair"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={imageUrl}
        alt="Artwork"
        fill
        className="object-contain p-4"
        sizes="100vw"
        priority
      />

      {showMagnifier && (
        <div
          className="absolute pointer-events-none border-2 border-white/50 rounded-full shadow-xl bg-white bg-no-repeat"
          style={{
            width: "150px",
            height: "150px",
            left: `${magnifierPosition.x - 75}px`,
            top: `${magnifierPosition.y - 75}px`,
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: `${dimensions.width * 2.5}px ${dimensions.height * 2.5}px`,
            backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
          }}
        />
      )}
    </div>
  );
}
