import prompts from "prompts";
import fsExtra, { removeSync } from "fs-extra";
import { handler, InitArguments } from "../init";
import { log } from "../../util/log";

jest.useFakeTimers();
jest.mock("../../util/log");
jest.mock("../preview/preview", () => ({ handler: jest.fn() }));

describe("init command", () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
      `generated your emails dir at /tmp/src/emails:
emails
├── AccountCreated.tsx
├── NewSignIn.tsx
├── Reservation.tsx
├── ResetPassword.tsx
├── components
│   ├── BulletedList.tsx
│   ├── ButtonPrimary.tsx
│   ├── Footer.tsx
│   ├── Head.tsx
│   ├── Header.tsx
│   └── theme.ts
├── index.ts
└── previews
    ├── AccountCreated.tsx
    ├── NewSignIn.tsx
    ├── Reservation.tsx
    └── ResetPassword.tsx`
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
├── AccountCreated.jsx
├── NewSignIn.jsx
├── Reservation.jsx
├── ResetPassword.jsx
├── components
│   ├── BulletedList.jsx
│   ├── ButtonPrimary.jsx
│   ├── Footer.jsx
│   ├── Head.jsx
│   ├── Header.jsx
│   └── theme.js
├── index.js
└── previews
    ├── AccountCreated.jsx
    ├── NewSignIn.jsx
    ├── Reservation.jsx
    └── ResetPassword.jsx`
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
