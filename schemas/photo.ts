import { defineField, defineType } from "sanity";

const photoType = defineType({
  name: "photo",
  title: "Photo",
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
      name: "width",
      title: "Width",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    }),
  ],
});

export default photoType;
