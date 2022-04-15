"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const path_1 = require("path");
const paths_1 = require("./paths");
const fs_extra_1 = require("fs-extra");
const mjml_react_1 = require("mjml-react");
const Head_1 = __importDefault(require("./init_template/emails/components/Head"));
const PreviewIndex = () => {
    const previewsDir = (0, paths_1.getPreviewsDirectory)();
    if (!previewsDir) {
        return (0, jsx_runtime_1.jsx)("h1", { children: "emails/previews not found" });
    }
    const previewCollections = (0, fs_extra_1.readdirSync)(previewsDir);
    const previews = previewCollections.map((p) => {
        return [p, require((0, path_1.resolve)(previewsDir, p))];
    });
    return ((0, jsx_runtime_1.jsxs)(mjml_react_1.Mjml, { children: [(0, jsx_runtime_1.jsx)(Head_1.default, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlTitle, { children: "My very first email" }) }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlBody, Object.assign({ width: 500 }, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { children: (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlColumn, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, Object.assign({ fontSize: 32 }, { children: "Previews" })), previews.map((p) => ((0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, { children: p[0] }), Object.keys(p[1]).map((previewFunction) => {
                                            (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, { children: previewFunction }, previewFunction);
                                        })] }) }, p[0])))] }) }) }))] }));
};
exports.default = PreviewIndex;
