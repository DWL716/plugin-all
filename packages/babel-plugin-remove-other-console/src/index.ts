import * as t from '@babel/types';
import { Visitor, NodePath } from '@babel/traverse';

type Options = { exclude?: string };

export interface PluginOptions {
  opts: Options;
}

export default function (opts: { exclude?: string }) {
  /**
   * 判断调用的是否是 console
   * @param name 传入 console
   * @param id 节点
   * @returns boolean
   */
  function isIdWithNameGlobal(name: string, id: NodePath): boolean {
    return id.isIdentifier({ name }) && !id.scope.getBinding(name) && id.scope.hasGlobal(name);
  }

  /**
   * 判断是否是 console.log
   * @param memberExpr 节点
   * @returns boolean
   */
  function isConsoleLog(memberExpr: NodePath<t.MemberExpression>): boolean {
    const object = memberExpr.get('object') as NodePath;
    const property = memberExpr.get('property') as NodePath;
    return isIdWithNameGlobal('console', object) && property.isIdentifier({ name: 'log' });
  }

  /**
   *
   * @param memberExpr arguments第一个节点
   * @param state
   * @returns
   */
  function isExcludeName(
    memberExpr:
      | NodePath<t.ArgumentPlaceholder | t.JSXNamespacedName | t.SpreadElement | t.Expression>
      | undefined,
    state: PluginOptions,
  ): boolean {
    // 如果没有传参
    if (!memberExpr) return false;
    // 判断 第一个参数是否是字符串
    if (!memberExpr.isStringLiteral()) return false;
    // 如果 ops.exclude 为空
    if (!state.opts.exclude) return false;
    // 判断 第一个参数 和 exclude 是否相同
    let excludeName = state.opts.exclude;
    // console.log('--isStringLiteral,---', memberExpr.isStringLiteral({ value: excludeName }));
    if (memberExpr.isStringLiteral({ value: excludeName })) return true;
    return false;
  }

  const removeOtherConsole: Visitor<PluginOptions> = {
    CallExpression(path, state) {
      const callee = path.get('callee') as NodePath<t.MemberExpression>;
      // 判断是否是 MemberExpression（属性成员表达式）
      if (!callee.isMemberExpression()) return;
      // 判断是否是 console 和 log，第一个参数是否是删除外的
      if (isConsoleLog(callee)) {
        // 判断第一个参数是否和 {exclude: name}
        // console.log('arguments\n--', path.get('arguments')[0]);
        if (!isExcludeName(path.get('arguments')[0], state)) {
          path.remove();
        }
      }
    },
  };

  return {
    name: 'remove-other-console',
    visitor: removeOtherConsole,
  };
}
