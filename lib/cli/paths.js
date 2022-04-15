"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviewsDirectory = exports.getExistingEmailsDir = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function pathHasExistingEmailsDir(path) {
    // could do a better check of whether this exists
    return (0, fs_1.existsSync)(path);
}
function getExistingEmailsDir() {
    const appRoot = require("app-root-path");
    if (pathHasExistingEmailsDir(appRoot.resolve("src/emails"))) {
        return appRoot.resolve("src/emails");
    }
    if (pathHasExistingEmailsDir(appRoot.resolve("emails"))) {
        return appRoot.resolve("emails");
    }
    return null;
}
exports.getExistingEmailsDir = getExistingEmailsDir;
function getPreviewsDirectory() {
    const existingEmailsDir = getExistingEmailsDir();
    return existingEmailsDir ? (0, path_1.resolve)(existingEmailsDir, "previews") : null;
}
exports.getPreviewsDirectory = getPreviewsDirectory;
