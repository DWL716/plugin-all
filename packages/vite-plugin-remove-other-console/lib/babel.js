const { transformSync } = require("@babel/core");
const myBabelPlugin = require("babel-plugin-remove-other-console");

module.exports = (name) => {
  const babelConfig = {
    plugins: [myBabelPlugin(name)],
  };
  return (code) => {
    const output = transformSync(code, babelConfig);
    // console.log('code\n\n', output);
    return output.code;
  };
};
