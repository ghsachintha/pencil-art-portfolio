"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface RoomPreviewProps {
  image: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomPreview({
  image,
  isOpen,
  onClose,
}: RoomPreviewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2"
            onClick={onClose}
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

          {/* Room Environment */}
          <div
            className="relative w-full max-w-4xl aspect-[16/9] bg-[#e5e5e5] shadow-2xl overflow-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Wall Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-300" />

            {/* Floor (Optional subtle hint) */}
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#d4d4d4] border-t border-neutral-300" />

            {/* Framed Artwork */}
            <div className="relative z-10 w-auto h-[50%] aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white p-4 border-8 border-neutral-900">
              <div className="relative w-full h-full">
                <Image
                  src={urlFor(image).url()}
                  alt="Artwork on wall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Plant/Decor Placeholder (Optional CSS shapes) */}
            <div className="absolute bottom-[15%] right-[10%] w-24 h-32 bg-neutral-800/10 rounded-t-full blur-sm" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
