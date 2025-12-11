import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import InteractiveGallery from "@/components/InteractiveGallery";
import ProjectSidebar from "@/components/ProjectSidebar";
import RelatedWorks from "@/components/RelatedWorks";

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
    creationDate
  }`;

  const project = await client.fetch(query, { slug });

  if (!project) {
    notFound();
  }

  const { title, description, coverImage, sketchImage, gallery, creationDate } =
    project;

  return (
    <div className="min-h-screen pt-40 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/20 dark:bg-purple-900/10 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
      </div>

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
              creationDate={creationDate}
              coverImage={coverImage}
            />
          </div>
        </div>

        <RelatedWorks currentSlug={slug} />
      </div>
    </div>
  );
}
