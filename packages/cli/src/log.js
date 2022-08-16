"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.debug = exports.error = exports.log = void 0;
var chalk_1 = require("chalk");
var DEBUG = process.env.DEBUG;
function log(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    console.log.apply(console, __spreadArray([chalk_1["default"].blue("[mailing]"), message], optionalParams, false));
}
exports.log = log;
function error(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    console.error.apply(console, __spreadArray([chalk_1["default"].red("[mailing]"), message], optionalParams, false));
}
exports.error = error;
function debug(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (DEBUG)
        console.info.apply(console, __spreadArray([chalk_1["default"].red("[mailing]"), message], optionalParams, false));
}
exports.debug = debug;
exports["default"] = { log: log, debug: debug, error: error };
