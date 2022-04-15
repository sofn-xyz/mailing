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
const paths_1 = require("../paths");
const PreviewIndex_1 = __importDefault(require("../PreviewIndex"));
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
    const port = (argv === null || argv === void 0 ? void 0 : argv.port) || DEFAULT_PORT;
    const previewsPath = (0, paths_1.getPreviewsDirectory)();
    if (!previewsPath) {
        console.log("Could not find emails directory. Have you initialized the project with `mailings init`?");
        return;
    }
    console.log("Starting preview server...");
    http_1.default
        .createServer(function (req, res) {
        let component;
        try {
            component =
                req.url && req.url !== "/"
                    ? require((0, path_1.resolve)(previewsPath, req.url))
                    : react_1.default.createElement(PreviewIndex_1.default);
        }
        catch (e) {
            res.writeHead(404);
            res.end(JSON.stringify(e));
            return;
        }
        const { html, errors } = (0, mjml_react_1.render)(component, {
            minify: false,
        });
        res.writeHead(200);
        res.end(html);
    })
        .listen(port);
    (0, open_1.default)(`http://localhost:${port}`);
    console.log(`running preview server on localhost:${port}`);
});
