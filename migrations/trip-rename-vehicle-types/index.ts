import { at, defineMigration, set } from "sanity/migrate";

const RENAMES: Record<string, string> = { car: "2wd", "4x4": "4wd" };

export default defineMigration({
  title: "Rename trip vehicle types car -> 2wd and 4x4 -> 4wd",
  documentTypes: ["trip"],
  migrate: {
    document(doc) {
      if (!Array.isArray(doc.vehicleTypes)) return;
      if (!doc.vehicleTypes.some((type) => type in RENAMES)) return;

      return at(
        "vehicleTypes",
        set(doc.vehicleTypes.map((type) => RENAMES[type] ?? type)),
      );
    },
  },
});
