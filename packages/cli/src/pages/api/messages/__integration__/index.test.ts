import { apiCreateMessage } from "../../__integration__/util/messages/create";

describe("messages", () => {
  it("creates a message", async () => {
    const { response } = await apiCreateMessage();
    const resJson = await response.json();
    expect(resJson.message?.id).toBeTruthy();
  });
});
