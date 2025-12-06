"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { GlassContainer } from "./GlassContainer";

interface WorkGalleryProps {
  initialProjects: Project[];
}

type SortOrder = "newest" | "oldest";
type SizeFilter = "All" | "A4" | "A3" | "A2";

export default function WorkGallery({ initialProjects }: WorkGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState<SizeFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        // Search Filter
        const matchesSearch = project.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Size Filter
        const matchesSize =
          selectedSize === "All" ||
          (project.size && project.size === selectedSize);

        return matchesSearch && matchesSize;
      })
      .sort((a, b) => {
        const dateA = a.creationDate
          ? new Date(a.creationDate).getTime()
          : new Date(a._createdAt).getTime();
        const dateB = b.creationDate
          ? new Date(b.creationDate).getTime()
          : new Date(b._createdAt).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [initialProjects, searchQuery, selectedSize, sortOrder]);

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        {/* Search */}
        <div className="w-full lg:w-96 relative group z-30">
          <GlassContainer
            intensity="regular"
            className="rounded-full relative overflow-hidden shadow-glass-sheen"
          >
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-transparent text-text-main placeholder:text-text-muted focus:outline-none relative z-10"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-text-main transition-colors z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </GlassContainer>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto items-center z-20">
          {/* Size Filter (Pills) */}
          <GlassContainer
            intensity="thin"
            className="flex items-center gap-1 p-1 rounded-full shadow-glass-sheen"
          >
            {(["All", "A4", "A3", "A2"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-material-regular text-text-main shadow-sm border border-glass-border"
                    : "text-text-muted hover:text-text-main hover:bg-material-thin border border-transparent"
                }`}
              >
                {size === "All" ? "All Sizes" : size}
              </button>
            ))}
          </GlassContainer>

          {/* Sort Order (Custom Dropdown) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 pl-4 pr-3 py-2 bg-transparent text-text-main font-medium focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span>
                {sortOrder === "newest" ? "Newest First" : "Oldest First"}
              </span>
              <motion.svg
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute right-0 top-full mt-2 w-48 z-40"
                >
                  <GlassContainer
                    intensity="thick"
                    className="rounded-xl overflow-hidden shadow-glass p-1"
                  >
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          setSortOrder("newest");
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors rounded-lg mb-1 ${
                          sortOrder === "newest"
                            ? "bg-material-regular text-text-main font-medium border border-glass-border"
                            : "text-text-muted hover:text-text-main hover:bg-material-thin border border-transparent"
                        }`}
                      >
                        Newest First
                      </button>
                      <button
                        onClick={() => {
                          setSortOrder("oldest");
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors rounded-lg ${
                          sortOrder === "oldest"
                            ? "bg-material-regular text-text-main font-medium border border-glass-border"
                            : "text-text-muted hover:text-text-main hover:bg-material-thin border border-transparent"
                        }`}
                      >
                        Oldest First
                      </button>
                    </div>
                  </GlassContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard
                  title={project.title}
                  slug={project.slug}
                  coverImage={project.coverImage}
                  gallery={project.gallery}
                  creationDate={project.creationDate}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-24">
          <p className="text-muted text-lg">
            No projects found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSize("All");
            }}
            className="mt-4 text-primary underline hover:text-main"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
