import { Stack } from "@sanity/ui";
import { StringInputProps } from "sanity";
import { getUrl } from "../lib/s3";

const PhotoS3KeyInput = (props: StringInputProps) => {
  const { value } = props;

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {value !== undefined && <img src={getUrl(value)} alt="" width="100%" />}
    </Stack>
  );
};

export default PhotoS3KeyInput;
