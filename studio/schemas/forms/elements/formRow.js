export default {
  name: 'formRow',
  type: 'object',
  title: 'Form Row',
  preview: {
    select: {
      rowLayoutLength: 'rowLayout.length',
      rowFills: 'rowFills'
    },
    prepare (selection) {
      const {rowLayoutLength, rowFills} = selection
      return {
        title: `Row ${rowLayoutLength} total, ${rowFills ? `fills: ${rowFills}` : ''}`
      }
    }
  },
  fields: [
    {
      title: 'Row Fills',
      name: 'rowFills',
      type: 'string',
      description: `Array of fills for each element in the horizontal row. Example 1, 2 would make the second element twice the size of the first.`
    },
    {
      name: 'rowLayout',
      type: 'array',
      title: 'Row Layout',
      of: [
        {
          type: 'input'
        }
      ]
    }
  ]
}
