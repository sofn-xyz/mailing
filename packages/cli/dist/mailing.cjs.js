'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./mailing.cjs.prod.js");
} else {
  module.exports = require("./mailing.cjs.dev.js");
}
