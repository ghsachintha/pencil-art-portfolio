"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12">
      <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center md:text-left z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-tight">
            Capturing <br />
            <span className="italic text-secondary">Soul</span> in <br />
            Graphite.
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-md mx-auto md:mx-0 font-light">
            Hand-drawn pencil portraits that tell a story. Timeless, elegant,
            and crafted with passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/order"
              className="px-8 py-4 bg-primary text-[var(--color-text-inverted)] rounded-sm hover:opacity-90 shadow-sm hover:shadow-md active:scale-95 transition-all font-serif text-lg"
              aria-label="Get your custom pencil portrait"
            >
              Get Yours
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 border border-primary text-primary rounded-sm hover:bg-primary/5 transition-all font-serif text-lg"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>

        {/* Visual Content (Placeholder for 3D/Video) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center"
        >
          {/* Abstract Background Shapes */}
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200/50 to-transparent dark:from-neutral-800/50 rounded-full blur-3xl" />

          {/* Floating Paper Effect */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-3/4 aspect-[3/4] bg-white dark:bg-neutral-800 shadow-2xl p-4 rotate-3 border border-neutral-100 dark:border-neutral-700"
          >
            <div className="w-full h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden relative">
              {/* Actual Artwork with Reveal Effect */}
              <motion.div
                initial={{ opacity: 0, filter: "grayscale(100%) blur(2px)" }}
                animate={{ opacity: 1, filter: "grayscale(0%) blur(0px)" }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src="/images/hero-portrait.png"
                  alt="Pencil Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Animated Pencil Stroke (Overlay) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-20">
                <motion.path
                  d="M50,50 Q150,150 250,50 T450,50"
                  fill="none"
                  className="stroke-neutral-500 dark:stroke-neutral-400"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse",
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
