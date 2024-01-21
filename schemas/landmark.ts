import { defineField, defineType } from "sanity";

const landmarkType = defineType({
  name: "landmark",
  title: "Landmark",
  type: "object",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "reference",
      to: { type: "photo" },
      weak: true,
    }),
  ],
});

export default landmarkType;
