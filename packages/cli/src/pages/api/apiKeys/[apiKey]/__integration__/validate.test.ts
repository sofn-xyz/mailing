import { cliUrl } from "../../../__integration__/util";
import fetch from "node-fetch";
import { createApiKey } from "../../../__integration__/util/apiKeys";

describe("validate", () => {
  function constructFetch(apiKey: string) {
    return fetch(cliUrl(`/api/apiKeys/${apiKey}/validate`), {
      headers: { "Content-Type": "application/json" },
    });
  }

  it("errors with invalid API key", async () => {
    const response = await constructFetch("my-invalid-api-key");
    expect(response.status).toBe(401);
  });

  it("succeeds with valid API key", async () => {
    const k = await createApiKey();
    const response = await constructFetch(k.id);
    expect(response.status).toBe(200);
  });
});
