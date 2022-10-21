import { Api } from "./index";

import prisma from "../../../../../prisma";

export async function apiCreateApiKey() {
  const instance = new ApiPostApiKeys();
  return instance.perform();
}
export async function apiGetApiKeys() {
  const instance = new ApiGetApiKeys();
  return instance.perform();
}

export class ApiGetApiKeys extends Api {
  path = "/api/apiKeys";

  fetchData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export class ApiPostApiKeys extends Api {
  path = "/api/apiKeys";
}

export async function createApiKey() {
  const org = await prisma.organization.create({
    data: {
      name: "My Test Co " + Math.random(),
    },
  });
  const k = await prisma.apiKey.create({
    data: {
      organizationId: org.id,
    },
  });
  return k.id;
}
