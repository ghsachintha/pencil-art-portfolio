import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import ScrollReveal from "@/components/ScrollReveal";

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
    <div className="min-h-screen">
      <Hero />

      <div className="container mx-auto pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
              Selected Works
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project, index: number) => (
            <ScrollReveal key={project._id} delay={index * 0.1}>
              <ProjectCard
                title={project.title}
                slug={project.slug}
                coverImage={project.coverImage}
                creationDate={project.creationDate}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Process />
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
