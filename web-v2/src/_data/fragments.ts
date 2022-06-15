

export const pageFragment = `
fragment page on PageItem {
  full_slug
  content {
    _uid
    _editable
    body
    component
  }
}`;

export const navigationNodeFragment = `
fragment navigationNode on NavigationnodeItem {
  full_slug
  name
  content {
    _uid
    component
    page {
      full_slug : fullSlug
    }
    children {
      full_slug : fullSlug
    }
  }
}`;

export const allFragments = [
  pageFragment,
  navigationNodeFragment
];