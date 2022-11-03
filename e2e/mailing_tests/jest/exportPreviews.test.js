import execCli from "./util/execCli";

describe("exportPreviews command", () => {
  describe("cli", () => {
    it("runs on templates", async () => {
      const out = await execCli("export-previews --skip-lint");
      expect(out).toMatchSnapshot();
    });
  });

  describe("cli --minify", () => {
    it("runs on templates", async () => {
      const out = await execCli("export-previews --minify --skip-lint");
      expect(out).toMatchSnapshot();
    });
  });

  describe("cli halts on lint errors", () => {
    it("runs on templates", async () => {
      const out = await execCli("export-previews");
      expect(out).toMatchSnapshot();
    });
  });
});
