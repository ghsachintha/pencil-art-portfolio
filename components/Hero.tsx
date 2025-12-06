"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GlassButton } from "./GlassButton";
import { GlassContainer } from "./GlassContainer";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Background for Glass Effect */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-300/30 dark:bg-indigo-900/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="container mx-auto w-full px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left z-10"
        >
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-text-main to-text-muted">
              Capturing <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 pr-6 inline-block">
                Soul
              </span>{" "}
              in <br />
              Graphite.
            </h1>
          </div>
          <p className="text-xl text-text-muted max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
            Hand-drawn pencil portraits that tell a story. Timeless, elegant,
            and crafted with passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/order">
              <GlassButton size="lg" className="rounded-full px-10 text-lg">
                Get Yours
              </GlassButton>
            </Link>
            <Link href="/work">
              <GlassButton
                variant="secondary"
                size="lg"
                className="rounded-full px-10 text-lg"
              >
                View Portfolio
              </GlassButton>
            </Link>
          </div>
        </motion.div>

        {/* Visual Content - Floating Glass Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative h-[60vh] lg:h-[80vh] w-full flex items-center justify-center perspective-1000"
        >
          {/* Main Floating Glass Slab */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-20"
          >
            <GlassContainer
              intensity="thick"
              className="p-4 rotate-[-6deg] w-[320px] md:w-[400px] aspect-[3/4] flex items-center justify-center relative group overflow-hidden"
            >
              {/* Reflection/Sheen layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30" />

              <div className="w-full h-full bg-white dark:bg-black rounded-lg overflow-hidden relative shadow-inner">
                <Image
                  src="/images/hero-portrait.png"
                  alt="Pencil Portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('/noise.png')]"></div>
              </div>
            </GlassContainer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
