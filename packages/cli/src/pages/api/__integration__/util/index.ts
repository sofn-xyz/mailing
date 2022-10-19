import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
export const fetch: any = fetchCookie(nodeFetch);

export function cliUrl(path: string) {
  return "http://localhost:3883" + path;
}

export abstract class Api<TFormData = undefined> {
  abstract path: string;
  formData?: TFormData;
  response?: Awaited<ReturnType<typeof fetch>>;
  method?: string;
  fetchData?: any;

  setFetchData() {
    this.fetchData = this.fetchData || {
      method: this.method || "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if ("POST" === this.fetchData.method) {
      this.fetchData.body = JSON.stringify(this.formData);
    }
  }

  async perform() {
    this.setFetchData();

    this.response = await fetch(cliUrl(this.path), this.fetchData);

    return this;
  }
}
