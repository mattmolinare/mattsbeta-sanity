import { defineField, defineType } from "sanity";

const landmarkType = defineType({
  name: "landmark",
  title: "Landmark",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "point",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "photoS3Key",
      title: "Photo S3 key",
      type: "photoS3Key",
    }),
  ],
});

export default landmarkType;
