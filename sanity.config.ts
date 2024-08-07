// import { googleMapsInput } from "@sanity/google-maps-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import boundingBoxType from "./schemas/bounding-box";
import countyType from "./schemas/county";
import figureType from "./schemas/figure";
import landManager from "./schemas/land-manager";
import landmarkType from "./schemas/landmark";
import peakType from "./schemas/peak";
import peakListType from "./schemas/peak-list";
import photoType from "./schemas/photo";
import pointType from "./schemas/point";
import protectedAreaType from "./schemas/protected-area";
import trackType from "./schemas/track";
import tripType from "./schemas/trip";

export default defineConfig({
  name: "default",
  title: "mattsbeta",
  projectId: "orjpg8ll",
  dataset: "production",
  plugins: [
    deskTool(),
    visionTool(),
    // googleMapsInput({
    //   apiKey: import.meta.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY,
    //   defaultZoom: 8,
    //   defaultLocation: { lat: 34.289129, lng: -117.646304 },
    // }),
  ],
  schema: {
    types: [
      boundingBoxType,
      countyType,
      figureType,
      landManager,
      landmarkType,
      peakType,
      peakListType,
      photoType,
      pointType,
      protectedAreaType,
      trackType,
      tripType,
    ],
  },
});
