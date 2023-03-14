import { defineField, defineType } from "sanity";

const boundingBoxType = defineType({
  name: "boundingBox",
  title: "Bounding box",
  type: "object",
  fields: [
    defineField({
      name: "northwest",
      title: "Northwest",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "southeast",
      title: "Southeast",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default boundingBoxType;
