"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="w-full py-6 border-b border-secondary/10 relative z-50">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight z-50 relative"
        >
          Pencil Art
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">
            Work
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/order" className="hover:text-primary transition-colors">
            Order Art
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 text-neutral-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-current block origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-current block"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="w-full h-0.5 bg-current block origin-center"
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 bg-white flex flex-col items-center justify-center md:hidden"
            >
              <div className="flex flex-col gap-8 text-2xl font-serif font-medium text-center">
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className="hover:text-neutral-600 transition-colors"
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className="hover:text-neutral-600 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/order"
                  onClick={toggleMenu}
                  className="hover:text-neutral-600 transition-colors"
                >
                  Order Art
                </Link>
                <Link
                  href="/contact"
                  onClick={toggleMenu}
                  className="hover:text-neutral-600 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
