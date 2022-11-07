import { Api } from "./index";

type ListMemberData = {
  email: string;
  status: string;
};

type ListSubscribeData = {
  email: string;
};

// Return info about all members of a list
// GET /api/lists/${listId}/members

export async function apiGetListMembers(listId: string) {
  const instance = new ApiListMembers();
  instance.path = `/api/lists/${listId}/members`;
  return instance.perform();
}

export class ApiListMembers extends Api {
  method = "GET";
}
// Return info about an individual member of a list
// GET /api/lists/${listId}/members/${memberId}

export async function apiGetListMember(listId: string, memberId: string) {
  const instance = new ApiListMember();
  instance.path = `/api/lists/${listId}/members/${memberId}`;
  return instance.perform();
}

export class ApiListMember extends Api {
  method = "GET";
}

export async function apiCreateListMember(listId: string, formData?: any) {
  const instance = new ApiCreateListMember();
  instance.path = `/api/lists/${listId}/members`;
  if (formData) instance.formData = formData;
  return instance.perform();
}

export async function apiListSubscribe(listId: string, formData?: any) {
  const instance = new ApiListSubscribe();
  instance.path = `/api/lists/${listId}/subscribe`;
  if (formData) instance.formData = formData;
  return instance.perform();
}

export class ApiListSubscribe extends Api<ListSubscribeData> {
  method = "POST";

  formData = {
    email: "alex.farrill@gmail.com",
  };
}

export class ApiCreateListMember extends Api<ListMemberData> {
  method = "POST";

  formData = {
    email: "alex.farrill@gmail.com",
    status: "subscribed",
  };
}

export async function apiPatchListMember(
  listId: string,
  memberId: string,
  formData: any
) {
  const instance = new ApiPatchListMember();
  instance.path = `/api/lists/${listId}/members/${memberId}`;
  if (formData) instance.formData = formData;

  return instance.perform();
}

export class ApiPatchListMember extends Api<ListMemberData> {
  method = "PATCH";
}
