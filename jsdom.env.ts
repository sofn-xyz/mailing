/* eslint-disable @typescript-eslint/no-var-requires */
import { TestEnvironment } from "jest-environment-jsdom";

class CustomTestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    // TextEncoder is required by node-html-parser
    if (typeof this.global.TextEncoder === "undefined") {
      const { TextEncoder } = require("util");
      this.global.TextEncoder = TextEncoder;
    }

    // setImmediate is required by nodemailer
    if (typeof this.global.setImmediate === "undefined") {
      const { setImmediate } = require("timers");
      this.global.setImmediate = setImmediate;
    }
  }
}

module.exports = CustomTestEnvironment;
