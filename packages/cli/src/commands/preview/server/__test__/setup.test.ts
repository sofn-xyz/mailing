import fsExtra from "fs-extra";
import { packageJsonVersionsMatch, bootstrapMailingDir } from "../setup";
import childProcess from "child_process";

jest.mock("../../../../util/log");

function mockPackageJsonVersionToMatch() {
  // mock the .mailing/package.json version
  jest
    .spyOn(fsExtra, "readFile")
    .mockImplementation(
      (path) =>
        new Promise((resolve) => resolve(Buffer.from(`{"version":"0.6.6"}`)))
    );

  // mock the npx mailing version
  jest.spyOn(childProcess, "execSync").mockImplementation(() => "0.6.6");
}

function mockReadFileToThrowErrno() {
  const fileNotFoundError = { code: "ENOENT" };

  jest.spyOn(fsExtra, "readFile").mockImplementation((path) => {
    throw fileNotFoundError;
  });
}

describe("packageJsonVersionsMatch", () => {
  it("should return false if .mailing package.json does not exist", async () => {
    mockReadFileToThrowErrno();

    const match = await packageJsonVersionsMatch();
    expect(match).toBe(false);
  });

  it("should return true if .mailing package.json matches the cli version", async () => {
    mockPackageJsonVersionToMatch();

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

describe("bootstrapMailingDir", () => {
  it("should rm, mkdir, and copy", async () => {
    mockReadFileToThrowErrno();

    const match = await packageJsonVersionsMatch();
    expect(match).toBe(false);

    // setup mocks for copy, rm, and mkdir
    const copyMock = jest.fn(() => true);
    jest.spyOn(fsExtra, "copy").mockImplementation(copyMock);

    const rmMock = jest.fn();
    jest.spyOn(fsExtra, "rm").mockImplementation(rmMock);

    const mkdirMock = jest.fn();
    jest.spyOn(fsExtra, "mkdir").mockImplementation(mkdirMock);

    // don't actually write a .gitignore while the test is running
    const writeFileMock = jest.fn();
    jest.spyOn(fsExtra, "writeFile").mockImplementation(writeFileMock);

    await bootstrapMailingDir();

    // copy preview directory to ./.mailing
    expect(copyMock).toHaveBeenCalledTimes(1);
    const copyCall: any[] = copyMock.mock.calls[0];
    expect(copyCall[0]).toMatch(
      new RegExp("/mailing/packages/cli/src/commands/preview")
    );
    expect(copyCall[1]).toBe("./.mailing");
    expect(copyCall[2].recursive).toBe(true);

    // rm -f ./.mailing
    expect(rmMock).toHaveBeenCalledTimes(1);
    const rmCall: any[] = rmMock.mock.calls[0];
    expect(rmCall[0]).toBe("./.mailing");
    expect(rmCall[1]).toEqual({ force: true, recursive: true });

    // mkdir ./.mailing
    expect(mkdirMock).toHaveBeenCalledTimes(1);
    const mkdirCall: any[] = mkdirMock.mock.calls[0];
    expect(mkdirCall[0]).toBe("./.mailing");
    expect(mkdirCall[1]).toEqual({ recursive: true });
  });

  it("should return early if packageJsonVersionsMatch is true", async () => {
    mockPackageJsonVersionToMatch();

    jest.spyOn(fsExtra, "copy").mockImplementation(jest.fn);

    await bootstrapMailingDir();
    expect(fsExtra.copy).not.toHaveBeenCalled();
  });
});
