import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "orjpg8ll",
    dataset: "production",
  },
  deployment: {
    autoUpdates: true,
    appId: "20e0fcea72d16c670fb89c70",
  },
});
