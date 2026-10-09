import ArrowTopRightIcon from "@sanity/icons/ArrowTopRight";
import LinkIcon from "@sanity/icons/Link";
import { defineArrayMember } from "sanity";

const richTextBlock = defineArrayMember({
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
        name: "internalLink",
        title: "Internal link",
        icon: LinkIcon,
        type: "object",
        fields: [
          {
            name: "reference",
            title: "Reference",
            type: "reference",
            to: [{ type: "trip" }, { type: "region" }],
          },
        ],
      },
    ],
  },
});

export default richTextBlock;
