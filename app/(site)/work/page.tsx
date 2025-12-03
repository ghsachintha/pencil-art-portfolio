import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import WorkGallery from "@/components/WorkGallery";
import { Project } from "@/types/project";

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: "Portfolio | Pencil Art",
  description:
    "Explore my complete collection of pencil portraits and charcoal sketches.",
};

export default async function WorkPage() {
  const query = groq`*[_type == "portfolioItem"] | order(creationDate desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    gallery,
    completionDate,
    size
  }`;

  const projects: Project[] = await client.fetch(query);

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Portfolio
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            A collection of my pencil drawings, capturing moments and emotions
            in graphite and charcoal.
          </p>
        </div>

        <WorkGallery initialProjects={projects} />
      </div>
    </main>
  );
}
