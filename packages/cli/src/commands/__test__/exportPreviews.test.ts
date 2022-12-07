import fsExtra from "fs-extra";
import { log, error } from "../../util/serverLogger";
import { ExportPreviewsArgs, handler } from "../exportPreviews";
import { execCli } from "./execCli";

jest.mock("../../util/serverLogger");

describe("exportPreviews command", () => {
  beforeEach(() => {
    // config file exists
    jest.spyOn(fsExtra, "existsSync").mockImplementation((_path) => true);

    jest.spyOn(fsExtra, "readJSONSync").mockImplementation(() => ({
      typescript: true,
      emailsDir: "./packages/cli/src/templates/test/emails",
      outDir: "./previews_html",
      anonymousId: "TEST_VALUE",
    }));
  });

  afterEach(() => {
    fsExtra.removeSync("./out");
    fsExtra.removeSync("./previews_html");
  });

  it("outputs html files to outDir", async () => {
    await handler({
      outDir: "./out",
      emailsDir: "./packages/cli/src/templates/test/emails",
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
      const out = await execCli(
        "export-previews --skip-lint --emails-dir ./src/templates/test/emails"
      );
      expect(out).toMatchSnapshot();
    });
  });

  describe("cli --minify", () => {
    it("runs on templates", async () => {
      const out = await execCli(
        "export-previews --minify --skip-lint --emails-dir ./src/templates/test/emails"
      );
      expect(out).toMatchSnapshot();
    });
  });

  describe("cli halts on lint errors", () => {
    it("runs on templates", async () => {
      const out = await execCli(
        "export-previews --emails-dir ./src/templates/test/emails"
      );
      expect(out).toMatchSnapshot();
    });
  });
});
