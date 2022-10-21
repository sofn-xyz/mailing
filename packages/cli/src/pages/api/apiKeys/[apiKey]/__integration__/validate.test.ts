import { cliUrl } from "../../../__integration__/util";
import fetch from "node-fetch";

import prisma from "../../../../../../prisma";

describe("validate", () => {
  function constructFetch(apiKey: string) {
    return fetch(cliUrl(`/api/apiKeys/${apiKey}/validate`), {
      headers: { "Content-Type": "application/json" },
    });
  }

  it("errors with invalid API key", async () => {
    const response = await constructFetch("my-invalid-api-key");
    expect(response.status).toBe(401);
  });

  it("succeeds with valid API key", async () => {
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
    const response = await constructFetch(k.id);
    expect(response.status).toBe(200);
  });
});
