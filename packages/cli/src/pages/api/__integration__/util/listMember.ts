import { Api } from "./index";

interface ListMemberData {
  email: string;
  status: string;
}

// Return info about all members of a list
// GET /api/lists/${listId}/members

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
// Return info about an individual member of a list
// GET /api/lists/${listId}/members/${memberId}

export async function apiGetListMember(listId?: string, memberId?: string) {
  if ("string" !== typeof listId)
    throw new Error("expected listId to be a string");

  if ("string" !== typeof memberId)
    throw new Error("expected memberId to be a string");

  const instance = new ApiListMember();
  instance.path = `/api/lists/${listId}/members/${memberId}`;
  return instance.perform();
}

export class ApiListMember extends Api {
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
    status: "subscribed",
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
    throw new Error("expected memberId to be a string");

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
