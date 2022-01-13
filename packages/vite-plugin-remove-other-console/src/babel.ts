import { transformSync } from '@babel/core';
import removeOtherConsole from 'babel-plugin-remove-other-console';

export default (name: string) => {
  const babelConfig = {
    plugins: [removeOtherConsole, { exclude: name }],
  };
  return (code: string) => {
    const output = transformSync(code, babelConfig);
    return output!.code;
  };
};
