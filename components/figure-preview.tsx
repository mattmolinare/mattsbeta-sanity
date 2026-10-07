import type { PreviewProps } from "sanity";
import { getPhotoUrl } from "../lib/s3";

type FigurePreviewProps = PreviewProps &
  Partial<{
    photoS3Key: string;
    alt: string;
    caption: string;
    hidden?: boolean;
  }>;

const FigurePreview = (props: FigurePreviewProps) => {
  const { photoS3Key, alt, caption, hidden } = props;

  if (photoS3Key === undefined) {
    return props.renderDefault(props);
  }

  return (
    <figure
      style={{
        opacity: hidden === true ? "40%" : "100%",
      }}
    >
      <img src={getPhotoUrl(photoS3Key)} alt={alt} width="100%" />
      {caption !== undefined && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default FigurePreview;
