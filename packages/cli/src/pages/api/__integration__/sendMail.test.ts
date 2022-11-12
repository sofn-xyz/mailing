import { apiLogin } from "./util/login";
import { apiGetApiKeys } from "./util/apiKeys";
import { apiSendMail, ApiSendMail } from "./util/sendMail";
import prisma from "../../../../prisma";
import { apiGetLists } from "./util/lists";
import type { List } from "../../../../prisma/generated/client";
import { truncateCliTables } from "./util/truncateCliTables";

describe("sendMail", () => {
  let defaultListId: string;

  beforeAll(async () => {
    await apiLogin();

    const { response: getListsResponse } = await apiGetLists();
    defaultListId = (await getListsResponse.json()).lists.find(
      (list: Partial<List>) => list.isDefault
    )?.id;
    expect(typeof defaultListId).toBe("string");
  });

  describe("with the valid api key in the db, without using the magic MAILING_API_KEY", () => {
    let apiKey: string;
    const OG_MAILING_API_URL = process.env.MAILING_API_URL;
    const OG_MAILING_API_KEY = process.env.MAILING_API_KEY;

    beforeAll(async () => {
      // a valid api key was created
      const { response: apiKeysResponse } = await apiGetApiKeys();
      expect(apiKeysResponse.status).toBe(200);
      const apiKeys = (await apiKeysResponse.json()).apiKeys;
      expect(apiKeys.length).toBe(1);
      apiKey = apiKeys[0].id;

      delete process.env.MAILING_API_URL;
      delete process.env.MAILING_API_KEY;
    });

    afterAll(() => {
      process.env.MAILING_API_URL = OG_MAILING_API_URL;
      process.env.MAILING_API_KEY = OG_MAILING_API_KEY;
    });

    it("should 200 with a valid apiKey", async () => {
      const { response: sendMailResponse } = await apiSendMail(apiKey);
      expect(sendMailResponse.status).toBe(200);
    });

    it("should 422 if no api key is provided", async () => {
      const { response: sendMailResponseWithMissingApiKey } = await apiSendMail(
        undefined
      );
      expect(sendMailResponseWithMissingApiKey.status).toBe(422);
    });

    it("should 401 if the provided api key is invalid", async () => {
      const { response: sendMailResponseWithBadApiKey } = await apiSendMail(
        "fake"
      );
      expect(sendMailResponseWithBadApiKey.status).toBe(401);
    });
  });

  describe("with analytics enabled, using magic 'testApiKey'", () => {
    beforeAll(() => {
      // these are setup in the yarn command "integration:servers:start" and the tests assume they are setup like this
      expect(process.env.MAILING_API_URL).toBe("http://localhost:3883");
      // testApiKey is a magic string that bypasses the api key check when MAILING_CI is set to true
      expect(process.env.MAILING_API_KEY).toBe("testApiKey");
    });

    describe("sending to the default list", () => {
      beforeEach(() => {
        // delete all members and messages
        truncateCliTables(["Member", "Message"]);
      });

      it("should 200", async () => {
        const email = "testDefaultList@test.com";
        const { response: sendMailResponse } = await apiSendMail("testApiKey", {
          ...ApiSendMail.defaultFormData,
          email,
          listName: "default",
          dangerouslyForceDeliver: true,
        });
        expect(sendMailResponse.status).toBe(200);

        expect(await sendMailResponse.json()).toEqual({ result: "delivered!" });

        // it should have created a message object
        // const messages = await prisma.message.findMany({});
        // expect(messages).toBeTruthy();
        // console.log(messages);
        // it should have subscribed the member to the default list
        // const member = await prisma.member.findUnique({
        //   where: { listId_email: { listId: defaultListId, email } },
        // });

        // expect(member).toBeTruthy();
        // expect(member?.status).toBe("subscribed");
      });

      it("should 200 - send the same email twice", async () => {
        const email = "testDefaultList@test.com";
        const { response: sendMailResponse } = await apiSendMail("testApiKey", {
          ...ApiSendMail.defaultFormData,
          email,
          listName: "default",
          dangerouslyForceDeliver: true,
        });
        expect(sendMailResponse.status).toBe(200);

        expect(await sendMailResponse.json()).toEqual({ result: "delivered!" });

        // it should have created a message object
        const messages = await prisma.message.findMany({});
        expect(messages).toBeTruthy();
        // console.log(messages);
        // it should have subscribed the member to the default list

        const { response: sendMailResponse2 } = await apiSendMail(
          "testApiKey",
          {
            ...ApiSendMail.defaultFormData,
            email,
            listName: "default",
            dangerouslyForceDeliver: true,
          }
        );
        expect(sendMailResponse2.status).toBe(200);

        expect(await sendMailResponse2.json()).toEqual({
          result: "delivered!",
        });

        // it should have created a message object
        const messages2 = await prisma.message.findMany({});
        expect(messages2).toBeTruthy();
        // console.log(messages2);
        // it should have subscribed the member to the default list
      });
    });
  });
});
