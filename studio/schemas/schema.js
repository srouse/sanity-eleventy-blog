// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import author from './documents/author'
import category from './documents/category'
import post from './documents/post'
import siteSettings from './documents/siteSettings'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import authorReference from './objects/authorReference'

// Layout Types
import pageLayout from './layouts/pageLayout'
import rowLayout from './layouts/rowLayout'
import rowLayoutObject from './layouts/rowLayoutObject'
import page from './documents/page'
import postReference from './objects/postReference'
import navList from './navigation/navList'

// Forms
import form from './forms/form'
import input from './forms/elements/input'
import validation from './forms/elements/validation'
import formRow from './forms/elements/formRow'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    post,
    category,
    author,
    mainImage,
    authorReference,
    bodyPortableText,
    bioPortableText,
    excerptPortableText,

    pageLayout,
    rowLayout,
    rowLayoutObject,

    page,
    postReference,

    navList,

    form,
    input,
    validation,
    formRow

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
