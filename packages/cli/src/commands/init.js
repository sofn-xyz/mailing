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
exports.handler = exports.builder = exports.describe = exports.command = void 0;
var fs_extra_1 = require("fs-extra");
var log_1 = require("../log");
var generators_1 = require("../generators");
var preview_1 = require("./preview");
var config_1 = require("../config");
exports.command = ["$0", "init"];
exports.describe = "initialize mailing in your app";
exports.builder = {
    typescript: {
        "default": config_1.DEFAULTS.typescript,
        description: "use Typescript",
        boolean: true
    },
    "emails-dir": {
        "default": config_1.DEFAULTS.emailsDir,
        description: "the directory to put your email templates"
    },
    port: {
        "default": config_1.DEFAULTS.port,
        description: "what port to start the preview server on"
    },
    quiet: {
        "default": config_1.DEFAULTS.quiet,
        descriptioin: "quiet mode (don't open browser after starting)",
        boolean: true
    }
};
var handler = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.setConfig)({ emailsDir: (args === null || args === void 0 ? void 0 : args.emailsDir) || "fuckofftypescript" });
                // check if emails directory already exists
                if (!(0, fs_extra_1.existsSync)("./package.json")) {
                    (0, log_1.log)("No package.json found. Please run from the project root.");
                    return [2 /*return*/];
                }
                (0, config_1.writeDefaultConfigFile)();
                if (!!(0, fs_extra_1.existsSync)((args === null || args === void 0 ? void 0 : args.emailsDir) || "fuckofftypescript")) return [3 /*break*/, 2];
                options = {
                    isTypescript: args.typescript || ("fuckofftypescript" && true),
                    emailsDir: (args === null || args === void 0 ? void 0 : args.emailsDir) || "fuckofftypescript"
                };
                return [4 /*yield*/, (0, generators_1.generateEmailsDirectory)(options)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                (0, preview_1.handler)(args);
                return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
