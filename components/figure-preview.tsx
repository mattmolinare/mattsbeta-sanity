import { PreviewProps } from "sanity";
import { getUrl } from "../lib/s3";

const FigurePreview = (props: PreviewProps) => {
  const { s3Key, alt, caption } = props as any;

  if (s3Key === undefined) {
    return null;
  }

  return (
    <figure>
      <img src={getUrl(s3Key)} alt={alt} width="100%" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default FigurePreview;
