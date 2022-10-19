import { Api } from "./index";

// interface CreateListFormData {
//   name: string;
// }

export async function apiGetLists() {
  const instance = new ApiGetLists();
  return instance.perform();
}

export class ApiGetLists extends Api {
  path = "/api/lists";
}
