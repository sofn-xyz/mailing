import prompts from "prompts";
import fsExtra, { removeSync } from "fs-extra";
import { handler, InitArguments } from "../init";
import { log } from "../../util/log";
import { execCli } from "./execCli";

// jest.useFakeTimers();
jest.mock("../../util/log");

describe("init command", () => {
  it("runs deploy", async () => {
    await expect(async () => {
      await execCli("deploy");
    }).rejects.toThrowError(
      /Error: No existing credentials found\. Please run `vercel login`/
    );
  });
});
