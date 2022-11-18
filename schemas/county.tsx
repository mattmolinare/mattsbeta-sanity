import { defineField, defineType } from "sanity";

const countyType = defineType({
  name: "county",
  title: "County",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default countyType;
