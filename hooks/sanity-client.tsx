import { useClient } from "sanity";

const useSanityClient = () => useClient({ apiVersion: "2023-07-19" });

export default useSanityClient;
