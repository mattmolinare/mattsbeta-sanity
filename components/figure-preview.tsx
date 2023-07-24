import { PreviewProps } from "sanity";
import { getUrl } from "../lib/s3";

type FigurePreviewProps = PreviewProps &
  Partial<{
    s3Key: string;
    alt: string;
    caption: string;
    hidden?: boolean;
  }>;

const FigurePreview = (props: FigurePreviewProps) => {
  const { s3Key, alt, caption, hidden } = props;

  if (s3Key === undefined) {
    return props.renderDefault(props);
  }

  return (
    <figure
      style={{
        opacity: hidden === true ? "40%" : "100%",
      }}
    >
      <img src={getUrl(s3Key)} alt={alt} width="100%" />
      {caption !== undefined && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default FigurePreview;
