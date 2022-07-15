import { transformSync } from '@babel/core';
import removeOtherConsole from 'babel-plugin-remove-other-console';

export default (name: string, id?: string) => {
  const babelConfig = {
    sourceMaps: true,
    plugins: [[removeOtherConsole, { exclude: name }]],
  };
  return (code: string) => {
    const output = transformSync(code, babelConfig);
    return {
      code: output!.code,
      map: output!.map,
    };
  };
};
