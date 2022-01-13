"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    };
    return {
        name: 'remove-other-console',
        visitor: removeOtherConsole,
    };
}
exports.default = default_1;
