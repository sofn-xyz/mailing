import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";

export const fetch = fetchCookie(nodeFetch);
const controller = new AbortController();
import type { AbortSignal } from "node-fetch/externals";
import { cliUrl } from ".";
const signal = controller.signal as AbortSignal;

interface CreateUserFormData {
  email: string;
  password: string;
}

export async function apiCreateUser() {
  const instance = new ApiCreateUser();
  return instance.perform();
}

export class ApiCreateUser {
  response?: Awaited<ReturnType<typeof fetch>>;
  fetchData: any;
  formData?: CreateUserFormData;
  defaultFormData = {
    email: `ok${Math.random()}@ok.com`,
    password: "okokokokokokokok",
  };

  defaultFetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  };

  async perform() {
    this.formData = { ...this.defaultFormData, ...this.formData };

    this.fetchData = {
      ...this.defaultFetchData,
      body: JSON.stringify(this.formData),
    };

    this.response = await fetch(cliUrl("/api/users"), this.fetchData);

    return this;
  }

  updateFormData(data: CreateUserFormData) {
    this.formData = { ...this.formData, ...data };
  }
}
