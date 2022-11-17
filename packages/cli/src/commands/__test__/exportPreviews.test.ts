import fsExtra from "fs-extra";
import { log, error } from "../../util/log";
import { ExportPreviewsArgs, handler } from "../exportPreviews";
import { execCli } from "./execCli";

jest.mock("../../util/log");

describe("exportPreviews command", () => {
  beforeEach(() => {
    // config file exists
    jest.spyOn(fsExtra, "existsSync").mockImplementation((_path) => true);

    jest.spyOn(fsExtra, "readJSONSync").mockImplementation(() => ({
      typescript: true,
      emailsDir: "./emails",
      outDir: "./previews_html",
      anonymousId: "TEST_VALUE",
    }));
  });

  it("outputs html files to outDir", async () => {
    await handler({
      outDir: "./out",
      emailsDir: "packages/cli/src/emails",
      skipLint: true,
    } as ExportPreviewsArgs);
    expect(error).not.toHaveBeenCalled();
    expect(log).toMatchSnapshot();
  });

  it("errors without emails dir", async () => {
    jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => /package\.json/.test(path.toString()));
    await handler({
      outDir: "./out",
      emailsDir: "./NoTaDiReCtOrY",
      skipLint: true,
    } as ExportPreviewsArgs);
    expect(error).toHaveBeenCalledWith(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
  });

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
