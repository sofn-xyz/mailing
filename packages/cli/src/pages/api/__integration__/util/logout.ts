import { Api } from "./index";

export function apiLogout() {
  const instance = new ApiLogout();
  return instance.perform();
}

export class ApiLogout extends Api {
  path = "/api/logout";
}
