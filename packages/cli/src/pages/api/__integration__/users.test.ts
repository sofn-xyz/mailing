import { apiCreateUser, apiLogin } from "./apiUtil";

describe("users", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("create", () => {
    it("creates a user", async () => {
      await apiCreateUser();
    });

    it("can login after creating a user", async () => {
      const { email, password } = await apiCreateUser();
      await apiLogin(email, password);
    });
  });
});
