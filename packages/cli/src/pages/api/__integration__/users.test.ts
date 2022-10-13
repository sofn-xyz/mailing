import { apiCreateUser, apiLogin } from "../apiIntegrationTestUtil";

describe("users", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("create", () => {
    describe("success states", () => {
      it("creates a user", async () => {
        const { response } = await apiCreateUser();
        expect(response.status).toBe(201);
      });

      it("can login after creating a user", async () => {
        const { email, password, response } = await apiCreateUser();
        expect(response.status).toBe(201);

        await apiLogin(email, password);
      });
    });

    describe("failure states", () => {
      it("doesn't create a user with an invalid email address", async () => {
        const { response } = await apiCreateUser("invalid");
        expect(response.status).toBe(400);
      });
    });
  });
});
