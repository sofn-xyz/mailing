import { Api } from "./index";

type UnsubscribeFormData = {
  email: string;
};

export async function apiUnsubscribe(memberId: string, email: string) {
  const instance = new ApiUnsubscribe();
  instance.path = `/api/unsubscribe/${memberId}`;
  instance.formData = { email };
  return await instance.perform();
}

export class ApiUnsubscribe extends Api<UnsubscribeFormData> {
  method = "PATCH";
}
