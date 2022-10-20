import { Api } from "./index";

interface CreateListFormData {
  name: string;
}

interface CreateListMemberData {
  email: string;
  status: string;
}

export async function apiGetLists() {
  const instance = new ApiGetLists();
  return instance.perform();
}

export class ApiGetLists extends Api {
  path = "/api/lists";
  method = "GET";
}

export async function apiCreateList() {
  const instance = new ApiCreateLists();
  return instance.perform();
}

export class ApiCreateLists extends Api<CreateListFormData> {
  path = "/api/lists";
  method = "POST";

  formData = {
    name: `My list ${Math.random()}`,
  };
}

export async function apiGetListMembers(listId: string) {
  const instance = new ApiListMembers();
  instance.path = `/api/lists/${listId}/members`;
  return instance.perform();
}

export class ApiListMembers extends Api {
  method = "GET";
}

export async function apiCreateListMember(listId: string, formData: any) {
  const instance = new ApiCreateListMember();
  instance.path = `/api/lists/${listId}/members`;
  instance.formData = formData;
  return instance.perform();
}

export class ApiCreateListMember extends Api<CreateListMemberData> {
  method = "POST";
}
