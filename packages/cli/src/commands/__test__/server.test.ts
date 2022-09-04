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
  });
});
