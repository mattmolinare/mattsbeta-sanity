import { createClient } from "@supabase/supabase-js";

const client = createClient(
  process.env.SANITY_STUDIO_SUPABASE_URL,
  process.env.SANITY_STUDIO_SUPABASE_KEY
);

export default client;
