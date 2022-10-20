import { Api } from "./index";

interface CreateListFormData {
  name: string;
}

export async function apiGetLists() {
  const instance = new ApiGetLists();
  return instance.perform();
}

// Return all of an organization's lists
// GET /api/lists
export class ApiGetLists extends Api {
  path = "/api/lists";
  method = "GET";
}

export async function apiCreateList() {
  const instance = new ApiCreateLists();
  return instance.perform();
}

// Create a list
// POST /api/lists
export class ApiCreateLists extends Api<CreateListFormData> {
  path = "/api/lists";
  method = "POST";

  formData = {
    name: `My list ${Math.random()}`,
  };
}
