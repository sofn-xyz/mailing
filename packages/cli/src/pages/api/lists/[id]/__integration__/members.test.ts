import { apiLogin } from "../../../__integration__/util/login";
import {
  apiCreateList,
  apiGetListMembers,
} from "../../../__integration__/util/lists";

describe("lists/[id]/members", () => {
  describe("not logged in", () => {
    it("GET /lists/noid/members should 404", async () => {
      const { response } = await apiGetListMembers("noid");
      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    beforeAll(async () => {
      await apiLogin();
    });

    it("POST /lists should 201 and then GET /lists should 200 and include the list", async () => {
      const { response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);
      const data = await createListResponse.json();

      const listId = data.list.id;
      expect(typeof listId).toBe("string");

      const { response: listMembersResponse } = await apiGetListMembers(listId);
      expect(listMembersResponse.status).toBe(200);
    });
  });
});
