export default {
  name: 'rowLayoutObject',
  type: 'object',
  title: 'Row Layout Object',
  preview: {
    select: {
      rowLayoutLength: 'rowLayout.length',
      row0: 'rowLayout.0.title',
      row1: 'rowLayout.1.title'
    },
    prepare (selection) {
      const {rowLayoutLength, row0, row1} = selection
      let title = ''
      if (row0) {
        title = row0
      } else if (row1) {
        title += `, ${row1}`
      }
      return {
        title: `Row (${rowLayoutLength}) ${title}`
      }
    }
  },
  fields: [
    {
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
  ]
}
