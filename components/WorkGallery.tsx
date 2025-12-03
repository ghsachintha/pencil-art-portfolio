"use client";

import { useState, useMemo } from "react";
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
        const dateA = new Date(a.completionDate).getTime();
        const dateB = new Date(b.completionDate).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [initialProjects, searchQuery, selectedSize, sortOrder]);

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-6 rounded-sm shadow-sm border border-border">
        {/* Search */}
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-highlight border border-border rounded-sm focus:outline-none focus:border-strong transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
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

        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {/* Size Filter */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value as SizeFilter)}
            className="px-4 py-2 bg-surface-highlight border border-border rounded-sm focus:outline-none cursor-pointer"
          >
            <option value="All">All Sizes</option>
            <option value="A4">A4</option>
            <option value="A3">A3</option>
            <option value="A2">A2</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="px-4 py-2 bg-surface-highlight border border-border rounded-sm focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
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
                  completionDate={project.completionDate}
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
