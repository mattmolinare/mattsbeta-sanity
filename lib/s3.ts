import { S3Client, paginateListObjectsV2 } from "@aws-sdk/client-s3";
import { isValid, parse } from "date-fns";

const client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.SANITY_STUDIO_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SANITY_STUDIO_S3_SECRET_ACCESS_KEY!,
  },
});

export const queryPhotoS3Keys = async (query: string) => {
  const prefix = query.startsWith("photos/") ? query : `photos/${query}`;

  const paginator = paginateListObjectsV2(
    {
      client,
    },
    {
      Bucket: "mattsbeta",
      Prefix: prefix,
    },
  );

  const keys: string[] = [];
  for await (const page of paginator) {
    for (const object of page.Contents ?? []) {
      if (object.Key !== undefined) {
        keys.push(object.Key);
      }
    }
  }

  return keys;
};

export const queryPhotoCount = async (query: string) => {
  const s3Keys = await queryPhotoS3Keys(query);

  return s3Keys.length;
};

export const getPhotoUrl = (s3Key: string) =>
  `https://d33d9wdzzxzwu3.cloudfront.net/${s3Key}`;

export const parsePhotoS3Key = (value: string) => {
  const match = value.match(/^photos\/.*\/(\d{14})_(\d+)x(\d+)\.jpg$/);

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
