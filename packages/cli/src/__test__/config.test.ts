import fs from "fs";
import { log } from "../log";
import fsExtra, { removeSync, existsSync } from "fs-extra";
import { writeDefaultConfigFile } from "../config";
// import { ArgumentsCamelCase } from "yargs";
// import { handler, InitArguments } from "../init";

// jest.mock("../../log");
// jest.mock("../preview", () => ({ handler: jest.fn() }));

describe("writeDefaultConfigFile", () => {
  beforeEach(() => {
    // const mockwfs = jest
    //   .spyOn(fs, "writeFileSync")
    //   .mockImplementation((configFile, jsonString) => false);
    // removeSync("/tmp/src/emails");
  });

  //   it("creates the ts emails directory", async () => {
  //     jest
  //       .spyOn(fsExtra, "existsSync")
  //       .mockImplementation((path) => /package\.json/.test(path.toString()));
  //     await handler({
  //       emailsDir: "/tmp/src/emails",
  //       typescript: true,
  //       port: 3883,
  //       quiet: true,
  //     } as InitArguments);
  //     expect(log).toHaveBeenCalledWith(
  //       `Generated your emails dir at /tmp/src/emails:
  // emails
  // ├── TextEmail.tsx
  // ├── Welcome.tsx
  // ├── components
  // │   ├── BulletedList.tsx
  // │   ├── ButtonPrimary.tsx
  // │   ├── Footer.tsx
  // │   ├── Head.tsx
  // │   ├── Header.tsx
  // │   └── theme.ts
  // ├── index.ts
  // └── previews
  //     ├── TextEmail.tsx
  //     └── Welcome.tsx`
  //     );
  //   });

  it("writes mailing.config.json if it doesn't exist", () => {
    const defaultJsonString = `{
      "typescript": true,
      "emailsDir": "./emails",
      "outDir": "./previews_html"
    }
    `;

    jest.spyOn(fsExtra, "existsSync").mockImplementation((path) => false);

    const mockWriteFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((configFile, jsonString) => false);

    writeDefaultConfigFile();
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      "./mailing.config.json",
      defaultJsonString
    );
  });

  it("does not writes mailing.config.json if it exists", () => {
    // config file exists
    jest.spyOn(fsExtra, "existsSync").mockImplementation((path) => true);

    const mockWriteFileSync = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((configFile, jsonString) => false);

    writeDefaultConfigFile();
    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });

  //   it("creates the js emails directory", async () => {
  //     jest
  //       .spyOn(fsExtra, "existsSync")
  //       .mockImplementation((path) => /package\.json/.test(path.toString()));
  //     await handler({
  //       emailsDir: "/tmp/src/emails",
  //       typescript: false,
  //       port: 3883,
  //       quiet: true,
  //     } as InitArguments);
  //     expect(log).toHaveBeenCalledWith(
  //       `Generated your emails dir at /tmp/src/emails:
  // emails
  // ├── TextEmail.jsx
  // ├── Welcome.jsx
  // ├── components
  // │   ├── BulletedList.jsx
  // │   ├── ButtonPrimary.jsx
  // │   ├── Footer.jsx
  // │   ├── Head.jsx
  // │   ├── Header.jsx
  // │   └── theme.js
  // ├── index.js
  // └── previews
  //     ├── TextEmail.jsx
  //     └── Welcome.jsx`
  //     );
  //   });
  // it("skips the emails directory if it already exists", async () => {
  //   const spy = jest
  //     .spyOn(fsExtra, "existsSync")
  //     .mockImplementation(() => true);
  //   expect(fsExtra.existsSync("nothing")).toBe(true);
  //   await handler({
  //     emailsDir: "./emails",
  //     typescript: true,
  //     port: 3883,
  //     quiet: true,
  //   } as InitArguments);
  //   jest.restoreAllMocks();
  //   expect(fsExtra.existsSync("/tmp/src/emails")).toBe(false);
  // });
});
