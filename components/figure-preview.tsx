import { CopyIcon } from "@sanity/icons";
import { Button, Flex, Stack, useToast } from "@sanity/ui";
import type { PreviewProps } from "sanity";

type FigurePreviewProps = PreviewProps &
  Partial<{
    s3Key: string;
    alt: string;
    caption: string;
    hidden?: boolean;
  }>;

const FigurePreview = (props: FigurePreviewProps) => {
  const { s3Key, alt, caption, hidden } = props;

  const toast = useToast();

  if (s3Key === undefined) {
    return props.renderDefault(props);
  }

  return (
    <Stack space={1}>
      <Flex justify="flex-end">
        <Button
          icon={CopyIcon}
          text="Copy S3 key"
          mode="ghost"
          fontSize={1}
          onClick={() => {
            navigator.clipboard.writeText(s3Key);

            toast.push({
              status: "success",
              title: "S3 key copied",
              closable: true,
              duration: 1000,
            });
          }}
        />
      </Flex>
      <figure
        style={{
          opacity: hidden === true ? "40%" : "100%",
        }}
      >
        <img
          src={`https://d33d9wdzzxzwu3.cloudfront.net/${s3Key}`}
          alt={alt}
          width="100%"
        />
        {caption !== undefined && <figcaption>{caption}</figcaption>}
      </figure>
    </Stack>
  );
};

export default FigurePreview;
