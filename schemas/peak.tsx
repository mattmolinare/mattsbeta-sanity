import { defineArrayMember, defineField, defineType } from "sanity";

const peakType = defineType({
  name: "peak",
  title: "Peak",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "elevation",
      title: "Elevation",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prominence",
      title: "Prominence",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lists",
      title: "Lists",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "peakList" } })],
    }),
  ],
});

export default peakType;
