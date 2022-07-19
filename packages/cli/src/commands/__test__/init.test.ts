import prompts from "prompts";
import { resolve } from "path";
import fsExtra, { removeSync, existsSync } from "fs-extra";
import { handler } from "../init";
import { log } from "../../log";
import { ArgumentsCamelCase } from "yargs";

jest.mock("../../log");
jest.mock("../preview", () => ({ handler: jest.fn() }));

describe("init command", () => {
  beforeEach(() => {
    jest
      .spyOn(fsExtra, "readFileSync")
      .mockImplementation((path) =>
        /package\.json/.test(path.toString()) ? "{}" : ""
      );
    removeSync("/tmp/src/emails");
  });
  it("creates the ts emails directory", async () => {
    prompts.inject(["/tmp/src/emails"]);
    jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => /package\.json/.test(path.toString()));
    await handler({} as ArgumentsCamelCase<unknown>);
    expect(log).toHaveBeenCalledWith(
      `Generated your emails dir at /tmp/src/emails:
emails
├── TextEmail.tsx
├── Welcome.tsx
├── components
│   ├── BulletedList.tsx
│   ├── ButtonPrimary.tsx
│   ├── Footer.tsx
│   ├── Head.tsx
│   └── Header.tsx
├── index.ts
└── previews
    ├── TextEmail.tsx
    └── Welcome.tsx`
    );
  });

  it("skips the emails directory if it already exists", async () => {
    prompts.inject(["/tmp/src/emails"]);
    const spy = jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation(() => true);
    expect(fsExtra.existsSync("nothing")).toBe(true);
    await handler({} as ArgumentsCamelCase<unknown>);
    jest.restoreAllMocks();
    expect(fsExtra.existsSync("/tmp/src/emails")).toBe(false);
  });
});
