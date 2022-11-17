import { apiLogin } from "../../../__integration__/util/login";
import { apiCreateList } from "../../../__integration__/util/lists";
import {
  apiGetListMembers,
  apiCreateListMember,
} from "../../../__integration__/util/listMember";

describe("lists/[id]/members", () => {
  describe("not logged in", () => {
    it("GET /lists/noid/members should 404", async () => {
      const { response } = await apiGetListMembers("noid");
      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    let listId: string;

    beforeAll(async () => {
      await apiLogin();

      // create list
      const { response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);
      const data = await createListResponse.json();

      listId = data.list.id;
      expect(typeof listId).toBe("string");
    });

    it("creates a list member, and then lists the list members", async () => {
      // create a list member
      const { response: createListMemberResponse } = await apiCreateListMember(
        listId
      );

      expect(createListMemberResponse.status).toBe(201);

      // get list members
      const { response: listMembersResponse } = await apiGetListMembers(listId);
      expect(listMembersResponse.status).toBe(200);
    });

    it("should 422 when creating a list member with invalid email", async () => {
      const { response: createListMemberResponse } = await apiCreateListMember(
        listId,
        {
          email: "",
          status: "subscribed",
        }
      );

      expect(createListMemberResponse.status).toBe(422);

      const { response: createListMemberResponse2 } = await apiCreateListMember(
        listId,
        {
          email: "invalid",
          status: "subscribed",
        }
      );

      expect(createListMemberResponse2.status).toBe(422);
    });

    it("should 422 when creating a list member with invalid status", async () => {
      const { response: createListMemberResponse } = await apiCreateListMember(
        listId,
        {
          email: "alex.farrill@gmail.com",
          status: "made-this-up",
        }
      );

      expect(createListMemberResponse.status).toBe(422);
    });
  });
});
