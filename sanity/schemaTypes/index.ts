import { type SchemaTypeDefinition } from "sanity";

import portfolioItem from "./portfolioItem";
import profile from "./profile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioItem, profile],
};
