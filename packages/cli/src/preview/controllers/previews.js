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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.sendPreview = exports.showPreview = exports.showPreviewIndex = void 0;
var path_1 = require("path");
var mjml_1 = require("../../mjml");
var log_1 = require("../../log");
var paths_1 = require("../../paths");
var application_1 = require("./application");
var fs_extra_1 = require("fs-extra");
var config_1 = require("../../config");
var LIVE_RELOAD_SNIPPET = "\n  if (window.location.hostname === \"localhost\") {\n    window.setInterval(async function checkForReload() {\n      const shouldReload = await fetch(\"/should_reload.json\");\n      const json = await shouldReload.json()\n      if (json['shouldReload']) {\n        window.location.reload();\n      }\n    }, 1200);\n  }\n";
function showPreviewIndex(req, res) {
    var config = (0, config_1.getConfig)();
    var previewsPath = (0, paths_1.getPreviewsDirectory)(config.emailsDir);
    if (!req.url || !previewsPath) {
        return (0, application_1.renderNotFound)(res);
    }
    var previewCollections = (0, fs_extra_1.readdirSync)(previewsPath).filter(function (path) { return !/^\./.test(path); });
    var previews = previewCollections.map(function (p) {
        var previewPath = (0, path_1.resolve)(previewsPath, p);
        return [p, Object.keys(require(previewPath)).sort()];
    });
    try {
        res.writeHead(200);
        res.end(JSON.stringify(previews));
    }
    catch (e) {
        (0, log_1.log)("caught error rendering mjml to html", e);
        res.writeHead(500);
        res.end(JSON.stringify(e));
    }
}
exports.showPreviewIndex = showPreviewIndex;
function showPreview(req, res) {
    var config = (0, config_1.getConfig)();
    var previewsPath = (0, paths_1.getPreviewsDirectory)(config.emailsDir);
    if (!req.url || !previewsPath) {
        return (0, application_1.renderNotFound)(res);
    }
    // previews
    var _a = req.url.split("/"), _blank = _a[0], _previews = _a[1], moduleName = _a[2], functionNameJSON = _a[3];
    var modulePath = (0, path_1.resolve)(previewsPath, moduleName);
    var functionName = functionNameJSON.replace(".json", "");
    var emailsPath = (0, path_1.resolve)(previewsPath, "..");
    for (var path in require.cache) {
        if (path.startsWith(emailsPath)) {
            delete require.cache[path];
        }
    }
    var previewModule = require(modulePath);
    var component = previewModule[functionName]();
    if (component === null || component === void 0 ? void 0 : component.props) {
        try {
            var _b = (0, mjml_1.render)(component), html = _b.html, errors = _b.errors;
            if (errors.length) {
                (0, log_1.error)(errors);
            }
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify({ html: html, errors: errors }));
        }
        catch (e) {
            (0, log_1.error)("caught error rendering mjml to html", e);
            res.writeHead(500);
            res.end(JSON.stringify(e));
        }
    }
    else {
        var msg = "".concat(functionName, "() from ").concat(modulePath, " must return a react component defined in ").concat(emailsPath);
        (0, log_1.error)(msg);
        res.writeHead(404);
        res.end(msg);
    }
}
exports.showPreview = showPreview;
function sendPreview(req, res) {
    var req_1, req_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var config, previewsPath, buffers, chunk, e_1_1, data, body, html, to, subject, component, modulePath, module_1, sendMail;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    config = (0, config_1.getConfig)();
                    previewsPath = (0, paths_1.getPreviewsDirectory)(config.emailsDir);
                    if (!previewsPath) {
                        (0, log_1.error)("Previews path not found");
                        return [2 /*return*/, (0, application_1.renderNotFound)(res)];
                    }
                    buffers = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    req_1 = __asyncValues(req);
                    _b.label = 2;
                case 2: return [4 /*yield*/, req_1.next()];
                case 3:
                    if (!(req_1_1 = _b.sent(), !req_1_1.done)) return [3 /*break*/, 5];
                    chunk = req_1_1.value;
                    buffers.push(chunk);
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(req_1_1 && !req_1_1.done && (_a = req_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(req_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    data = Buffer.concat(buffers).toString();
                    body = JSON.parse(data);
                    html = body.html, to = body.to, subject = body.subject;
                    if (!html && body.previewClass && body.previewFunction) {
                        modulePath = (0, path_1.resolve)(previewsPath, body.previewClass);
                        delete require.cache[modulePath]; // clean require
                        module_1 = require(modulePath);
                        component = module_1[body.previewFunction]();
                    }
                    if (!html && !component) {
                        (0, log_1.error)("no html provided, no component found");
                        res.writeHead(400);
                        res.end(JSON.stringify({ error: "no html provided, no component found" }));
                        return [2 /*return*/];
                    }
                    sendMail = require((0, path_1.resolve)(previewsPath, ".."));
                    if (!(sendMail === null || sendMail === void 0 ? void 0 : sendMail["default"])) {
                        (0, log_1.error)("sendMail not exported from ".concat((0, path_1.resolve)(previewsPath, "..")));
                    }
                    return [4 /*yield*/, sendMail["default"]({
                            html: html,
                            component: component,
                            to: to,
                            forceDeliver: true,
                            subject: subject
                        })];
                case 13:
                    _b.sent();
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end("{}");
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendPreview = sendPreview;
