import { Api } from "./index";

export async function apiCreateApiKey() {
  const instance = new ApiPostApiKeys();
  return instance.perform();
}
export async function apiGetApiKeys() {
  const instance = new ApiGetApiKeys();
  return instance.perform();
}

export class ApiGetApiKeys extends Api {
  path = "/api/apiKeys";

  fetchData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export class ApiPostApiKeys extends Api {
  path = "/api/apiKeys";
}
