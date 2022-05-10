export default {
  type: 'document',
  name: 'form',
  title: 'Form',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      description: 'Introductory text for the form'
    },
    {
      title: 'Form Endpoint',
      name: 'endpoint',
      type: 'string',
      description: 'The full url of where the form should be submitted.'
    },
    {
      title: 'Inputs',
      name: 'inputs',
      type: 'array',
      of: [
        {
          type: 'input'
        },
        {
          type: 'formRow'
        }
      ]
    }
  ]
}
