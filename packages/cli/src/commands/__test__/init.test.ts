import prompts from "prompts";
import fsExtra, { removeSync } from "fs-extra";
import { handler, InitArguments } from "../init";
import { log } from "../../util/serverLogger";

jest.mock("../../util/serverLogger");
jest.mock("../preview/preview", () => ({ handler: jest.fn() }));

describe("init command", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest
      .spyOn(fsExtra, "readFileSync")
      .mockImplementation((path) =>
        /package\.json/.test(path.toString()) ? "{}" : ""
      );
  });

  afterEach(() => {
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
      `generated your emails dir at /tmp/src/emails:
emails
├── Welcome.tsx
├── components
│   ├── BaseLayout.tsx
│   ├── Button.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Heading.tsx
│   ├── Link.tsx
│   └── Text.tsx
├── index.ts
├── previews
│   └── Welcome.tsx
└── theme.ts`
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
      `generated your emails dir at /tmp/src/emails:
emails
├── Welcome.jsx
├── components
│   ├── BaseLayout.jsx
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Heading.jsx
│   ├── Link.jsx
│   └── Text.jsx
├── index.js
├── previews
│   └── Welcome.jsx
└── theme.js`
    );
  });

  it("skips the emails directory if it already exists", async () => {
    jest.spyOn(fsExtra, "existsSync").mockImplementation(() => true);
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
