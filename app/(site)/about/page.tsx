import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getProfile() {
  return client.fetch(
    `*[_type == "profile"][0] {
      name,
      photo,
      bio
    }`
  );
}

export default async function AboutPage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[3/4] w-full bg-gray-100 rounded-sm overflow-hidden shadow-sm">
          {profile.photo && (
            <Image
              src={urlFor(profile.photo).width(600).url()}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-serif font-bold text-primary">
            {profile.name}
          </h1>
          <div className="prose prose-stone prose-lg text-secondary font-light">
            {profile.bio && <PortableText value={profile.bio} />}
          </div>
        </div>
      </div>
    </div>
  );
}
