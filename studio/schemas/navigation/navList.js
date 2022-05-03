import {GoListUnordered} from 'react-icons/go'

export default {
  name: 'navList',
  type: 'document',
  title: 'Navigation List',
  icon: GoListUnordered,
  preview: {
    select: {
      title: 'title',
      description: 'description',
      menuId: 'menuId'
    },
    prepare (selection) {
      const {title, description, menuId} = selection
      return {
        title: `${title} ${menuId ? `(${menuId})` : ''}`,
        subtitle: description
      }
    }
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description'
    },
    {
      name: 'link',
      type: 'reference',
      title: 'Base Link',
      to: [
        {type: 'page'},
        {type: 'post'}
      ]
    },
    {
      title: 'Menu Id',
      name: 'menuId',
      type: 'string'
    },
    {
      name: 'children',
      type: 'array',
      title: 'Links',
      of: [
        {
          name: 'Post',
          type: 'reference',
          to: {
            type: 'post'
          }
        },
        {
          name: 'Page',
          type: 'reference',
          to: {
            type: 'page'
          }
        },
        {
          name: 'Navigation List Reference',
          type: 'reference',
          to: {
            type: 'navList'
          }
        },
        {
          name: 'Navigation List',
          type: 'navList'
        }
      ]
    }
  ]
}
