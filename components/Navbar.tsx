"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { createPortal } from "react-dom";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
    },
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none",
          scrolled ? "py-4" : "py-6"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between px-6 py-3 transition-all duration-500",
            scrolled || isMenuOpen
              ? "w-[95%] md:w-[85%] lg:w-[70%] rounded-full bg-material-thick/80 backdrop-blur-glass-thick shadow-glass border border-glass-border"
              : "w-full bg-transparent border-transparent px-8"
          )}
        >
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-tight z-50 relative text-text-main"
          >
            Pencil Art
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-text-muted">
            {["Work", "About", "Get Yours", "Contact"].map((item) => {
              const href =
                item === "Work"
                  ? "/work"
                  : item === "Get Yours"
                    ? "/order"
                    : `/${item.toLowerCase()}`;
              const active = isActive(href);

              return (
                <Link
                  key={item}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 rounded-full transition-all duration-300 hover:text-text-main",
                    active
                      ? "text-text-main bg-material-regular backdrop-blur-glass-thin shadow-glass-sheen border border-glass-border"
                      : "hover:bg-surface-overlay/50 border border-transparent"
                  )}
                >
                  {item}
                </Link>
              );
            })}
            <div className="pl-2 border-l border-glass-border ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 text-text-main focus:outline-none bg-surface-overlay/20 rounded-full hover:bg-surface-overlay/40 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                  }
                  className="w-full h-0.5 bg-current block origin-center rounded-full"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current block rounded-full"
                />
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                  }
                  className="w-full h-0.5 bg-current block origin-center rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[40] bg-black/20 backdrop-blur-sm md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="fixed top-24 left-4 right-4 z-[50] rounded-3xl bg-material-thick backdrop-blur-glass-thick shadow-glass border border-glass-border p-6 flex flex-col items-center gap-6 md:hidden origin-top"
              >
                <div className="flex flex-col gap-6 text-xl font-serif font-medium text-center w-full">
                  {[
                    { name: "Work", href: "/work" },
                    { name: "About", href: "/about" },
                    { name: "Get Yours", href: "/order" },
                    { name: "Contact", href: "/contact" },
                  ].map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className="block w-full py-2 hover:bg-surface-overlay rounded-xl transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
