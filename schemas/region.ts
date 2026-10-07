import { defineArrayMember, defineField, defineType } from "sanity";
import PhotoS3KeyInput from "../components/photo-s3-key-input";

const regionType = defineType({
  name: "region",
  title: "Region",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "states",
      title: "States",
      type: "array",
      of: [defineArrayMember({ type: "state" })],
    }),
    defineField({
      name: "photoS3Key",
      title: "Photo S3 key",
      type: "photoS3Key",
      components: {
        input: PhotoS3KeyInput,
      },
    }),
  ],
});

export default regionType;
