import S from '@sanity/desk-tool/structure-builder'
import {
  MdSettings,
  MdPerson
} from 'react-icons/md'
import {
  GoHome
} from 'react-icons/go'

const hiddenDocTypes = listItem =>
  ![
    'category',
    'author',
    'post',
    'siteSettings',
    'pageLayout',
    'navList'
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.documentListItem()
        .title('Frontpage')
        .schemaType('page')
        .icon(GoHome)
        .child(
          S.document()
            .schemaType('page')
            .documentId('frontpage')
            .views([S.view.form()])
        ),
      S.listItem()
        .title('Navigation')
        .schemaType('navList')
        .child(S.documentTypeList('navList').title('Navigations')),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
