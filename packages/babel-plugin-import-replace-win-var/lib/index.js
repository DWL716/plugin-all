module.exports = function importReplaceWinVal({ types: t }) {
  return {
    name: 'import-replace-win-var',
    visitor: {
      ImportDeclaration(
        path,
        _ref = {
          opts: {
            libraries: {},
          },
        },
      ) {
        const specifiers = path.node.specifiers;
        const source = path.node.source;
        const library = _ref.opts.libraries[source.value];

        if (library) {
          const declarations = [];
          const importSpecifiers = [];
          specifiers.forEach((specifier) => {
            // import THREE from 'three'
            if (t.isImportDefaultSpecifier(specifier)) {
              declarations.push(
                t.VariableDeclaration('var', [
                  t.VariableDeclarator(
                    t.Identifier(specifier.local.name),
                    t.MemberExpression(t.Identifier('window'), t.Identifier(library)),
                  ),
                ]),
              );
            } else if (t.isImportSpecifier(specifier)) {
              // import { React } from 'three'
              // or
              // import { React as React_DOM } from 'three'
              importSpecifiers.push(specifier);
            } else if (t.isImportNamespaceSpecifier(specifier)) {
              // import * as THREE from 'three'
              declarations.push(
                t.VariableDeclaration('var', [
                  t.VariableDeclarator(
                    t.Identifier(specifier.local.name),
                    t.MemberExpression(t.Identifier('window'), t.Identifier(library)),
                  ),
                ]),
              );
            }
          });

          if (importSpecifiers.length) {
            // 转换这两种 import { React } from 'three'，import { React as React_DOM } from 'three'
            const declaration = t.VariableDeclaration('var', [
              t.VariableDeclarator(
                t.ObjectPattern(
                  importSpecifiers.map((specifier) =>
                    t.ObjectProperty(
                      t.Identifier(specifier.imported.name),
                      t.Identifier(specifier.imported.name),
                    ),
                  ),
                ),
                t.MemberExpression(t.Identifier('window'), t.Identifier(library)),
              ),
            ]);

            declarations.push(declaration);
          }

          path.replaceWithMultiple(declarations);
        }
      },
    },
  };
};
