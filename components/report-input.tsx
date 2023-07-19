import { AddIcon } from "@sanity/icons";
import { Box, Button, Flex, Stack, TextInput } from "@sanity/ui";
import { randomKey } from "@sanity/util/content";
import endent from "endent";
import { useCallback, useEffect, useState } from "react";
import type { ArrayOfPrimitivesInputProps } from "sanity";
import { insert, setIfMissing } from "sanity";
import useDebouncedValue from "../hooks/debounced-value";
import useSanityClient from "../hooks/sanity-client";

const ReportInput = (props: ArrayOfPrimitivesInputProps) => {
  const client = useSanityClient();

  const [inputValue, setInputValue] = useState("");

  const debouncedInputValue = useDebouncedValue(inputValue);

  const query = endent`
    *[
      _type == "photo" &&
      s3Key match "*${debouncedInputValue}*"
    ]
  `;

  const [count, setCount] = useState<number>();

  useEffect(() => {
    (async () => {
      const count = await client.fetch<number>(endent`
        count(
          ${query}
        )
      `);

      setCount(count);
    })();
  }, [query]);

  return (
    <Stack space={3}>
      <Flex gap={1}>
        <Box flex={1}>
          <TextInput
            placeholder="Type to search photos"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.currentTarget.value);
            }}
          />
        </Box>
        <Button
          icon={AddIcon}
          text={
            count === undefined
              ? "Add figures"
              : count === 0
              ? "No figures found"
              : `Add ${count} figure${count === 1 ? "" : "s"}`
          }
          mode="ghost"
          onClick={useCallback(async () => {
            const ids = await client.fetch<string[]>(endent`
              ${query}
              | order(s3Key asc)
              ._id
            `);

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
          }, [query])}
        />
      </Flex>
      {props.renderDefault(props)}
    </Stack>
  );
};

export default ReportInput;
