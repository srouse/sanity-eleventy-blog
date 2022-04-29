export default {
  name: 'something',
  type: 'document',
  title: 'Something',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Somthing sluggy',
      options: {
        source: 'name',
        maxLength: 96
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current'
    }
  }
}
