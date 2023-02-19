import { defineField, defineType } from "sanity";
import PhotoPreview from "../components/photo-preview";

const photoType = defineType({
  name: "photo",
  title: "Photo",
  type: "object",
  fields: [
    defineField({
      name: "s3Key",
      title: "S3 key",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      initialValue: "",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: { select: { s3Key: "s3Key", alt: "alt", caption: "caption" } },
  components: { preview: PhotoPreview },
});

export default photoType;
