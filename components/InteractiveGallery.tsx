"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

import { SanityImageSource } from "@sanity/image-url";
import { GlassContainer } from "./GlassContainer";

interface InteractiveGalleryProps {
  coverImage: SanityImageSource;
  sketchImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  title: string;
}

export default function InteractiveGallery({
  coverImage,
  sketchImage,
  gallery = [],
  title,
}: InteractiveGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Combine cover image and gallery
  const allImages = [coverImage, ...(gallery || [])].filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Main Stage */}
      <GlassContainer
        intensity="regular"
        className="relative w-full h-[50vh] md:h-[600px] flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex items-center justify-center p-4"
          >
            {activeImageIndex === 0 && sketchImage ? (
              <div className="w-full h-full rounded-lg overflow-hidden relative shadow-inner border border-glass-border">
                <BeforeAfterSlider
                  coverImage={coverImage}
                  sketchImage={sketchImage}
                  title={title}
                />
              </div>
            ) : (
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-inner border border-glass-border bg-white/50 dark:bg-black/20">
                <Image
                  src={urlFor(allImages[activeImageIndex]).url()}
                  alt={`${title} - View ${activeImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </GlassContainer>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden transition-all duration-200 border-2 snap-start ${
              activeImageIndex === index
                ? "border-neutral-900 opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
