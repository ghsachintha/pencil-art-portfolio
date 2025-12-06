import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";

async function getProfile() {
  return client.fetch(
    `*[_type == "profile"][0] {
      name,
      photo,
      bio
    }`
  );
}

async function getTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] {
      _id,
      name,
      role,
      quote,
      photo
    }`
  );
}

export default async function AboutPage() {
  const [profile, testimonials] = await Promise.all([
    getProfile(),
    getTestimonials(),
  ]);

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-40 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Image Section */}
            <div className="relative order-2 lg:order-1 max-w-md mx-auto lg:mx-0 w-full">
              <div className="aspect-[3/4] relative rounded-sm overflow-hidden shadow-2xl">
                {profile.photo?.asset && (
                  <Image
                    src={urlFor(profile.photo).width(800).height(1067).url()}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-neutral-100 dark:bg-neutral-800 -z-10 rounded-sm" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-neutral-200 dark:border-neutral-700 -z-10 rounded-sm" />
            </div>

            {/* Content Section */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                  {profile.name}
                </h1>
                <div className="w-20 h-1 bg-primary rounded-full" />
              </div>

              <div className="prose prose-stone prose-lg dark:prose-invert text-secondary font-light leading-relaxed">
                {profile.bio && <PortableText value={profile.bio} />}
              </div>

              {/* Philosophy Section (Static for now) */}
              <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-sm border-l-4 border-primary">
                <h3 className="font-serif text-xl font-bold mb-3 text-primary">
                  My Philosophy
                </h3>
                <p className="text-secondary italic">
                  &quot;I believe that every face tells a story, and my pencil
                  is the tool I use to listen. It&apos;s not just about
                  capturing a likeness, but about preserving a moment of soul on
                  paper.&quot;
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/order"
                  className="inline-block px-8 py-4 bg-primary text-[var(--color-text-inverted)] rounded-sm hover:opacity-90 shadow-sm hover:shadow-md active:scale-95 transition-all font-serif text-lg"
                  aria-label="Order your custom pencil portrait"
                >
                  Order Your Portrait
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testimonials testimonials={testimonials} />
    </>
  );
}
