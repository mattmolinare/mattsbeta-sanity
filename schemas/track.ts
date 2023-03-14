import { defineField, defineType } from "sanity";

const trackType = defineType({
  name: "track",
  title: "Track",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "s3Key",
      title: "S3 key",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "boundingBox",
      title: "Bounding box",
      type: "boundingBox",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default trackType;
