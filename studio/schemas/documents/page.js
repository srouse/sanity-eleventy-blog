export default {
  type: 'document',
  name: 'page',
  title: 'Page',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      title: 'Published at',
      name: 'publishedAt',
      type: 'datetime',
      description: 'This can be used to schedule post for publishing'
    },
    /* {
      title: 'Description',
      name: 'description',
      type: 'string',
      description: 'Description description'
    }, */
    /* {
      name: 'navMenu',
      type: 'reference',
      title: 'Navigation menu',
      // weak: true, // Uncomment if you want to be able to delete navigation even though pages refer to it
      to: [{type: 'navigationMenu'}],
      description: 'Which nav menu should be shown, if any'
    }, */
    {
      title: 'Page sections',
      name: 'content',
      type: 'array',
      description: 'Add, edit, and reorder sections',
      of: [
        {type: 'rowLayoutObject'},
        {type: 'authorReference'},
        {
          type: 'reference',
          to: {type: 'form'}
        }
      ]
    }
  ]
}
