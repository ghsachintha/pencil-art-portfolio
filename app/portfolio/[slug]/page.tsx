import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import InteractiveGallery from "@/components/InteractiveGallery";
import ProjectSidebar from "@/components/ProjectSidebar";

// Revalidate every 60 seconds
export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const query = groq`*[_type == "portfolioItem" && slug.current == $slug][0] {
    title,
    description,
    coverImage,
    sketchImage,
    gallery,
    completionDate
  }`;

  const project = await client.fetch(query, { slug });

  if (!project) {
    notFound();
  }

  const {
    title,
    description,
    coverImage,
    sketchImage,
    gallery,
    completionDate,
  } = project;

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column (Span 2) */}
          <div className="md:col-span-2">
            <InteractiveGallery
              coverImage={coverImage}
              sketchImage={sketchImage}
              gallery={gallery}
              title={title}
            />
          </div>

          {/* Right Column (Span 1) */}
          <div className="md:col-span-1">
            <ProjectSidebar
              title={title}
              description={description}
              completionDate={completionDate}
              coverImage={coverImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
