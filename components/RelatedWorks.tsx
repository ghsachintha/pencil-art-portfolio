"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProjectCard from "./ProjectCard";

interface RelatedWorksProps {
  currentSlug: string;
}

import { SanityImageSource } from "@sanity/image-url";

interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage: SanityImageSource;
  gallery: SanityImageSource[];
  creationDate: string;
}

export default function RelatedWorks({ currentSlug }: RelatedWorksProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      // Fetch 3 random projects excluding the current one
      // Note: GROQ doesn't have a true 'random' function, so we'll fetch a few and shuffle client-side or just take the latest 3 excluding current.
      // For simplicity and performance, we'll take the latest 3 excluding current.
      const query = groq`*[_type == "portfolioItem" && slug.current != $currentSlug] | order(creationDate desc)[0...3] {
        _id,
        title,
        "slug": slug.current,
        coverImage,
        gallery,
        creationDate
      }`;

      const data = await client.fetch(query, { currentSlug });
      setProjects(data);
    };

    fetchRelated();
  }, [currentSlug]);

  if (projects.length === 0) {
    return (
      <section className="mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="text-2xl font-serif font-bold text-primary mb-8">
          You Might Also Like
        </h2>
        <p className="text-neutral-500 italic">More projects coming soon.</p>
      </section>
    );
  }

  return (
    <section className="mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-serif font-bold text-primary mb-8">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            slug={project.slug}
            coverImage={project.coverImage}
            gallery={project.gallery}
            creationDate={project.creationDate}
          />
        ))}
      </div>
    </section>
  );
}
