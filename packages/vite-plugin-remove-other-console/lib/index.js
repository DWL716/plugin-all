"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel_1 = __importDefault(require("./babel"));
var merge = require('merge-source-map');
exports.default = (function (name) {
    return {
        name: 'remove-console',
        transform: function (scr, id, inMap) {
            if (/\.(vue|js|ts)$/.test(id)) {
                var babelConsoleName = (0, babel_1.default)(name, id);
                var dataReturn = babelConsoleName(scr);
                return __assign(__assign({}, dataReturn), { map: merge(inMap, dataReturn) });
            }
        },
    };
});
