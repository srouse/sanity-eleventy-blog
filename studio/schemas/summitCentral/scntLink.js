export default {
  name: 'scntLink',
  type: 'document',
  title: 'Summit Central Link',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text'
    },
    {
      title: 'Is Folder',
      name: 'isFolder',
      description: 'treat this link like a folder',
      type: 'boolean'
    },
    {
      title: 'Parent',
      name: 'parent',
      type: 'reference',
      to: [
        {
          type: 'scntLink'
        }
      ]
    },
    {
      title: 'Roles',
      name: 'role',
      description: 'The roles that will see this link',
      type: 'array',
      of: [{type: 'reference', to: {type: 'role'}}]
    }
  ]
}
