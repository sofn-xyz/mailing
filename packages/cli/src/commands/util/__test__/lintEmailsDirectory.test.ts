import { lintEmailsDirectory } from "../lintEmailsDirectory";
import moduleManifest from "../../../moduleManifest";
import * as log from "../../../util/serverLogger";

jest.mock("../../../moduleManifest");

describe("lintEmailsDirectory", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(process, "exit").mockImplementation(() => undefined as never);
    jest.spyOn(log, "error").mockImplementation(() => undefined);
    jest.spyOn(log, "log").mockImplementation(() => undefined);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should not error when there are no linting errors", async () => {
    moduleManifest.templates = {
      "template-1": {
        name: "template-1",
      },
      "template-2": {
        name: "template-2",
      },
    } as any;
    expect(lintEmailsDirectory).toBeDefined();
    await lintEmailsDirectory("./emails");
    expect(process.exit).not.toHaveBeenCalled();
  });

  it("should error when name does not match template name", async () => {
    moduleManifest.templates = {
      "template-1": {
        name: "template-2",
      },
      "template-2": {
        name: "template-1",
      },
    } as any;
    expect(lintEmailsDirectory).toBeDefined();
    await lintEmailsDirectory("./emails");
    expect(log.error).toHaveBeenCalledWith(
      expect.stringMatching(/2 lint errors/)
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
