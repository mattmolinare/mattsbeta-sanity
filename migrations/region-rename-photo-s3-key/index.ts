import { at, defineMigration, set, unset } from "sanity/migrate";

export default defineMigration({
  title: "Rename region photoS3Key to coverPhotoS3Key",
  documentTypes: ["region"],
  migrate: {
    document(doc) {
      if (doc.photoS3Key === undefined) return;

      return [
        at("coverPhotoS3Key", set(doc.photoS3Key)),
        at("photoS3Key", unset()),
      ];
    },
  },
});
