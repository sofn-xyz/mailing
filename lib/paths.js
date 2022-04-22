"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJSON = exports.getPreviewsDirectory = exports.getExistingEmailsDir = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
function pathHasExistingEmailsDir(path) {
    // could do a better check of whether this exists
    return (0, fs_extra_1.existsSync)(path);
}
function getExistingEmailsDir() {
    if (pathHasExistingEmailsDir("./src/emails")) {
        return (0, path_1.resolve)("./src/emails");
    }
    if (pathHasExistingEmailsDir("./emails")) {
        return (0, path_1.resolve)("./emails");
    }
    return null;
}
exports.getExistingEmailsDir = getExistingEmailsDir;
function getPreviewsDirectory() {
    const existingEmailsDir = getExistingEmailsDir();
    return existingEmailsDir ? (0, path_1.resolve)(existingEmailsDir, "previews") : null;
}
exports.getPreviewsDirectory = getPreviewsDirectory;
function getPackageJSON() {
    return JSON.parse((0, fs_extra_1.readFileSync)("./package.json").toString());
}
exports.getPackageJSON = getPackageJSON;
