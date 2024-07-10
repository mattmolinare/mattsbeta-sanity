import { Box, Button, Flex, Stack, TextInput, useToast } from "@sanity/ui";
import { convert } from "geo-coordinates-parser";
import { useState } from "react";
import { GeopointValue, ObjectInputProps, set } from "sanity";

const PointInput = (props: ObjectInputProps<GeopointValue>) => {
  const toast = useToast();

  const [inputValue, setInputValue] = useState("");

  return (
    <Stack space={6}>
      <Flex direction="row" gap={1}>
        <Box flex={1}>
          <TextInput
            placeholder="Enter coordinates"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
          />
        </Box>
        <Button
          text="Parse"
          fontSize={1}
          mode="ghost"
          onClick={() => {
            try {
              const converted = convert(inputValue);

              props.onChange(
                set({
                  lat: converted.decimalLatitude,
                  lng: converted.decimalLongitude,
                })
              );
            } catch (error) {
              toast.push({
                status: "error",
                title: "Error parsing coordinates",
                closable: true,
              });
            }
          }}
        />
      </Flex>
      {props.renderDefault(props)}
    </Stack>
  );
};

export default PointInput;
