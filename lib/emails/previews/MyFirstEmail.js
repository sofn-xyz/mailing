"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBob = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const MyFirstEmail_1 = __importDefault(require("../MyFirstEmail"));
function toBob() {
    return (0, jsx_runtime_1.jsx)(MyFirstEmail_1.default, { name: "Bob" });
}
exports.toBob = toBob;
