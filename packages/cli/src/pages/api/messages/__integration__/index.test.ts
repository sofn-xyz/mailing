import { apiCreateMessage } from "../../__integration__/util/createMessage";
import { createApiKey } from "../../__integration__/util/apiKeys";

describe("messages", () => {
  it("does nothing", async () => {
    await createApiKey();
    const { response } = await apiCreateMessage();
    console.log(response);
  });
});
