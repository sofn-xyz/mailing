'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./mailing-core.cjs.prod.js");
} else {
  module.exports = require("./mailing-core.cjs.dev.js");
}
