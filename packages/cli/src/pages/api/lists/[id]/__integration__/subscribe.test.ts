import { apiLogin } from "../../../__integration__/util/login";
import { apiCreateList } from "../../../__integration__/util/lists";
import { apiListSubscribe } from "../../../__integration__/util/listMember";
import { apiLogout } from "../../../__integration__/util/logout";
import prisma from "../../../../../../prisma";

describe("lists/[id]/subscribe", () => {
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

  it("subscribes an email to a list", async () => {
    const { response: subscribeResponse, formData } = await apiListSubscribe(
      listId
    );
    expect(subscribeResponse.status).toBe(201);

    const count = await prisma.member.count({
      where: { listId, email: formData.email },
    });

    expect(count).toBe(1);
  });

  it("should 422 when trying to subscribe with an invalid email", async () => {
    const { response: subscribeResponse } = await apiListSubscribe(listId, {
      email: "",
    });
    expect(subscribeResponse.status).toBe(422);

    const { response: subscribeResponse2 } = await apiListSubscribe(listId, {
      email: "invalid",
    });
    expect(subscribeResponse2.status).toBe(422);

    const { response: subscribeResponse3 } = await apiListSubscribe(listId, {
      email: "@gmail.com",
    });
    expect(subscribeResponse3.status).toBe(422);

    const { response: subscribeResponse4 } = await apiListSubscribe(listId, {
      email: "invalid@",
    });
    expect(subscribeResponse4.status).toBe(422);
  });

  it("should 422 for an email that is already subscribed", async () => {
    const { response: subscribeResponse } = await apiListSubscribe(listId, {
      email: "dupe@dupe.com",
    });
    expect(subscribeResponse.status).toBe(201);

    const { response: subscribeResponse2 } = await apiListSubscribe(listId, {
      email: "dupe@dupe.com",
    });
    expect(subscribeResponse2.status).toBe(422);
  });

  it("it should 422 for now when attempting to re-subscribe an unsubscribed user", async () => {
    const email = "something@new.com";
    const { response: subscribeResponse } = await apiListSubscribe(listId, {
      email,
    });
    expect(subscribeResponse.status).toBe(201);

    await prisma.member.update({
      where: { listId_email: { listId, email } },
      data: { status: "unsubscribed" },
    });

    const { response: subscribeResponse2 } = await apiListSubscribe(listId, {
      email,
    });
    expect(subscribeResponse2.status).toBe(422);
  });
});
