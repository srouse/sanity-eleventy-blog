const POST_INDEX = '/blog';

export default function routeLookup( _type, slug ) {
  switch ( _type ) {
    case 'post' :
      return `${POST_INDEX}/${slug}`;
    case 'page' :
      return `/${slug}`;
    case 'home' :
      return `/`;
    case 'blogIndex' :
      return POST_INDEX;
  }
}
