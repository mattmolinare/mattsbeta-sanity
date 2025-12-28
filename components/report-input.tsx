import { AddIcon } from "@sanity/icons";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  Stack,
  Text,
  TextInput,
  useToast,
} from "@sanity/ui";
import { randomKey } from "@sanity/util/content";
import { startTransition, useCallback, useEffect, useState } from "react";
import type { ArrayOfObjectsInputProps } from "sanity";
import { insert, setIfMissing } from "sanity";
import { queryPhotoCount, queryPhotos } from "../lib/supabase";

const ReportInput = (props: ArrayOfObjectsInputProps) => {
  const toast = useToast();

  const [value, setValue] = useState("");

  const [photoCount, setPhotoCount] = useState<number | null>(null);

  useEffect(() => {
    let isSuspended = true;

    const timeout = setTimeout(async () => {
      const photoCount = await queryPhotoCount(value);

      if (isSuspended) {
        startTransition(() => setPhotoCount(photoCount));
      }
    }, 300);

    return () => {
      isSuspended = false;

      clearTimeout(timeout);
    };
  }, [value]);

  const addFigures = useCallback(async () => {
    const photos = await queryPhotos(value);

    if (photos.length === 0) {
      return;
    }

    props.onChange([
      setIfMissing([]),
      insert(
        photos.map((photo) => ({
          _key: randomKey(12),
          _type: "figure",
          photoS3Key: photo.s3Key,
          hidden: true,
        })),
        "after",
        [-1],
      ),
    ]);

    toast.push({
      status: "success",
      title: `${photos.length} figure${
        photos.length === 1 ? "" : "s"
      } added to the trip report`,
      closable: true,
    });
  }, [value]);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Flex direction={["column", "column", "row"]} gap={1}>
        <Box flex={["auto", "auto", 1]}>
          <TextInput
            placeholder="Type to search photos"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Box>
        <Button
          disabled={!value || !photoCount}
          icon={
            typeof photoCount === "number" && photoCount > 0
              ? AddIcon
              : undefined
          }
          text={
            photoCount === undefined
              ? "Add figures"
              : photoCount === 0
                ? "No photos found"
                : `Add ${photoCount} figure${photoCount === 1 ? "" : "s"}`
          }
          fontSize={1}
          mode="ghost"
          onClick={() => setDialogOpen(true)}
        />
        {dialogOpen && photoCount !== undefined && (
          <Dialog
            id="add-figures-dialog"
            header="Add figures?"
            footer={
              <Grid columns={2} gap={2} paddingX={4} paddingY={3}>
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => setDialogOpen(false)}
                />
                <Button
                  text="Add now"
                  tone="positive"
                  disabled={photoCount === 0}
                  onClick={addFigures}
                />
              </Grid>
            }
            onClose={() => setDialogOpen(false)}
            width={1}
          >
            <Box padding={4}>
              <Text>{`Add ${photoCount} figure${
                photoCount === 1 ? "" : "s"
              } to the trip report?`}</Text>
            </Box>
          </Dialog>
        )}
      </Flex>
    </Stack>
  );
};

export default ReportInput;
