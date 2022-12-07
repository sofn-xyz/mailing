import startPreviewServer from "../start";
import * as config from "../../../../util/config";
import http from "http";
import * as paths from "../../../../util/paths";

jest.useFakeTimers();

describe("start", () => {
  it("should throw an error if it can't find the previews directory", async () => {
    const mockHttpServer = jest.fn();
    jest.spyOn(config, "getConfig").mockImplementation(() => {
      return {
        emailsDir: "./packages/cli/src/templates/test/emails",
        quiet: true,
        port: 3883,
      };
    });

    jest.spyOn(http, "createServer").mockImplementation(mockHttpServer);

    jest.spyOn(paths, "getPreviewsDirectory").mockImplementation(() => null);
    await expect(async () => {
      await startPreviewServer();
    }).rejects.toThrow("previews directory does not exist");
    expect(mockHttpServer).not.toHaveBeenCalled();
  });
});
