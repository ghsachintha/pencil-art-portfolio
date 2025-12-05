"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

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

        // Size Filter (Assuming size is part of the project data or title/description if not explicit)
        // Since we don't have a strict size field in the schema yet, we might need to rely on title or add it.
        // For now, I'll check if the size is in the project object (I added it to the interface).
        // If not present, we might want to skip or handle gracefully.
        // Let's assume for now we filter if the size matches, or show all if "All".
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
        <div className="w-full lg:w-96 relative group">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm group-hover:shadow-md"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors"
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
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto items-center">
          {/* Size Filter (Pills) */}
          <div className="flex items-center gap-2 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800">
            {(["All", "A4", "A3", "A2"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "bg-white dark:bg-neutral-800 text-primary shadow-sm"
                    : "text-neutral-500 hover:text-primary hover:bg-white/50 dark:hover:bg-neutral-800/50"
                }`}
              >
                {size === "All" ? "All Sizes" : size}
              </button>
            ))}
          </div>

          {/* Sort Order (Custom Dropdown) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 pl-4 pr-3 py-2 bg-transparent text-primary font-medium focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span>
                {sortOrder === "newest" ? "Newest First" : "Oldest First"}
              </span>
              <motion.svg
                animate={{ rotate: isSortOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4 text-primary"
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
                  className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl overflow-hidden z-20"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSortOrder("newest");
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortOrder === "newest"
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Newest First
                    </button>
                    <button
                      onClick={() => {
                        setSortOrder("oldest");
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortOrder === "oldest"
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Oldest First
                    </button>
                  </div>
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
