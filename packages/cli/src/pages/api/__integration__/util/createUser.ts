import { Api, cliUrl } from "./index";

interface CreateUserFormData {
  email: string;
  password: string;
}

export async function apiCreateUser() {
  const instance = new ApiCreateUser();
  return instance.perform();
}

export class ApiCreateUser extends Api<CreateUserFormData> {
  path = cliUrl("/api/users");

  formData = {
    email: `ok${Math.random()}@ok.com`,
    password: "okokokokokokokok",
  };
}
