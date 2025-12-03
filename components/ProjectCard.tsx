"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  title: string;
  slug: string;
  coverImage: any;
  gallery?: any[];
  completionDate?: string;
}

export default function ProjectCard({
  title,
  slug,
  coverImage,
  gallery = [],
  completionDate,
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
    <Link href={`/portfolio/${slug}`} className="group block">
      <div
        className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-4 rounded-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0); // Immediate reset
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
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
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
      </div>
      <div className="flex justify-between items-baseline">
        <h3 className="text-xl font-serif font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
          {title}
        </h3>
        {completionDate && (
          <span className="text-sm text-neutral-500 font-sans">
            {new Date(completionDate).getFullYear()}
          </span>
        )}
      </div>
    </Link>
  );
}
