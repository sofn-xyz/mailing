import { readFile, writeFile } from "fs-extra";
import { resolve } from "path";
import { WATCH_IGNORE } from "../livereload";
import io from "socket.io-client";

describe("livereload", () => {
  async function touchTemplate() {
    const template = resolve(__dirname + "/../../../../emails/Welcome.tsx");
    const fileContents = await readFile(template);
    await writeFile(template, fileContents);
  }

  describe("startChangeWatcher", () => {
    let clientSocket: any;
    beforeAll((done) => {
      clientSocket = io("http://localhost:3883");
      clientSocket.on("connect", done);
    });

    afterAll(() => {
      clientSocket.close();
    });

    it("ignores the right files when watching", () => {
      expect(
        WATCH_IGNORE.test(".mailing/src/emails/node_modules/lodash/fp/rest.js")
      ).toBe(true);
      expect(WATCH_IGNORE.test(".next")).toBe(true);
      expect(WATCH_IGNORE.test("node_modules")).toBe(true);
    });

    it("socket emits 'reload' when a template is touched", (done) => {
      clientSocket.on("reload", (_arg: any) => {
        done();
      });

      void touchTemplate();
    });
  });
});
