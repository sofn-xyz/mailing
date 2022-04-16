"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Head_1 = __importDefault(require("./components/Head"));
const mjml_react_1 = require("mjml-react");
const MyFirstEmail = ({ name }) => {
    return ((0, jsx_runtime_1.jsxs)(mjml_react_1.Mjml, { children: [(0, jsx_runtime_1.jsx)(Head_1.default, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlTitle, { children: "My very first email" }) }), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlBody, Object.assign({ width: 500 }, { children: (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlSection, { children: (0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlColumn, { children: [(0, jsx_runtime_1.jsxs)(mjml_react_1.MjmlText, Object.assign({ fontSize: 32 }, { children: ["Hi ", name, ","] })), (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlText, Object.assign({ fontSize: 16 }, { children: "I'm very excited to contact you by email." }))] }) }) }))] }));
};
exports.default = MyFirstEmail;
