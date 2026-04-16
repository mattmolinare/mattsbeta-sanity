import { TextArea } from "@sanity/ui";
import { useEffect, useState } from "react";
import { set } from "sanity";
import type { TextInputProps } from "sanity";

const FigureCaptionInput = (props: TextInputProps) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    const timeout = setTimeout(() => props.onChange(set(value)), 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <TextArea
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rows={10}
      style={{
        resize: "vertical",
      }}
    />
  );
};

export default FigureCaptionInput;
