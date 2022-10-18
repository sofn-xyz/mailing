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

  fetchData: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  async perform() {
    if ("POST" === this.fetchData.method) {
      this.fetchData.body = JSON.stringify(this.formData);
    }

    this.response = await fetch(this.path, this.fetchData);

    return this;
  }

  updateFormData(data: TFormData) {
    this.formData = data;
  }
}
