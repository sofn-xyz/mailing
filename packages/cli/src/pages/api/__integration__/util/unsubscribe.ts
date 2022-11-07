import { Api } from "./index";

type UnsubscribeFormData = {
  data: {
    [memberId: string]: {
      status: "subscribed" | "unsubscribed";
    };
  };
};

export async function apiUnsubscribe(
  memberId: string,
  formData: UnsubscribeFormData
) {
  const instance = new ApiUnsubscribe();
  instance.path = `/api/unsubscribe/${memberId}`;
  instance.formData = formData;
  return await instance.perform();
}

export class ApiUnsubscribe extends Api<UnsubscribeFormData> {
  method = "PATCH";
}
