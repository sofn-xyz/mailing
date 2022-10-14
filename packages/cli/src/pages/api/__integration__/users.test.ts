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
      let apiCreateUserReturn: any;

      beforeAll(async () => {
        apiCreateUserReturn = await apiCreateUser();
      });

      it("creates a user", async () => {
        expect(apiCreateUserReturn.response.status).toBe(201);
      });

      it("can login after creating a user", async () => {
        const { email, password } = apiCreateUserReturn;

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
