import S from '@sanity/desk-tool/structure-builder'
import {
  MdSettings,
  MdPerson
} from 'react-icons/md'
import {
  GoHome
} from 'react-icons/go'
import Iframe from 'sanity-plugin-iframe-pane'

const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8888' : 'https://sanity-eleventy-blog-web-q679da9x.netlify.app/'

const resolveProductionUrl = (doc) => {
  return `${baseUrl}/preview/${doc.slug.current}/`
}

export const getDefaultDocumentNode = ({schemaType}) => {
  if (schemaType === `post`) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc)
        })
        .title('Preview')
    ])
  }

  return S.document()
}

const hiddenDocTypes = listItem =>
  ![
    'category',
    'author',
    'post',
    'siteSettings',
    'pageLayout',
    'navList',
    'form',
    'scntLink',
    'role'
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
        .title('Forms')
        .schemaType('form')
        .child(S.documentTypeList('form').title('Forms')),
      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Summit Central')
        .child(
          S.list()
            .title('Summit Central')
            .items([
              S.listItem()
                .title('Links / Folders')
                .schemaType('scntLink')
                .child(
                  S.documentTypeList('scntLink').title('Summit Central Links')
                ),
              S.listItem()
                .title('Roles')
                .schemaType('role')
                .child(
                  S.documentTypeList('role').title('Summit Roles')
                )
            ])
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
