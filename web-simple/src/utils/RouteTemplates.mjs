export class RouteTemplates {
  constructor( templates ) {
    this.templates = templates;
  }

  routeViaId(id, args) {
    let result;
    this.templates.find(routeInfo => {
      if (routeInfo.id == id) {
        const finalArgs = args ? args : [];
        result = {
          ...routeInfo,
          data: async (data) => await routeInfo.data(data, ...finalArgs),
          url: args ? routeInfo.url(...args) : routeInfo.url()
        }
        return true;
      }
      return false;
    });
    return result;
  }
  
  routeViaUrl(url) {
    let result;
    this.templates.find(routeInfo => {
      const id = '([\\w-]+)';
      const content = routeInfo.url(id, id, id);
      const regExStr = `^${content.replaceAll('/', '\\/')}\\/*$`;
      const regEx = new RegExp(regExStr);
      const regExResults = regEx.exec(url);
      if (regExResults) {
        const args = regExResults.splice(1);
        result = {
          ...routeInfo,
          data: async (data) => await routeInfo.data(data, ...args),
          url: routeInfo.url(...args)
        }
        return true;
      }
      return false;
    })
    return result;
  }
}