import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";

// Revalidate every 60 seconds
export const revalidate = 60;

import { Project } from "@/types/project";

export default async function Home() {
  const query = groq`*[_type == "portfolioItem"] | order(creationDate desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    creationDate
  }`;

  const testimonialsQuery = groq`*[_type == "testimonial"] {
    _id,
    name,
    role,
    quote,
    photo
  }`;

  const [projects, testimonials] = await Promise.all([
    client.fetch(query),
    client.fetch(testimonialsQuery),
  ]);

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
              creationDate={project.creationDate}
            />
          ))}
        </div>
      </div>

      <Process />
      <Testimonials testimonials={testimonials} />
    </main>
  );
}
