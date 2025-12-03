import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";

// Revalidate every 60 seconds
export const revalidate = 60;

import { SanityImageSource } from "@sanity/image-url";

interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage: SanityImageSource;
  gallery: SanityImageSource[];
  completionDate: string;
}

export default async function Home() {
  const query = groq`*[_type == "portfolioItem"] | order(creationDate desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    gallery,
    completionDate
  }`;

  const projects = await client.fetch(query);

  return (
    <main className="min-h-screen">
      <Hero />

      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
            Selected Works
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              slug={project.slug}
              coverImage={project.coverImage}
              gallery={project.gallery}
              completionDate={project.completionDate}
            />
          ))}
        </div>
      </div>

      <Process />
      <Testimonials />
    </main>
  );
}
