import { Stack, TextInput } from "@sanity/ui";
import { defineArrayMember, defineField, defineType } from "sanity";

const tripType = defineType({
  name: "trip",
  title: "Trip",
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
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "county",
      title: "County",
      type: "county",
    }),
    defineField({
      name: "protectedArea",
      title: "Protected area",
      type: "protectedArea",
    }),
    defineField({
      name: "routeType",
      title: "Route type",
      type: "string",
      options: {
        list: [
          { title: "Loop", value: "loop" },
          { title: "Out and back", value: "out-and-back" },
          { title: "Point to point", value: "point-to-point" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "distance",
      title: "Distance",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "ascent",
      title: "Ascent",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "classRating",
      title: "Class rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quality",
      title: "Quality",
      type: "number",
      options: { list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "peaks",
      title: "Peaks",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "peak" } })],
    }),
    defineField({
      name: "coverPhotoUrl",
      title: "Cover photo URL",
      type: "url",
      validation: (Rule) => Rule.required(),
      components: {
        input: ({ elementProps, value }) => (
          <Stack space={3}>
            <TextInput {...elementProps} />
            {value && <img src={value} alt="" width="100%" />}
          </Stack>
        ),
      },
    }),
    defineField({
      name: "trackKey",
      title: "Track key",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "report",
      title: "Report",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
        }),
        defineArrayMember({ type: "photo" }),
      ],
    }),
  ],
});

export default tripType;
