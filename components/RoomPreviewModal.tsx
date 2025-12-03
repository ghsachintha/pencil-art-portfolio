"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface RoomPreviewModalProps {
  image: SanityImageSource;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomPreviewModal({
  image,
  isOpen,
  onClose,
}: RoomPreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button - Fixed Positioning to escape all contexts */}
          <button
            className="fixed top-6 right-6 z-[10000] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md group cursor-pointer pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 group-hover:scale-110 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Room Environment */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-5xl aspect-[16/9] bg-[#e5e5e5] shadow-2xl overflow-hidden flex items-center justify-center rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Wall Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-300" />

            {/* Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-[#d4d4d4] border-t border-neutral-300" />

            {/* Shadow on floor */}
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[5%] bg-black/20 blur-xl rounded-full" />

            {/* Framed Artwork */}
            <div className="relative z-10 w-auto h-[55%] aspect-[3/4] shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-white p-6 border-[12px] border-neutral-900 rounded-sm">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={urlFor(image).url()}
                  alt="Artwork on wall"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Glass Reflection Hint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
            </div>

            {/* Plant/Decor Placeholder (Abstract) */}
            <div className="absolute bottom-[20%] right-[10%] w-32 h-48 bg-neutral-800/5 rounded-t-full blur-md" />
            <div className="absolute bottom-[20%] left-[10%] w-24 h-24 bg-neutral-800/5 rounded-full blur-md" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
