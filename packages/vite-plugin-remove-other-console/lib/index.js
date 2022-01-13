"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var babel_1 = __importDefault(require("./babel"));
exports.default = (function (name) {
    var babelConsoleName = (0, babel_1.default)(name);
    return {
        name: 'remove-console',
        transform: function (scr, id) {
            if (/\.(vue|js|ts)$/.test(id)) {
                return babelConsoleName(scr);
            }
        },
    };
});
