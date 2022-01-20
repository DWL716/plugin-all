import * as t from '@babel/types';
import { Visitor, NodePath } from '@babel/traverse';

export default function (opts: { designated: string }) {
  const removeDesignatedIf: Visitor<{ opts: { designated: string } }> = {
    IfStatement(path, state) {
      const literal = path.get('test');
      // console.log(literal, t.isStringLiteral(literal));
      if (literal.isStringLiteral({ value: 'b' })) {
        console.log(literal.isStringLiteral({ value: 'b' }));
        path.remove();
      }
    },
  };

  return {
    name: 'remove-designated-if',
    visitor: removeDesignatedIf,
  };
}
