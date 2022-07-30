# `babel-plugin-import-replace-win-var`

> TODO: description

## Usage

```
const babelPluginImportReplaceWinVar = require('babel-plugin-import-replace-win-var');

> ops  传进去的参数 {libs:{库名: 全局名}}
-------

{
  plugins: [babelPluginImportReplaceWinVar, { libs: {three: "THREE"} }]
}


> 示例
配置  =>  { libs: {three: "THREE", vue: Vue} }

import * as THREE from 'three'
 转换
var THREE = window.THREE

import { onBeforeMount, ref, watch as myWatch } from 'vue'
 转换后
var {
  onBeforeMount,
  ref,
  watch: myWatch
} = window.Vue

```
