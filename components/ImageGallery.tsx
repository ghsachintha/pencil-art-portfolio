"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";

import { SanityImageSource } from "@sanity/image-url";

interface ImageGalleryProps {
  images: SanityImageSource[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  };

  return (
    <>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/5] bg-neutral-50 rounded-sm overflow-hidden group cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={urlFor(image).url()}
              alt={`${title} - Gallery ${index + 1}`}
              fill
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2"
              onClick={() => setSelectedIndex(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2 hidden sm:block"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2 hidden sm:block"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            <div
              className="relative w-full h-full max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={urlFor(images[selectedIndex]).url()}
                alt={`${title} - Full View`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
