"use strict";
exports.__esModule = true;
var fs_extra_1 = require("fs-extra");
require("dotenv/config");
var yargs_1 = require("yargs/yargs");
var init = require("./commands/init");
var preview = require("./commands/preview");
var exportPreviews = require("./commands/exportPreviews");
var config_1 = require("./config");
var fs_1 = require("fs");
var config = (0, fs_extra_1.existsSync)(config_1.MAILING_CONFIG_FILE)
    ? JSON.parse((0, fs_1.readFileSync)(config_1.MAILING_CONFIG_FILE).toString())
    : {};
// prettier-ignore
(0, yargs_1["default"])(process.argv.slice(2))
    .config(config)
    .command(init)
    .command(preview)
    .command(exportPreviews)
    .help()
    .argv;
