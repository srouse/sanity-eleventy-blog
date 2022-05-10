export default {
  title: 'Input',
  name: 'input',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Name (No Spaces)',
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Validation',
      name: 'validation',
      type: 'validation'
    }
  ]
}
