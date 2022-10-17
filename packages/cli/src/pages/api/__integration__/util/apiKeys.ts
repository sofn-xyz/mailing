import { cliUrl, fetch } from "./index";

export async function apiCreateApiKey() {
  const instance = new ApiPostApiKeys();
  return instance.perform();
}
export async function apiGetApiKeys() {
  const instance = new ApiGetApiKeys();
  return instance.perform();
}

export class ApiGetApiKeys {
  response?: Awaited<ReturnType<typeof fetch>>;
  fetchData: any;
  path = cliUrl("/api/apiKeys");

  defaultFetchData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  async perform() {
    this.fetchData = {
      ...this.defaultFetchData,
    };

    this.response = await fetch(this.path, this.fetchData);

    return this;
  }
}

export class ApiPostApiKeys {
  response?: Awaited<ReturnType<typeof fetch>>;
  fetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  path = cliUrl("/api/apiKeys");

  async perform() {
    this.response = await fetch(this.path, this.fetchData);

    return this;
  }
}
