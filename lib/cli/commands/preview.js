"use strict";
exports.command = "preview";
exports.describe = "start the email preview server";
exports.builder = {
    port: {
        default: 3883,
    },
};
exports.handler = (argv) => {
    console.log("implement me!", argv);
};
