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
      name: "location",
      title: "Location",
      type: "geopoint",
    }),
    defineField({
      name: "elevation",
      title: "Elevation",
      type: "height",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prominence",
      title: "Prominence",
      type: "height",
    }),
    defineField({
      name: "lists",
      title: "Lists",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "peakList" } })],
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
  ],
});

export default peakType;
