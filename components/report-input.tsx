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
import endent from "endent";
import { useCallback, useState } from "react";
import type { ArrayOfObjectsInputProps } from "sanity";
import { insert, setIfMissing } from "sanity";
import { useListeningQuery } from "sanity-plugin-utils";
import useDebouncedValue from "../hooks/debounced-value";
import useSanityClient from "../hooks/sanity-client";

const ReportInput = (props: ArrayOfObjectsInputProps) => {
  const toast = useToast();

  const client = useSanityClient();

  const [inputValue, setInputValue] = useState("");

  const debouncedInputValue = useDebouncedValue(inputValue);

  const query = endent`
    *[
      _type == "photo" &&
      s3Key match "*${debouncedInputValue}*"
    ]
  `;

  const { data: count } = useListeningQuery<number>(
    endent`
      count(
        ${query}
      )
    `,
    {}
  );

  const handleClick = useCallback(async () => {
    const ids = await client.fetch<string[]>(endent`
      ${query}
      | order(s3Key asc)
      ._id
    `);

    if (ids.length === 0) {
      return;
    }

    props.onChange([
      setIfMissing([]),
      insert(
        ids.map((id) => ({
          _key: randomKey(12),
          _type: "figure",
          alt: "",
          photo: {
            _ref: id,
            _type: "reference",
            _weak: true,
          },
        })),
        "after",
        [-1]
      ),
    ]);

    toast.push({
      status: "success",
      title: `${ids.length} figure${
        ids.length === 1 ? "" : "s"
      } successfully added to the trip report`,
      closable: true,
    });
  }, [query]);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Flex direction={["column", "column", "row"]} gap={1}>
        <Box flex={["auto", "auto", 1]}>
          <TextInput
            placeholder="Type to search photos"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
          />
        </Box>
        <Button
          disabled={count === null || count === 0}
          icon={count !== null && count > 0 ? AddIcon : undefined}
          text={
            count === null
              ? "Add figures"
              : count === 0
              ? "No figures found"
              : `Add ${count} figure${count === 1 ? "" : "s"}`
          }
          mode="ghost"
          onClick={() => {
            setDialogOpen(true);
          }}
        />
        {dialogOpen && (
          <Dialog
            id="add-figures-dialog"
            header="Add figures?"
            footer={
              <Grid columns={2} gap={2} paddingX={4} paddingY={3}>
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                />
                <Button
                  text="Add now"
                  tone="positive"
                  disabled={count === null || count === 0}
                  onClick={handleClick}
                />
              </Grid>
            }
            onClose={() => {
              setDialogOpen(false);
            }}
            width={1}
          >
            <Box padding={4}>
              <Text>Add {count} figures to the trip report?</Text>
            </Box>
          </Dialog>
        )}
      </Flex>
    </Stack>
  );
};

export default ReportInput;
