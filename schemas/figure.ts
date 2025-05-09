import { defineField, defineType } from "sanity";
import FigurePreview from "../components/figure-preview";

const figureType = defineType({
  name: "figure",
  title: "Figure",
  type: "object",
  fields: [
    defineField({
      name: "photoS3Key",
      title: "Photo S3 key",
      type: "photoS3Key",
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
      type: "text",
    }),
    defineField({
      name: "hidden",
      title: "Hidden",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      s3Key: "photoS3Key",
      alt: "alt",
      caption: "caption",
      hidden: "hidden",
    },
  },
  components: { preview: FigurePreview },
});

export default figureType;
