"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(opts) {
    var removeDesignatedIf = {
        IfStatement: function (path, state) {
            var literal = path.get('test');
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
exports.default = default_1;
