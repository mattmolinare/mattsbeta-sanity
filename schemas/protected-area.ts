import { defineArrayMember, defineField, defineType } from "sanity";

const protectedAreaType = defineType({
  name: "protectedArea",
  title: "Protected area",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "landManagers",
      title: "Land managers",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: { type: "landManager" } }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

export default protectedAreaType;
