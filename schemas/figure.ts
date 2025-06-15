import { defineField, defineType } from "sanity";
import FigurePreview from "../components/figure-preview";
import FigureCaptionInput from "../components/figure-caption-input";

const figureType = defineType({
  name: "figure",
  title: "Figure",
  type: "object",
  fields: [
    defineField({
      name: "photo",
      title: "Photo",
      type: "reference",
      to: { type: "photo" },
      weak: true,
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
      components: {
        input: FigureCaptionInput,
      },
    }),
    defineField({
      name: "hidden",
      title: "Hidden",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      s3Key: "photo.s3Key",
      alt: "alt",
      caption: "caption",
      hidden: "hidden",
    },
  },
  components: {
    preview: FigurePreview,
  },
});

export default figureType;
