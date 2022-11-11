import { apiLogin } from "./util/login";
import { apiGetApiKeys } from "./util/apiKeys";
import { apiSendMail } from "./util/sendMail";

describe("sendMail", () => {
  let apiKey: string;

  beforeAll(async () => {
    await apiLogin();

    const { response: apiKeysResponse } = await apiGetApiKeys();
    expect(apiKeysResponse.status).toBe(200);
    const apiKeys = (await apiKeysResponse.json()).apiKeys;
    expect(apiKeys.length).toBe(1);
    apiKey = apiKeys[0].id;
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

  // describe("sending to a list", () => {
  //   it("should 200", async () => {
  //     const { response: sendMailResponse } = await apiSendMail(apiKey, {
  //       listId: "fake",
  //     });
  //     expect(sendMailResponse.status).toBe(200);
  //   });
  // });
});
