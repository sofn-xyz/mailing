import prompts from "prompts";
import fsExtra, { removeSync } from "fs-extra";
import { handler, InitArguments } from "../init";
import { log } from "../../log";

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
    prompts.inject(["pete22r@cam11psh.com"]);
    jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => /package\.json/.test(path.toString()));
    await handler({
      emailsDir: "/tmp/src/emails",
      typescript: true,
      port: 3883,
      quiet: false,
    } as InitArguments);
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
│   ├── Header.tsx
│   └── theme.ts
├── index.ts
└── previews
    ├── TextEmail.tsx
    └── Welcome.tsx`
    );
  });

  it("creates the js emails directory", async () => {
    jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => /package\.json/.test(path.toString()));

    await handler({
      emailsDir: "/tmp/src/emails",
      typescript: false,
      port: 3883,
      quiet: true,
    } as InitArguments);
    expect(log).toHaveBeenCalledWith(
      `Generated your emails dir at /tmp/src/emails:
emails
├── TextEmail.jsx
├── Welcome.jsx
├── components
│   ├── BulletedList.jsx
│   ├── ButtonPrimary.jsx
│   ├── Footer.jsx
│   ├── Head.jsx
│   ├── Header.jsx
│   └── theme.js
├── index.js
└── previews
    ├── TextEmail.jsx
    └── Welcome.jsx`
    );
  });

  it("skips the emails directory if it already exists", async () => {
    const spy = jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation(() => true);
    expect(fsExtra.existsSync("nothing")).toBe(true);
    await handler({
      emailsDir: "./emails",
      typescript: true,
      port: 3883,
      quiet: true,
    } as InitArguments);
    jest.restoreAllMocks();
    expect(fsExtra.existsSync("/tmp/src/emails")).toBe(false);
  });
});
