import { defineField, defineType } from "sanity";

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
  ],
});

export default regionType;
