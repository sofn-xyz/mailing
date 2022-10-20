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
    let memberId: string | undefined;

    beforeAll(async () => {
      await apiLogin();

      // create a list
      const { response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);
      const data = await createListResponse.json();

      listId = data.list.id;
      expect(typeof listId).toBe("string");

      // create a list member
      const { formData, response: createListMemberResponse } =
        await apiCreateListMember(listId);

      memberId = formData.email;
      expect(memberId).toBeDefined();

      expect(createListMemberResponse.status).toBe(201);
    });

    it("should update the list members status", async () => {
      // check that the initial state of the "status" field on member is "pending"
      const { response: getInitialListMemberResponse } = await apiGetListMember(
        listId,
        memberId
      );

      expect(getInitialListMemberResponse.status).toBe(200);
      const initialData = await getInitialListMemberResponse.json();
      expect(initialData.member.status).toBe("pending");

      // PATCH it to be "unsubscribed"
      const { response: patchListMemberResponse } = await apiPatchListMember(
        listId,
        memberId,
        {
          status: "unsubscribed",
        }
      );

      expect(patchListMemberResponse.status).toBe(200);

      // check that the "status" field on member has been updated to "unsubscribed"
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
