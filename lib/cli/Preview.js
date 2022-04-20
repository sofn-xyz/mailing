"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const paths_1 = require("./paths");
const fs_extra_1 = require("fs-extra");
const mjml_react_1 = require("mjml-react");
const PreviewIndex = () => {
    const previewsDir = (0, paths_1.getPreviewsDirectory)();
    if (!previewsDir) {
        return (0, jsx_runtime_1.jsx)("h1", { children: "emails/previews not found" });
    }
    const previews = (0, fs_extra_1.readdirSync)(previewsDir).filter((path) => !/^\./.test(path));
    return ((0, jsx_runtime_1.jsxs)(mjml_react_1.Mjml, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlHead, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlFont, { name: "Inter", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900" }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlAttributes, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlAll, { "font-family": "Inter" }) })] }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlBody, Object.assign({ width: 500 }, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { children: (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlColumn, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, Object.assign({ fontSize: 32 }, { children: "Previews" })), previews.map((p) => ((0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, { children: p }, p)))] }) }) }))] }));
};
exports.default = PreviewIndex;
