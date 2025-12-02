import { type SchemaTypeDefinition } from "sanity";

import commission from "./commission";
import portfolioItem from "./portfolioItem";
import profile from "./profile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioItem, profile, commission],
};
