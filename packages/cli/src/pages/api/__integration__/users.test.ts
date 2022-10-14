import { apiCreateUser, apiLoginAs } from "../apiIntegrationTestUtil";
import prisma from "../../../../prisma";

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

        await apiLoginAs(email, password);
      });
    });

    describe("failure states", () => {
      beforeEach(async () => {
        await prisma.user.deleteMany({});
      });
      it("doesn't create a user with an invalid email address", async () => {
        const { response } = await apiCreateUser("invalid");
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toBe("email is invalid");
      });

      it("only supports one user for now", async () => {
        await apiCreateUser();
        const { response } = await apiCreateUser();
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toBe("mailing only supports one user for now");
      });

      it("require minimum password length", async () => {
        const { response } = await apiCreateUser("ok@ok.com", "pass");
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toBe("password should be at least 8 characters");
      });
    });
  });
});
