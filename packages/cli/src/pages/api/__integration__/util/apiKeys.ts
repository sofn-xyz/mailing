import { Api, cliUrl } from "./index";

export async function apiCreateApiKey() {
  const instance = new ApiPostApiKeys();
  return instance.perform();
}
export async function apiGetApiKeys() {
  const instance = new ApiGetApiKeys();
  return instance.perform();
}

export class ApiGetApiKeys extends Api {
  path = cliUrl("/api/apiKeys");

  defaultFetchData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export class ApiPostApiKeys extends Api {
  path = cliUrl("/api/apiKeys");
}
