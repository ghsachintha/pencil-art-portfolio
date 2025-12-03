"use client";

import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { SanityImageSource } from "@sanity/image-url";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  photo: SanityImageSource | null;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const query = groq`*[_type == "testimonial"] {
        _id,
        name,
        role,
        quote,
        photo
      }`;
      const data = await client.fetch(query);
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  // Fallback data for demonstration if no Sanity data exists
  const fallbackTestimonials: Testimonial[] = [
    {
      _id: "1",
      name: "Sarah Jenkins",
      role: "Art Collector",
      quote:
        "The attention to detail in the portrait I commissioned is absolutely breathtaking. It captures the spirit of the subject perfectly.",
      photo: null,
    },
    {
      _id: "2",
      name: "David Chen",
      role: "Interior Designer",
      quote:
        "I've worked with many artists, but the charcoal work here is on another level. It adds such a sophisticated touch to my client's home.",
      photo: null,
    },
    {
      _id: "3",
      name: "Emily Rostova",
      role: "Private Client",
      quote:
        "The process was so smooth and professional. Receiving the final piece was an emotional moment for my family. Truly a masterpiece.",
      photo: null,
    },
  ];

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (displayTestimonials.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
      <div className="container px-4 mb-12 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">
          Kind Words
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="relative flex w-full overflow-hidden mask-gradient">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-50 dark:from-neutral-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-50 dark:from-neutral-900 to-transparent z-10" />

        <motion.div
          className="flex gap-8 py-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Duplicate list for infinite scroll */}
          {[...displayTestimonials, ...displayTestimonials].map(
            (testimonial, index) => (
              <div
                key={`${testimonial._id}-${index}`}
                className="flex-shrink-0 w-[350px] md:w-[450px] p-8 bg-white dark:bg-neutral-800 rounded-sm shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-200">
                    {testimonial.photo && (
                      <Image
                        src={urlFor(testimonial.photo)
                          .width(100)
                          .height(100)
                          .url()}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-secondary italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
