import { TextArea } from "@sanity/ui";
import { startTransition, useRef, useState } from "react";
import type { TextInputProps } from "sanity";
import { set } from "sanity";

const FigureCaptionInput = (props: TextInputProps) => {
  const [value, setValue] = useState(props.value);

  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  return (
    <TextArea
      value={value}
      onChange={({ currentTarget: { value } }) => {
        setValue(value);

        startTransition(() => {
          clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            props.onChange(set(value));
          }, 1000);
        });
      }}
      rows={10}
      style={{
        resize: "vertical",
      }}
    />
  );
};

export default FigureCaptionInput;
