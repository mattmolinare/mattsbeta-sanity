import { Autocomplete, Card, Flex, Stack, Text } from "@sanity/ui";
import { format, isValid, parse } from "date-fns";
import { startTransition, useEffect, useRef, useState } from "react";
import type { StringInputProps } from "sanity";
import { set, unset } from "sanity";
import { queryPhotos } from "../lib/supabase";
import type { Photo } from "../types/supabase";

const PhotoS3KeyInput = (props: StringInputProps) => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const requestIdRef = useRef(0);

  const handleQueryChange = (query: string | null) => {
    setPhotos(null);

    if (query === null) {
      return;
    }

    setIsLoading(true);

    timeoutRef.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current;

      const photos = await queryPhotos(query);

      if (requestId === requestIdRef.current) {
        startTransition(() => {
          setPhotos(photos);
          setIsLoading(false);
        });
      }
    }, 300);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <Autocomplete
      id="photo-s3-key-autocomplete"
      value={props.value}
      placeholder="Type to search"
      options={photos?.map((photo) => ({
        value: photo.s3Key,
        placeholder: photo.placeholder,
      }))}
      popover={{
        animate: true,
      }}
      loading={isLoading}
      openButton
      onChange={(value) => props.onChange(value ? set(value) : unset())}
      onQueryChange={handleQueryChange}
      renderOption={(option) => {
        const match = option.value.match(/^photos\/.*\/(\d{14})_\d+x\d+\.jpg$/);

        let date;
        if (match) {
          date = parse(match[1], "yyyyMMddHHmmss", new Date());
        }

        return (
          <Card as="button">
            <Flex gap={2} padding={2} align="center">
              <img
                src={option.placeholder}
                alt=""
                width={33}
                height={33}
                style={{
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
              <Stack space={2}>
                <Text size={1} weight="medium" textOverflow="ellipsis">
                  {option.value}
                </Text>
                {date && isValid(date) && (
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
};
