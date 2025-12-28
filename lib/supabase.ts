import { createClient } from "@supabase/supabase-js";
import endent from "endent";

const client = createClient(
  process.env.SANITY_STUDIO_SUPABASE_URL!,
  process.env.SANITY_STUDIO_SUPABASE_KEY!,
);

export const queryPhotoCount = async (query: string) => {
  const { count } = await client
    .from("photo")
    .select("*", {
      count: "exact",
      head: true,
    })
    .ilike("s3_key", `%${query}%`)
    .throwOnError();

  return count!;
};

export const queryPhotos = async (query: string) => {
  const { data } = await client
    .from("photo")
    .select(
      endent`
        s3Key:s3_key,
        width,
        height,
        placeholder
      `,
    )
    .ilike("s3_key", `%${query}%`)
    .order("s3_key", {
      ascending: true,
    })
    .limit(100)
    .overrideTypes<
      {
        s3Key: string;
        width: number;
        height: number;
        placeholder: string;
      }[],
      {
        merge: false;
      }
    >()
    .throwOnError();

  return data;
};
