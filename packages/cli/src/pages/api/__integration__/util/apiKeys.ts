import { Api } from "./index";
import { assertIntegrationTestEnv } from "./assertIntegrationTestEnv";
assertIntegrationTestEnv();

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
  method = "GET";
}

export class ApiPostApiKeys extends Api {
  path = "/api/apiKeys";
}
