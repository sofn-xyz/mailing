"use strict";
exports.__esModule = true;
exports.getConfig = exports.setConfig = exports.writeDefaultConfigFile = exports.DEFAULTS = exports.MAILING_CONFIG_FILE = void 0;
var fs_extra_1 = require("fs-extra");
var paths_1 = require("./paths");
var fs_1 = require("fs");
var log_1 = require("./log");
exports.MAILING_CONFIG_FILE = "./mailing.config.json";
// defaults for all options
exports.DEFAULTS = {
    typescript: looksLikeTypescriptProject(),
    emailsDir: (0, fs_extra_1.existsSync)("./src/emails") ? "./src/emails" : "./emails",
    outDir: "./previews_html",
    port: 3883,
    quiet: false
};
// options to include in the default config file
var DEFAULT_KEYS_FOR_CONFIG_FILE = ["typescript", "emailsDir", "outDir"];
// an object to JSON stringify and write to the default config file
var DEFAULTS_FOR_CONFIG_FILE = Object.fromEntries(DEFAULT_KEYS_FOR_CONFIG_FILE.map(function (key) { return [
    key,
    exports.DEFAULTS[key],
]; }));
function looksLikeTypescriptProject() {
    var _a, _b;
    if ((0, fs_extra_1.existsSync)("./tsconfig.json")) {
        return true;
    }
    var pkg = (0, paths_1.readPackageJSON)();
    return !!(((_a = pkg.devDependencies) === null || _a === void 0 ? void 0 : _a.typescript) || ((_b = pkg.dependencies) === null || _b === void 0 ? void 0 : _b.typescript));
}
// write the default mailing.config.json file to get you started
function writeDefaultConfigFile() {
    var prettier = require("prettier");
    if (!(0, fs_extra_1.existsSync)(exports.MAILING_CONFIG_FILE)) {
        var configJsonString = prettier.format(JSON.stringify(DEFAULTS_FOR_CONFIG_FILE), {
            parser: "json",
            printWidth: 0
        });
        try {
            (0, fs_1.writeFileSync)(exports.MAILING_CONFIG_FILE, configJsonString);
        }
        catch (err) {
            (0, log_1.error)(err);
        }
    }
}
exports.writeDefaultConfigFile = writeDefaultConfigFile;
/* Preview server config singleton */
var previewServerConfig;
function setConfig(newConfig) {
    previewServerConfig = newConfig;
}
exports.setConfig = setConfig;
function getConfig() {
    if (undefined === previewServerConfig) {
        throw new Error("previewServerConfig is undefined");
    }
    return previewServerConfig;
}
exports.getConfig = getConfig;
