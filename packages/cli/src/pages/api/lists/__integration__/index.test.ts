import { apiGetLists } from "../../__integration__/util/lists";

describe("lists", () => {
  describe("GET /lists", () => {
    it("should 404 if not logged in", async () => {
      const { response } = await apiGetLists();
      expect(response.status).toBe(404);
    });
  });
});
