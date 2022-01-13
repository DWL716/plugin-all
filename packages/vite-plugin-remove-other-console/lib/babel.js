"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babel/core");
var babel_plugin_remove_other_console_1 = __importDefault(require("babel-plugin-remove-other-console"));
exports.default = (function (name) {
    var babelConfig = {
        plugins: [[babel_plugin_remove_other_console_1.default, { exclude: name }]],
    };
    return function (code) {
        var output = (0, core_1.transformSync)(code, babelConfig);
        return output.code;
    };
});
