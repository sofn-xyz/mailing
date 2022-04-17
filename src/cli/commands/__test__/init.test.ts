import prompts from "prompts";
import { resolve } from "path";
import fs from "fs";
import { cp } from "fs/promises";
import { handler } from "../init";

jest.mock('fs', () => {
  const originalModule = jest.requireActual('fs');
  return {
    __esModule: true,
    default: originalModule,
    ...originalModule,
  };
});
jest.mock("fs/promises");
jest.mock("../preview");

describe("init command", () => {
  it("it creates the emails directory", async () => {
    prompts.inject(["/tmp/src/emails"]);
    await handler();
    expect(console.log).toHaveBeenCalledWith(
      "Generated your emails dir at /tmp/src/emails"
    );
    expect(cp).toHaveBeenCalledTimes(1);
    expect(cp).toHaveBeenCalledWith(
      resolve(__dirname, "../../init_template/emails"),
      "/tmp/src/emails",
      { recursive: true }
    );
  });

  it("it skips the emails directory if it already exists", async () => {
    prompts.inject(["/tmp/src/emails"]);
    jest.spyOn(fs, "existsSync").mockImplementation(() => true);
    expect(fs.existsSync("nothing")).toBe(true);
    await handler();
    expect(cp).toHaveBeenCalledTimes(0);
    expect(console.log).not.toHaveBeenCalledWith(
      "Generated your emails dir at /tmp/src/emails"
    );
  });
});
