import fsExtra from "fs-extra";
import { packageJsonVersionsMatch } from "../setup";
import childProcess from "child_process";

jest.mock("../../../../util/log");

describe("packageJsonVersionsMatch", () => {
  it("should return false if .mailing package.json does not exist", async () => {
    const fileNotFoundError = { code: "ENOENT" };

    jest.spyOn(fsExtra, "readFile").mockImplementation((path) => {
      throw fileNotFoundError;
    });

    const match = await packageJsonVersionsMatch();
    expect(match).toBe(false);
  });

  it("should return true if .mailing package.json matches the cli version", async () => {
    // mock the .mailing/package.json version
    jest
      .spyOn(fsExtra, "readFile")
      .mockImplementation(
        (path) =>
          new Promise((resolve) => resolve(Buffer.from(`{"version":"0.6.6"}`)))
      );

    // mock the npx mailing version
    jest.spyOn(childProcess, "execSync").mockImplementation(() => "0.6.6");

    const match = await packageJsonVersionsMatch();
    expect(match).toBe(true);
  });

  it("should return false if .mailing package.json does not match the cli version", async () => {
    // mock the .mailing/package.json version
    jest
      .spyOn(fsExtra, "readFile")
      .mockImplementation(
        (path) =>
          new Promise((resolve) => resolve(Buffer.from(`{"version":"1.2.3"}`)))
      );

    // mock the npx mailing version
    jest.spyOn(childProcess, "execSync").mockImplementation(() => "4.5.6");

    const match = await packageJsonVersionsMatch();
    expect(match).toBe(false);
  });
});
