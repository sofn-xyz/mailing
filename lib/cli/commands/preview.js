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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const http_1 = __importDefault(require("http"));
const path_1 = require("path");
const open_1 = __importDefault(require("open"));
const fs_extra_1 = require("fs-extra");
const paths_1 = require("../paths");
const PreviewIndex_1 = __importDefault(require("../PreviewIndex"));
const log_1 = __importDefault(require("../log"));
const DEFAULT_PORT = 3883;
exports.command = "preview";
exports.describe = "start the email preview server";
exports.builder = {
    port: {
        default: DEFAULT_PORT,
    },
};
exports.handler = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === "test") {
        return; // for now
    }
    const { render } = require("mjml-react");
    (0, log_1.default)("Starting preview server 🤠");
    require("ts-node").register();
    const port = (argv === null || argv === void 0 ? void 0 : argv.port) || DEFAULT_PORT;
    const previewsPath = (0, paths_1.getPreviewsDirectory)();
    if (!previewsPath) {
        (0, log_1.default)("Could not find emails directory. Have you initialized the project with `mailing init`?");
        return;
    }
    const host = `http://localhost:${port}`;
    let currentUrl = `${host}/`;
    http_1.default
        .createServer(function (req, res) {
        if (!req.url) {
            res.end(404);
            return;
        }
        currentUrl = `${host}${req.url}`;
        let component;
        try {
            if (req.url === "/") {
                component = react_1.default.createElement(PreviewIndex_1.default);
            }
            else {
                const [_blank, moduleName, functionName] = req.url.split("/");
                const module = require((0, path_1.resolve)(previewsPath, moduleName));
                component = module[functionName]();
            }
        }
        catch (e) {
            console.log("caught error", e);
            res.writeHead(500);
            res.end(JSON.stringify(e));
            return;
        }
        try {
            const { html, errors } = render(component, {
                packages: [],
                minify: false,
            });
            res.writeHead(200);
            res.end(html || JSON.stringify(errors));
        }
        catch (e) {
            (0, log_1.default)("caught error rendering mjml to html", e);
            res.writeHead(500);
            res.end(JSON.stringify(e));
        }
    })
        .listen(port);
    yield (0, open_1.default)(currentUrl);
    (0, log_1.default)(`Running preview at ${currentUrl}`);
    // simple live reload implementation
    const changeWatchPath = (0, paths_1.getExistingEmailsDir)();
    (0, fs_extra_1.watch)(changeWatchPath, { recursive: true }, (eventType, filename) => {
        (0, log_1.default)(`Detected ${eventType} on ${filename}, reloading`);
        (0, open_1.default)(currentUrl, { background: true });
    });
    (0, log_1.default)(`Watching for changes to ${changeWatchPath}`);
});
