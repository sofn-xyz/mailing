import { Api, cliUrl } from "./index";

// interface CreateListFormData {
//   name: string;
// }

export async function apiGetLists() {
  const instance = new ApiGetLists();
  return instance.perform();
}

export class ApiGetLists extends Api {
  path = cliUrl("/api/lists");

  fetchData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
}
