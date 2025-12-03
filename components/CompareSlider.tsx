"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { SanityImageSource } from "@sanity/image-url";

interface CompareSliderProps {
  sketch: SanityImageSource;
  final: SanityImageSource;
}

export default function CompareSlider({ sketch, final }: CompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);
  // const onMouseUp = () => setIsDragging(false);
  // const onTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalUp);
    window.addEventListener("touchend", handleGlobalUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-neutral-100 rounded-sm overflow-hidden cursor-ew-resize select-none"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Background Image (Final) */}
      <div className="absolute inset-0">
        <Image
          src={urlFor(final).url()}
          alt="Final Artwork"
          fill
          className="object-contain p-4"
          sizes="100vw"
          priority
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          Final
        </div>
      </div>

      {/* Foreground Image (Sketch) - Clipped */}
      <div
        className="absolute inset-0 bg-white"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={urlFor(sketch).url()}
          alt="Sketch"
          fill
          className="object-contain p-4"
          sizes="100vw"
          priority
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          Sketch
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-neutral-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
