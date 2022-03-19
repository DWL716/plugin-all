import baseBabel from './babel';
const merge = require('merge-source-map');
export default (name: string) => {
  return {
    name: 'remove-console',
    transform(scr: string, id: string, inMap: any): any {
      if (/\.(vue|js|ts)$/.test(id)) {
        const babelConsoleName = baseBabel(name, id);
        const dataReturn = babelConsoleName(scr);
        return {
          ...dataReturn,
          map: merge(inMap, dataReturn),
        };
      }
    },
  };
};
