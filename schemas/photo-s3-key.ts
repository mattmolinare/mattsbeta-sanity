import { defineType } from "sanity";
import PhotoS3KeyInput from "../components/photo-s3-key-input";
import { parsePhotoS3Key } from "../lib/s3";

const photoS3KeyType = defineType({
  name: "photoS3Key",
  title: "Photo S3 key",
  type: "string",
  components: {
    input: PhotoS3KeyInput,
  },
  validation: (Rule) =>
    Rule.custom(
      (value) =>
        value === undefined ||
        parsePhotoS3Key(value) !== null ||
        "Invalid format",
    ),
});

export default photoS3KeyType;
