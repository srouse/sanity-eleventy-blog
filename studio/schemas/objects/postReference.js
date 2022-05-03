export default {
  name: 'postReference',
  type: 'object',
  title: 'Post reference',
  fields: [
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
