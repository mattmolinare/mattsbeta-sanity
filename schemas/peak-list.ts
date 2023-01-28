import { defineField, defineType } from "sanity";

const peakListType = defineType({
  name: "peakList",
  title: "Peak list",
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

export default peakListType;
