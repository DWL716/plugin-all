import * as t from '@babel/types';
import { Visitor, NodePath } from '@babel/traverse';

type Options = { libraries?: any };

export interface PluginOptions {
  opts: Options;
}
// 通过 https://astexplorer.net/ 分析 esm 的import模块
export default function babelPlugin(opts: Options) {
  const importReplaceWinVal: Visitor<PluginOptions> = {
    ImportDeclaration(path, state) {
      // console.log('DWL', 'opts', opts.libraries);
      if (!state.opts.libraries) return;
      // console.log('DWL', 'path-----', path);
      const specifiers = path.get('specifiers');
      const source = path.get('source').node.value;
      const libraryName = state.opts.libraries[source];
      // 收集 对象解构声明的每一个 Specifier
      let importSpecifiers: NodePath<t.ImportSpecifier>[] = [];

      if (libraryName) {
        specifiers.forEach((specifier) => {
          // import THREE from 'three'
          if (t.isImportDefaultSpecifier(specifier)) {
            // console.log('DWL', 'specifier', specifier.get('local').toString());
            path.replaceWithMultiple([
              t.variableDeclaration('var', [
                t.variableDeclarator(
                  t.identifier(specifier.get('local').toString()),
                  t.memberExpression(t.identifier('window'), t.identifier(libraryName)),
                ),
              ]),
            ]);
          } else if (t.isImportSpecifier(specifier)) {
            /**
             * import { React } from 'three' 和 import { React as React_DOM } from 'three'
             */
            importSpecifiers.push(specifier as NodePath<t.ImportSpecifier>);
          } else if (t.isImportNamespaceSpecifier(specifier)) {
            // import * as THREE from 'three'
            path.replaceWithMultiple([
              t.variableDeclaration('var', [
                t.variableDeclarator(
                  t.identifier(specifier.get('local').toString()),
                  t.memberExpression(t.identifier('window'), t.identifier(libraryName)),
                ),
              ]),
            ]);
          }
        });
        // 单独对结构的 import 进行组装
        if (importSpecifiers.length) {
          let importAsObj = importSpecifiers.map((specifier) => {
            // import { React, useState, useEffect } from 'three'
            if (specifier.get('imported').toString() === specifier.get('local').toString()) {
              return t.objectProperty(
                t.identifier(specifier.get('imported').toString()),
                t.identifier(specifier.get('imported').toString()),
                false,
                true,
              );
            }
            // 解析有 as 的命名空间 并以 对象解构重命名形式输出
            // import { React as React_DOM , Router as Rout} from 'three'
            return t.objectProperty(
              t.identifier(specifier.get('imported').toString()),
              t.identifier(specifier.get('local').toString()),
              false,
              false,
            );
          });
          // 装填
          let crateDeclaration = t.variableDeclaration('var', [
            t.variableDeclarator(
              t.objectPattern(importAsObj),
              t.memberExpression(t.identifier('window'), t.identifier(libraryName)),
            ),
          ]);

          // 替换节点
          path.replaceWithMultiple([crateDeclaration]);
        }
      }
    },
  };
  return {
    name: 'import-replace-win-var',
    visitor: importReplaceWinVal,
  };
}
