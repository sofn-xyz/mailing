import fetch from "node-fetch";
import type { AbortSignal } from "node-fetch/externals";

import prisma from "../../../../../prisma";

describe("validate", () => {
  let start: number;
  const controller = new AbortController();
  const signal = controller.signal as AbortSignal;

  beforeEach(() => {
    jest.useRealTimers();
    start = Date.now();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  function constructFetch(apiKey: string) {
    return fetch(`http://localhost:3000/api/apiKeys/${apiKey}/validate`, {
      headers: { "Content-Type": "application/json" },
      signal,
    });
  }

  it("errors with invalid API key", async () => {
    const response = await constructFetch("m");
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
