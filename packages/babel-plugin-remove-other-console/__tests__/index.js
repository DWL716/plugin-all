const { transformSync } = require('@babel/core');
const myPlugins = require('../lib/index').default;
const code = `
console.log('<D0></D0>WL', 'tedd00st')
console.log('ccWL', 'tedd00st')
const fun = (test) => {
  console.log('DWL', test)
  console.log(test)
}
function a() {
  console.log('abs', path)
  console.log('DWL', path)
}
console.log('DWL', 'tedd00st')
`;
const babelConfig = {
  plugins: [[myPlugins, { exclude: 'DWL' }]],
};
const output = transformSync(code, babelConfig);
console.log(output.code, output.map);
