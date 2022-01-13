# `babel-config-remove-other-console`

删除 指定 外的 console.log

## 使用

```
> commonjs
const babelConfigRemoveOtherConsole = require('babel-config-remove-other-console').default;

> or esModule
import babelConfigRemoveOtherConsole from 'babel-config-remove-other-console'

> ops  传进去的参数 exclude 为需要过滤的 console
{
  plugins: [babelConfigRemoveOtherConsole, { exclude: "DWL" }]
}

```
