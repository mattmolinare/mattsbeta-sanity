import { at, defineMigration, set } from "sanity/migrate";

const key = () => Math.random().toString(36).slice(2, 14);

export default defineMigration({
  title: "Convert region description from text to portable text blocks",
  documentTypes: ["region"],
  migrate: {
    document(doc) {
      if (typeof doc.description !== "string") return;

      const blocks = doc.description
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => ({
          _type: "block",
          _key: key(),
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", _key: key(), text: paragraph, marks: [] },
          ],
        }));

      return at("description", set(blocks));
    },
  },
});
