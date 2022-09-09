import { execCli } from "./execCli";

jest.mock("../../util/log");

describe("server command", () => {
  describe("cli", () => {
    it("builds", async () => {
      const out = await execCli("server build");
      expect(out).toContain("Compiled successfully");
      expect(out).toContain("Finalizing page optimization...");
      expect(out).toContain("First Load JS shared by all");
    });
  });
});
