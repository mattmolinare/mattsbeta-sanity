import AddIcon from "@sanity/icons/Add";
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
import { useCallback, useEffect, useRef, useState } from "react";
import type { ArrayOfObjectsInputProps } from "sanity";
import { insert, setIfMissing, unset } from "sanity";
import { queryPhotoCount, queryPhotoS3Keys } from "../lib/s3";
import { ReportMoveContext } from "./report-context";

const usePhotoCount = (query: string) => {
  const [photoCount, setPhotoCount] = useState<number>();

  const requestIdRef = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const requestId = ++requestIdRef.current;

      const photoCount = await queryPhotoCount(query);

      console.log("photoCount", photoCount);

      if (requestId === requestIdRef.current) {
        setPhotoCount(photoCount);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  return photoCount;
};

const ReportInput = (props: ArrayOfObjectsInputProps) => {
  const toast = useToast();

  const [inputValue, setInputValue] = useState("");

  const photoCount = usePhotoCount(inputValue);

  const addFigures = useCallback(async () => {
    const photoS3Keys = await queryPhotoS3Keys(inputValue);

    if (photoS3Keys.length === 0) {
      return;
    }

    props.onChange([
      setIfMissing([]),
      insert(
        photoS3Keys.map((photoS3Key) => ({
          _key: randomKey(12),
          _type: "figure",
          photoS3Key,
          hidden: true,
        })),
        "after",
        [-1],
      ),
    ]);

    toast.push({
      status: "success",
      title: `${photoS3Keys.length} figure${
        photoS3Keys.length === 1 ? "" : "s"
      } added to the trip report`,
      closable: true,
    });
  }, [inputValue]);

  const { value, onChange } = props;

  const moveBlock = useCallback(
    (key: string, direction: "up" | "down") => {
      const index = value?.findIndex((item) => item._key === key) ?? -1;
      const neighbor = value?.[index + (direction === "up" ? -1 : 1)];

      if (value === undefined || index === -1 || neighbor === undefined) {
        return;
      }

      onChange([
        unset([{ _key: key }]),
        insert([value[index]], direction === "up" ? "before" : "after", [
          { _key: neighbor._key },
        ]),
      ]);
    },
    [value, onChange],
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Stack gap={3}>
      <ReportMoveContext.Provider value={moveBlock}>
        {props.renderDefault(props)}
      </ReportMoveContext.Provider>
      <Flex direction={["column", "column", "row"]} gap={1}>
        <Box flex={["auto", "auto", 1]}>
          <TextInput
            placeholder="Type to search photos"
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
          />
        </Box>
        <Button
          disabled={!inputValue || !photoCount}
          icon={photoCount ? AddIcon : undefined}
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
        {dialogOpen && photoCount && (
          <Dialog
            id="add-figures-dialog"
            header="Add figures?"
            footer={
              <Grid gridTemplateColumns={2} gap={2} paddingX={4} paddingY={3}>
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => setDialogOpen(false)}
                />
                <Button text="Add now" tone="positive" onClick={addFigures} />
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
