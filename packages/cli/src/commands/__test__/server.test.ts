import { execSync } from "child_process";

jest.mock("../../util/log");

describe("server command", () => {
  describe("cli", () => {
    it("builds", () => {
      const out = execSync(__dirname + "/../../dev.js server build").toString();
      expect(out).toContain("Compiled successfully");
      expect(out).toContain("Finalizing page optimization...");
      expect(out).toContain("First Load JS shared by all");
    });
  });
});
