export default {
  name: 'rowLayout',
  type: 'array',
  title: 'Row Layout',
  of: [
    {
      type: 'reference',
      to: {
        type: 'post'
      }
    },
    {
      type: 'authorReference'
    },
    {
      type: 'mainImage'
    }
  ]
}
