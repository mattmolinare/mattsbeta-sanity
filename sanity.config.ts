import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import boundingBoxType from "./schemas/bounding-box";
import countyType from "./schemas/county";
import figureType from "./schemas/figure";
import landManager from "./schemas/land-manager";
import landmarkType from "./schemas/landmark";
import peakType from "./schemas/peak";
import peakListType from "./schemas/peak-list";
import photoS3KeyType from "./schemas/photo-s3-key";
import pointType from "./schemas/point";
import protectedAreaType from "./schemas/protected-area";
import trackType from "./schemas/track";
import tripType from "./schemas/trip";

export default defineConfig({
  name: "default",
  title: "mattsbeta",
  projectId: "orjpg8ll",
  dataset: "dev",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      boundingBoxType,
      countyType,
      figureType,
      landManager,
      landmarkType,
      peakType,
      peakListType,
      photoS3KeyType,
      pointType,
      protectedAreaType,
      trackType,
      tripType,
    ],
  },
});
