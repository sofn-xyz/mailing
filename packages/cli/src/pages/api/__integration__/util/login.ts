import { Api, cliUrl } from ".";
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

export class ApiLogin extends Api<LoginFormData> {
  path = cliUrl("/api/session");
}
