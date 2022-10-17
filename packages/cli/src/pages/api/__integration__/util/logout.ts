import { cliUrl, fetch } from "./index";

export function apiLogout() {
  const instance = new ApiLogout();
  return instance.perform();
}

export class ApiLogout {
  response?: Awaited<ReturnType<typeof fetch>>;
  fetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  path = cliUrl("/api/logout");

  async perform() {
    this.response = await fetch(this.path, this.fetchData);

    return this;
  }
}
