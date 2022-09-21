import execCli from "./util/execCli";

describe("server command", () => {
  it("runs build", async () => {
    // expect it not to raise an error
    await execCli("server build");
  });
});
