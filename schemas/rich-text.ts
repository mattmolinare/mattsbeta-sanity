import { defineArrayMember, defineType } from "sanity";
import RichTextInput from "../components/rich-text-input";
import richTextBlock from "./rich-text-block";

const richTextType = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [richTextBlock, defineArrayMember({ type: "figure" })],
  components: {
    input: RichTextInput,
  },
});

export default richTextType;
