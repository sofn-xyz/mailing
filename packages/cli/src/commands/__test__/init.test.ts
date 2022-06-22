import prompts from "prompts";
import { resolve } from "path";
import fsExtra, { copySync } from "fs-extra";
import { handler } from "../init";
import { log } from "../../log";
import { ArgumentsCamelCase } from "yargs";

jest.mock("fs-extra");
jest.mock("../../log");
jest.mock("../preview", () => ({ handler: jest.fn() }));

describe("init command", () => {
  beforeEach(() => {
    jest
      .spyOn(fsExtra, "readFileSync")
      .mockImplementation((path) =>
        /package\.json/.test(path.toString()) ? "{}" : ""
      );
  });
  it("it creates the ts emails directory", async () => {
    prompts.inject([true, "/tmp/src/emails"]);
    jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => /package\.json/.test(path.toString()));
    await handler({} as ArgumentsCamelCase<unknown>);
    expect(log).toHaveBeenCalledWith(
      "Generated your emails dir at /tmp/src/emails"
    );
    expect(copySync).toHaveBeenCalledTimes(1);
    expect(copySync).toHaveBeenCalledWith(
      resolve(__dirname, "../../generator_templates/ts/emails"),
      "/tmp/src/emails",
      { overwrite: false }
    );
  });

  it("it creates the js emails directory", async () => {
    prompts.inject([false, "/tmp/src/emails"]);
    jest
      .spyOn(fsExtra, "existsSync")
      .mockImplementation((path) => /package\.json/.test(path.toString()));
    await handler({} as ArgumentsCamelCase<unknown>);
    expect(log).toHaveBeenCalledWith(
      "Generated your emails dir at /tmp/src/emails"
    );
    expect(copySync).toHaveBeenCalledTimes(1);
    expect(copySync).toHaveBeenCalledWith(
      resolve(__dirname, "../../generator_templates/js/emails"),
      "/tmp/src/emails",
      { overwrite: false }
    );
  });

  it("it skips the emails directory if it already exists", async () => {
    prompts.inject(["/tmp/src/emails"]);
    jest.spyOn(fsExtra, "existsSync").mockImplementation(() => true);
    expect(fsExtra.existsSync("nothing")).toBe(true);
    await handler({} as ArgumentsCamelCase<unknown>);
    expect(copySync).toHaveBeenCalledTimes(0);
    expect(log).not.toHaveBeenCalledWith(
      "Generated your emails dir at /tmp/src/emails"
    );
  });
});
