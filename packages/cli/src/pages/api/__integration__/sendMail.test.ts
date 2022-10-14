import {
  apiCreateUser,
  apiGetApiKeys,
  apiLoginAs,
  apiSendMail,
} from "../apiIntegrationTestUtil";

describe("sendMail", () => {
  it("should work", async () => {
    const {
      email,
      password,
      response: apiCreateUserResponse,
    } = await apiCreateUser();
    expect(apiCreateUserResponse.status).toBe(201);

    await apiLoginAs(email, password);

    const apiKeysResponse = await apiGetApiKeys();

    const apiKeys = (await apiKeysResponse.json()).apiKeys;
    expect(apiKeys.length).toBe(1);
    const apiKey = apiKeys[0].id;

    const sendMailResponse = await apiSendMail(apiKey);

    expect(sendMailResponse.status).toBe(200);
  });
});
