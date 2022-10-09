import fetch from "node-fetch";
import type { AbortSignal } from "node-fetch/externals";
const controller = new AbortController();
const signal = controller.signal as AbortSignal;

function webUrl(path: string) {
  return "http://localhost:3000" + path;
}

async function apiCreateUser() {
  const email = `ok${Math.random()}@ok.com`;
  const password = "okokokokokokokok";

  const response = await fetch(webUrl("/api/users"), {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });
  expect(response.status).toBe(201);
  expect((await response.json()).code).toMatch(/[0-9a-zA-Z]+/);

  return { email, password };
}

async function apiLogin(email: string, password: string) {
  const response = await fetch(webUrl("/api/session"), {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  expect(response.status).toBe(201);
}

describe("users", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("create", () => {
    it("creates a user", async () => {
      await apiCreateUser();
    });

    it("can login after creating a user", async () => {
      const { email, password } = await apiCreateUser();
      await apiLogin(email, password);
    });
  });
});
