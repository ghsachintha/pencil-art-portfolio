import { SanityImageSource } from "@sanity/image-url";

export interface Project {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  coverImage: SanityImageSource;
  gallery: SanityImageSource[];
  creationDate: string;
  size: string;
}
