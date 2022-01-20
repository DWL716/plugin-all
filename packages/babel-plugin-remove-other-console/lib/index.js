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
function default_1(opts) {
    function isIdWithNameGlobal(name, id) {
        return id.isIdentifier({ name: name }) && !id.scope.getBinding(name) && id.scope.hasGlobal(name);
    }
    function isConsoleLog(memberExpr) {
        var object = memberExpr.get('object');
        var property = memberExpr.get('property');
        return isIdWithNameGlobal('console', object) && property.isIdentifier({ name: 'log' });
    }
    function isExcludeName(memberExpr, state) {
        if (!memberExpr)
            return false;
        if (!memberExpr.isStringLiteral())
            return false;
        if (!state.opts.exclude)
            return false;
        var excludeName = state.opts.exclude;
        if (memberExpr.isStringLiteral({ value: excludeName }))
            return true;
        return false;
    }
    var removeOtherConsole = {
        CallExpression: function (path, state) {
            var callee = path.get('callee');
            if (!callee.isMemberExpression())
                return;
            if (isConsoleLog(callee)) {
                if (!isExcludeName(path.get('arguments')[0], state)) {
                    path.remove();
                }
            }
        },
        MemberExpression: function (path, state) {
            if (isConsoleLog(path) && path.parentKey === 'init') {
                var myFun = t.functionExpression(null, [], t.blockStatement([]));
                path.replaceWith(myFun);
            }
        },
    };
    return {
        name: 'remove-other-console',
        visitor: removeOtherConsole,
    };
}
exports.default = default_1;
