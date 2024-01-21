import { defineField, defineType } from "sanity";

const landManager = defineType({
  name: "landManager",
  title: "Land manager",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
    }),
  ],
});

export default landManager;
