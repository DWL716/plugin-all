## 版本说明

### babel-plugin-remove-other-console

#### v1

第一个版本使用纯 js 来实现，实现逻辑非常简单直接，那时候只是有这个想法，通过了解了基础的 babel 后在通过控制台打印和在线查看 ast

```
CallExpression(callee) {
  // 获取 call 子节点 和第一个参数
  let nodeCallee = callee.node;
  let argOne = callee.node.arguments[0];
  // 判断是否是 CallExpression
  let isCallExpression = t.isCallExpression(nodeCallee);
  if (isCallExpression) {
    let _console = nodeCallee.callee?.object?.name === 'console';
    let _log = nodeCallee.callee?.property?.name === 'log';
    let isMyLog = argOne?.value === name;
    // console.log(_console, _log, isMyLog, 'test---');
    if (_console && _log) {
      if (!isMyLog) {
        callee.remove();
      }
    }
  }
}
```

#### v2

将 js 改成 ts 类型问题点 主要是 babel 类型怎么用，官网也模糊的很，后面在 github 上找了一些用 ts 实现 babel-plugin 进行了参考

### vite-plugin-remove-other-console

基于 babel-plugin-remove-other-console 封装的一个可以在 vite 上使用的一个插件
