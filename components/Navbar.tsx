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
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full py-6 border-b border-secondary/10 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight z-50 relative"
        >
          Pencil Art
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-secondary">
          {["Work", "About", "Order Art", "Contact"].map((item) => (
            <Link
              key={item}
              href={
                item === "Work"
                  ? "/"
                  : item === "Order Art"
                    ? "/order"
                    : `/${item.toLowerCase()}`
              }
              className="relative group hover:text-primary transition-colors"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 text-neutral-900 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
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
                {[
                  { name: "Work", href: "/" },
                  { name: "About", href: "/about" },
                  { name: "Order Art", href: "/order" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className="hover:text-neutral-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
