## babel 与 vite 插件集合
安装依赖 yarn
### babel-plugin-remove-other-console

```
删除除自己规定外的 console.log()
v 0.0.1 为 js
v 0.0.2 重构为 ts
```

### vite-plugin-remove-other-console

```
删除除自己规定外的 console.log()
v 0.0.1 ～ v 0.0.3 为 js
v 0.0.4 为 ts
```

#### vscode 新增代码块来快速创建 console.log

不明白可以自行网上搜索 vscode 代码片段怎么创建

一.

1. 快捷键通过 command + p 打卡输入窗口输入 >snippets
2. 选中 ‘配置用户代码片段’
3. 然后再选中 ‘新建“直接的项目”文件夹的代码片段文件...
4. 再输入代码片段名称 log
5. 这样在该项目的根目录会生成一个 .vscode 文件夹
6. 文件夹内有一个 log.code-snippets 的文件

```
"Print to console": {
    "scope": "javascript,typescript",
    "prefix": "log",
    "body": [
      "console.log('DWL', '$1')",
      "$2"
    ],
    "description": "Log output to console"
  }
```

7. 将改代码体会到创建的文件内

二.

1. 直接在自己的项目的根目录中创建一个 .vscode 文件夹
2. 然后将该项目的 .vscode 目录下的 log.code-snippets 文件复制到自己的项目中
