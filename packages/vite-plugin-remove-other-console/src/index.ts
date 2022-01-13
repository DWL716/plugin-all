import baseBabel from './babel';
export default (name: string) => {
  const babelConsoleName = baseBabel(name);
  return {
    name: 'remove-console',
    transform(scr: string, id: string): string | void | null {
      if (/\.(vue|js|ts)$/.test(id)) {
        return babelConsoleName(scr);
      }
    },
  };
};
