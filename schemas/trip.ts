import { ArrowTopRightIcon, LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import ReportInput from "../components/report-input";
import VehicleTypeInput from "../components/vehicle-type-input";

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
      name: "trailhead",
      title: "Trailhead",
      type: "point",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vehicleType",
      title: "Vehicle type",
      type: "string",
      options: {
        list: [
          { title: "4x4", value: "4x4" },
          { title: "High clearance", value: "high-clearance" },
          { title: "Car", value: "car" },
          { title: "Bus", value: "bus" },
          { title: "Bicycle", value: "bicycle" },
          { title: "Boat", value: "boat" },
        ],
        layout: "radio",
      },
      components: {
        input: VehicleTypeInput,
      },
    }),
    defineField({
      name: "county",
      title: "County",
      type: "reference",
      to: { type: "county" },
    }),
    defineField({
      name: "protectedArea",
      title: "Protected area",
      type: "reference",
      to: { type: "protectedArea" },
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
      name: "duration",
      title: "Duration",
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
      name: "waypoints",
      title: "Waypoints",
      type: "array",
      of: [
        defineArrayMember({ type: "landmark" }),
        defineArrayMember({ type: "reference", to: { type: "peak" } }),
      ],
    }),
    defineField({
      name: "coverPhoto",
      title: "Cover photo",
      type: "reference",
      to: { type: "photo" },
      weak: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "track",
      title: "Track",
      type: "reference",
      to: { type: "track" },
      weak: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trackHidden",
      title: "Track hidden",
      type: "boolean",
    }),
    defineField({
      name: "stravaLink",
      title: "Strava link",
      type: "url",
    }),
    defineField({
      name: "peakbaggerLink",
      title: "Peakbagger link",
      type: "url",
    }),
    defineField({
      name: "report",
      title: "Report",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          marks: {
            annotations: [
              {
                name: "externalLink",
                title: "External link",
                icon: ArrowTopRightIcon,
                type: "object",
                fields: [
                  {
                    name: "link",
                    title: "Link",
                    type: "url",
                  },
                ],
              },
              {
                name: "tripLink",
                title: "Trip link",
                icon: LinkIcon,
                type: "object",
                fields: [
                  {
                    name: "trip",
                    title: "Trip",
                    type: "reference",
                    to: [{ type: "trip" }],
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "figure" }),
      ],
      components: {
        input: ReportInput,
      },
    }),
  ],
});

export default tripType;
