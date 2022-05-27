export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  initialValue: {
    layout: 'default'
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text'
    },
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Hero', value: 'hero'},
          {title: 'Small Card', value: 'smallCar'},
          {title: 'Horizontal Image Left', value: 'horizontalImageLeft'},
          {title: 'Horizontal Image Right', value: 'horizontalImageRight'},
          {title: 'Call Out Box', value: 'callOutBox'}
        ]
      }
    }
  ]
}
