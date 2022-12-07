import { execCli } from "./execCli";

jest.mock("../../util/serverLogger");

describe("server command", () => {
  describe("cli", () => {
    it("builds", async () => {
      const out = await execCli("server build --emails-dir ./src/templates/test/emails");
      expect(out).toContain("Compiled successfully");
      expect(out).toContain("Finalizing page optimization...");
      expect(out).toContain("First Load JS shared by all");
    });
  });
});
