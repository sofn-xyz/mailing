"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const mjml_react_1 = require("mjml-react");
const Head = ({ children }) => {
    return ((0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlHead, { children: [(0, jsx_runtime_1.jsx)(mjml_react_1.MjmlFont, { name: "Inter", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900" }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlAttributes, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlAll, { "font-family": "Inter" }) }), children] }));
};
exports.default = Head;
