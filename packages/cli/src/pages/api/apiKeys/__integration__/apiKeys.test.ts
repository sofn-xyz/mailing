import {
  apiGetApiKeys,
  apiCreateApiKey,
} from "../../__integration__/util/apiKeys";
import { apiLogin } from "../../__integration__/util/login";

describe("api/apiKeys", () => {
  describe("logged out", () => {
    it("GET apiKeys should 404", async () => {
      const { response } = await apiGetApiKeys();
      expect(response.status).toBe(404);
    });

    it("POST apiKeys should 404", async () => {
      const { response } = await apiCreateApiKey();
      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    beforeAll(async () => {
      await apiLogin();
    });

    it("GET apiKeys should work", async () => {
      const { response } = await apiGetApiKeys();
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.apiKeys.length).toBe(1);
    });

    it("POST apiKeys should work", async () => {
      const { response: createResponse } = await apiCreateApiKey();
      expect(createResponse.status).toBe(201);
      const { response: getResponse } = await apiGetApiKeys();
      expect(getResponse.status).toBe(200);

      const data = await getResponse.json();

      // one is created by default when your user is created
      expect(data.apiKeys.length).toBe(2);
    });
  });
});
