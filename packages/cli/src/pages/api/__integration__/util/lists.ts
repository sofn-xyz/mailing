import { Api } from "./index";

interface CreateListFormData {
  name: string;
}

interface ListMemberData {
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

export async function apiGetListMembers(listId?: string) {
  if ("string" !== typeof listId)
    throw new Error("expected listId to be a string");

  const instance = new ApiListMembers();
  instance.path = `/api/lists/${listId}/members`;
  return instance.perform();
}

export class ApiListMembers extends Api {
  method = "GET";
}

export async function apiCreateListMember(listId?: string, formData?: any) {
  if ("string" !== typeof listId)
    throw new Error("expected listId to be a string");

  const instance = new ApiCreateListMember();
  instance.path = `/api/lists/${listId}/members`;
  if (formData) instance.formData = formData;
  return instance.perform();
}

export class ApiCreateListMember extends Api<ListMemberData> {
  method = "POST";

  formData = {
    email: "alex.farrill@gmail.com",
    status: "pending",
  };
}

export async function apiPatchListMember(
  listId?: string,
  memberId?: string,
  formData?: any
) {
  if ("string" !== typeof listId)
    throw new Error("expected listId to be a string");

  if ("string" !== typeof memberId)
    throw new Error("expected formData to be defined");

  if (undefined === typeof formData)
    throw new Error("expected formData to be defined");

  const instance = new ApiPatchListMember();
  instance.path = `/api/lists/${listId}/members/${memberId}`;
  if (formData) instance.formData = formData;
  return instance.perform();
}

export class ApiPatchListMember extends Api<ListMemberData> {
  method = "PATCH";
}
