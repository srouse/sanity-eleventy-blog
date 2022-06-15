

export interface State {
  context: {
    type?: ContextTypes,
    route?: string,
  },
  entities: {[key:string]: any},
  page?: Entity,
}

export enum ContextTypes {// preview, previewDynamic, html?
  server = 'server',
  browser = 'browser',
  browserDyanamic = 'browserDynamic'
}

export interface MappedItems {[key:string]: any};

export interface Entity {
  name?: string,
  full_slug: string,
  content: {
    component: string,
  }
}

export interface PageItem extends Entity {
  content: {
    component: string,
    _uid?: string,
    _editable?: string,
    body: any[]
  }
}

export interface NavigationNodeItem extends Entity {
  content: {
    component: string,
    _uid?: string,
    _editable?: string,
    page?: PageItem,
    children: NavigationNodeItem[]
  }
}

export interface TemplateEngineResult {
  slug: string,
  html: string,
}