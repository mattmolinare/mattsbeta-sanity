import { defineField, defineType } from "sanity";

const protectedAreaType = defineType({
  name: "protectedArea",
  title: "Protected area",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "manager",
      title: "Manager",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export default protectedAreaType;
