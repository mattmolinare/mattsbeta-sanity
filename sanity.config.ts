import { googleMapsInput } from "@sanity/google-maps-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import countyType from "./schemas/county";
import peakType from "./schemas/peak";
import peakListType from "./schemas/peak-list";
import photoType from "./schemas/photo";
import protectedAreaType from "./schemas/protected-area";
import tripType from "./schemas/trip";

export default defineConfig({
  name: "default",
  title: "mattsbeta",
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool(),
    visionTool(),
    googleMapsInput({
      apiKey: import.meta.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY,
      defaultZoom: 8,
      defaultLocation: { lat: 34.289129, lng: -117.646304 },
    }),
  ],
  schema: {
    types: [
      countyType,
      peakType,
      peakListType,
      photoType,
      protectedAreaType,
      tripType,
    ],
  },
});
