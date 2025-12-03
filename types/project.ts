import { SanityImageSource } from "@sanity/image-url";

export interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage: SanityImageSource;
  gallery: SanityImageSource[];
  completionDate: string;
  size?: string; // Adding size for filtering
}
