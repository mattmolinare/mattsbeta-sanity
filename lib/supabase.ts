import { createClient } from "@supabase/supabase-js";
import endent from "endent";
import type { Photo } from "../types/supabase";

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
        placeholder
      `,
    )
    .ilike("s3_key", `%${query}%`)
    .order("s3_key", {
      ascending: true,
    })
    .overrideTypes<
      Photo[],
      {
        merge: false;
      }
    >()
    .throwOnError();

  return data;
};
