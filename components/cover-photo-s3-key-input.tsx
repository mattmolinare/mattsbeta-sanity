import { Stack } from "@sanity/ui";
import type { StringInputProps } from "sanity";
import PhotoS3KeyInput from "./photo-s3-key-input";

const CoverPhotoS3KeyInput = (props: StringInputProps) => (
  <Stack space={2}>
    <PhotoS3KeyInput {...props} />
    {props.value && (
      <img
        src={`https://d33d9wdzzxzwu3.cloudfront.net/${props.value}`}
        alt=""
        width="100%"
      />
    )}
  </Stack>
);

export default CoverPhotoS3KeyInput;
