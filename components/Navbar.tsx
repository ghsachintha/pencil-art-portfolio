"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full py-6 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tight z-50 relative"
        >
          Pencil Art
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          {["Work", "About", "Order Art", "Contact"].map((item) => {
            const href =
              item === "Work"
                ? "/work"
                : item === "Order Art"
                  ? "/order"
                  : `/${item.toLowerCase()}`;

            return (
              <Link
                key={item}
                href={href}
                className={`relative group hover:text-primary transition-colors ${
                  isActive(href) ? "text-primary" : ""
                }`}
              >
                {item}
                <span
                  className={`absolute left-0 -bottom-1 h-px bg-primary transition-all duration-300 ${
                    isActive(href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 text-main focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={
                  isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                }
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
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 bg-surface flex flex-col items-center justify-center md:hidden"
            >
              <div className="flex flex-col gap-8 text-2xl font-serif font-medium text-center">
                {[
                  { name: "Work", href: "/work" },
                  { name: "About", href: "/about" },
                  { name: "Order Art", href: "/order" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className="hover:text-main transition-colors"
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
