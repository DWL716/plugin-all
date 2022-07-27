const { transformSync } = require('@babel/core');
const myPlugins = require('../lib/index');
const code = `
import i from 'three'

import * as THREE from 'three'

import { React } from 'three'

import { React as React_DOM } from 'three'

const NAME = window.THREE

`;
const babelConfig = {
  sourceMaps: true,
  plugins: [[myPlugins, { libraries: { three: 'THREE' } }]],
};
const output = transformSync(code, babelConfig);
console.log('test---\n', output.code, 'map\n', output.map);
