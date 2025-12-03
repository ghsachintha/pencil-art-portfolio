"use client";

import { motion } from "framer-motion";

export default function PencilLoader() {
  return (
    <div
      className="flex items-center justify-center w-full h-full min-h-[50vh]"
      role="status"
      aria-label="Loading content"
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Pencil Stroke Path */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full text-primary overflow-visible"
          aria-hidden="true"
        >
          <motion.path
            d="M 20 50 Q 50 20 80 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          />
        </svg>

        {/* Pencil Icon */}
        <motion.div
          className="absolute w-8 h-8 text-primary"
          style={{ originX: 0, originY: 1 }} // Pivot at bottom-left (tip)
          initial={{ x: 10, y: 30, rotate: 0 }}
          animate={{
            x: [10, 40, 70], // Approximate x positions along the curve
            y: [30, 10, 30], // Approximate y positions along the curve
            rotate: [-10, 0, 10], // Tilt effect
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
          aria-hidden="true"
        >
          {/* Simple Pencil SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full drop-shadow-md"
          >
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
