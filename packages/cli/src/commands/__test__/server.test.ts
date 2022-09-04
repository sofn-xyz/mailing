import { execCli, execCliChild } from "./execCli";
import fetch from "node-fetch";

jest.mock("../../util/log");

describe("server command", () => {
  describe("cli", () => {
    // n.b. jest runs files sequentially so we just build once at the top
    it("builds", async () => {
      jest.setTimeout(30000);
      const out = await execCli("server build");
      expect(out).toContain("Compiled successfully");
      expect(out).toContain("Finalizing page optimization...");
      expect(out).toContain("First Load JS shared by all");
    });

    it("starts after building", (done) => {
      const child = execCliChild("server start");
      const interval = setInterval(async () => {
        try {
          await fetch("http://localhost:3000");
          clearInterval(interval);
          child.kill();
          done();
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    });
  });
});
