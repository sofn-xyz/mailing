"use strict";
exports.__esModule = true;
exports.renderNotFound = void 0;
function renderNotFound(res) {
    res.writeHead(404);
    res.end("Not found");
}
exports.renderNotFound = renderNotFound;
