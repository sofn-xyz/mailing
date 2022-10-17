import { cliUrl, fetch } from ".";
import { apiCreateUser } from "./createUser";

interface LoginFormData {
  email: string;
  password: string;
}

export async function apiLoginAs(email: string, password: string) {
  const instance = new ApiLogin();
  instance.updateFormData({ email, password });
  return instance.perform();
}

export async function apiLogin() {
  const { formData, response: apiCreateUserResponse } = await apiCreateUser();
  expect(apiCreateUserResponse.status).toBe(201);

  const { email, password } = formData;

  const { response: apiLoginResponse } = await apiLoginAs(email, password);
  expect(apiLoginResponse.status).toBe(201);
}

export class ApiLogin {
  response?: Awaited<ReturnType<typeof fetch>>;
  fetchData: any;
  formData: Partial<LoginFormData>;
  path = cliUrl("/api/session");

  defaultFormData = {};

  defaultFetchData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor() {
    this.formData = this.defaultFormData;
  }

  async perform() {
    this.fetchData = {
      ...this.defaultFetchData,
      body: JSON.stringify(this.formData),
    };

    this.response = await fetch(this.path, this.fetchData);

    return this;
  }

  updateFormData(data: Partial<LoginFormData>) {
    this.formData = { ...this.formData, ...data };
  }
}
