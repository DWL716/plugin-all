const { transformSync } = require('@babel/core');
const myPlugins = require('../lib/index').default;
const code = `
if(a>b) {}
if('b') {}
console.log(aa)
`;
const babelConfig = {
  plugins: [[myPlugins, { designated: 'DWL' }]],
};
const output = transformSync(code, babelConfig);
console.log(output.code, output.map);
