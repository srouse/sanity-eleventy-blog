export default {
  type: 'document',
  name: 'form',
  title: 'Form',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      title: 'Inputs',
      name: 'inputs',
      type: 'array',
      of: [
        {
          type: 'input'
        }
      ]
    }
  ]
}
