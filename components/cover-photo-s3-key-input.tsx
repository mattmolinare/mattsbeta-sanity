import { Stack } from "@sanity/ui";
import { StringInputProps } from "sanity";
import { getUrl } from "../lib/s3";

const CoverPhotoS3KeyInput = (props: StringInputProps) => (
  <Stack space={3}>
    {props.renderDefault(props)}
    {props.value && <img src={getUrl(props.value)} alt="" width="100%" />}
  </Stack>
);

export default CoverPhotoS3KeyInput;
