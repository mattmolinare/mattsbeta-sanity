import {googleMapsInput} from '@sanity/google-maps-input'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import peakType from './schemas/peak'
import peakListType from './schemas/peak-list'
import photoType from './schemas/photo'
import tripType from './schemas/trip'

export default defineConfig({
  name: 'default',
  title: 'mattsbeta',

  projectId: 'orjpg8ll',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    googleMapsInput({
      apiKey: 'AIzaSyDN6KaPR2_CgiJELrwoo9EGv8hf13uKYbQ',
      defaultZoom: 8,
      defaultLocation: {lat: 34.289129, lng: -117.646304},
    }),
  ],

  schema: {
    types: [peakType, peakListType, photoType, tripType],
  },
})
