import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";

const fetch = fetchCookie(nodeFetch);
const controller = new AbortController();
import type { AbortSignal } from "node-fetch/externals";
const signal = controller.signal as AbortSignal;

export function cliUrl(path: string) {
  return "http://localhost:3883" + path;
}

export async function apiGetApiKeys() {
  const response = await fetch(cliUrl("/api/apiKeys"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  expect(response.status).toBe(200);

  return response;
}

export async function apiCreateUser() {
  const email = `ok${Math.random()}@ok.com`;
  const password = "okokokokokokokok";

  const response = await fetch(cliUrl("/api/users"), {
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

  return { email, password };
}
export async function apiLogin(email: string, password: string) {
  const response = await fetch(cliUrl("/api/session"), {
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

  return response;
}
