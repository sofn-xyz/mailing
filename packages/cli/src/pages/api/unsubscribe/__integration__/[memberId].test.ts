import prisma from "../../../../../prisma";
import { apiListSubscribe } from "../../__integration__/util/listMember";
import { apiCreateList } from "../../__integration__/util/lists";
import { apiLogin } from "../../__integration__/util/login";
import { apiLogout } from "../../__integration__/util/logout";
import {
  apiUnsubscribe,
  ApiUnsubscribe,
} from "../../__integration__/util/unsubscribe";

describe("/api/unsubscribe/[memberId]", () => {
  it("should 404 if a GET or POST is sent to /api/unsubscribe/[memberId]", async () => {
    const instance = new ApiUnsubscribe();
    instance.path = "/api/unsubscribe/123";
    instance.method = "GET";
    const { response } = await instance.perform();
    expect(response.status).toEqual(404);
  });

  describe("with a list", () => {
    let listId: string;

    beforeAll(async () => {
      await apiLogin();

      // create list
      const { response: createListResponse } = await apiCreateList();
      expect(createListResponse.status).toBe(201);
      const data = await createListResponse.json();

      listId = data.list.id;
      expect(typeof listId).toBe("string");

      await apiLogout();
    });

    it("should 200 if it removes an email", async () => {
      const email = "test@test.com";

      // subscribe email
      const { response: subscribeResponse } = await apiListSubscribe(listId, {
        email,
      });
      expect(subscribeResponse.status).toBe(201);

      const member = await prisma.member.findUnique({
        where: {
          listId_email: { listId, email },
        },
      });

      if (!member) {
        expect(member).not.toBeNull();
      } else {
        // unsubscribe the same email
        const { response: unsubscribeResponse } = await apiUnsubscribe(
          member.id,
          { data: { [member.id]: { status: "unsubscribed" as const } } }
        );
        expect(unsubscribeResponse.status).toBe(200);
      }
    });
  });
});
