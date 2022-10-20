import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
export const fetch: any = fetchCookie(nodeFetch);

export function cliUrl(path: string) {
  return "http://localhost:3883" + path;
}

export abstract class Api<TFormData = undefined> {
  path?: string;
  formData?: TFormData;
  response?: Awaited<ReturnType<typeof fetch>>;
  method?: string;
  fetchData?: any;

  static defaultFetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  setFetchData() {
    if ("undefined" === typeof this.fetchData) {
      this.fetchData = { ...Api.defaultFetchData };

      if (this.method) {
        this.fetchData.method = this.method;
      }
    }

    if ("POST" === this.fetchData.method) {
      this.fetchData.body = JSON.stringify(this.formData);
    }
  }

  async perform() {
    if (!this.path) throw new Error("path must be set");

    this.setFetchData();

    this.response = await fetch(cliUrl(this.path), this.fetchData);

    return this;
  }
}
