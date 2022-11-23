import prisma from "../../../../../prisma";
import { Api } from "./index";

type CreateListMemberData = {
  email: string;
  status: string;
};

type ListSubscribeData = {
  email: string;
};

type UpdateListMemberData = {
  status: string;
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

// create a list member on the default list
// fails if the member already exists
export async function apiCreateDefaultListMember(email: string) {
  // get the default list from the database
  const defaultList = await prisma.list.findFirstOrThrow({
    where: { isDefault: true },
  });

  const apiListSubscribeReturn = await apiListSubscribe(defaultList.id, {
    email,
  });

  const { response: createDefaultListMemberResponse } = apiListSubscribeReturn;

  expect(createDefaultListMemberResponse.status).toEqual(201);

  return apiListSubscribeReturn;
}

export async function apiCreateListMember(
  listId: string,
  formData?: CreateListMemberData
) {
  const instance = new ApiCreateListMember();
  instance.path = `/api/lists/${listId}/members`;
  if (formData) instance.formData = formData;
  return instance.perform();
}

export async function apiListSubscribe(
  listId: string,
  formData?: ListSubscribeData
) {
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

export class ApiCreateListMember extends Api<CreateListMemberData> {
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

export class ApiPatchListMember extends Api<UpdateListMemberData> {
  method = "PATCH";
}
