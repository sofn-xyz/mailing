import { apiLogin } from "../../__integration__/util/login";
import { apiFetch } from "../../__integration__/util";

describe("api/apiKeys", () => {
  describe("logged out", () => {
    it("GET apiKeys should 404", async () => {
      const response = await apiFetch("/api/apiKeys");

      expect(response.status).toBe(404);
    });

    it("POST apiKeys should 404", async () => {
      const response = await apiFetch("/api/apiKeys", {
        method: "POST",
      });

      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    beforeAll(async () => {
      await apiLogin();
    });

    it("GET apiKeys should work", async () => {
      const res = await apiFetch("/api/apiKeys");

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.apiKeys.length).toBe(1);
    });

    it("POST apiKeys should work", async () => {
      const res = await apiFetch("/api/apiKeys", {
        method: "POST",
      });

      expect(res.status).toBe(201);

      const getRes = await apiFetch("/api/apiKeys");

      expect(getRes.status).toBe(200);
      const data = await getRes.json();
      expect(data.apiKeys.length).toBe(2);
    });
  });
});
