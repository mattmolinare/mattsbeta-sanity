import { defineField, defineType } from "sanity";

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
  components: {
    preview: (props) => {
      const value = props.value as any;

      if (value === undefined) {
        return null;
      }

      const { url, alt, caption } = value;

      return (
        <figure>
          <img src={url} alt={alt} width="100%" />
          <figcaption>{caption}</figcaption>
        </figure>
      );
    },
  },
});

export default photoType;
