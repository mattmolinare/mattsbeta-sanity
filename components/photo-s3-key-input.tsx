import { Autocomplete, Card, Flex, Stack, Text } from "@sanity/ui";
import { format, isValid, parse } from "date-fns";
import path from "path-browserify";
import { startTransition, useEffect, useState } from "react";
import type { StringInputProps } from "sanity";
import { set, unset } from "sanity";
import { queryPhotos } from "../lib/supabase";

type Photo = {
  s3Key: string;
  placeholder: string;
};

const PhotoS3KeyInput = (props: StringInputProps) => {
  const [query, setQuery] = useState<string | null>(null);

  const [photos, setPhotos] = useState<Photo[] | null>(null);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (query === null) {
      return;
    }

    let isSuspended = true;

    const timeout = setTimeout(async () => {
      const photos = await queryPhotos(query);

      if (isSuspended) {
        startTransition(() => {
          setPhotos(photos);

          setIsFetching(false);
        });
      }
    }, 300);

    return () => {
      isSuspended = false;

      clearTimeout(timeout);
    };
  }, [query]);

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
      loading={isFetching}
      openButton
      onChange={(value) => props.onChange(value ? set(value) : unset())}
      onQueryChange={(query) => {
        setQuery(query);

        setPhotos(null);

        setIsFetching(query !== null);
      }}
      renderOption={(option) => {
        const date = parse(
          path.parse(option.value).name,
          "yyyyMMddHHmmss",
          new Date(),
        );

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
                {isValid(date) && (
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
