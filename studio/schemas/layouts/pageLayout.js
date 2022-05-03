export default {
  name: 'pageLayout',
  type: 'document',
  title: 'Page Layout',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'firstRow',
      type: 'rowLayout',
      title: 'First Row'
    },
    {
      name: 'secondRow',
      type: 'rowLayout',
      title: 'Second Row'
    },
    {
      name: 'thirdRow',
      type: 'rowLayout',
      title: 'Third Row'
    },
    {
      name: 'fourthRow',
      type: 'rowLayout',
      title: 'Fourth Row'
    },
    {
      name: 'fifthRow',
      type: 'rowLayout',
      title: 'Fifth Row'
    },
    {
      name: 'rowStack',
      type: 'array',
      title: 'Content Stack',
      of: [
        {
          type: 'rowLayoutObject'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current'
    }
  }
}
