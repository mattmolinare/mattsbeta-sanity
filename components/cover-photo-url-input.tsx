import { Stack } from "@sanity/ui";
import { StringInputProps } from "sanity";

const CoverPhotoUrlInput = (props: StringInputProps) => (
  <Stack space={3}>
    {props.renderDefault(props)}
    {props.value && <img src={props.value} alt="" width="100%" />}
  </Stack>
);

export default CoverPhotoUrlInput;
