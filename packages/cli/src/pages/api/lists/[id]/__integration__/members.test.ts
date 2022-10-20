import { apiLogin } from "../../../__integration__/util/login";
import {
  apiCreateList,
  apiGetListMembers,
  apiCreateListMember,
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

    it("creates a list, creates a member, and then lists the list members", async () => {
      // create list
      const { response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);
      const data = await createListResponse.json();

      const listId = data.list.id;
      expect(typeof listId).toBe("string");

      // create a list member
      const { response: createListMemberResponse } = await apiCreateListMember(
        listId,
        {
          email: "alex.farrill@gmail.com",
          status: "pending",
        }
      );

      expect(createListMemberResponse.status).toBe(201);

      // get list members
      const { response: listMembersResponse } = await apiGetListMembers(listId);
      expect(listMembersResponse.status).toBe(200);
    });

    it("should 422 when creating a list member with invalid options", () => {
      expect("implement me").toBe(true);
    });
  });
});
