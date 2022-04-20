"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const path_1 = require("path");
const paths_1 = require("./paths");
const fs_extra_1 = require("fs-extra");
const mjml_react_1 = require("mjml-react");
const PreviewIndex = () => {
    const previewsDir = (0, paths_1.getPreviewsDirectory)();
    if (!previewsDir) {
        return (0, jsx_runtime_1.jsx)("h1", { children: "emails/previews not found" });
    }
    const previewCollections = (0, fs_extra_1.readdirSync)(previewsDir).filter((path) => !/^\./.test(path));
    const previews = previewCollections.map((p) => {
        return [p, require((0, path_1.resolve)(previewsDir, p))];
    });
    const firstTest = previews.length === 1 && previews[0][0] === "MyFirstEmail";
    return ((0, jsx_runtime_1.jsxs)(mjml_react_1.Mjml, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlHead, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlTitle, { children: "Mailing Previews" }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlFont, { name: "Inter", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900" }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlAttributes, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlAll, { "font-family": "Inter" }) })] }), (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlBody, Object.assign({ width: 900 }, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { children: (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlColumn, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, Object.assign({ fontSize: 32 }, { children: "Previews" })), previews.map((p) => ((0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, { children: p[0] }), Object.keys(p[1]).map((previewFunction) => ((0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlText, { children: [(0, jsx_runtime_1.jsx)("br", {}), "-", " ", (0, jsx_runtime_1.jsx)("a", Object.assign({ href: `/${p[0]}/${previewFunction}` }, { children: previewFunction }))] }, previewFunction)))] }) }, p[0])))] }) }), firstTest && ((0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlColumn, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, Object.assign({ fontSize: 32 }, { children: "Add a preview to emails/previews and it will apprear here." })) }) }))] }))] }));
};
exports.default = PreviewIndex;
