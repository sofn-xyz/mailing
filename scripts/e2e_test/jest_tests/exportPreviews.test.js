import execCli from "./util/execCli";

describe("exportPreviews command", () => {
  describe("cli", () => {
    it("runs on templates", async () => {
      const out = await execCli("export-previews");
      expect(out).toMatchSnapshot();
    });
  });

  describe("cli --minify", () => {
    it("runs on templates", async () => {
      const out = await execCli("export-previews --minify");
      expect(out).toMatchSnapshot();
    });
  });
});
