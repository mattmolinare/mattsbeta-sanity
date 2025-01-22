import { Button, Stack } from "@sanity/ui";
import { StringInputProps, unset } from "sanity";

const VehicleTypeInput = (props: StringInputProps) => (
  <Stack space={2}>
    {props.renderDefault(props)}
    <Button
      text="Clear"
      fontSize={1}
      mode="ghost"
      onClick={() => props.onChange(unset())}
    />
  </Stack>
);

export default VehicleTypeInput;
