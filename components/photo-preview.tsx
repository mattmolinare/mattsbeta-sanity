import { Box } from "@sanity/ui";
import { PreviewProps } from "sanity";
import { getUrl } from "../lib/s3";

const PhotoPreview = (props: PreviewProps) => {
  const { s3Key } = props as any;

  if (s3Key === undefined) {
    return props.renderDefault(props);
  }

  return (
    <Box>
      <figure>
        <img src={getUrl(s3Key)} width="100%" />
        <figcaption>{s3Key}</figcaption>
      </figure>
    </Box>
  );
};

export default PhotoPreview;
