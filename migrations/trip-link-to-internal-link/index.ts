import { at, defineMigration, set } from "sanity/migrate";

export default defineMigration({
  title: "Convert tripLink annotations to internalLink",
  documentTypes: ["trip"],
  migrate: {
    document(doc) {
      if (!Array.isArray(doc.report)) return;

      const patches = [];

      doc.report.forEach((block, blockIndex) => {
        if (block?._type !== "block" || !Array.isArray(block.markDefs)) return;

        block.markDefs.forEach((markDef, markDefIndex) => {
          if (markDef._type !== "tripLink") return;

          const { trip, ...rest } = markDef;

          patches.push(
            at(
              ["report", blockIndex, "markDefs", markDefIndex],
              set({ ...rest, _type: "internalLink", reference: trip }),
            ),
          );
        });
      });

      return patches;
    },
  },
});
