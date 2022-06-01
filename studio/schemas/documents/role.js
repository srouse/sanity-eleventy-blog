export default {
  name: 'role',
  type: 'document',
  title: 'Employee Role',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'ID',
      name: 'id',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text'
    }
  ]
}
