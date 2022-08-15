import fsExtra from "fs-extra";
import { log, error } from "../../log";
import { ExportPreviewsArgs, handler } from "../exportPreviews";

jest.mock("../../log");

describe("exportPreviews command", () => {
  it("outputs html files to outDir", async () => {
    await handler({ "out-dir": "./out" } as ExportPreviewsArgs);
    expect(error).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith("Exporting preview html to");
    expect(log).toHaveBeenCalledWith("✅ Processed 4 previews");
  });

  it("errors without emails dir", async () => {
    jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => /package\.json/.test(path.toString()));
    await handler({ "out-dir": "./out" } as ExportPreviewsArgs);
    expect(error).toHaveBeenCalledWith(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
  });
});
