"use strict";
exports.__esModule = true;
exports.render = void 0;
var mjml_react_1 = require("mjml-react");
function render(component) {
    return (0, mjml_react_1.render)(component, {
        validationLevel: "soft",
        minify: undefined
    });
}
exports.render = render;
