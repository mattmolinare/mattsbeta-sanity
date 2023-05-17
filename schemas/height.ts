import { defineField, defineType } from "sanity";

const heightType = defineType({
  name: "height",
  title: "Height",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      options: {
        list: [
          { title: "Feet", value: "ft" },
          { title: "Meters", value: "m" },
        ],
        layout: "radio",
      },
      initialValue: "ft",
    }),
    defineField({
      name: "exact",
      title: "Exact",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

export default heightType;
