

export default function routeLookup( _type, slug ) {
  switch ( _type ) {
    case 'post' :
      return `/blog/${slug}`;
  }
}