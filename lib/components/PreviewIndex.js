"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewIndex = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function PreviewIndex({ previews }) {
    const firstTest = previews.length === 1 && previews[0][0] === "MyFirstEmail";
    console.log(previews);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Previews" }), previews.map((p) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h4", { children: p[0] }), p[1].map((previewFunction) => ((0, jsx_runtime_1.jsxs)("div", { children: ["- ", (0, jsx_runtime_1.jsx)("a", Object.assign({ href: `/${p[0]}/${previewFunction}` }, { children: previewFunction }))] }, previewFunction)))] }))), firstTest && ((0, jsx_runtime_1.jsx)("h3", { children: "Add a preview to emails/previews and it will apprear here." }))] }));
}
exports.PreviewIndex = PreviewIndex;
