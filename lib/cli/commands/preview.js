"use strict";
const next = require("next");
const DEFAULT_PORT = 3883;
exports.command = "preview";
exports.describe = "start the email preview server";
exports.builder = {
    port: {
        default: DEFAULT_PORT,
    },
};
exports.handler = (argv) => {
    const port = (argv === null || argv === void 0 ? void 0 : argv.port) || DEFAULT_PORT;
    console.log("implement me!", port);
};
