import { defineField, defineType } from "sanity";
import PhotoPreview from "../components/photo-preview";

const photoType = defineType({
  name: "photo",
  title: "Photo",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
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
  preview: { select: { url: "url", alt: "alt", caption: "caption" } },
  components: { preview: PhotoPreview },
});

export default photoType;
