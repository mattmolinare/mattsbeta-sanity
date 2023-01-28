import { PreviewProps } from "sanity";

const PhotoPreview = (props: PreviewProps) => {
  const { url, alt, caption } = props as any;

  return (
    <figure>
      <img src={url} alt={alt} width="100%" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default PhotoPreview;
