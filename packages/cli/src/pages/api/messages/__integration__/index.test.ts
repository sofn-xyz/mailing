import { createOrganizationDefaultListAndApiKey } from "../../__integration__/util/createOrganizationDefaultListAndApiKey";
import { apiCreateDefaultListMember } from "../../__integration__/util/listMember";
import {
  ApiCreateMessage,
  apiCreateMessage,
} from "../../__integration__/util/messages/create";
import { apiUnsubscribe } from "../../__integration__/util/unsubscribe";

describe("messages", () => {
  let apiKey: string;

  beforeAll(async () => {
    apiKey = (await createOrganizationDefaultListAndApiKey()).apiKey.id;
  });

  it("creates a message", async () => {
    const { response } = await apiCreateMessage(apiKey);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.message?.id).toBeTruthy();
  });

  it("returns error json if apiKey is missing", async () => {
    const instance = new ApiCreateMessage();
    const { response } = await instance.perform();

    expect(response.status).toEqual(422);
    const json = await response.json();
    expect("error" in json).toBe(true);
    expect(json.error).toBe("expected x-api-key in header or apiKey in query");
  });

  it("returns error json if apiKey is invalid", async () => {
    const instance = new ApiCreateMessage({ apiKey: "invalid" });
    const { response } = await instance.perform();

    expect(response.status).toEqual(401);
    const json = await response.json();
    expect("error" in json).toBe(true);
    expect(json.error).toBe("API key is not valid");
  });

  it("returns 200 with error json if no list is specified and user is unsubscribed from the defaultList", async () => {
    const instance = new ApiCreateMessage({ apiKey });
    const email = instance.formData?.to;
    expect(email).toBeTruthy();

    // subscribe the email to the default list
    const { response: createDefaultListMemberResponse } =
      await apiCreateDefaultListMember(email);

    const {
      member: { id: memberId },
    } = await createDefaultListMemberResponse.json();

    // unsubscribe the email from the default list
    const { response: unsubscribeResponse } = await apiUnsubscribe(memberId, {
      data: { [memberId]: { status: "unsubscribed" } },
    });

    expect(unsubscribeResponse.status).toEqual(200);

    const { response: apiCreateMessageResponse } = await instance.perform();

    const json = await apiCreateMessageResponse.json();
    expect("error" in json).toBe(true);
    expect(json.error).toBe("user is not subscribed to either list");
  });
});
