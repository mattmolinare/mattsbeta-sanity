import { at, defineMigration, set } from "sanity/migrate";

const RENAMES: Record<string, string> = {
  "high-clearance": "high-clearance-4wd",
};

export default defineMigration({
  title: "Rename trip vehicle type high-clearance -> high-clearance-4wd",
  documentTypes: ["trip"],
  migrate: {
    document(doc) {
      if (!Array.isArray(doc.vehicleTypes)) return;
      if (!doc.vehicleTypes.some((type) => type in RENAMES)) return;

      const renamed = doc.vehicleTypes.map((type) => RENAMES[type] ?? type);
      return at("vehicleTypes", set([...new Set(renamed)]));
    },
  },
});
