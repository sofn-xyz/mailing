import fsExtra from "fs-extra";
// import * as NodeJS from "node";
import { packageJsonVersionsMatch } from "../setup";

describe("packageJsonVersionsMatch", () => {
  it("should return false if .mailing package.json does not exist", async () => {
    jest.spyOn(fsExtra, "readFile").mockImplementation((path) => {
      throw { code: "ENOENT" };
    });

    const match = await packageJsonVersionsMatch();
    expect(match).toBe(false);
  });
});
