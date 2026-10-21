import { at, defineMigration, set, unset } from "sanity/migrate";

export default defineMigration({
  title: "Convert trip vehicleType string to vehicleTypes array",
  documentTypes: ["trip"],
  migrate: {
    document(doc) {
      if (doc.vehicleType === undefined) return;

      return [
        ...(typeof doc.vehicleType === "string" && doc.vehicleType
          ? [at("vehicleTypes", set([doc.vehicleType]))]
          : []),
        at("vehicleType", unset()),
      ];
    },
  },
});
