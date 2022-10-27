import type {SchemaTypeDefinition} from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [
  {
    type: 'document',
    name: 'trip',
    title: 'Trip',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {source: 'name'},
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'location',
        title: 'Location',
        type: 'geopoint',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'routeType',
        title: 'Route type',
        type: 'string',
        options: {
          list: [
            {title: 'Loop', value: 'loop'},
            {title: 'Out and back', value: 'out-and-back'},
            {title: 'Point to point', value: 'point-to-point'},
          ],
          layout: 'radio',
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'distance',
        title: 'Distance',
        type: 'number',
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: 'ascent',
        title: 'Ascent',
        type: 'number',
        validation: (Rule) => Rule.required().positive(),
      },
      {
        name: 'classRating',
        title: 'Class rating',
        type: 'number',
        options: {list: [1, 2, 3, 4, 5]},
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'quality',
        title: 'Quality',
        type: 'number',
        options: {list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'coverPhotoUrl',
        title: 'Cover photo URL',
        type: 'url',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'trackKey',
        title: 'Track key',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'peaks',
        title: 'Peaks',
        type: 'array',
        of: [{type: 'reference', to: {type: 'peak'}}],
      },
      {
        name: 'report',
        title: 'Report',
        type: 'array',
        of: [{type: 'block'}],
      },
      {
        name: 'photos',
        title: 'Photos',
        type: 'array',
        of: [{type: 'photo'}],
      },
    ],
  },
  {
    name: 'peak',
    title: 'Peak',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'elevation',
        title: 'Elevation',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'prominence',
        title: 'Prominence',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'lists',
        title: 'Lists',
        type: 'array',
        of: [{type: 'reference', to: {type: 'peakList'}}],
      },
    ],
  },
  {
    name: 'peakList',
    title: 'Peak list',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'shortName',
        title: 'Short name',
        type: 'string',
      },
    ],
  },
  {
    name: 'photo',
    title: 'Photo',
    type: 'object',
    fields: [
      {
        name: 'url',
        title: 'URL',
        type: 'url',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
      },
    ],
  },
]
