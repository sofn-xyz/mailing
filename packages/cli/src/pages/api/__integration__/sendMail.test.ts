import { apiCreateUser } from "./util/createUser";
import { apiLoginAs } from "./util/login";
import { apiGetApiKeys } from "./util/apiKeys";
import { apiSendMail } from "./util/sendMail";

describe("sendMail", () => {
  it("should work", async () => {
    const { formData, response } = await apiCreateUser();
    expect(response.status).toBe(201);

    const { email, password } = formData;

    await apiLoginAs(email, password);

    const { response: apiKeysResponse } = await apiGetApiKeys();

    const apiKeys = (await apiKeysResponse.json()).apiKeys;
    expect(apiKeys.length).toBe(1);
    const apiKey = apiKeys[0].id;

    const sendMailResponse = await apiSendMail(apiKey);
    expect(sendMailResponse.status).toBe(200);
  });
});
