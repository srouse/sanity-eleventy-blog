export default {
  name: 'postReference',
  type: 'object',
  title: 'Post reference',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string'
    },
    {
      name: 'post',
      type: 'reference',
      to: [
        {
          type: 'post'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'post.name',
      media: 'post.image.asset'
    }
  }
}
