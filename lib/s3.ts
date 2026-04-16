import { isValid, parse } from "date-fns";

export const parsePhotoS3Key = (value: string) => {
  const match = value.match(/^photos\/.*\/(\d{14})_\d+x\d+\.jpg$/);

  if (!match) {
    return null;
  }

  const date = parse(match[1], "yyyyMMddHHmmss", new Date());

  if (!isValid(date)) {
    return null;
  }

  return {
    date,
    width: Number(match[2]),
    height: Number(match[3]),
  };
};
