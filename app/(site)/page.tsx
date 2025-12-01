import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface PortfolioItem {
  _id: string;
  title: string;
  slug: string;
  image: any;
  creationDate: string;
}

async function getPortfolioItems() {
  return client.fetch(
    `*[_type == "portfolioItem"] | order(creationDate desc) {
      _id,
      title,
      "slug": slug.current,
      image,
      creationDate
    }`
  );
}

export default async function Home() {
  const items = await getPortfolioItems();

  return (
    <div className="space-y-8">
      <header className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">
          Portfolio
        </h1>
        <p className="text-secondary max-w-2xl mx-auto">
          A collection of pencil drawings and sketches.
        </p>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item: PortfolioItem) => (
          <div key={item._id} className="break-inside-avoid group relative">
            <div className="relative aspect-auto w-full overflow-hidden rounded-sm bg-gray-100">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(800).url()}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-serif font-medium text-primary">
                {item.title}
              </h3>
              {item.creationDate && (
                <p className="text-xs text-secondary/80">
                  {new Date(item.creationDate).getFullYear()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-secondary">
          <p>No artwork found. Please add some items in the Studio.</p>
        </div>
      )}
    </div>
  );
}
