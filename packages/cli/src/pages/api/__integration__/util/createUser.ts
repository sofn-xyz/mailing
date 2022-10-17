import { cliUrl, fetch } from "./index";

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
  formData: CreateUserFormData;
  path = cliUrl("/api/users");

  defaultFormData = {
    email: `ok${Math.random()}@ok.com`,
    password: "okokokokokokokok",
  };

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

  updateFormData(data: Partial<CreateUserFormData>) {
    this.formData = { ...this.formData, ...data };
  }
}
