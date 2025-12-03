"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

import { SanityImageSource } from "@sanity/image-url";

interface BeforeAfterSliderProps {
  coverImage: SanityImageSource;
  sketchImage: SanityImageSource;
  title: string;
}

export default function BeforeAfterSlider({
  coverImage,
  sketchImage,
  title,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (
    event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
  ) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX =
      "touches" in event
        ? event.touches[0].clientX
        : (event as MouseEvent).clientX;

    const position =
      ((clientX - containerRect.left) / containerRect.width) * 100;

    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        handleMove(e);
      }
    };

    const handleGlobalUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("touchmove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
      window.addEventListener("touchend", handleGlobalUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] overflow-hidden select-none cursor-ew-resize group rounded-sm"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onClick={(e) => handleMove(e)}
    >
      {/* Background Image (Final/Cover) */}
      <div className="absolute inset-0">
        <Image
          src={urlFor(coverImage).url()}
          alt={`Final version of ${title}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10">
          Final
        </div>
      </div>

      {/* Foreground Image (Sketch) - Clipped */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={urlFor(sketchImage).url()}
          alt={`Sketch version of ${title}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 bg-white/50 text-black text-xs px-2 py-1 rounded backdrop-blur-sm z-10">
          Sketch
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-neutral-400">
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
              transform="rotate(90 12 12)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
