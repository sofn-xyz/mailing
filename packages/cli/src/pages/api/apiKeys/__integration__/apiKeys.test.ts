import {
  apiCreateUser,
  apiLogin,
  cliUrl,
  apiFetch,
} from "../../apiIntegrationTestUtil";

describe("api/apiKeys", () => {
  describe("logged out", () => {
    it("GET apiKeys should 404", async () => {
      const response = await fetch(cliUrl("/api/apiKeys"), {
        method: "GET",
      });

      expect(response.status).toBe(404);
    });

    it("POST apiKeys should 404", async () => {
      const response = await fetch(cliUrl("/api/apiKeys"), {
        method: "POST",
      });

      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    beforeAll(async () => {
      const apiCreateUserReturn = await apiCreateUser();
      expect(apiCreateUserReturn.response.status).toBe(201);

      const { email, password } = apiCreateUserReturn;

      const apiLoginResponse = await apiLogin(email, password);
      expect(apiLoginResponse.status).toBe(201);
    });

    it("GET apiKeys should work", async () => {});
    it("POST apiKeys should work", async () => {
      const response = await apiFetch("/api/apiKeys", {
        method: "POST",
      });

      expect(response.status).toBe(201);
    });
  });
});
