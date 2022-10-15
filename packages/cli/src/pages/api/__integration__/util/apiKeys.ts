import { cliUrl } from ".";
import { fetch } from "./createUser";

export async function apiGetApiKeys() {
  const response = await fetch(cliUrl("/api/apiKeys"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  expect(response.status).toBe(200);

  return response;
}
