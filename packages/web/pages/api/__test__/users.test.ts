import fetch from "node-fetch";
import type { AbortSignal } from "node-fetch/externals";

describe("users", () => {
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

  function constructFetch(body: any) {
    return fetch(`http://localhost:3000/api/users`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });
  }

  describe("create", () => {
    it("creates a user", async () => {
      const response = await constructFetch({
        email: `ok${Math.random()}@ok.com`,
        password: "okokokokokokokok",
      });
      expect(response.status).toBe(201);
      expect((await response.json()).code).toMatch(/[0-9a-zA-Z]+/);
    });
  });
});
