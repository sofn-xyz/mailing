import { apiCreateUser, apiGetApiKeys, apiLogin, cliUrl } from "./apiUtil";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";

const fetch = fetchCookie(nodeFetch);

describe("sendMail", () => {
  it("should work", async () => {
    const { email, password } = await apiCreateUser();
    await apiLogin(email, password);

    const apiKeysResponse = await apiGetApiKeys();

    const apiKeys = (await apiKeysResponse.json()).apiKeys;

    expect(apiKeys.length).toBe(1);

    const apiKey = apiKeys[0];

    const sendMailResponse = await fetch(cliUrl("/api/sendMail"), {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
    });

    console.log(await sendMailResponse.json());
    expect(sendMailResponse.status).toBe(200);
  });
});
