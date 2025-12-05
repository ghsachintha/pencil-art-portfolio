import { SanityImageSource } from "@sanity/image-url";

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  photo?: SanityImageSource;
}
