import { apiLogin } from "./util/login";
import { apiGetApiKeys } from "./util/apiKeys";
import { apiSendMail, ApiSendMail } from "./util/sendMail";
import prisma from "../../../../prisma";
import { apiGetLists } from "./util/lists";
import type { List } from "../../../../prisma/generated/client";
import { truncateCliTables } from "./util/truncateCliTables";
import { apiPatchListMember } from "./util/listMember";

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

      it("should send an email", async () => {
        const email = "testDefaultList@test.com";
        const { response: sendMailResponse } = await apiSendMail("testApiKey", {
          ...ApiSendMail.defaultFormData,
          to: email,
          listName: "default",
          dangerouslyForceDeliver: true,
        });
        expect(sendMailResponse.status).toBe(200);

        expect(await sendMailResponse.json()).toEqual({ result: "delivered!" });

        // it should have created a message object
        const messages = await prisma.message.findMany({});
        expect(messages.length).toEqual(1);

        const message = messages[0];
        expect(message.to).toEqual([email]);

        // it should have subscribed the member to the default list
        const member = await prisma.member.findUnique({
          where: { listId_email: { listId: defaultListId, email } },
        });

        expect(member).toBeTruthy();
        expect(member?.status).toBe("subscribed");
      });

      it("can send the same email twice", async () => {
        const email = "testDefaultList@test.com";
        const { response: sendMailResponse } = await apiSendMail("testApiKey", {
          ...ApiSendMail.defaultFormData,
          to: email,
          listName: "default",
          dangerouslyForceDeliver: true,
        });
        expect(sendMailResponse.status).toBe(200);

        expect(await sendMailResponse.json()).toEqual({ result: "delivered!" });

        // it should have created a message object
        const messages = await prisma.message.findMany();
        expect(messages.length).toBe(1);

        const message = messages[0];
        expect(message.to).toEqual([email]);

        // it should have subscribed the member to the default list

        const { response: sendMailResponse2 } = await apiSendMail(
          "testApiKey",
          {
            ...ApiSendMail.defaultFormData,
            to: email,
            listName: "default",
            dangerouslyForceDeliver: true,
          }
        );
        expect(sendMailResponse2.status).toBe(200);

        expect(await sendMailResponse2.json()).toEqual({
          result: "delivered!",
        });

        // it should have created a second message object
        const messages2 = await prisma.message.findMany({
          where: { id: { not: message.id } },
        });
        expect(messages2.length).toBe(1);

        const message2 = messages2[0].to;
        expect(message2).toEqual([email]);

        // it should have subscribed the member to the default list, but only once
        const members = await prisma.member.findMany();

        expect(members.length).toBe(1);

        const member = members[0];
        expect(member.status).toBe("subscribed");
      });

      it("should not send an email to a member that is unsubscribed", async () => {
        const email = "testDefaultListUnsubscribedUser@test.com";
        const apiSendMailOpts = {
          ...ApiSendMail.defaultFormData,
          to: email,
          listName: "default",
          dangerouslyForceDeliver: true,
        };
        const { response: sendMailResponse } = await apiSendMail(
          "testApiKey",
          apiSendMailOpts
        );
        expect(sendMailResponse.status).toBe(200);

        expect(await sendMailResponse.json()).toEqual({ result: "delivered!" });

        // it should have subscribed the member to the default list
        const member = await prisma.member.findUniqueOrThrow({
          where: { listId_email: { listId: defaultListId, email } },
        });

        // unsubscribe the email
        const { response: updateListMemberResponse } = await apiPatchListMember(
          defaultListId,
          member.id,
          {
            email,
            status: "unsubscribed",
          }
        );

        expect(updateListMemberResponse.status).toBe(200);

        // try to send the email again
        const { response: sendMailResponse2 } = await apiSendMail(
          "testApiKey",
          apiSendMailOpts
        );
        expect(sendMailResponse2.status).toBe(200);

        expect(await sendMailResponse2.json()).toEqual({});

        // it should not create a second message
        const messages = await prisma.message.findMany();
        expect(messages.length).toBe(1);

        // the member should still be unsubscribed
        const memberAgain = await prisma.member.findUniqueOrThrow({
          where: { listId_email: { listId: defaultListId, email } },
        });

        expect(memberAgain.status).toBe("unsubscribed");
      });
    });

    describe("sending to a different list than 'default'", () => {
      beforeEach(() => {
        // delete all members and messages
        truncateCliTables(["Member", "Message"]);
      });

      it("should send an email and create the list if necessary", async () => {
        const email = "testADifferentList@test.com";
        const apiSendMailOpts = {
          ...ApiSendMail.defaultFormData,
          to: email,
          listName: "mynewlist",
          dangerouslyForceDeliver: true,
        };
        const { response: sendMailResponse } = await apiSendMail(
          "testApiKey",
          apiSendMailOpts
        );
        expect(sendMailResponse.status).toBe(200);

        expect(await sendMailResponse.json()).toEqual({ result: "delivered!" });

        // it should have created a message object
        const messages = await prisma.message.findMany();
        expect(messages.length).toEqual(1);

        const message = messages[0];
        expect(message.to).toEqual([email]);

        // it should have created a new list
        const list = await prisma.list.findFirst({
          where: { name: "mynewlist" },
        });
        expect(list).toBeTruthy;
        expect(list?.displayName).toBe("mynewlist");

        // it should have subscribed the member to the new list
        const members = await prisma.member.findMany({
          where: { listId: list?.id },
        });

        expect(members.length).toBe(1);

        const member = members[0];
        expect(member.email).toBe(email);
        expect(member.status).toBe("subscribed");

        // Send a second email to the same list
        // if the list exists it should not create it again
        const { response: sendMailResponse2 } = await apiSendMail(
          "testApiKey",
          apiSendMailOpts
        );
        expect(sendMailResponse2.status).toBe(200);

        expect(await sendMailResponse2.json()).toEqual({
          result: "delivered!",
        });

        // it should have created a second message object

        // it should not create another member object and the existing member object should still be subscribed
        const membersAgain = await prisma.member.findMany({
          where: { listId: list?.id },
        });

        expect(membersAgain.length).toBe(1);

        const memberAgain = members[0];
        expect(memberAgain.email).toBe(email);
        expect(memberAgain.status).toBe("subscribed");
      });
    });
  });
});
