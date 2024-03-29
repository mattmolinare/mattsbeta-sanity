import { format, isValid, parse } from "date-fns";
import path from "path-browserify";
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
  preview: {
    select: {
      s3Key: "s3Key",
      placeholder: "placeholder",
    },
    prepare: ({ s3Key, placeholder }) => {
      const date = parse(path.parse(s3Key).name, "yyyyMMddHHmmss", new Date());

      return {
        title: s3Key,
        subtitle: isValid(date) ? format(date, "PP 'at' p") : undefined,
        media: <img src={placeholder} alt="" style={{ objectFit: "cover" }} />,
      };
    },
  },
});

export default photoType;
