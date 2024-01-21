import { defineField, defineType } from "sanity";

const waypointType = defineType({
  name: "waypoint",
  title: "Waypoint",
  type: "object",
  fields: [
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "reference",
      to: { type: "photo" },
      weak: true,
    }),
  ],
});

export default waypointType;
