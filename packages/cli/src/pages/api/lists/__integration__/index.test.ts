import { apiGetLists } from "../../__integration__/util/lists";
import { apiLogin } from "../../__integration__/util/login";

describe("lists", () => {
  describe("not logged in", () => {
    it("GET /lists should 404", async () => {
      const { response } = await apiGetLists();
      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    beforeAll(async () => {
      await apiLogin();
    });

    it("GET /lists should 200 with a blank array of lists", async () => {
      const { response } = await apiGetLists();
      expect(response.status).toBe(200);
    });
  });
});
