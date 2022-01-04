module.exports = (name) => {
  return function ({ types: t }) {
    return {
      visitor: {
        CallExpression(callee, arguments) {
          // 方法二
          // 获取 call 子节点 和第一个参数 
          let nodeCallee = callee.node
          // console.log(callee, '\n\n\n', arguments);
          let argOne = callee.node.arguments[0]
          // 判断是否是 CallExpression
          let isCallExpression = t.isCallExpression(nodeCallee)
          if(isCallExpression) {
            let _console = nodeCallee.callee?.object?.name === 'console'
            let _log = nodeCallee.callee?.property?.name === 'log'
            let isMyLog = argOne?.value === name
            // console.log(_console, _log, isMyLog, 'test---');
            if(_console && _log ) {
              if(!isMyLog) {
                callee.remove();
              }
            }
          }
        }
      },
    };
  };
};
