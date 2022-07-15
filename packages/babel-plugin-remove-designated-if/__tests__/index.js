const { transformSync } = require('@babel/core');
const myPlugins = require('../lib/index').default;
const code = `
var cover = 'relaper-test.png'
var arr = ['relaper-test.png', 'relaper-age.png', 'relaper-name.png']
arr.forEach((item) => {
	getMyPlugin("@data-visual/in-component/dist/img/" + item)
})
`;
const babelConfig = {
  plugins: [[myPlugins, { designated: 'DWL' }]],
};
const output = transformSync(code, babelConfig);
// console.log(output.code, output.map);
