import fsExtra from "fs-extra";
import {
  packageJsonVersionsMatch,
  bootstrapMailingDir,
  COMPONENT_FILE_REGEXP,
} from "../setup";
import childProcess from "child_process";

jest.mock("../../../../util/log");

function mockPackageJsonVersionToMatch() {
  // mock the .mailing/package.json version
  jest
    .spyOn(fsExtra, "readJSONSync")
    .mockImplementation(() => ({ version: "0.6.6" }));

  // mock the npx mailing version
  jest.spyOn(childProcess, "execSync").mockImplementation(() => "0.6.6");
}

function mockReadJSONSyncToThrowErrno() {
  const fileNotFoundError = { code: "ENOENT" };
  jest.spyOn(fsExtra, "readJSONSync").mockImplementation((path) => {
    throw fileNotFoundError;
  });
}

describe("setup", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("packageJsonVersionsMatch", () => {
    it("should return false if .mailing package.json does not exist", async () => {
      mockReadJSONSyncToThrowErrno();
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
        .spyOn(fsExtra, "readJSONSync")
        .mockImplementation(() => ({ version: "1.2.3" }));

      // mock the npx mailing version
      jest.spyOn(childProcess, "execSync").mockImplementation(() => "4.5.6");

      const match = await packageJsonVersionsMatch();
      expect(match).toBe(false);
    });
  });

  describe("bootstrapMailingDir", () => {
    it("should rm, mkdir, and copy", async () => {
      mockReadJSONSyncToThrowErrno();

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
      expect(rmMock).toHaveBeenCalledTimes(2);
      const rmDotMailingCall: any[] = rmMock.mock.calls[0];
      expect(rmDotMailingCall[0]).toBe("./.mailing");
      expect(rmDotMailingCall[1]).toEqual({ force: true, recursive: true });

      // rm -f ./.mailing/src/emails
      const rmDotMailingSrcEmailsCall: any[] = rmMock.mock.calls[1];
      expect(rmDotMailingSrcEmailsCall[0]).toBe("./.mailing/src/emails");
      expect(rmDotMailingCall[1]).toEqual({ force: true, recursive: true });

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

  describe("SOURCE_FILE_REGEXP", () => {
    it("should match jsx and tsx without matching js and ts files", () => {
      expect(COMPONENT_FILE_REGEXP.test("file.ts")).toBe(false);
      expect(COMPONENT_FILE_REGEXP.test("file.js")).toBe(false);
      expect(COMPONENT_FILE_REGEXP.test("file.tsx")).toBe(true);
      expect(COMPONENT_FILE_REGEXP.test("file.jsx")).toBe(true);
      expect(COMPONENT_FILE_REGEXP.test("bad file name.jsx")).toBe(false);
      expect(COMPONENT_FILE_REGEXP.test("bad file name.tsx")).toBe(false);
    });
  });
});
