import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "drawingSize",
      title: "Drawing Size",
      type: "string",
      options: {
        list: [
          { title: "A4", value: "A4" },
          { title: "A3", value: "A3" },
          { title: "A2", value: "A2" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "referencePhoto",
      title: "Reference Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Accepted", value: "accepted" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "pending",
    }),
  ],
});
