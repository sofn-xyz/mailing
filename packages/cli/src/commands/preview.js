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
var http_1 = require("http");
var path_1 = require("path");
var open_1 = require("open");
var fs_extra_1 = require("fs-extra");
var paths_1 = require("../paths");
var log_1 = require("../log");
var intercepts_1 = require("../preview/controllers/intercepts");
var previews_1 = require("../preview/controllers/previews");
var process_1 = require("process");
var url_1 = require("url");
var next_1 = require("next");
var registerRequireHooks_1 = require("./util/registerRequireHooks");
var config_1 = require("../config");
exports.command = "preview";
exports.describe = "start the email preview server";
exports.builder = {
    port: {
        "default": config_1.DEFAULTS.port,
        description: "what port to start the preview server on"
    },
    quiet: {
        "default": config_1.DEFAULTS.quiet,
        descriptioin: "quiet mode (don't open browser after starting)",
        boolean: true
    },
    "emails-dir": {
        "default": config_1.DEFAULTS.emailsDir,
        description: "the directory of your email templates"
    }
};
var handler = function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var port, dev, hostname, app, nextHandle, previewsPath, host, currentUrl, shouldReload, changeWatchPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, config_1.setConfig)({ emailsDir: argv.emailsDir });
                port = argv.port;
                if (process.env.NODE_ENV === "test") {
                    return [2 /*return*/]; // for now
                }
                (0, registerRequireHooks_1["default"])();
                dev = !!process.env.MM_DEV;
                hostname = "localhost";
                app = (0, next_1["default"])({
                    dev: dev,
                    hostname: hostname,
                    port: port,
                    dir: dev ? (0, path_1.resolve)(__dirname, "../..") : __dirname
                });
                nextHandle = app.getRequestHandler();
                return [4 /*yield*/, app.prepare()];
            case 1:
                _a.sent();
                previewsPath = (0, paths_1.getPreviewsDirectory)(argv.emailsDir);
                if (!previewsPath) {
                    (0, log_1.error)("Could not find emails directory. Have you initialized the project with `mailing init`?");
                    return [2 /*return*/];
                }
                host = "http://".concat(hostname, ":").concat(port);
                currentUrl = "".concat(host, "/");
                shouldReload = false;
                http_1["default"]
                    .createServer(function (req, res) {
                    return __awaiter(this, void 0, void 0, function () {
                        function showShouldReload(_req, res) {
                            res.writeHead(200);
                            res.end(JSON.stringify({ shouldReload: shouldReload }));
                            shouldReload = false;
                        }
                        var startTime, noLog, parsedUrl, pathname, query, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    startTime = Date.now();
                                    noLog = false;
                                    if (!req.url) {
                                        res.end(404);
                                        return [2 /*return*/];
                                    }
                                    parsedUrl = (0, url_1.parse)(req.url, true);
                                    pathname = parsedUrl.pathname, query = parsedUrl.query;
                                    // Never cache anything
                                    res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
                                    res.setHeader("Pragma", "no-cache");
                                    res.setHeader("Expires", "-1");
                                    currentUrl = "".concat(host).concat(req.url);
                                    res.once("close", function () {
                                        if (!noLog || process.env.MM_VERBOSE)
                                            (0, log_1.log)("".concat(res.statusCode, " ").concat(req.url, " ").concat(Date.now() - startTime, "ms"));
                                    });
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 13, , 14]);
                                    if (!(req.url === "/previews.json")) return [3 /*break*/, 2];
                                    (0, previews_1.showPreviewIndex)(req, res);
                                    return [3 /*break*/, 12];
                                case 2:
                                    if (!(req.url === "/should_reload.json")) return [3 /*break*/, 3];
                                    noLog = true;
                                    showShouldReload(req, res);
                                    return [3 /*break*/, 12];
                                case 3:
                                    if (!(req.url === "/intercepts" && req.method === "POST")) return [3 /*break*/, 4];
                                    (0, intercepts_1.createIntercept)(req, res);
                                    return [3 /*break*/, 12];
                                case 4:
                                    if (!(req.url === "/previews/send.json" && req.method === "POST")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, (0, previews_1.sendPreview)(req, res)];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 12];
                                case 6:
                                    if (!/^\/intercepts\/[a-zA-Z0-9]+\.json/.test(req.url)) return [3 /*break*/, 7];
                                    (0, intercepts_1.showIntercept)(req, res);
                                    return [3 /*break*/, 12];
                                case 7:
                                    if (!/^\/previews\/.*\.json/.test(req.url)) return [3 /*break*/, 8];
                                    (0, previews_1.showPreview)(req, res);
                                    return [3 /*break*/, 12];
                                case 8:
                                    if (!/^\/_+next/.test(req.url)) return [3 /*break*/, 10];
                                    noLog = true;
                                    return [4 /*yield*/, app.render(req, res, "".concat(pathname), query)];
                                case 9:
                                    _a.sent();
                                    return [3 /*break*/, 12];
                                case 10: 
                                // static assets in public directory
                                return [4 /*yield*/, nextHandle(req, res, parsedUrl)];
                                case 11:
                                    // static assets in public directory
                                    _a.sent();
                                    _a.label = 12;
                                case 12: return [3 /*break*/, 14];
                                case 13:
                                    e_1 = _a.sent();
                                    (0, log_1.error)("caught error", e_1);
                                    res.writeHead(500);
                                    res.end(JSON.stringify(e_1));
                                    return [2 /*return*/];
                                case 14: return [2 /*return*/];
                            }
                        });
                    });
                })
                    .listen(port, function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                (0, log_1.log)("Running preview at ".concat(currentUrl));
                                if (!!argv.quiet) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, open_1["default"])(currentUrl)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); })
                    .on("error", function onServerError(e) {
                    if (e.code === "EADDRINUSE") {
                        (0, log_1.error)("Port ".concat(port, " is taken, is mailing already running?"));
                        process.exit(1);
                    }
                    else {
                        (0, log_1.error)("Preview server error:", JSON.stringify(e));
                    }
                });
                changeWatchPath = argv.emailsDir;
                if (!changeWatchPath) {
                    (0, log_1.log)("Error finding emails dir in . or ./src");
                    return [2 /*return*/];
                }
                (0, fs_extra_1.watch)(changeWatchPath, { recursive: true }, function (eventType, filename) {
                    (0, log_1.log)("Detected ".concat(eventType, " on ").concat(filename, ", reloading"));
                    delete require.cache[(0, path_1.resolve)(changeWatchPath, filename)];
                    shouldReload = true;
                });
                (0, log_1.log)("Watching for changes to ".concat((0, path_1.relative)((0, process_1.cwd)(), changeWatchPath)));
                return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
