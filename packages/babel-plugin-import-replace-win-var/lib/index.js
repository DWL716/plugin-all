"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var t = __importStar(require("@babel/types"));
function babelPlugin(opts) {
    var importReplaceWinVal = {
        ImportDeclaration: function (path, state) {
            if (!state.opts.libs)
                return;
            var specifiers = path.get('specifiers');
            var source = path.get('source').node.value;
            var libraryName = state.opts.libs[source];
            var importSpecifiers = [];
            if (libraryName) {
                specifiers.forEach(function (specifier) {
                    if (t.isImportDefaultSpecifier(specifier)) {
                        replaceWithMultiple(path, specifier, libraryName);
                    }
                    else if (t.isImportSpecifier(specifier)) {
                        importSpecifiers.push(specifier);
                    }
                    else if (t.isImportNamespaceSpecifier(specifier)) {
                        replaceWithMultiple(path, specifier, libraryName);
                    }
                });
                if (importSpecifiers.length) {
                    var importAsObj = importSpecifiers.map(function (specifier) {
                        if (specifier.get('imported').toString() === specifier.get('local').toString()) {
                            return t.objectProperty(t.identifier(specifier.get('imported').toString()), t.identifier(specifier.get('imported').toString()), false, true);
                        }
                        return t.objectProperty(t.identifier(specifier.get('imported').toString()), t.identifier(specifier.get('local').toString()), false, false);
                    });
                    var crateDeclaration = t.variableDeclaration('var', [
                        t.variableDeclarator(t.objectPattern(importAsObj), t.memberExpression(t.identifier('window'), t.identifier(libraryName))),
                    ]);
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
exports.default = babelPlugin;
function replaceWithMultiple(path, specifier, libraryName) {
    path.replaceWithMultiple([
        t.variableDeclaration('var', [
            t.variableDeclarator(t.identifier(specifier.get('local').toString()), t.memberExpression(t.identifier('window'), t.identifier(libraryName))),
        ]),
    ]);
}
