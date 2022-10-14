import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";

const fetch = fetchCookie(nodeFetch);
const controller = new AbortController();
import type { AbortSignal } from "node-fetch/externals";
const signal = controller.signal as AbortSignal;

export function cliUrl(path: string) {
  return "http://localhost:3883" + path;
}

export async function apiFetch(url: string, data: any = {}) {
  const defaultData = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedData = { defaultData, ...data };
  return fetch(cliUrl(url), mergedData);
}

export async function apiSendMail(apiKey: string) {
  return await fetch(cliUrl("/api/sendMail"), {
    method: "POST",
    body: JSON.stringify({
      subject: "hello",
      to: "peter+sendMailAPI@campsh.com",
      templateName: "AccountCreated",
      props: { name: "Peter" },
    }),
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
    },
  });
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

export async function apiCreateUser(email?: string, password?: string) {
  email = undefined === email ? `ok${Math.random()}@ok.com` : email;
  password = undefined === password ? "okokokokokokokok" : password;

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

  return { email, password, response };
}

export async function apiLoginAs(email: string, password: string) {
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

export async function apiLogin() {
  const apiCreateUserReturn = await apiCreateUser();
  expect(apiCreateUserReturn.response.status).toBe(201);

  const { email, password } = apiCreateUserReturn;

  const apiLoginResponse = await apiLoginAs(email, password);
  expect(apiLoginResponse.status).toBe(201);
}
