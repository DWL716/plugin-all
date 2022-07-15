import baseBabel from './babel';
export default (name: string) => {
  const babelConsoleName = baseBabel(name);
  return {
    name: 'remove-console',
    transform(scr: string, id: string): any {
      if (/\.(vue|js|ts)$/.test(id) && !/node_modules/.test(id)) {
        return babelConsoleName(scr);
      }
    },
  };
};
