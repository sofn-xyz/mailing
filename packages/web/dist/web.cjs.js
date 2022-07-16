'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./web.cjs.prod.js");
} else {
  module.exports = require("./web.cjs.dev.js");
}
