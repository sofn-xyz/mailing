"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.handler = exports.previewFilename = exports.describe = exports.builder = exports.command = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var paths_1 = require("../paths");
var log_1 = require("../log");
var mjml_1 = require("../mjml");
var registerRequireHooks_1 = require("./util/registerRequireHooks");
var config_1 = require("../config");
exports.command = "export-previews";
exports.builder = {
    "emails-dir": {
        "default": config_1.DEFAULTS.emailsDir,
        description: "the directory of your email templates"
    },
    "out-dir": {
        "default": config_1.DEFAULTS.outDir,
        description: "directory in which we output the html"
    }
};
exports.describe = "export previews as html";
function camelToSnakeCase(str) {
    return str
        .replace(/[A-Z]/g, function (letter) { return "_".concat(letter.toLowerCase()); })
        .replace(/^_/, "");
}
function previewFilename(moduleName, functionName) {
    return camelToSnakeCase("".concat(moduleName.replace(/\.[j|t]sx/, ""), "_").concat(functionName, ".html"));
}
exports.previewFilename = previewFilename;
var handler = function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var outDir, previewsPath, count;
    return __generator(this, function (_a) {
        outDir = argv.outDir;
        if (typeof outDir !== "string") {
            (0, log_1.error)("please specify an outDir like --outDir ./html");
            return [2 /*return*/];
        }
        previewsPath = (0, paths_1.getPreviewsDirectory)(argv.emailsDir);
        if (!previewsPath) {
            (0, log_1.error)("Could not find emails directory. Have you initialized the project with `mailing init`?");
            return [2 /*return*/];
        }
        (0, registerRequireHooks_1["default"])();
        (0, log_1.log)("Exporting preview html to");
        (0, log_1.log)(outDir);
        count = 0;
        (0, fs_extra_1.readdirSync)(previewsPath)
            .filter(function (path) { return !/^\./.test(path); })
            .forEach(function (p) { return __awaiter(void 0, void 0, void 0, function () {
            var previewPath, previewModule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        previewPath = (0, path_1.resolve)(previewsPath, p);
                        previewModule = require(previewPath);
                        return [4 /*yield*/, Promise.all(Object.keys(require(previewPath)).map(function (previewFunction) {
                                var filename = previewFilename(p, previewFunction);
                                (0, log_1.log)("  |-- ".concat(filename));
                                count++;
                                var _a = (0, mjml_1.render)(previewModule[previewFunction]()), html = _a.html, errors = _a.errors;
                                if (errors.length) {
                                    (0, log_1.error)("MJML errors rendering ".concat(filename, ":"), errors);
                                }
                                return (0, fs_extra_1.outputFile)((0, path_1.resolve)(outDir, filename), html);
                            }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        (0, log_1.log)("\u2705 Processed ".concat(count, " previews"));
        return [2 /*return*/];
    });
}); };
exports.handler = handler;
