// import { googleMapsInput } from "@sanity/google-maps-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import boundingBoxType from "./schemas/bounding-box";
import countyType from "./schemas/county";
import figureType from "./schemas/figure";
import peakType from "./schemas/peak";
import peakListType from "./schemas/peak-list";
import photoType from "./schemas/photo";
import protectedAreaType from "./schemas/protected-area";
import trackType from "./schemas/track";
import tripType from "./schemas/trip";
import waypointType from "./schemas/waypoint";

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
      peakType,
      peakListType,
      photoType,
      protectedAreaType,
      trackType,
      tripType,
      waypointType,
    ],
  },
});
