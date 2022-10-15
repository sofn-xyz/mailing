import { cliUrl } from "../../../__integration__/util";
import fetch from "node-fetch";
import type { AbortSignal } from "node-fetch/externals";

import prisma from "../../../../../../prisma";

describe("validate", () => {
  const controller = new AbortController();
  const signal = controller.signal as AbortSignal;

  beforeEach(async () => {
    jest.useRealTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  function constructFetch(apiKey: string) {
    return fetch(cliUrl(`/api/apiKeys/${apiKey}/validate`), {
      headers: { "Content-Type": "application/json" },
      signal,
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
