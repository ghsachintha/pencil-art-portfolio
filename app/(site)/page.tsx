import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProjectCard from "@/components/ProjectCard";

// Revalidate every 60 seconds
export const revalidate = 60;

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
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            Portfolio
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Capturing moments in monochrome. A collection of hand-drawn pencil
            portraits and sketches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
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
    </main>
  );
}
