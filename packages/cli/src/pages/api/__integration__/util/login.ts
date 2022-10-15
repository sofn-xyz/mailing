import { cliUrl } from ".";
import { fetch, apiCreateUser } from "./createUser";

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

  const { formData } = apiCreateUserReturn;
  const { email, password } = formData;

  const apiLoginResponse = await apiLoginAs(email, password);
  expect(apiLoginResponse.status).toBe(201);
}
