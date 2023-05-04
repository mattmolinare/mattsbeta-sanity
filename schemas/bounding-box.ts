import { defineField, defineType } from "sanity";

const boundingBoxType = defineType({
  name: "boundingBox",
  title: "Bounding box",
  type: "object",
  fields: [
    defineField({
      name: "southwest",
      title: "Southwest",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "northeast",
      title: "Northeast",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default boundingBoxType;
