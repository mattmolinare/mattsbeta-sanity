import { Autocomplete, Card, Flex, Stack, Text } from "@sanity/ui";
import { format } from "date-fns";
import { useRef, useState } from "react";
import type { StringInputProps } from "sanity";
import { set, unset } from "sanity";
import useTimeoutRef from "../hooks/timeout-ref";
import { getPhotoUrl, parsePhotoS3Key, queryPhotoS3Keys } from "../lib/s3";

const PhotoS3KeyInput = (props: StringInputProps) => {
  const [values, setValues] = useState<string[] | null>(null);

  const timeoutRef = useTimeoutRef();

  const requestIdRef = useRef(0);

  const handleQueryChange = (query: string | null) => {
    setValues(null);

    if (query === null) {
      return;
    }

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current;

      const values = await queryPhotoS3Keys(query);

      if (requestId === requestIdRef.current) {
        setValues(values);
      }
    }, 300);
  };

  return (
    <Autocomplete
      id="photo-s3-key-autocomplete"
      value={props.value}
      placeholder="Type to search"
      options={values?.map((value) => ({
        value,
      }))}
      popover={{
        animate: true,
      }}
      openButton
      onChange={(value) => props.onChange(value ? set(value) : unset())}
      onQueryChange={handleQueryChange}
      renderOption={(option) => {
        const date = parsePhotoS3Key(option.value)?.date;

        return (
          <Card as="button">
            <Flex gap={2} padding={2} align="center">
              <img
                src={getPhotoUrl(option.value)}
                alt=""
                width={33}
                height={33}
                style={{
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
              <Stack gap={2}>
                <Text size={1} weight="medium" textOverflow="ellipsis">
                  {option.value}
                </Text>
                {date && (
                  <Text size={1} muted textOverflow="ellipsis">
                    {format(date, "PP 'at' p")}
                  </Text>
                )}
              </Stack>
            </Flex>
          </Card>
        );
      }}
    />
  );
};

export default PhotoS3KeyInput;

export const PhotoS3KeyInputWithPreview = (props: StringInputProps) => {
  return (
    <Stack gap={2}>
      <PhotoS3KeyInput {...props} />
      {props.value && (
        <img src={getPhotoUrl(props.value)} alt="" width="100%" />
      )}
    </Stack>
  );
};
