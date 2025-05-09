import { Autocomplete, Card, Flex, Stack, Text } from "@sanity/ui";
import { useRef, useState } from "react";
import { set, StringInputProps, unset } from "sanity";
import supabase from "../lib/supabase";
import endent from "endent";
import { format, isValid, parse } from "date-fns";
import path from "path-browserify";

type Photo = {
  s3Key: string;
  placeholder: string;
};

const PhotoS3KeyInput = (props: StringInputProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const [photos, setPhotos] = useState<Photo[] | null>(null);

  const [loading, setLoading] = useState(false);

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
      loading={loading}
      onQueryChange={(query) => {
        setPhotos(null);

        if (query === null) {
          return;
        }

        setLoading(true);

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
          const { data: photos } = await supabase
            .from("photo")
            .select(
              endent`
                s3Key:s3_key,
                placeholder
              `
            )
            .ilike("s3_key", `%${query}%`)
            .order("s3_key", {
              ascending: true,
            })
            .limit(100)
            .overrideTypes<
              Photo[],
              {
                merge: false;
              }
            >()
            .throwOnError();

          setPhotos(photos);

          setLoading(false);
        }, 300);
      }}
      onChange={(value) => props.onChange(value ? set(value) : unset())}
      renderOption={(option) => {
        const date = parse(
          path.parse(option.value).name,
          "yyyyMMddHHmmss",
          new Date()
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
