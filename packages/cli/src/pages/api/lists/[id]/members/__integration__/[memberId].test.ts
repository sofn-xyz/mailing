import { apiLogin } from "../../../../__integration__/util/login";
import {
  apiCreateList,
  apiGetListMembers,
  apiCreateListMember,
  apiPatchListMember,
  apiGetListMember,
} from "../../../../__integration__/util/lists";

describe("lists/[id]/members", () => {
  describe("not logged in", () => {
    it("GET /lists/noid/members should 404", async () => {
      const { response } = await apiGetListMembers("noid");
      expect(response.status).toBe(404);
    });
  });

  describe("logged in", () => {
    let listId: string | undefined;

    beforeAll(async () => {
      await apiLogin();

      // create a list
      const { response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);
      const data = await createListResponse.json();

      listId = data.list.id;
      expect(typeof listId).toBe("string");

      // create a list member
      const { response: createListMemberResponse } = await apiCreateListMember(
        listId
      );

      expect(createListMemberResponse.status).toBe(201);
    });

    it("should update the list members status", async () => {
      const memberId = "alex.farrill@gmail.com"; // fix me
      const { response: patchListMemberResponse } = await apiPatchListMember(
        listId,
        memberId,
        {
          status: "unsubscribed",
        }
      );

      expect(patchListMemberResponse.status).toBe(200);

      // check that the "status" field on member has been updated
      const { response: getListMemberResponse } = await apiGetListMember(
        listId,
        memberId
      );

      expect(getListMemberResponse.status).toBe(200);
      const data = await getListMemberResponse.json();
      expect(data.member.status).toBe("unsubscribed");
    });
  });
});
