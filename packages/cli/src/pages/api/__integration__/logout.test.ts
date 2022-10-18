import { apiGetApiKeys } from "./util/apiKeys";
import { apiLogin } from "./util/login";
import { apiLogout } from "./util/logout";

describe("logout", () => {
  describe("logged out", () => {
    it("does nothing", async () => {
      const { response: apiKeysResLoggedOut } = await apiGetApiKeys();
      expect(apiKeysResLoggedOut.status).toBe(404);
      const { response: logoutRes } = await apiLogout();
      expect(logoutRes.status).toBe(200);
    });
  });

  describe("logged in", () => {
    it("logs out", async () => {
      await apiLogin();
      const { response: apiKeysRes } = await apiGetApiKeys();
      expect(apiKeysRes.status).toBe(200);
      const { response: logoutRes } = await apiLogout();
      expect(logoutRes.status).toBe(200);
      const { response: apiKeysResLoggedOut } = await apiGetApiKeys();
      expect(apiKeysResLoggedOut.status).toBe(404);
    });
  });
});
