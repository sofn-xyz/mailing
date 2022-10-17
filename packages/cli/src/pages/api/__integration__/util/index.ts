import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
export const fetch: any = fetchCookie(nodeFetch);

export function cliUrl(path: string) {
  return "http://localhost:3883" + path;
}
