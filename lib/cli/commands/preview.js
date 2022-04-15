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
const mjml_react_1 = require("mjml-react");
const open_1 = __importDefault(require("open"));
const fs_extra_1 = require("fs-extra");
const paths_1 = require("../paths");
const PreviewIndex_1 = __importDefault(require("../PreviewIndex"));
const child_process_1 = require("child_process");
const process_1 = require("process");
const DEFAULT_PORT = 3883;
exports.command = "preview";
exports.describe = "start the email preview server";
exports.builder = {
    port: {
        default: DEFAULT_PORT,
    },
};
exports.handler = (argv) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting preview server 🤠");
    if (process.env.MAILING_DEV && JSON.parse(process.env.MAILING_DEV)) {
        console.log("Rebuilding before preview...");
        (0, child_process_1.execSync)("npm run build && MAILING_DEV=false mailing preview", {
            stdio: "inherit",
        });
        (0, process_1.exit)(0);
    }
    if (process.env.NODE_ENV === "test") {
        return; // for now
    }
    const port = (argv === null || argv === void 0 ? void 0 : argv.port) || DEFAULT_PORT;
    const previewsPath = (0, paths_1.getPreviewsDirectory)();
    if (!previewsPath) {
        console.log("Could not find emails directory. Have you initialized the project with `mailing init`?");
        return;
    }
    let shouldRefresh = false;
    http_1.default
        .createServer(function (req, res) {
        if (!req.url) {
            res.end(404);
            return;
        }
        // Browser pings to see if they should refresh.
        if (/^\/should_refresh\.json/.test(req.url)) {
            res.writeHead(200);
            res.end(JSON.stringify(shouldRefresh));
            return;
        }
        let component;
        try {
            component =
                req.url !== "/"
                    ? require((0, path_1.resolve)(previewsPath, req.url))
                    : react_1.default.createElement(PreviewIndex_1.default);
        }
        catch (e) {
            console.log("caught error", e);
            res.writeHead(500);
            res.end(JSON.stringify(e));
            return;
        }
        try {
            const { html, errors } = (0, mjml_react_1.render)(component, {
                minify: false,
            });
            res.writeHead(200);
            res.end(html);
            shouldRefresh = false;
        }
        catch (e) {
            res.writeHead(500);
            res.end(JSON.stringify(e));
        }
    })
        .listen(port);
    yield (0, open_1.default)(`http://localhost:${port}`);
    console.log(`Running preview server at http://localhost:${port}`);
    const changeWatchPath = (0, paths_1.getExistingEmailsDir)();
    (0, fs_extra_1.watch)(changeWatchPath, {
        recursive: true,
    }, (eventType, filename) => {
        console.log(`Detected ${eventType} on ${filename}, reloading`);
        shouldRefresh = true;
        (0, open_1.default)(`http://localhost:${port}`);
    });
    console.log(`Watching for changes to ${changeWatchPath}`);
});
