"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";
import { motion, AnimatePresence } from "framer-motion";
import { GlassContainer } from "./GlassContainer";

interface ProjectCardProps {
  title: string;
  slug: string;
  coverImage: SanityImageSource;
  gallery?: SanityImageSource[];
  creationDate?: string;
}

export default function ProjectCard({
  title,
  slug,
  coverImage,
  gallery = [],
  creationDate,
}: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Combine cover image and gallery for the slideshow
  const images = [coverImage, ...(gallery || [])].filter(Boolean);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovered && images.length > 1) {
      // Start cycling immediately
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group block focus-visible:outline-none"
    >
      <GlassContainer
        as={motion.div}
        intensity="thin"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative aspect-[4/5] overflow-hidden mb-4 group-hover:shadow-glass hover:bg-material-regular/50 transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0); // Immediate reset
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={urlFor(images[currentImageIndex]).url()}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay for hover state */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-surface-overlay transition-colors duration-300 pointer-events-none" />
      </GlassContainer>
      <div className="flex justify-between items-baseline group-focus-visible:underline">
        <h3 className="text-xl font-serif font-medium text-main group-hover:text-muted transition-colors">
          {title}
        </h3>
        {creationDate && (
          <span className="text-sm text-muted font-sans">
            {new Date(creationDate).getFullYear()}
          </span>
        )}
      </div>
    </Link>
  );
}
