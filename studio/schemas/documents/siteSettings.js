export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'author'}]
    },
    {
      name: 'logo',
      type: 'mainImage',
      title: 'Logo'
    },
    {
      name: 'pagesPermalink',
      type: 'string',
      description: 'The folder of the permalink for pages posts'
    },
    {
      name: 'blogPermalink',
      type: 'string',
      description: 'The folder of the permalink for blog posts'
    },
    {
      name: 'authorsPermalink',
      type: 'string',
      description: 'The folder of the permalink for authors'
    }
  ]
}
