import { defineType } from "sanity";
import PhotoS3KeyInput from "../components/photo-s3-key-input";

const photoType = defineType({
  name: "photoS3Key",
  title: "Photo S3 key",
  type: "string",
  components: {
    input: PhotoS3KeyInput,
  },
});

export default photoType;
