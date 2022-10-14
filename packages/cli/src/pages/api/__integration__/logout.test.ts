import { apiFetch, apiLogin } from "./apiIntegrationTestUtil";

describe("logout", () => {
  describe("logged out", () => {
    it("does nothing", async () => {
      const apiKeysResLoggedOut = await apiFetch("/api/apiKeys");
      expect(apiKeysResLoggedOut.status).toBe(404);

      const logoutRes = await apiFetch("/api/logout");
      expect(logoutRes.status).toBe(200);
    });
  });

  describe("logged in", () => {
    it("logs out", async () => {
      await apiLogin();

      const apiKeysRes = await apiFetch("/api/apiKeys");
      expect(apiKeysRes.status).toBe(200);

      const logoutRes = await apiFetch("/api/logout");
      expect(logoutRes.status).toBe(200);

      const apiKeysResLoggedOut = await apiFetch("/api/apiKeys");
      expect(apiKeysResLoggedOut.status).toBe(404);
    });
  });
});
