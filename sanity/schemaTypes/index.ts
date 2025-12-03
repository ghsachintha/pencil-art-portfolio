import { type SchemaTypeDefinition } from "sanity";

import order from "./order";
import portfolioItem from "./portfolioItem";
import profile from "./profile";

import testimonial from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioItem, profile, order, testimonial],
};
