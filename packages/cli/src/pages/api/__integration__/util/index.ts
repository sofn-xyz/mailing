import { fetch } from "./createUser";

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
