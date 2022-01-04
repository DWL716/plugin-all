const { transformSync } = require('@babel/core')
const myPlugins = require('../lib/index')
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
console.warn(abs)
let path = 'test';
console.log('abs', path)
//if('aa') {}
bcc(22)
`
const babelConfig = {
    plugins: [myPlugins('DWL')]
}
const output = transformSync(code, babelConfig)
console.log(output.code);