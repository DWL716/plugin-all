const { transformSync } = require('@babel/core');
const myPlugins = require('../lib/index').default;
// const myPlugins = require('../src/index');
const code = `
import i from 'three'

import * as THREE from 'three'

import { React, useState, useEffect, aj as c } from 'three'

import { React as React_DOM , Router as Rout, memo, m as MM} from 'three'

const NAME = window.THREE

`;
const babelConfig = {
  sourceMaps: true,
  plugins: [[myPlugins, { libs: { three: 'THREE' } }]],
};
const output = transformSync(code, babelConfig);
console.log('test---\n', output.code, 'map\n', output.map);
