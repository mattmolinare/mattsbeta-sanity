import { defineField, defineType } from "sanity";
import PhotoPreview from "../components/photo-preview";
import PhotoS3KeyInput from "../components/photo-s3-key-input";

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
      components: {
        input: PhotoS3KeyInput,
      },
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
  preview: {
    select: {
      s3Key: "s3Key",
    },
  },
  components: {
    preview: PhotoPreview,
  },
});

export default photoType;
