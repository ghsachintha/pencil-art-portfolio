import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolioItem",
  title: "Portfolio Items",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image" }],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "A4", value: "A4" },
          { title: "A3", value: "A3" },
          { title: "A2", value: "A2" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sketchImage",
      title: "Rough Sketch",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Optional. Upload the initial sketch to enable the Before/After slider.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "creationDate",
      title: "Creation Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
  ],
});
