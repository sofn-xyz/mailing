"use strict";
exports.__esModule = true;
exports.readPackageJSON = exports.getPreviewsDirectory = void 0;
var fs_1 = require("fs");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
// appends /previews to emailsDir string if that directory exists
// otherwise, return null
function getPreviewsDirectory(emailsDir) {
    var previewsDirectory = (0, path_1.resolve)(emailsDir, "previews");
    return (0, fs_1.existsSync)(previewsDirectory) ? previewsDirectory : null;
}
exports.getPreviewsDirectory = getPreviewsDirectory;
function readPackageJSON() {
    return JSON.parse((0, fs_extra_1.readFileSync)("./package.json").toString());
}
exports.readPackageJSON = readPackageJSON;
